'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  Store,
  Tags,
  MessageSquare,
  FileText,
  Shield,
  LogOut,
  Warehouse,
  Receipt,
  Edit3,
  ChevronDown
} from 'lucide-react'

interface SidebarItem {
  title: string
  href: string
  icon: React.ComponentType<any>
  submenu?: Array<{
    title: string
    href: string
  }>
}

const sidebarItems: SidebarItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Vendors',
    href: '/admin/dashboard/vendors',
    icon: Store,
  },
    {
    title: 'Categories',
    href: '/admin/dashboard/categories',
    icon: Tags,
  },
  {
    title: 'Products',
    href: '/admin/dashboard/products',
    icon: Package,
    submenu: [
      {
        title: 'All Products',
        href: '/admin/dashboard/products',
      },
      {
        title: 'Vendor Requests',
        href: '/admin/dashboard/products/vendor-requests',
      }
    ]
  },
  {
    title: 'Inventory',
    href: '/admin/dashboard/inventory',
    icon: Warehouse,
  },
  {
    title: 'Orders',
    href: '/admin/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Invoice & Billing',
    href: '/admin/dashboard/billing',
    icon: Receipt,
  },

  {
    title: 'Users',
    href: '/admin/dashboard/users',
    icon: Users,
  },
  // {
  //   title: 'Content Management',
  //   href: '/admin/dashboard/cms',
  //   icon: Edit3,
  // },
  {
    title: 'Reviews',
    href: '/admin/dashboard/reviews',
    icon: MessageSquare,
  },
  {
    title: 'Reports',
    href: '/admin/dashboard/reports',
    icon: FileText,
  },
  {
    title: 'Settings',
    href: '/admin/dashboard/settings',
    icon: Settings,
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const toggleSubmenu = (href: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(href)) {
      newExpanded.delete(href)
    } else {
      newExpanded.add(href)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="flex h-full w-64 flex-col font-sans bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex h-18 items-center justify-center border-b border-gray-200 px-4 bg-gray-50">
        <Link href="/admin/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 rounded-lg bg-[#222222] flex items-center justify-center shadow-md">
            <span className="text-white text-base font-bold">A</span>
          </div>
          <div>
            <span className="text-lg font-bold text-[#222222] block">Admin Panel</span>
            <span className="text-xs text-slate-500">Control Center</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href))
          const isExpanded = expandedItems.has(item.href)
          const hasSubmenu = item.submenu && item.submenu.length > 0

          return (
            <div key={item.href}>
              <button
                onClick={() => hasSubmenu && toggleSubmenu(item.href)}
                className={cn(
                  'w-full group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                  isActive
                    ? 'bg-[#222222] text-white shadow-md'
                    : 'text-slate-700 hover:bg-gray-50 hover:text-[#222222]'
                )}
              >
                <Link href={item.href} className="flex items-center flex-1">
                  <Icon
                    className={cn(
                      'mr-3 h-5 w-5 shrink-0',
                      isActive ? 'text-white' : 'text-slate-600'
                    )}
                  />
                  <span className="font-semibold">{item.title}</span>
                </Link>
                {hasSubmenu && (
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isExpanded ? 'rotate-180' : ''
                    )}
                  />
                )}
              </button>

              {/* Submenu */}
              {hasSubmenu && isExpanded && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.submenu?.map((subitem) => {
                    const isSubActive = pathname === subitem.href
                    return (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className={cn(
                          'flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200',
                          isSubActive
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-slate-600 hover:bg-gray-50 hover:text-slate-900'
                        )}
                      >
                        <span className="w-1 h-1 rounded-full mr-2 bg-current"></span>
                        {subitem.title}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-[#222222] flex items-center justify-center shadow-md">
            <span className="text-sm font-semibold text-white">SA</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-semibold text-[#222222]">Super Admin</p>
            <p className="text-xs text-slate-500">admin@example.com</p>
          </div>
        </div>
        <button className="mt-3 flex w-full items-center px-3 py-2 text-sm font-medium text-[#222222] rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <LogOut className="mr-3 h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}