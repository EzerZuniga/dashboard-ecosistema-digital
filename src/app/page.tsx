'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, TrendingUp, AlertCircle, Laptop, Github } from 'lucide-react';
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
        className={`pt-16 min-h-screen ${
          isOpen ? 'lg:ml-64' : 'ml-0'
        }`}
      >
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Encabezado */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Principal
            </h1>
            <p className="text-gray-600">
              Análisis estratégico del rendimiento estudiantil y uso de IA
            </p>
          </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <KpiCard
            title="Total Estudiantes"
            value={totalStudents}
            icon={<Users size={28} strokeWidth={2} />}
            color="text-blue-600"
          />
          <KpiCard
            title="GPA Promedio"
            value={avgGpa}
            icon={<TrendingUp size={28} strokeWidth={2} />}
            color="text-green-600"
          />
          <KpiCard
            title="Nivel de Estrés"
            value={avgStress}
            icon={<AlertCircle size={28} strokeWidth={2} />}
            color="text-orange-600"
          />
          <KpiCard
            title="Horas Digitales/Sem"
            value={avgHours}
            icon={<Laptop size={28} strokeWidth={2} />}
            color="text-purple-600"
          />
        </div>

        {/* Visualizaciones */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <HoursVsGpaChart students={students} />
          <ModalityDonut students={students} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RadarProfile students={students} />
          <IAVsSatisfaction students={students} />
        </div>

        {/* Sección de interpretación */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Principales Hallazgos
          </h2>
          <div className="space-y-5 text-gray-700 leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Correlación positiva entre horas digitales y rendimiento</h3>
              <p>
                Los datos revelan una tendencia clara donde estudiantes que dedican más horas semanales al estudio digital 
                obtienen un GPA superior, sugiriendo que el uso estratégico de plataformas digitales 
                contribuye al éxito académico.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ventaja de la modalidad virtual</h3>
              <p>
                Los estudiantes en modalidad virtual muestran promedios ligeramente superiores en GPA y uso de IA, 
                probablemente debido a una mayor familiaridad con herramientas digitales y flexibilidad en el aprendizaje autodirigido.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Impacto de la IA en la satisfacción</h3>
              <p>
                Existe una correlación positiva entre el nivel de uso de Inteligencia Artificial y la satisfacción académica. 
                Los estudiantes que integran herramientas de IA en su proceso de aprendizaje reportan mayores niveles de 
                satisfacción, posiblemente por la eficiencia y personalización que estas brindan.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Gestión del estrés</h3>
              <p>
                Los niveles de estrés se mantienen moderados en ambas modalidades, aunque los estudiantes virtuales con mayor 
                uso de IA tienden a reportar niveles ligeramente menores, lo que sugiere que la tecnología puede actuar como 
                un factor de apoyo en la gestión de la carga académica.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 pb-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-center gap-2 text-gray-600 text-sm mb-2">
            <span>Dashboard desarrollado por</span>
            <a 
              href="https://www.instagram.com/ezerzuniga.oficial16/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Ezer Zuniga
            </a>
          </div>
          <a 
            href="https://github.com/EzerZuniga/dashboard-ecosistema-digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            <Github size={16} />
            <span>Ver repositorio en GitHub</span>
          </a>
        </footer>
        </div>
      </main>
    </div>
  );
}
