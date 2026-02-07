'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Student {
  modalidad: string;
}

interface ModalityDonutProps {
  students: Student[];
}

const COLORS = ['#3b82f6', '#10b981'];

export default function ModalityDonut({ students }: ModalityDonutProps) {
  if (!students || students.length === 0) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-white">Cargando datos...</div>;
  }

  const modalityCount = students.reduce((acc, student) => {
    acc[student.modalidad] = (acc[student.modalidad] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(modalityCount).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Distribución por Modalidad
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
