import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color || 'text-gray-900 dark:text-white'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-900 ${color || 'text-gray-700 dark:text-gray-300'}`}>{icon}</div>
      </div>
    </div>
  );
}
