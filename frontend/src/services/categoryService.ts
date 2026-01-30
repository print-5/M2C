// Category Service for Admin Dashboard
// Handles all API calls related to category management

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export interface Category {
  id: string;
  name: string;
  description: string;
  slug: string;
  parentId?: string;
  parent?: {
    id: string;
    name: string;
    slug: string;
  };
  status: 'ACTIVE' | 'INACTIVE';
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  sortOrder: number;
  productCount: number;
  subcategoryCount: number;
  subcategories: Category[];
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface CategoryFormData {
  name: string;
  description: string;
  slug?: string;
  parentId?: string;
  status: 'ACTIVE' | 'INACTIVE';
  image?: string;
  metaTitle?: string;
  metaDescription?: string;
  sortOrder: number;
  subcategories?: SubcategoryFormData[];
}

export interface SubcategoryFormData {
  id?: string;
  name: string;
  description: string;
  slug?: string;
  status: 'ACTIVE' | 'INACTIVE';
  image?: string;
  sortOrder: number;
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  rootCategories: number;
  subcategories: number;
}

export interface CategoryFilters {
  search?: string;
  status?: 'all' | 'ACTIVE' | 'INACTIVE';
  parentId?: string;
  includeSubcategories?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class CategoryService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('adminToken') || sessionStorage.getItem('adminToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
    return response.json();
  }

  // Get all categories with optional filtering
  async getCategories(filters: CategoryFilters = {}): Promise<{ data: Category[]; total: number }> {
    const params = new URLSearchParams();
    
    if (filters.search) params.append('search', filters.search);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.parentId) params.append('parentId', filters.parentId);
    if (filters.includeSubcategories !== undefined) {
      params.append('includeSubcategories', filters.includeSubcategories.toString());
    }
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

    const url = `${API_BASE_URL}/categories${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Get single category by ID
  async getCategoryById(id: string): Promise<{ data: Category }> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Get category statistics
  async getCategoryStats(): Promise<{ data: CategoryStats }> {
    const response = await fetch(`${API_BASE_URL}/categories/stats`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Create new category (admin only)
  async createCategory(categoryData: CategoryFormData): Promise<{ data: Category; message: string }> {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(categoryData)
    });

    return this.handleResponse(response);
  }

  // Update existing category (admin only)
  async updateCategory(id: string, categoryData: Partial<CategoryFormData>): Promise<{ data: Category; message: string }> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(categoryData)
    });

    return this.handleResponse(response);
  }

  // Delete category (admin only)
  async deleteCategory(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Bulk update category status (admin only)
  async bulkUpdateStatus(categoryIds: string[], status: 'ACTIVE' | 'INACTIVE'): Promise<{ message: string; data: { updatedCount: number } }> {
    const response = await fetch(`${API_BASE_URL}/categories/bulk-status`, {
      method: 'PATCH',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ categoryIds, status })
    });

    return this.handleResponse(response);
  }

  // Helper method to generate slug from name
  generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Helper method to build category tree from flat array
  buildCategoryTree(categories: Category[]): Category[] {
    const categoryMap = new Map<string, Category>();
    const rootCategories: Category[] = [];

    // First pass: create map of all categories
    categories.forEach(category => {
      categoryMap.set(category.id, {
        ...category,
        subcategories: []
      });
    });

    // Second pass: build hierarchy
    categories.forEach(category => {
      if (category.parentId) {
        const parent = categoryMap.get(category.parentId);
        if (parent) {
          parent.subcategories.push(categoryMap.get(category.id)!);
        }
      } else {
        rootCategories.push(categoryMap.get(category.id)!);
      }
    });

    return rootCategories;
  }

  // Helper method to flatten category tree
  flattenCategoryTree(categories: Category[]): Category[] {
    const flattened: Category[] = [];
    
    const flatten = (cats: Category[]) => {
      cats.forEach(category => {
        flattened.push(category);
        if (category.subcategories && category.subcategories.length > 0) {
          flatten(category.subcategories);
        }
      });
    };
    
    flatten(categories);
    return flattened;
  }

  // Get parent categories (for dropdown selection)
  async getParentCategories(): Promise<Category[]> {
    const response = await this.getCategories({
      includeSubcategories: false,
      status: 'ACTIVE',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    
    return response.data.filter(cat => !cat.parentId);
  }

  // Get subcategories of a specific category
  async getSubcategories(parentId: string): Promise<{ data: Category[]; total: number }> {
    const response = await fetch(`${API_BASE_URL}/categories/${parentId}/subcategories`, {
      method: 'GET',
      headers: this.getAuthHeaders()
    });

    return this.handleResponse(response);
  }

  // Create subcategory
  async createSubcategory(parentId: string, subcategoryData: Omit<SubcategoryFormData, 'id'>): Promise<{ data: Category; message: string }> {
    const response = await fetch(`${API_BASE_URL}/categories/${parentId}/subcategories`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(subcategoryData)
    });

    return this.handleResponse(response);
  }
}

// Export singleton instance
export const categoryService = new CategoryService();

// Export class for testing
export default CategoryService;