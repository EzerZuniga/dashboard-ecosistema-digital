'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Settings, User, Bell, Lock, Database, Palette, Globe, Shield, Mail, Smartphone, Eye, Download } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { useAuth } from '@/context/AuthContext';
import { useSidebar } from '@/context/SidebarContext';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

export default function ConfiguracionPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [mobileAlerts, setMobileAlerts] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const { isOpen } = useSidebar();
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Cargar preferencias guardadas
    const savedNotifications = localStorage.getItem('notifications');
    const savedEmailAlerts = localStorage.getItem('emailAlerts');
    const savedMobileAlerts = localStorage.getItem('mobileAlerts');
    const savedAutoBackup = localStorage.getItem('autoBackup');

    if (savedNotifications !== null) setNotifications(savedNotifications === 'true');
    if (savedEmailAlerts !== null) setEmailAlerts(savedEmailAlerts === 'true');
    if (savedMobileAlerts !== null) setMobileAlerts(savedMobileAlerts === 'true');
    if (savedAutoBackup !== null) setAutoBackup(savedAutoBackup === 'true');
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  const handleSaveSettings = () => {
    localStorage.setItem('notifications', notifications.toString());
    localStorage.setItem('emailAlerts', emailAlerts.toString());
    localStorage.setItem('mobileAlerts', mobileAlerts.toString());
    localStorage.setItem('autoBackup', autoBackup.toString());
    
    alert(language === 'es' ? 'Configuración guardada exitosamente' : 
          language === 'en' ? 'Settings saved successfully' : 
          'Configurações salvas com sucesso');
  };

  const handleNotificationChange = (value: boolean) => {
    setNotifications(value);
  };

  const handleEmailAlertsChange = (value: boolean) => {
    setEmailAlerts(value);
  };

  const handleMobileAlertsChange = (value: boolean) => {
    setMobileAlerts(value);
  };

  const handleAutoBackupChange = (value: boolean) => {
    setAutoBackup(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <Sidebar currentPath="/configuracion" />
      
      <main className={`pt-16 ${isOpen ? 'lg:ml-64' : 'ml-0'} min-h-screen`}>
        <div className="p-6 lg:p-8 max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('settings.title')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('settings.subtitle')}</p>
          </div>

          {/* Perfil de Usuario */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <User className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.profile')}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'es' ? 'Nombre Completo' : language === 'en' ? 'Full Name' : 'Nome Completo'}
                </label>
                <input
                  type="text"
                  defaultValue={user?.name || 'Admin'}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'es' ? 'Correo Electrónico' : language === 'en' ? 'Email Address' : 'Email'}
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || 'admin@gmail.com'}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'es' ? 'Rol' : language === 'en' ? 'Role' : 'Função'}
                </label>
                <input
                  type="text"
                  defaultValue={user?.role || 'Analista de Datos'}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {language === 'es' ? 'Teléfono' : language === 'en' ? 'Phone' : 'Telefone'}
                </label>
                <input
                  type="tel"
                  placeholder="+51 999 999 999"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Notificaciones */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <Bell className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.notifications')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-3">
                  <Bell className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.push')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.notifications.pushDesc')}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={(e) => handleNotificationChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-3">
                  <Mail className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.email')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.notifications.emailDesc')}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => handleEmailAlertsChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-3">
                  <Smartphone className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('settings.notifications.mobile')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.notifications.mobileDesc')}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mobileAlerts}
                    onChange={(e) => handleMobileAlertsChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Preferencias de Interfaz */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Palette className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.appearance')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-3">
                  <Eye className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{t('settings.darkMode')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t('settings.darkModeDesc')}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <Globe size={18} />
                  {t('settings.language')}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as 'es' | 'en' | 'pt')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="pt">Português</option>
                </select>
              </div>
            </div>
          </div>

          {/* Seguridad y Privacidad */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center">
                <Shield className="text-red-600 dark:text-red-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.security')}</h2>
            </div>

            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Lock className="text-gray-600 dark:text-gray-400" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'es' ? 'Cambiar Contraseña' : language === 'en' ? 'Change Password' : 'Alterar Senha'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'es' ? 'Actualiza tu contraseña de acceso' : language === 'en' ? 'Update your access password' : 'Atualize sua senha de acesso'}
                    </p>
                  </div>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">→</span>
              </button>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Shield className="text-gray-600 dark:text-gray-400" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'es' ? 'Autenticación de Dos Factores' : language === 'en' ? 'Two-Factor Authentication' : 'Autenticação de Dois Fatores'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'es' ? 'Agrega una capa extra de seguridad' : language === 'en' ? 'Add an extra layer of security' : 'Adicione uma camada extra de segurança'}
                    </p>
                  </div>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {language === 'es' ? 'Configurar' : language === 'en' ? 'Setup' : 'Configurar'}
                </span>
              </button>
            </div>
          </div>

          {/* Datos y Respaldo */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                <Database className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{t('settings.data')}</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md">
                <div className="flex items-center gap-3">
                  <Database className="text-gray-600 dark:text-gray-400" size={20} />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'es' ? 'Respaldo Automático' : language === 'en' ? 'Automatic Backup' : 'Backup Automático'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'es' ? 'Copia de seguridad diaria' : language === 'en' ? 'Daily backup' : 'Backup diário'}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => handleAutoBackupChange(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <button className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Download className="text-gray-600 dark:text-gray-400" size={20} />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {language === 'es' ? 'Exportar Datos' : language === 'en' ? 'Export Data' : 'Exportar Dados'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'es' ? 'Descarga todos tus datos' : language === 'en' ? 'Download all your data' : 'Baixe todos os seus dados'}
                    </p>
                  </div>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {language === 'es' ? 'Descargar' : language === 'en' ? 'Download' : 'Baixar'}
                </span>
              </button>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSaveSettings}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
            >
              {t('settings.save')}
            </button>
            <button className="flex-1 px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 font-medium">
              {t('settings.cancel')}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}
