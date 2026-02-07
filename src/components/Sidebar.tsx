'use client';

import { Home, BarChart3, Users, Settings, FileText, TrendingUp, LogOut, GraduationCap } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { useLanguage } from '@/context/LanguageContext';
import { useRouter } from 'next/navigation';

interface SidebarProps {
  currentPath?: string;
}

export default function Sidebar({ currentPath = '/' }: SidebarProps) {
  const { logout, user } = useAuth();
  const { isOpen, close } = useSidebar();
  const { t } = useLanguage();
  const router = useRouter();

  const menuItems = [
    { icon: Home, label: t('menu.dashboard'), path: '/', active: currentPath === '/' },
    { icon: BarChart3, label: t('menu.analysis'), path: '/analisis', active: currentPath === '/analisis' },
    { icon: Users, label: t('menu.students'), path: '/estudiantes', active: currentPath === '/estudiantes' },
    { icon: FileText, label: t('menu.reports'), path: '/reportes', active: currentPath === '/reportes' },
    { icon: TrendingUp, label: t('menu.metrics'), path: '/metricas', active: currentPath === '/metricas' },
    { icon: Settings, label: t('menu.settings'), path: '/configuracion', active: currentPath === '/configuracion' },
  ];

  const handleLogout = () => {
    logout();
    close();
    router.push('/login');
  };

  const handleMenuClick = (path: string) => {
    router.push(path);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-screen w-64 bg-slate-900 dark:bg-slate-950 text-white shadow-xl z-50 ${
        isOpen ? '' : 'hidden'
      }`}>
        
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-slate-700">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <GraduationCap size={22} className="text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base text-white truncate">Ecosistema Digital</h1>
            <p className="text-xs text-slate-400 truncate">Analytics Platform</p>
          </div>
        </div>

        {/* Scrollable Menu Area */}
        <div className="overflow-y-auto h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {/* Menu Header */}
          <div className="px-4 pt-4 pb-2">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {t('menu.title')}
            </h3>
          </div>

          {/* Menu Items */}
          <nav className="px-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleMenuClick(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-800 bg-slate-900">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-slate-300 hover:bg-red-600 hover:text-white"
          >
            <LogOut size={18} />
            <span className="font-medium text-sm">{t('menu.logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
