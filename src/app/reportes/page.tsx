'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, Download, Calendar, Filter, FileBarChart, FilePieChart, FileLineChart, CheckCircle } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';

export default function ReportesPage() {
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { isOpen } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  const reportTypes = [
    {
      id: 1,
      icon: FileBarChart,
      title: 'Reporte de Rendimiento Académico',
      description: 'Análisis completo de GPA, tendencias y distribución por modalidad',
      color: 'blue',
      fields: ['Modalidad', 'Rango de fechas', 'Nivel de GPA']
    },
    {
      id: 2,
      icon: FilePieChart,
      title: 'Reporte de Uso de Plataformas Digitales',
      description: 'Horas de uso, herramientas más utilizadas y patrones de acceso',
      color: 'green',
      fields: ['Plataforma', 'Período', 'Frecuencia']
    },
    {
      id: 3,
      icon: FileLineChart,
      title: 'Reporte de Uso de Inteligencia Artificial',
      description: 'Adopción de IA, impacto en satisfacción y herramientas preferidas',
      color: 'purple',
      fields: ['Tipo de IA', 'Rango temporal', 'Nivel de uso']
    },
    {
      id: 4,
      icon: FileText,
      title: 'Reporte de Bienestar Estudiantil',
      description: 'Niveles de estrés, satisfacción y correlación con horas digitales',
      color: 'orange',
      fields: ['Indicador', 'Modalidad', 'Semestre']
    }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Rendimiento_Q4_2025.pdf',
      type: 'Académico',
      date: '2025-12-15',
      size: '2.4 MB',
      status: 'Completado'
    },
    {
      id: 2,
      name: 'Uso_Plataformas_Nov.pdf',
      type: 'Digital',
      date: '2025-11-28',
      size: '1.8 MB',
      status: 'Completado'
    },
    {
      id: 3,
      name: 'Analisis_IA_Semestre.pdf',
      type: 'IA',
      date: '2025-11-15',
      size: '3.1 MB',
      status: 'Completado'
    }
  ];

  const handleGenerateReport = (reportId: number) => {
    setLoading(true);
    // Simulación de generación de reporte
    setTimeout(() => {
      setLoading(false);
      alert(`Reporte ${reportId} generado exitosamente. Se descargará automáticamente.`);
    }, 2000);
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 dark:bg-blue-900 border-blue-200 text-blue-700',
      green: 'bg-green-50 dark:bg-green-900 border-green-200 text-green-700',
      purple: 'bg-purple-50 dark:bg-purple-900 border-purple-200 text-purple-700',
      orange: 'bg-orange-50 dark:bg-orange-900 border-orange-200 text-orange-700'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconBg = (color: string) => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      purple: 'bg-purple-100',
      orange: 'bg-orange-100'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600 dark:text-blue-400',
      green: 'text-green-600 dark:text-green-400',
      purple: 'text-purple-600 dark:text-purple-400',
      orange: 'text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar currentPath="/reportes" />
      
      <main className={`pt-16 ${isOpen ? 'lg:ml-64' : 'ml-0'} min-h-screen`}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Generación de Reportes</h1>
            <p className="text-gray-600 dark:text-gray-400">Crea reportes personalizados del ecosistema digital académico</p>
          </div>

          {/* Tipos de reportes */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tipos de Reportes Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTypes.map((report) => {
                const Icon = report.icon;
                return (
                  <div 
                    key={report.id}
                    className={`border-2 rounded-xl p-6 ${getColorClasses(report.color)}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 ${getIconBg(report.color)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={getIconColor(report.color)} size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                        
                        {/* Campos de filtro */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {report.fields.map((field, idx) => (
                            <span 
                              key={idx}
                              className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200 dark:border-gray-700"
                            >
                              {field}
                            </span>
                          ))}
                        </div>

                        <button 
                          onClick={() => handleGenerateReport(report.id)}
                          disabled={loading}
                          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-900 hover:text-white font-medium disabled:opacity-50"
                        >
                          <Download size={18} />
                          <span>Generar Reporte</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reportes recientes */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Reportes Recientes</h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                <Filter size={18} />
                Filtrar
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Tamaño</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentReports.map((report) => (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <FileText className="text-gray-400" size={20} />
                          <span className="text-sm font-medium text-gray-900">{report.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{report.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={16} />
                          {new Date(report.date).toLocaleDateString('es-ES')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{report.size}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="text-green-600 dark:text-green-400" size={16} />
                          <span className="text-sm font-medium text-green-600 dark:text-green-400">{report.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium">
                          <Download size={16} />
                          Descargar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Info adicional */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900 border border-blue-200 rounded-xl p-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Sobre los Reportes</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Los reportes se generan en formato PDF con visualizaciones interactivas y datos actualizados.
                  Puedes personalizar filtros y rangos de fechas para cada tipo de reporte.
                </p>
                <p className="text-sm text-gray-700">
                  Los reportes generados están disponibles para descarga durante 30 días.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

