'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Student {
  horasDigitales: number;
  gpa: number;
}

interface HoursVsGpaChartProps {
  data: Student[];
}

export default function HoursVsGpaChart({ data }: HoursVsGpaChartProps) {
  const chartData = data
    .map((student) => ({
      horas: student.horasDigitales,
      gpa: student.gpa,
    }))
    .sort((a, b) => a.horas - b.horas);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
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
