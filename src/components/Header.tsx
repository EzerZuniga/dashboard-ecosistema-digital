'use client';

import { Bell, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const { user } = useAuth();
  const { isOpen, toggle } = useSidebar();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Aquí puedes agregar lógica de búsqueda si lo necesitas
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Buscando:', searchQuery);
      // Aquí puedes implementar la lógica de búsqueda
    }
  };

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 z-30 ${
      isOpen ? 'left-64' : 'left-0'
    }`}>
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1 max-w-3xl">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggle}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu size={24} className="text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Logo Mobile - Solo cuando sidebar está cerrado */}
          <div className={`flex items-center gap-2 ${isOpen ? 'hidden' : 'lg:hidden'}`}>
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-sm text-white">
              ED
            </div>
            <span className="font-bold text-gray-800">Dashboard</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder={t('search.placeholder')}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search Icon Mobile */}
          <button className="sm:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <Search size={20} className="text-gray-600 dark:text-gray-400" />
          </button>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md">
            <Bell size={22} className="text-gray-600 dark:text-gray-400" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-4 border-l border-gray-200 hover:bg-gray-50 rounded-md pr-2 py-1">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-gray-800">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Analista'}</p>
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.avatar || 'U'}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
