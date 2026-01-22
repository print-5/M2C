'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/UI/Card';
import { Button } from '@/components/UI/Button';
import { MessageSquare, Search, Filter, Send, Reply, Archive, Star, Clock } from 'lucide-react';

interface Message {
  id: string;
  customer: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Read' | 'Replied' | 'Archived';
  priority: 'Low' | 'Medium' | 'High';
  type: 'Question' | 'Complaint' | 'Compliment' | 'Order Issue';
}

const mockMessages: Message[] = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    subject: 'Question about product care',
    message: 'Hi, I recently purchased your cotton kitchen towels and wanted to know the best way to care for them to maintain their quality.',
    date: '2024-01-15 10:30 AM',
    status: 'Unread',
    priority: 'Medium',
    type: 'Question'
  },
  {
    id: '2',
    customer: 'Mike Wilson',
    subject: 'Order delivery issue',
    message: 'My order #ORD-002 was supposed to arrive yesterday but I haven\'t received it yet. Can you please check the status?',
    date: '2024-01-14 2:15 PM',
    status: 'Read',
    priority: 'High',
    type: 'Order Issue'
  },
  {
    id: '3',
    customer: 'Emily Davis',
    subject: 'Love the artisan apron!',
    message: 'Just wanted to say thank you for the beautiful apron. The quality is amazing and it fits perfectly!',
    date: '2024-01-13 9:45 AM',
    status: 'Replied',
    priority: 'Low',
    type: 'Compliment'
  }
];

export default function Messages() {
  const [messages] = useState<Message[]>(mockMessages);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unread': return 'text-gray-700 bg-gray-50';
      case 'Read': return 'text-blue-600 bg-blue-100';
      case 'Replied': return 'text-green-600 bg-green-100';
      case 'Archived': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-gray-700';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600">Manage customer inquiries and communications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Messages</p>
                <p className="text-2xl font-bold text-gray-900">{messages.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-gray-700" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unread</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'Unread').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Reply className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Replied</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.status === 'Replied').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900">
                  {messages.filter(m => m.priority === 'High').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Messages List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search and Filter */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Status</option>
                  <option value="Unread">Unread</option>
                  <option value="Read">Read</option>
                  <option value="Replied">Replied</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Messages */}
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <Card 
                key={message.id} 
                className={`cursor-pointer transition-colors ${
                  selectedMessage?.id === message.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{message.customer}</h3>
                    <span className={`text-xs font-medium ${getPriorityColor(message.priority)}`}>
                      {message.priority}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1 truncate">{message.subject}</p>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{message.message}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                      {message.status}
                    </span>
                    <span className="text-xs text-gray-500">{message.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedMessage.subject}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      From: {selectedMessage.customer} • {selectedMessage.date}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                      {selectedMessage.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedMessage.priority)} bg-gray-100`}>
                      {selectedMessage.priority} Priority
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{selectedMessage.message}</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex gap-2 mb-4">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Reply
                    </Button>
                    <Button variant="outline">
                      <Archive className="w-4 h-4 mr-2" />
                      Archive
                    </Button>
                  </div>
                  
                  <textarea
                    placeholder="Type your reply..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Select a message to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}