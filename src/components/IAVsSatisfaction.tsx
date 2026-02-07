'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Student {
  usoIA: number;
  satisfaccion: number;
}

interface IAVsSatisfactionProps {
  students: Student[];
}

export default function IAVsSatisfaction({ students }: IAVsSatisfactionProps) {
  if (!students || students.length === 0) {
    return <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 text-gray-900 dark:text-white">Cargando datos...</div>;
  }

  const grouped = students.reduce((acc, student) => {
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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
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
