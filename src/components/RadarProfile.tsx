'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface Student {
  modalidad: string;
  gpa: number;
  horasDigitales: number;
  estres: number;
  usoIA: number;
  satisfaccion: number;
}

interface RadarProfileProps {
  data: Student[];
}

export default function RadarProfile({ data }: RadarProfileProps) {
  const presencialStudents = data.filter((s) => s.modalidad === 'Presencial');
  const virtualStudents = data.filter((s) => s.modalidad === 'Virtual');

  const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

  const chartData = [
    {
      metric: 'GPA',
      Presencial: avg(presencialStudents.map((s) => s.gpa)),
      Virtual: avg(virtualStudents.map((s) => s.gpa)),
    },
    {
      metric: 'Horas Digitales',
      Presencial: avg(presencialStudents.map((s) => s.horasDigitales)),
      Virtual: avg(virtualStudents.map((s) => s.horasDigitales)),
    },
    {
      metric: 'Estrés',
      Presencial: avg(presencialStudents.map((s) => s.estres)),
      Virtual: avg(virtualStudents.map((s) => s.estres)),
    },
    {
      metric: 'Uso IA',
      Presencial: avg(presencialStudents.map((s) => s.usoIA)),
      Virtual: avg(virtualStudents.map((s) => s.usoIA)),
    },
    {
      metric: 'Satisfacción',
      Presencial: avg(presencialStudents.map((s) => s.satisfaccion)),
      Virtual: avg(virtualStudents.map((s) => s.satisfaccion)),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Perfil Estudiantil Comparativo
      </h3>
      <ResponsiveContainer width="100%" height={350}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="metric" />
          <PolarRadiusAxis />
          <Radar name="Presencial" dataKey="Presencial" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
          <Radar name="Virtual" dataKey="Virtual" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
          <Legend />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
