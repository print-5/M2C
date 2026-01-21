'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  DollarSign,
  Megaphone,
  Settings,
  User,
  ChevronDown,
  ChevronRight,
} from 'lucide-react'

interface SubMenuItem {
  title: string;
  href: string;
}

interface NavigationItem {
  title: string;
  icon: any;
  href?: string; // For single links
  subItems?: SubMenuItem[]; // For expandable sections
}

const navigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/vendor/dashboard'
  },
  {
    title: 'Catalog',
    icon: Package,
    subItems: [
      { title: 'Products', href: '/vendor/dashboard/products' },
      { title: 'Stock', href: '/vendor/dashboard/inventory' },
    ]
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    subItems: [
      { title: 'Orders', href: '/vendor/dashboard/orders' },
      { title: 'Shipping', href: '/vendor/dashboard/shipping' },
      { title: 'Returns', href: '/vendor/dashboard/returns' },
    ]
  },
  {
    title: 'Finance',
    icon: DollarSign,
    subItems: [
      { title: 'Transactions', href: '/vendor/dashboard/transactions' },
      { title: 'Payouts', href: '/vendor/dashboard/billing' },
    ]
  },
  {
    title: 'Marketing',
    icon: Megaphone,
    subItems: [
      { title: 'Coupons', href: '/vendor/dashboard/coupons' },
      { title: 'Reviews', href: '/vendor/dashboard/reviews' },
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    subItems: [
      { title: 'Profile', href: '/vendor/dashboard/settings' },
      { title: 'Shipping Policy', href: '/vendor/dashboard/store' },
    ]
  },
]

export default function VendorSidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([]) // No default expanded items

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href: string) => {
    if (href === '/vendor/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-full w-64 flex-col font-sans bg-white border-r border-red-200 shadow-sm">
      {/* Logo */}
      <div className="flex h-18 items-center justify-center border-b border-red-200 px-4 bg-red-50">
        <Link href="/vendor/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 rounded-lg bg-red-800 flex items-center justify-center shadow-md">
            <span className="text-white text-base font-bold">V</span>
          </div>
          <div>
            <span className="text-lg font-bold text-red-800 block">Vendor Store</span>
            <span className="text-xs text-slate-500">Dashboard</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isExpanded = expandedItems.includes(item.title)
          const Icon = item.icon
          
          // If item has href, render as single link
          if (item.href) {
            return (
              <Link
                key={item.title}
                href={item.href}
                className={cn(
                  'w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive(item.href)
                    ? 'bg-red-800 text-white shadow-md'
                    : 'text-slate-700 hover:bg-red-50 hover:text-red-800'
                )}
              >
                <Icon className={cn(
                  "mr-3 h-5 w-5",
                  isActive(item.href) ? "text-white" : "text-slate-600"
                )} />
                <div className="font-semibold">{item.title}</div>
              </Link>
            )
          }
          
          // If item has subItems, render as expandable section
          return (
            <div key={item.title} className="space-y-1">
              {/* Main Menu Item */}
              <button
                onClick={() => toggleExpanded(item.title)}
                className={cn(
                  'w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  'text-slate-700 hover:bg-red-50 hover:text-red-800',
                  'focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2'
                )}
              >
                <div className="flex items-center">
                  <Icon className="mr-3 h-5 w-5 text-slate-600" />
                  <div className="font-semibold">{item.title}</div>
                </div>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-slate-400 transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-slate-400 transition-transform" />
                )}
              </button>

              {/* Sub Menu Items */}
              {isExpanded && item.subItems && (
                <div className="ml-4 space-y-1 border-l-2 border-red-200 pl-3">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        'flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200',
                        isActive(subItem.href)
                          ? 'bg-red-800 text-white shadow-md font-semibold'
                          : 'text-slate-600 hover:bg-red-50 hover:text-red-800 font-medium'
                      )}
                    >
                      <div>{subItem.title}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-red-200 p-4 bg-red-50">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-red-800 flex items-center justify-center shadow-md">
            <User className="h-5 w-5 text-white" />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-red-800">Vendor Store</p>
            <p className="text-xs text-slate-500">Premium Plan</p>
          </div>
        </div>
      </div>
    </div>
  )
}