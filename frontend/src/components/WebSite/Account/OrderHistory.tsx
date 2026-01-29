import { Package } from 'lucide-react';

const OrderHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Package className="w-8 h-8 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Order History</h3>
      <p className="text-slate-600">View and track your orders</p>
    </div>
  );
};

export default OrderHistory;
