'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Download, UserCheck, UserX, TrendingUp, TrendingDown } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
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

export default function EstudiantesPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterModalidad, setFilterModalidad] = useState<string>('all');
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
        setFilteredStudents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
        setLoading(false);
      });
  }, [isAuthenticated, router]);

  useEffect(() => {
    let filtered = students;

    // Filtrar por modalidad
    if (filterModalidad !== 'all') {
      filtered = filtered.filter(s => s.modalidad === filterModalidad);
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter(s => 
        s.id.toString().includes(searchTerm)
      );
    }

    setFilteredStudents(filtered);
  }, [searchTerm, filterModalidad, students]);

  if (!isAuthenticated || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando estudiantes...</p>
        </div>
      </div>
    );
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 17) return 'text-green-600 bg-green-50';
    if (gpa >= 15) return 'text-blue-600 bg-blue-50';
    if (gpa >= 14) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getEstresColor = (estres: number) => {
    if (estres >= 4) return 'text-red-600 bg-red-50';
    if (estres >= 3) return 'text-orange-600 bg-orange-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar currentPath="/estudiantes" />
      
      <main className={`pt-16 ${isOpen ? 'lg:ml-64' : 'ml-0'} min-h-screen`}>
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Estudiantes</h1>
            <p className="text-gray-600">Lista completa de {students.length} estudiantes del ecosistema digital</p>
          </div>

          {/* Estadísticas rápidas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                  <UserCheck className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">{filteredStudents.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                  <TrendingUp className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Alto Rendimiento</p>
                  <p className="text-xl font-bold text-gray-900">
                    {filteredStudents.filter(s => s.gpa >= 17).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                  <TrendingDown className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Estrés Alto</p>
                  <p className="text-xl font-bold text-gray-900">
                    {filteredStudents.filter(s => s.estres >= 4).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                  <UserX className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Presencial</p>
                  <p className="text-xl font-bold text-gray-900">
                    {filteredStudents.filter(s => s.modalidad === 'Presencial').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Barra de búsqueda y filtros */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Búsqueda */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por ID de estudiante..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Filtro por modalidad */}
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400" size={20} />
                <select
                  value={filterModalidad}
                  onChange={(e) => setFilterModalidad(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todas las modalidades</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                </select>
              </div>

              {/* Exportar */}
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download size={20} />
                <span className="hidden sm:inline">Exportar</span>
              </button>
            </div>
          </div>

          {/* Tabla de estudiantes */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Modalidad</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">GPA</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Horas/Sem</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estrés</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Uso IA</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Satisfacción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">EST-{student.id.toString().padStart(3, '0')}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          student.modalidad === 'Presencial' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {student.modalidad}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getGPAColor(student.gpa)}`}>
                          {student.gpa.toFixed(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{student.horasDigitales}h</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${getEstresColor(student.estres)}`}>
                          {student.estres}/5
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(student.usoIA / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{student.usoIA}/10</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2 max-w-[60px]">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(student.satisfaccion / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-600">{student.satisfaccion}/10</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Paginación placeholder */}
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Mostrando <span className="font-semibold">{filteredStudents.length}</span> de <span className="font-semibold">{students.length}</span> estudiantes
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}
