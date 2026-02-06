'use client';

import { Home, BarChart3, Users, Settings, FileText, TrendingUp, LogOut, ChevronRight, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = '/' }: SidebarProps) {
  const { logout, user } = useAuth();
  const { isOpen, close } = useSidebar();
  const router = useRouter();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/', active: currentPath === '/' },
    { icon: BarChart3, label: 'Análisis', path: '/analisis', active: currentPath === '/analisis' },
    { icon: Users, label: 'Estudiantes', path: '/estudiantes', active: currentPath === '/estudiantes' },
    { icon: FileText, label: 'Reportes', path: '/reportes', active: currentPath === '/reportes' },
    { icon: TrendingUp, label: 'Métricas', path: '/metricas', active: currentPath === '/metricas' },
    { icon: Settings, label: 'Configuración', path: '/configuracion', active: currentPath === '/configuracion' },
  ];

  const handleLogout = () => {
    logout();
    close();
    router.push('/login');
  };

  const handleMenuClick = () => {
    close();
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-700 bg-slate-800">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg">
            <GraduationCap size={24} />
          </div>
          <div>
            <h1 className="font-bold text-base leading-tight">Ecosistema Digital</h1>
            <p className="text-xs text-blue-300">Analytics Platform</p>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-b border-slate-700 bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg ring-2 ring-slate-600">
              {user?.avatar || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-white truncate">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email || 'usuario@email.com'}</p>
              <div className="flex items-center gap-1 mt-1">
                <Award size={12} className="text-blue-400" />
                <span className="text-xs text-blue-400 font-medium">{user?.role || 'Analista de Datos'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Menu Area */}
        <div className="overflow-y-auto h-[calc(100vh-280px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Menu Header */}
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <BookOpen size={14} />
              Menú Principal
            </h3>
          </div>

          {/* Menu Items */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={handleMenuClick}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all group ${
                  item.active
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/50'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={18} className={item.active ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                <ChevronRight size={16} className={`transition-transform ${item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700 bg-slate-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 hover:bg-red-600/90 hover:text-white transition-all group"
          >
            <LogOut size={18} className="group-hover:text-white" />
            <span className="font-medium text-sm">Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}
