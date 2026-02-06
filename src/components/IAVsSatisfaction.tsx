'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Student {
  usoIA: number;
  satisfaccion: number;
}

interface IAVsSatisfactionProps {
  data: Student[];
}

export default function IAVsSatisfaction({ data }: IAVsSatisfactionProps) {
  const grouped = data.reduce((acc, student) => {
    const key = student.usoIA;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(student.satisfaccion);
    return acc;
  }, {} as Record<number, number[]>);

  const chartData = Object.entries(grouped)
    .map(([usoIA, satisfacciones]) => ({
      usoIA: `Nivel ${usoIA}`,
      satisfaccionPromedio: (satisfacciones.reduce((a, b) => a + b, 0) / satisfacciones.length).toFixed(1),
    }))
    .sort((a, b) => parseInt(a.usoIA.split(' ')[1]) - parseInt(b.usoIA.split(' ')[1]));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Impacto del Uso de IA en la Satisfacción Académica
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="usoIA" 
            label={{ value: 'Nivel de Uso de IA', position: 'insideBottom', offset: -5 }}
          />
          <YAxis 
            label={{ value: 'Satisfacción Promedio', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="satisfaccionPromedio" fill="#8b5cf6" name="Satisfacción" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
