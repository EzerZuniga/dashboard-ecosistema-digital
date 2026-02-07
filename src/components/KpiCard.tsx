import { ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function KpiCard({ title, value, icon, color }: KpiCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-2">{title}</p>
          <p className={`text-3xl font-bold ${color || 'text-gray-900'}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gray-50 ${color || 'text-gray-700'}`}>{icon}</div>
      </div>
    </div>
  );
}
