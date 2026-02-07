'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'es' | 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    // Header
    'search.placeholder': 'Buscar estudiantes, métricas, reportes...',
    
    // Sidebar
    'menu.dashboard': 'Dashboard',
    'menu.analysis': 'Análisis',
    'menu.students': 'Estudiantes',
    'menu.reports': 'Reportes',
    'menu.metrics': 'Métricas',
    'menu.settings': 'Configuración',
    'menu.logout': 'Cerrar sesión',
    'menu.title': 'Menú Principal',
    
    // Dashboard
    'dashboard.title': 'Dashboard Principal',
    'dashboard.subtitle': 'Análisis estratégico del rendimiento estudiantil y uso de IA',
    'dashboard.students': 'Total Estudiantes',
    'dashboard.gpa': 'GPA Promedio',
    'dashboard.stress': 'Nivel de Estrés',
    'dashboard.hours': 'Horas Digitales/Sem',
    'dashboard.findings': 'Principales Hallazgos',
    
    // Settings
    'settings.title': 'Configuración',
    'settings.subtitle': 'Personaliza tu experiencia en el dashboard',
    'settings.profile': 'Perfil de Usuario',
    'settings.notifications': 'Notificaciones',
    'settings.appearance': 'Apariencia',
    'settings.security': 'Seguridad',
    'settings.data': 'Datos y Respaldo',
    'settings.darkMode': 'Modo Oscuro',
    'settings.darkModeDesc': 'Activa el tema oscuro',
    'settings.language': 'Idioma del Sistema',
    'settings.save': 'Guardar Cambios',
    'settings.cancel': 'Cancelar',
    'settings.notifications.push': 'Notificaciones Push',
    'settings.notifications.pushDesc': 'Recibe alertas en tiempo real',
    'settings.notifications.email': 'Alertas por Email',
    'settings.notifications.emailDesc': 'Recibe resúmenes diarios por correo',
    'settings.notifications.mobile': 'Notificaciones Móviles',
    'settings.notifications.mobileDesc': 'Alertas en dispositivos móviles',
    
    // Login
    'login.title': 'Iniciar Sesión',
    'login.subtitle': 'Ingresa tus credenciales para continuar',
    'login.email': 'Correo Electrónico',
    'login.password': 'Contraseña',
    'login.button': 'Ingresar al Dashboard',
    'login.loading': 'Ingresando...',
    'login.demo': 'Modo Demo',
    'login.demoDesc': 'Puedes usar cualquier email y contraseña para ingresar al sistema.',
    'login.example': 'Ejemplo:',
    
    // Footer
    'footer.developed': 'Desarrollado por',
    'footer.github': 'Ver en GitHub',
  },
  en: {
    // Header
    'search.placeholder': 'Search students, metrics, reports...',
    
    // Sidebar
    'menu.dashboard': 'Dashboard',
    'menu.analysis': 'Analysis',
    'menu.students': 'Students',
    'menu.reports': 'Reports',
    'menu.metrics': 'Metrics',
    'menu.settings': 'Settings',
    'menu.logout': 'Logout',
    'menu.title': 'Main Menu',
    
    // Dashboard
    'dashboard.title': 'Main Dashboard',
    'dashboard.subtitle': 'Strategic analysis of student performance and AI usage',
    'dashboard.students': 'Total Students',
    'dashboard.gpa': 'Average GPA',
    'dashboard.stress': 'Stress Level',
    'dashboard.hours': 'Digital Hours/Week',
    'dashboard.findings': 'Key Findings',
    
    // Settings
    'settings.title': 'Settings',
    'settings.subtitle': 'Customize your dashboard experience',
    'settings.profile': 'User Profile',
    'settings.notifications': 'Notifications',
    'settings.appearance': 'Appearance',
    'settings.security': 'Security',
    'settings.data': 'Data & Backup',
    'settings.darkMode': 'Dark Mode',
    'settings.darkModeDesc': 'Enable dark theme',
    'settings.language': 'System Language',
    'settings.save': 'Save Changes',
    'settings.cancel': 'Cancel',
    'settings.notifications.push': 'Push Notifications',
    'settings.notifications.pushDesc': 'Receive real-time alerts',
    'settings.notifications.email': 'Email Alerts',
    'settings.notifications.emailDesc': 'Receive daily summaries by email',
    'settings.notifications.mobile': 'Mobile Notifications',
    'settings.notifications.mobileDesc': 'Alerts on mobile devices',
    
    // Login
    'login.title': 'Sign In',
    'login.subtitle': 'Enter your credentials to continue',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.button': 'Access Dashboard',
    'login.loading': 'Signing in...',
    'login.demo': 'Demo Mode',
    'login.demoDesc': 'You can use any email and password to access the system.',
    'login.example': 'Example:',
    
    // Footer
    'footer.developed': 'Developed by',
    'footer.github': 'View on GitHub',
  },
  pt: {
    // Header
    'search.placeholder': 'Buscar alunos, métricas, relatórios...',
    
    // Sidebar
    'menu.dashboard': 'Dashboard',
    'menu.analysis': 'Análise',
    'menu.students': 'Alunos',
    'menu.reports': 'Relatórios',
    'menu.metrics': 'Métricas',
    'menu.settings': 'Configurações',
    'menu.logout': 'Sair',
    'menu.title': 'Menu Principal',
    
    // Dashboard
    'dashboard.title': 'Dashboard Principal',
    'dashboard.subtitle': 'Análise estratégica do desempenho estudantil e uso de IA',
    'dashboard.students': 'Total de Alunos',
    'dashboard.gpa': 'GPA Médio',
    'dashboard.stress': 'Nível de Estresse',
    'dashboard.hours': 'Horas Digitais/Sem',
    'dashboard.findings': 'Principais Descobertas',
    
    // Settings
    'settings.title': 'Configurações',
    'settings.subtitle': 'Personalize sua experiência no dashboard',
    'settings.profile': 'Perfil de Usuário',
    'settings.notifications': 'Notificações',
    'settings.appearance': 'Aparência',
    'settings.security': 'Segurança',
    'settings.data': 'Dados e Backup',
    'settings.darkMode': 'Modo Escuro',
    'settings.darkModeDesc': 'Ativar tema escuro',
    'settings.language': 'Idioma do Sistema',
    'settings.save': 'Salvar Alterações',
    'settings.cancel': 'Cancelar',
    'settings.notifications.push': 'Notificações Push',
    'settings.notifications.pushDesc': 'Receber alertas em tempo real',
    'settings.notifications.email': 'Alertas por Email',
    'settings.notifications.emailDesc': 'Receber resumos diários por email',
    'settings.notifications.mobile': 'Notificações Móveis',
    'settings.notifications.mobileDesc': 'Alertas em dispositivos móveis',
    
    // Login
    'login.title': 'Entrar',
    'login.subtitle': 'Digite suas credenciais para continuar',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.button': 'Acessar Dashboard',
    'login.loading': 'Entrando...',
    'login.demo': 'Modo Demo',
    'login.demoDesc': 'Você pode usar qualquer email e senha para acessar o sistema.',
    'login.example': 'Exemplo:',
    
    // Footer
    'footer.developed': 'Desenvolvido por',
    'footer.github': 'Ver no GitHub',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en' || savedLanguage === 'pt')) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.es] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
