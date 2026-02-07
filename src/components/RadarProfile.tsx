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
  students: Student[];
}

export default function RadarProfile({ students }: RadarProfileProps) {
  if (!students || students.length === 0) {
    return <div className="bg-white rounded-lg border border-gray-200 p-6">Cargando datos...</div>;
  }

  const presencialStudents = students.filter((s) => s.modalidad === 'Presencial');
  const virtualStudents = students.filter((s) => s.modalidad === 'Virtual');

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
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
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
