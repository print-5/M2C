'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';

export interface RecentOrder {
  id: string;
  customer: string;
  amount: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

interface RecentOrdersProps {
  orders: RecentOrder[];
}

const statusClasses: Record<RecentOrder['status'], string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-red-100 text-red-700',
};

export default function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <Card className="border border-red-200 shadow-sm hover:border-red-300 transition-all">
      <CardHeader className="bg-red-50 border-b border-red-200">
        <CardTitle className="text-lg font-bold text-red-800">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between py-3 border-b border-red-100 last:border-0 hover:bg-red-50 rounded-lg px-2 transition-colors"
            >
              <div>
                <p className="font-semibold text-red-800 text-sm sm:text-base">{order.id}</p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-red-700 text-sm sm:text-base">{order.amount}</p>
                <span
                  className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${statusClasses[order.status]}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
