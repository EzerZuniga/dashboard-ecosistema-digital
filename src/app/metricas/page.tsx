'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp, TrendingDown, Users, Target, Award, Brain, Clock, Heart, Zap, Activity, AlertCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import KpiCard from '@/components/KpiCard';
import ModalityDonut from '@/components/ModalityDonut';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface Student {
  id: number;
  modalidad: string;
  horasDigitales: number;
  gpa: number;
  estres: number;
  usoIA: number;
  satisfaccion: number;
}

export default function MetricasPage() {
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
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando métricas...</p>
        </div>
      </div>
    );
  }

  // Cálculos de métricas
  const avgGpa = students.reduce((sum, s) => sum + s.gpa, 0) / students.length;
  const avgEstres = students.reduce((sum, s) => sum + s.estres, 0) / students.length;
  const avgHoras = students.reduce((sum, s) => sum + s.horasDigitales, 0) / students.length;
  const avgIA = students.reduce((sum, s) => sum + s.usoIA, 0) / students.length;
  const avgSatisfaccion = students.reduce((sum, s) => sum + s.satisfaccion, 0) / students.length;
  
  const highPerformers = students.filter(s => s.gpa >= 17).length;
  const lowStress = students.filter(s => s.estres <= 2).length;
  const highIAUsers = students.filter(s => s.usoIA >= 7).length;

  // Datos para gráfico de tendencia temporal (simulado)
  const trendData = [
    { mes: 'Ene', gpa: 16.2, estres: 3.1, satisfaccion: 7.5 },
    { mes: 'Feb', gpa: 16.4, estres: 3.0, satisfaccion: 7.8 },
    { mes: 'Mar', gpa: 16.5, estres: 2.9, satisfaccion: 8.0 },
    { mes: 'Abr', gpa: 16.6, estres: 3.2, satisfaccion: 7.9 },
    { mes: 'May', gpa: 16.7, estres: 3.0, satisfaccion: 8.1 },
    { mes: 'Jun', gpa: 16.7, estres: 2.8, satisfaccion: 8.3 }
  ];

  // Datos de distribución por horas
  const hoursDistribution = [
    { rango: '10-15h', cantidad: students.filter(s => s.horasDigitales >= 10 && s.horasDigitales < 15).length },
    { rango: '15-20h', cantidad: students.filter(s => s.horasDigitales >= 15 && s.horasDigitales < 20).length },
    { rango: '20-25h', cantidad: students.filter(s => s.horasDigitales >= 20 && s.horasDigitales < 25).length },
    { rango: '25-30h', cantidad: students.filter(s => s.horasDigitales >= 25 && s.horasDigitales < 30).length },
    { rango: '30+h', cantidad: students.filter(s => s.horasDigitales >= 30).length }
  ];

  // Datos de rendimiento por nivel de uso de IA
  const iaPerformance = [
    { nivel: 'Bajo (0-3)', gpa: students.filter(s => s.usoIA <= 3).reduce((sum, s) => sum + s.gpa, 0) / students.filter(s => s.usoIA <= 3).length || 0 },
    { nivel: 'Medio (4-6)', gpa: students.filter(s => s.usoIA > 3 && s.usoIA <= 6).reduce((sum, s) => sum + s.gpa, 0) / students.filter(s => s.usoIA > 3 && s.usoIA <= 6).length || 0 },
    { nivel: 'Alto (7-10)', gpa: students.filter(s => s.usoIA > 6).reduce((sum, s) => sum + s.gpa, 0) / students.filter(s => s.usoIA > 6).length || 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar currentPath="/metricas" />
      
      <main className={`pt-16 ${isOpen ? 'lg:ml-64' : 'ml-0'} min-h-screen`}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Métricas Detalladas</h1>
            <p className="text-gray-600">Indicadores clave de rendimiento del ecosistema digital</p>
          </div>

          {/* KPIs Principales */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <KpiCard
              title="Total Estudiantes"
              value={students.length}
              icon={<Users size={36} className="text-blue-600" />}
            />
            <KpiCard
              title="GPA Promedio"
              value={avgGpa.toFixed(2)}
              icon={<Award size={36} className="text-green-600" />}
            />
            <KpiCard
              title="Nivel de Estrés"
              value={avgEstres.toFixed(2)}
              icon={<AlertCircle size={36} className="text-orange-600" />}
            />
            <KpiCard
              title="Horas Digitales/Sem"
              value={avgHoras.toFixed(1)}
              icon={<Clock size={36} className="text-purple-600" />}
            />
          </div>

          {/* Métricas Secundarias */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <h3 className="text-sm font-medium text-blue-700 mb-2">Alto Rendimiento</h3>
              <p className="text-3xl font-bold text-blue-900 mb-1">{highPerformers}</p>
              <p className="text-xs text-blue-700">GPA ≥ 17 ({((highPerformers / students.length) * 100).toFixed(0)}%)</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                  <Heart className="text-white" size={24} />
                </div>
                <TrendingDown className="text-green-600" size={24} />
              </div>
              <h3 className="text-sm font-medium text-green-700 mb-2">Bajo Estrés</h3>
              <p className="text-3xl font-bold text-green-900 mb-1">{lowStress}</p>
              <p className="text-xs text-green-700">Nivel ≤ 2 ({((lowStress / students.length) * 100).toFixed(0)}%)</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <Zap className="text-purple-600" size={24} />
              </div>
              <h3 className="text-sm font-medium text-purple-700 mb-2">Adopción IA Alta</h3>
              <p className="text-3xl font-bold text-purple-900 mb-1">{highIAUsers}</p>
              <p className="text-xs text-purple-700">Uso ≥ 7 ({((highIAUsers / students.length) * 100).toFixed(0)}%)</p>
            </div>
          </div>

          {/* Gráficos de tendencias */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Tendencia temporal */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="text-blue-600" size={20} />
                Evolución Temporal
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="gpa" stroke="#3b82f6" strokeWidth={2} name="GPA" />
                  <Line type="monotone" dataKey="satisfaccion" stroke="#10b981" strokeWidth={2} name="Satisfacción" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Distribución por modalidad */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <ModalityDonut students={students} />
            </div>
          </div>

          {/* Más gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Distribución de horas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="text-purple-600" size={20} />
                Distribución de Horas Digitales
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hoursDistribution}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="rango" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="cantidad" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rendimiento por uso de IA */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Brain className="text-blue-600" size={20} />
                Rendimiento por Nivel de Uso de IA
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={iaPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="nivel" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" domain={[14, 18]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="gpa" stroke="#3b82f6" fill="#93c5fd" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Métricas adicionales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Uso Promedio IA</p>
              <p className="text-2xl font-bold text-gray-900">{avgIA.toFixed(1)}/10</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${(avgIA / 10) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Satisfacción Promedio</p>
              <p className="text-2xl font-bold text-gray-900">{avgSatisfaccion.toFixed(1)}/10</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: `${(avgSatisfaccion / 10) * 100}%` }}></div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Modalidad Dominante</p>
              <p className="text-2xl font-bold text-gray-900">
                {students.filter(s => s.modalidad === 'Presencial').length > students.filter(s => s.modalidad === 'Virtual').length 
                  ? 'Presencial' 
                  : 'Virtual'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.max(
                  students.filter(s => s.modalidad === 'Presencial').length,
                  students.filter(s => s.modalidad === 'Virtual').length
                )} estudiantes
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <p className="text-sm text-gray-600 mb-1">Tasa de Éxito</p>
              <p className="text-2xl font-bold text-gray-900">
                {((students.filter(s => s.gpa >= 14).length / students.length) * 100).toFixed(0)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">GPA ≥ 14 (Aprobado)</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
