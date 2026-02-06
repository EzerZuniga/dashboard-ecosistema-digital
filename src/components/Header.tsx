'use client';

import { Bell, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';

export default function Header() {
  const { user } = useAuth();
  const { isOpen, toggle } = useSidebar();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 shadow-sm z-30">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>

          {/* Logo Mobile - Solo cuando sidebar está cerrado */}
          <div className={`flex items-center gap-2 ${isOpen ? 'hidden' : 'lg:hidden'}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-bold text-sm text-white">
              ED
            </div>
            <span className="font-bold text-gray-800">Dashboard</span>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar estudiantes, métricas, reportes..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 hover:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Icon Mobile */}
          <button className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Search size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group">
            <Bell size={22} className="text-gray-600 group-hover:text-blue-600 transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-lg pr-2 py-1 transition-colors group">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Analista'}</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold shadow-md ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
              {user?.avatar || 'U'}
            </div>
            <ChevronDown size={16} className="hidden sm:block text-gray-400 group-hover:text-gray-600 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
