import { getStoredAuth, authenticatedFetch } from '@/lib/auth'

// Vendor Service for API integration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface VendorRegistrationData {
  // Company Details
  businessType: string;
  companyName: string;
  gstNumber?: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Owner Profile
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  yearEstablished: string;
  employeeCount: string;
  
  // Warehouse Details
  ownershipType: string;
  warehouseAddress: string;
  warehouseCity: string;
  warehouseState: string;
  warehouseZip: string;
  warehouseCountry: string;
  mapLink?: string;
  
  // Vendor Type & Products
  vendorType: string | string[];
  marketType: string;
  selectedCategories: Record<string, string[]>;
  
  // Manufacturing Facilities
  enabledFacilities?: Record<string, boolean>;
  facilityDetails?: Record<string, any>;
  
  // Certifications & Logistics
  selectedCertifications: string[];
  certificationExpiryDates: Record<string, string>;
  qualityControlProcess?: string;
  complianceStandards?: string;
  packagingCapabilities?: string;
  warehousingCapacity?: string;
  logisticsPartners?: string;
  shippingMethods: string[];
  
  // Contact & Trade Info
  mainContact: {
    name: string;
    designation: string;
    email1: string;
    email2?: string;
    phone1: string;
    phone2?: string;
    department: string;
  };
  alternateContacts: any[];
  hasImportExport: string;
  importCountries: string[];
  exportCountries: string[];
  tradeLicenseNumber?: string;
  businessRegistrationNumber?: string;
  taxIdentificationNumber?: string;
  bankingDetails?: {
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  
  // Password
  password: string;
}

export interface VendorFiles {
  logo?: File;
  gstDocument?: File;
  ownerPhoto?: File;
  factoryImages?: File[];
  certificationFiles?: Record<string, File>;
}

export interface VendorLoginResponse {
  message: string;
  vendor: {
    id: string;
    email: string;
    companyName: string;
    status: string;
    ownerName: string;
  };
  token: string;
}

export interface VendorProfile {
  id: string;
  email: string;
  companyName: string;
  status: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  businessPhone: string;
  businessEmail: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessCountry: string;
  website?: string;
  establishedYear?: number;
  vendorType: string;
  productCategories: string[];
  productTypes: string[];
  specializations: string[];
  annualTurnover?: number;
  exportExperience?: boolean;
  exportCountries?: string[];
  primaryMarkets?: string[];
  factoryAddress?: string;
  factoryCity?: string;
  factoryState?: string;
  factorySize?: string;
  productionCapacity?: string;
  qualityControl?: string;
  warehouseAddress?: string;
  warehouseCity?: string;
  warehouseState?: string;
  warehouseSize?: string;
  storageCapacity?: string;
  shippingMethods?: string[];
  deliveryTime?: string;
  minimumOrderQuantity?: string;
  paymentTerms?: string[];
  createdAt: string;
  updatedAt: string;
  approvedAt?: string;
  rejectedAt?: string;
  suspendedAt?: string;
  rejectionReason?: string;
  certifications: any[];
  documents: any[];
  bankDetails?: any;
  references: any[];
  _count?: {
    certifications: number;
    documents: number;
  };
}

