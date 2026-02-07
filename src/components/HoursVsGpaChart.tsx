'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Student {
  horasDigitales: number;
  gpa: number;
}

interface HoursVsGpaChartProps {
  students: Student[];
}

export default function HoursVsGpaChart({ students }: HoursVsGpaChartProps) {
  if (!students || students.length === 0) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-white">Cargando datos...</div>;
  }

  const chartData = students
    .map((student) => ({
      horas: student.horasDigitales,
      gpa: student.gpa,
    }))
    .sort((a, b) => a.horas - b.horas);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
        Relación entre Horas de Estudio Digital y GPA
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="horas" 
            label={{ value: 'Horas Digitales/Semana', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'GPA (0-20)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="gpa" 
            stroke="#3b82f6" 
            strokeWidth={2}
            dot={{ fill: '#3b82f6', r: 4 }}
            name="GPA"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
