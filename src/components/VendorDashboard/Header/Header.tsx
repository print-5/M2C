'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Menu, Search, User, ChevronDown, X, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '@/components/UI/Button';

interface VendorHeaderProps {
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
}

export default function VendorHeader({ onMenuToggle, isSidebarOpen }: VendorHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notificationsRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };

    if (showNotifications || showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications, showUserMenu]);

  const notifications = [
    {
      id: 1,
      title: 'New Order Received',
      message: 'Order #1234 has been placed',
      time: '5 min ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Product Review',
      message: 'New 5-star review for Handwoven Cotton Towel',
      time: '1 hour ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Payment Received',
      message: 'Payment of $1,245.00 has been processed',
      time: '2 hours ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="bg-white border-b border-red-200 font-sans sticky top-0 z-30 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden text-slate-700 hover:bg-red-50 hover:text-red-800"
            >
              {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products, orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700 w-64 text-sm transition-all"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search icon for mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-slate-700 hover:bg-red-50 hover:text-red-800"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative text-slate-700 hover:bg-red-50 hover:text-red-800"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-800 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                    {unreadCount}
                  </span>
                )}
              </Button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-red-200 z-50">
                  <div className="p-4 border-b border-red-200 bg-red-50">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-red-800">Notifications</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-700 hover:text-red-800 text-xs"
                        onClick={() => setShowNotifications(false)}
                      >
                        Mark all read
                      </Button>
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`border-b border-red-100 p-4 hover:bg-red-50 cursor-pointer transition-colors ${
                          notification.unread ? 'bg-red-50' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-red-800 text-sm">{notification.title}</h4>
                            <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                            <p className="text-xs text-slate-400 mt-2">{notification.time}</p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-red-800 rounded-full mt-1 ml-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-red-200 p-3 bg-red-50">
                    <button className="text-red-800 text-sm font-medium hover:text-red-700 w-full text-left">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User menu */}
            <div className="relative" ref={userMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 text-slate-700 hover:bg-red-50 hover:text-red-800"
              >
                <div className="w-8 h-8 bg-red-800 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-semibold text-red-800">John Smith</div>
                  <div className="text-xs text-slate-500">Vendor Account</div>
                </div>
                <ChevronDown className="w-4 h-4 hidden md:block" />
              </Button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-red-200 z-50">
                  <div className="p-4 border-b border-red-200 bg-red-50">
                    <p className="font-semibold text-red-800">John Smith</p>
                    <p className="text-sm text-slate-500">Vendor Account</p>
                  </div>
                  <div className="py-2">
                    <button className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-800 transition-colors text-sm">
                      <User className="mr-3 h-4 w-4" />
                      <span>Profile</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-800 transition-colors text-sm">
                      <Settings className="mr-3 h-4 w-4" />
                      <span>Settings</span>
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-slate-700 hover:bg-red-50 hover:text-red-800 transition-colors text-sm">
                      <HelpCircle className="mr-3 h-4 w-4" />
                      <span>Help & Support</span>
                    </button>
                  </div>
                  <div className="border-t border-red-200 p-2 bg-red-50">
                    <button className="flex items-center w-full px-4 py-2 text-red-800 hover:bg-red-100 transition-colors font-medium text-sm">
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}