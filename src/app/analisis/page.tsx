'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, BarChart3, PieChart } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import HoursVsGpaChart from '@/components/HoursVsGpaChart';
import RadarProfile from '@/components/RadarProfile';
import IAVsSatisfaction from '@/components/IAVsSatisfaction';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';

interface Student {
  id: number;
  modalidad: string;
  horasDigitales: number;
  gpa: number;
  estres: number;
  usoIA: number;
  satisfaccion: number;
}

export default function AnalisisPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const { isOpen } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    fetch('/data/estudiantes.json')
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
        setLoading(false);
      });
  }, [isAuthenticated, router]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando análisis...</p>
        </div>
      </div>
    );
  }

  // Cálculos de correlación
  const correlacionHorasGPA = students.reduce((acc, s) => acc + s.horasDigitales * s.gpa, 0) / students.length;
  const correlacionIASatisfaccion = students.reduce((acc, s) => acc + s.usoIA * s.satisfaccion, 0) / students.length;
  const tendenciaEstres = students.reduce((acc, s) => acc + s.estres * s.horasDigitales, 0) / students.length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar currentPath="/analisis" />
      
      <main className={`pt-16 ${isOpen ? 'lg:ml-64' : 'ml-0'} min-h-screen`}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Análisis Avanzado</h1>
            <p className="text-gray-600 dark:text-gray-400">Correlaciones y tendencias del ecosistema digital académico</p>
          </div>

          {/* Indicadores de Correlación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
                </div>
                <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  correlacionHorasGPA > 300 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {correlacionHorasGPA > 300 ? 'Positiva' : 'Moderada'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Horas Digitales vs GPA</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{correlacionHorasGPA.toFixed(0)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Índice de correlación</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <BarChart3 className="text-purple-600 dark:text-purple-400" size={24} />
                </div>
                <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                  correlacionIASatisfaccion > 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {correlacionIASatisfaccion > 50 ? 'Positiva' : 'Negativa'}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">IA vs Satisfacción</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{correlacionIASatisfaccion.toFixed(0)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Índice de impacto</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                  <TrendingDown className="text-orange-600 dark:text-orange-400" size={24} />
                </div>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-orange-100 text-orange-700">
                  Crítico
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Estrés Digital</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{tendenciaEstres.toFixed(0)}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Índice de tendencia</p>
            </div>
          </div>

          {/* Gráficos de análisis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <HoursVsGpaChart students={students} />
            <IAVsSatisfaction students={students} />
          </div>

          {/* Análisis comparativo */}
          <RadarProfile students={students} />

          {/* Insights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 dark:bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PieChart className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Insight Principal</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Los estudiantes con 20-25 horas digitales semanales muestran el mejor equilibrio entre 
                    rendimiento académico (GPA 16+) y niveles de estrés manejables (≤3).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-600 dark:bg-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">Recomendación</h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    El uso de IA muestra correlación positiva con la satisfacción académica. 
                    Considerar incrementar la capacitación en herramientas de IA para estudiantes.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
