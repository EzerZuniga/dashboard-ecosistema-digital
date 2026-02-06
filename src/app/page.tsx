'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, TrendingUp, AlertCircle, Laptop } from 'lucide-react';
import KpiCard from '@/components/KpiCard';
import HoursVsGpaChart from '@/components/HoursVsGpaChart';
import ModalityDonut from '@/components/ModalityDonut';
import RadarProfile from '@/components/RadarProfile';
import IAVsSatisfaction from '@/components/IAVsSatisfaction';
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

export default function Home() {
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Cargando datos...</div>
      </div>
    );
  }

  const totalStudents = students.length;
  const avgGpa = (students.reduce((sum, s) => sum + s.gpa, 0) / totalStudents).toFixed(2);
  const avgStress = (students.reduce((sum, s) => sum + s.estres, 0) / totalStudents).toFixed(2);
  const avgHours = (students.reduce((sum, s) => sum + s.horasDigitales, 0) / totalStudents).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPath="/" />
      <Header />
      
      <main 
        className={`pt-16 min-h-screen transition-all duration-300 ${
          isOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Encabezado */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Dashboard Principal
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Análisis estratégico del rendimiento estudiantil y uso de IA
            </p>
          </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <KpiCard
            title="Total Estudiantes"
            value={totalStudents}
            icon={<Users size={48} strokeWidth={1.5} />}
            color="text-blue-600"
          />
          <KpiCard
            title="GPA Promedio"
            value={avgGpa}
            icon={<TrendingUp size={48} strokeWidth={1.5} />}
            color="text-green-600"
          />
          <KpiCard
            title="Nivel de Estrés"
            value={avgStress}
            icon={<AlertCircle size={48} strokeWidth={1.5} />}
            color="text-orange-600"
          />
          <KpiCard
            title="Horas Digitales/Sem"
            value={avgHours}
            icon={<Laptop size={48} strokeWidth={1.5} />}
            color="text-purple-600"
          />
        </div>

        {/* Visualizaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
          <HoursVsGpaChart data={students} />
          <ModalityDonut data={students} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-4 lg:mb-8">
          <RadarProfile data={students} />
          <IAVsSatisfaction data={students} />
        </div>

        {/* Sección de interpretación */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Principales Hallazgos
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <strong>📈 Correlación positiva entre horas digitales y rendimiento:</strong> Los datos revelan 
              una tendencia clara donde estudiantes que dedican más horas semanales al estudio digital 
              obtienen un GPA superior, sugiriendo que el uso estratégico de plataformas digitales 
              contribuye al éxito académico.
            </p>
            <p>
              <strong>🎓 Ventaja de la modalidad virtual:</strong> Los estudiantes en modalidad virtual 
              muestran promedios ligeramente superiores en GPA y uso de IA, probablemente debido a 
              una mayor familiaridad con herramientas digitales y flexibilidad en el aprendizaje autodirigido.
            </p>
            <p>
              <strong>🤖 Impacto de la IA en la satisfacción:</strong> Existe una correlación positiva entre 
              el nivel de uso de Inteligencia Artificial y la satisfacción académica. Los estudiantes que 
              integran herramientas de IA en su proceso de aprendizaje reportan mayores niveles de 
              satisfacción, posiblemente por la eficiencia y personalización que estas brindan.
            </p>
            <p>
              <strong>⚖️ Gestión del estrés:</strong> Los niveles de estrés se mantienen moderados en ambas 
              modalidades, aunque los estudiantes virtuales con mayor uso de IA tienden a reportar niveles 
              ligeramente menores, lo que sugiere que la tecnología puede actuar como un factor de apoyo 
              en la gestión de la carga académica.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 pb-6 text-gray-500 text-sm">
          <p>Dashboard generado con Next.js 14 · Datos simulados con fines académicos</p>
        </footer>
        </div>
      </main>
    </div>
  );
}
