'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { TrendingUp, DollarSign, ShoppingCart, Users, Eye, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface AnalyticsData {
  revenue: { current: number; previous: number; change: number };
  orders: { current: number; previous: number; change: number };
  customers: { current: number; previous: number; change: number };
  views: { current: number; previous: number; change: number };
}

const mockAnalytics: AnalyticsData = {
  revenue: { current: 12450, previous: 10200, change: 22.1 },
  orders: { current: 156, previous: 142, change: 9.9 },
  customers: { current: 89, previous: 76, change: 17.1 },
  views: { current: 2340, previous: 2100, change: 11.4 }
};

export default function Analytics() {
  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;
  
  const getChangeIcon = (change: number) => {
    return change >= 0 ? (
      <ArrowUpRight className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDownRight className="w-4 h-4 text-gray-700" />
    );
  };

  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-gray-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600">Track your store performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(mockAnalytics.revenue.current)}
                </p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(mockAnalytics.revenue.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(mockAnalytics.revenue.change)}`}>
                    {Math.abs(mockAnalytics.revenue.change)}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last month</span>
                </div>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-2xl font-bold text-gray-900">{mockAnalytics.orders.current}</p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(mockAnalytics.orders.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(mockAnalytics.orders.change)}`}>
                    {Math.abs(mockAnalytics.orders.change)}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last month</span>
                </div>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Customers</p>
                <p className="text-2xl font-bold text-gray-900">{mockAnalytics.customers.current}</p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(mockAnalytics.customers.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(mockAnalytics.customers.change)}`}>
                    {Math.abs(mockAnalytics.customers.change)}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Page Views</p>
                <p className="text-2xl font-bold text-gray-900">{mockAnalytics.views.current.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  {getChangeIcon(mockAnalytics.views.change)}
                  <span className={`text-sm font-medium ml-1 ${getChangeColor(mockAnalytics.views.change)}`}>
                    {Math.abs(mockAnalytics.views.change)}%
                  </span>
                  <span className="text-sm text-gray-600 ml-1">vs last month</span>
                </div>
              </div>
              <Eye className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p className="text-gray-500">Chart placeholder - Revenue over time</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Cotton Kitchen Towel', sales: 45, revenue: 584.55 },
                { name: 'Handwoven Bath Towel', sales: 32, revenue: 799.68 },
                { name: 'Artisan Apron', sales: 28, revenue: 531.72 }
              ].map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">92%</p>
              <p className="text-sm text-gray-600">Customer Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">2.3 days</p>
              <p className="text-sm text-gray-600">Avg. Fulfillment Time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}