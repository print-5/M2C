'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/UI/Button'
import { Badge } from '@/components/UI/Badge'
import { QuickStats } from '../QuickStats/QuickStats'
import {
  Bell,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  MessageSquare,
  Shield,
  HelpCircle,
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Store,
  Tags,
  FileText,
  Warehouse,
  Receipt,
  Edit3
} from 'lucide-react'

interface HeaderProps {
  onMenuToggle?: () => void
  isSidebarOpen?: boolean
}

export default function Header({ onMenuToggle, isSidebarOpen = true }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const pathname = usePathname()

  // Map pathnames to titles and icons
  const getPageInfo = () => {
    const pageMap: Record<string, { title: string; icon: React.ComponentType<any> }> = {
      '/dashboard': { title: 'Dashboard', icon: LayoutDashboard },
      '/dashboard/vendors': { title: 'Vendors Management', icon: Store },
      '/dashboard/products': { title: 'Products Management', icon: Package },
      '/dashboard/inventory': { title: 'Inventory Management', icon: Warehouse },
      '/dashboard/orders': { title: 'Orders Management', icon: ShoppingCart },
      '/dashboard/billing': { title: 'Invoice & Billing', icon: Receipt },
      '/dashboard/categories': { title: 'Categories Management', icon: Tags },
      '/dashboard/users': { title: 'Users Management', icon: Users },
      '/dashboard/cms': { title: 'Content Management', icon: Edit3 },
      '/dashboard/reviews': { title: 'Reviews Management', icon: MessageSquare },
      '/dashboard/reports': { title: 'Reports', icon: FileText },
      '/dashboard/admins': { title: 'Admin Management', icon: Shield },
      '/dashboard/settings': { title: 'Settings', icon: Settings },
    }

    return pageMap[pathname] || { title: 'Dashboard', icon: LayoutDashboard }
  }

  const { title, icon: PageIcon } = getPageInfo()

  const notifications = [
    {
      id: 1,
      title: 'New vendor registration',
      message: 'TechStore Pro has submitted registration',
      time: '2 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Product approval needed',
      message: 'iPhone 15 Pro requires approval',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Order dispute',
      message: 'Customer dispute for order #12345',
      time: '10 min ago',
      unread: false,
    },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white border-b border-red-200 font-sans sticky top-0 z-30">
      <div className="px-4 py-3 m-4 rounded-lg bg-white shadow-sm border border-red-100">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden text-slate-700 hover:bg-red-50 hover:text-red-800"
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Page Title with Icon */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <PageIcon className="h-5 w-5 text-red-700" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-red-800">{title}</h1>
                <p className="text-sm text-slate-600">Manage and monitor your platform</p>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-700 hover:bg-red-50 hover:text-red-800"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-800 text-white text-xs flex items-center justify-center p-0">
                    {unreadCount}
                  </Badge>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-red-200 z-50">
                  <div className="p-4 border-b border-red-200 bg-red-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-red-800">Notifications</h3>
                      <Button variant="ghost" size="sm" className="text-red-700 hover:text-red-800 text-xs">
                        Mark all read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-red-100 hover:bg-red-50 cursor-pointer ${
                          notification.unread ? 'bg-red-50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-800">
                              {notification.title}
                            </p>
                            <p className="text-sm text-slate-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-red-800 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 border-t border-red-200 bg-red-50">
                    <Button variant="ghost" className="w-full text-center text-red-800 hover:text-red-700">
                      View all notifications
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-red-50 hover:text-red-800">
              <MessageSquare className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="sm" className="text-slate-700 hover:bg-red-50 hover:text-red-800">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* User Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 text-slate-700 hover:bg-red-50 hover:text-red-800"
              >
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">SA</span>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-red-800">Super Admin</p>
                  <p className="text-xs text-slate-500">admin@example.com</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </Button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-red-200 z-50">
                  <div className="p-4 border-b border-red-200 bg-red-50">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-800 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">SA</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-red-800">Super Admin</p>
                        <p className="text-xs text-slate-500">admin@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-800">
                      <User className="h-4 w-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-800">
                      <Shield className="h-4 w-4 mr-3" />
                      Admin Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-red-50 hover:text-red-800">
                      <Settings className="h-4 w-4 mr-3" />
                      Preferences
                    </button>
                  </div>
                  <div className="border-t border-red-200 py-2 bg-red-50">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-red-800 hover:bg-red-100">
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="px-4 py-2 bg-white mb-2">
        <QuickStats />
      </div>

      {/* Click outside to close dropdowns */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setShowNotifications(false)
            setShowUserMenu(false)
          }}
        />
      )}
    </header>
  )
}