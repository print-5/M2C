'use client';

import { Card, CardContent } from '@/components/UI/Card';
import { LucideIcon } from 'lucide-react';

export interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.title}
            className="border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-700 transition-all duration-200"
          >
            <CardContent className="p-5 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#222222] mb-2">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium">{stat.change} from last month</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