export interface VendorsListResponse {
  vendors: VendorProfile[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface VendorFilters {
  status?: 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  search?: string;
  page?: number;
  limit?: number;
}

class VendorService {
  // Get admin token from auth system
  private static getAdminToken(): string | null {
    const auth = getStoredAuth();
    return auth?.token || null;
  }

  // Expose auth check for debugging
  static getStoredAuth() {
    return getStoredAuth();
  }

  // Register vendor with form data and files
  static async registerVendor(formData: VendorRegistrationData, files: VendorFiles) {
    const form = new FormData();
    
    // Add all form fields
    Object.keys(formData).forEach(key => {
      const value = (formData as any)[key];
      if (typeof value === 'object' && value !== null) {
        form.append(key, JSON.stringify(value));
      } else {
        form.append(key, value || '');
      }
    });
    
    // Add files
    if (files.logo) {
      form.append('logo', files.logo);
    }
    if (files.gstDocument) {
      form.append('gstDocument', files.gstDocument);
    }
    if (files.ownerPhoto) {
      form.append('ownerPhoto', files.ownerPhoto);
    }
    if (files.factoryImages && files.factoryImages.length > 0) {
      files.factoryImages.forEach(file => {
        form.append('factoryImages', file);
      });
    }
    if (files.certificationFiles) {
      Object.entries(files.certificationFiles).forEach(([certId, file], index) => {
        form.append('certificationFiles', file);
        form.append(`certificationId_${index}`, certId);
      });
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/register`, {
        method: 'POST',
        body: form,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Vendor registration error:', error);
      throw error;
    }
  }
  
  // Login vendor
  static async loginVendor(email: string, password: string): Promise<VendorLoginResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
      
      const data = await response.json();
      
      // Store token in localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('vendorToken', data.token);
        localStorage.setItem('vendorData', JSON.stringify(data.vendor));
      }
      
      return data;
    } catch (error) {
      console.error('Vendor login error:', error);
      throw error;
    }
  }
  
  // Get vendor profile
  static async getVendorProfile(): Promise<{ vendor: VendorProfile }> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('vendorToken') : null;
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Get vendor profile error:', error);
      throw error;
    }
  }
  
  // Update vendor profile
  static async updateVendorProfile(updateData: Partial<VendorProfile>) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('vendorToken') : null;
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/vendors/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update profile');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Update vendor profile error:', error);
      throw error;
    }
  }

  // Admin: Get all vendors with filters
  static async getAllVendors(filters: VendorFilters = {}): Promise<VendorsListResponse> {
    const token = this.getAdminToken();
    console.log('Admin token check:', token ? 'Token found' : 'No token found');
    
    if (!token) {
      throw new Error('No admin authentication token found');
    }

    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());

    const url = `${API_BASE_URL}/vendors/all?${queryParams.toString()}`;
    console.log('Making request to:', url);

    try {
      const response = await authenticatedFetch(url, {
        method: 'GET',
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to fetch vendors');
      }
      
      const data = await response.json();
      console.log('Vendors data received:', data);
      return data;
    } catch (error) {
      console.error('Get all vendors error:', error);
      throw error;
    }
  }

  // Admin: Approve vendor
  static async approveVendor(vendorId: string) {
    const token = this.getAdminToken();
    if (!token) {
      throw new Error('No admin authentication token found');
    }

    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/vendors/${vendorId}/approve`, {
        method: 'PUT',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to approve vendor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Approve vendor error:', error);
      throw error;
    }
  }

  // Admin: Reject vendor
  static async rejectVendor(vendorId: string, reason: string) {
    const token = this.getAdminToken();
    if (!token) {
      throw new Error('No admin authentication token found');
    }

    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/vendors/${vendorId}/reject`, {
        method: 'PUT',
        body: JSON.stringify({ reason }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to reject vendor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Reject vendor error:', error);
      throw error;
    }
  }

  // Admin: Suspend vendor
  static async suspendVendor(vendorId: string, reason: string) {
    const token = this.getAdminToken();
    if (!token) {
      throw new Error('No admin authentication token found');
    }

    try {
      const response = await authenticatedFetch(`${API_BASE_URL}/vendors/${vendorId}/suspend`, {
        method: 'PUT',
        body: JSON.stringify({ reason }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to suspend vendor');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Suspend vendor error:', error);
      throw error;
    }
  }
  
  // Logout vendor
  static logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vendorToken');
      localStorage.removeItem('vendorData');
    }
  }
  
  // Check if vendor is logged in
  static isLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('vendorToken');
  }
  
  // Get stored vendor data
  static getStoredVendorData(): VendorProfile | null {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem('vendorData');
    return data ? JSON.parse(data) : null;
  }
}

export default VendorService;