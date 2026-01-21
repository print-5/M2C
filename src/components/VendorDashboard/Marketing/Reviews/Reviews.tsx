'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { Star, Search, Filter, MessageSquare, ThumbsUp, ThumbsDown, Reply } from 'lucide-react';

interface Review {
  id: string;
  customer: string;
  product: string;
  rating: number;
  comment: string;
  date: string;
  status: 'Published' | 'Pending' | 'Replied';
  helpful: number;
}

const mockReviews: Review[] = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    product: 'Cotton Kitchen Towel',
    rating: 5,
    comment: 'Excellent quality! Very absorbent and well-made. Highly recommend.',
    date: '2024-01-15',
    status: 'Published',
    helpful: 12
  },
  {
    id: '2',
    customer: 'Mike Wilson',
    product: 'Handwoven Bath Towel',
    rating: 4,
    comment: 'Good quality towel, but took longer to dry than expected.',
    date: '2024-01-14',
    status: 'Pending',
    helpful: 5
  },
  {
    id: '3',
    customer: 'Emily Davis',
    product: 'Artisan Apron',
    rating: 5,
    comment: 'Beautiful design and perfect fit. Love the pockets!',
    date: '2024-01-13',
    status: 'Replied',
    helpful: 8
  }
];

export default function Reviews() {
  const [reviews] = useState<Review[]>(mockReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'text-green-600 bg-green-100';
      case 'Pending': return 'text-yellow-600 bg-yellow-100';
      case 'Replied': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || review.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-red-800">Reviews & Ratings</h1>
        <p className="text-slate-600">Manage customer feedback and reviews</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Average Rating</p>
                <div className="flex items-center">
                  <p className="text-2xl font-bold text-red-800">{averageRating.toFixed(1)}</p>
                  <div className="flex ml-2">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Total Reviews</p>
                <p className="text-2xl font-bold text-red-800">{reviews.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <ThumbsUp className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Positive Reviews</p>
                <p className="text-2xl font-bold text-red-800">
                  {reviews.filter(r => r.rating >= 4).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-red-200 hover:border-red-300">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Reply className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Pending Response</p>
                <p className="text-2xl font-bold text-red-800">
                  {reviews.filter(r => r.status === 'Pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border border-red-200">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                className="w-full pl-10 pr-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-red-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Published">Published</option>
              <option value="Pending">Pending</option>
              <option value="Replied">Replied</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <Card key={review.id} className="border border-red-200 hover:border-red-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-red-800">{review.customer}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                      {review.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">{review.product}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-sm text-slate-600">{review.date}</p>
                </div>
              </div>
              
              <p className="text-slate-700 mb-4">{review.comment}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{review.helpful} helpful</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {review.status === 'Pending' && (
                    <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                      <Reply className="w-4 h-4 mr-1" />
                      Reply
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="hover:bg-red-50 hover:border-red-300">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
