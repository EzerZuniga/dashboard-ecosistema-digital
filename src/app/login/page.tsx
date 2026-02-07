'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, TrendingUp, Github, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import NeuralNetwork from '@/components/NeuralNetwork';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateEmail = (email: string) => {
    return email.length > 0 && email.includes('@');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un correo electrónico válido');
      setIsLoading(false);
      return;
    }

    // Simular delay de red para mejor UX
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Error al iniciar sesión');
      setIsLoading(false);
    }
  };

  const emailError = touched.email && !validateEmail(email) && email.length > 0;
  const passwordError = touched.password && password.length === 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/login.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
      </div>
      
      {/* Neural Network Animation */}
      <div className="absolute inset-0 z-10">
        <NeuralNetwork />
      </div>
      
      {/* Main Container */}
      <div className="w-full max-w-[95%] sm:max-w-md md:max-w-lg relative z-20">{/* Logo and Title */}
        {/* Logo and Title */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 px-2">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-600 rounded-xl sm:rounded-2xl shadow-2xl mb-2 sm:mb-3 md:mb-4 border-2 border-blue-500 transition-all duration-300 hover:scale-110 hover:bg-blue-700">
            <TrendingUp className="text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-2xl leading-tight px-2">
            Ecosistema Digital Académico
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white drop-shadow-lg font-medium">
            Plataforma de Análisis de Datos
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-200 shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 transition-all duration-300 hover:shadow-3xl">{/* Header */}
          <div className="mb-5 sm:mb-6 md:mb-7">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-1.5">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    emailError ? 'text-red-500' : 'text-gray-400'
                  }`} 
                  size={20} 
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched({ ...touched, email: true })}
                  placeholder="tu@email.com"
                  disabled={isLoading}
                  aria-invalid={emailError}
                  aria-describedby={emailError ? "email-error" : undefined}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border rounded-lg text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200
                    ${emailError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                />
              </div>
              {emailError && (
                <p id="email-error" className="mt-1.5 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  <span>Ingresa un correo electrónico válido</span>
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1.5 sm:mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock 
                  className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                    passwordError ? 'text-red-500' : 'text-gray-400'
                  }`} 
                  size={20} 
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched({ ...touched, password: true })}
                  placeholder="••••••••"
                  disabled={isLoading}
                  aria-invalid={passwordError}
                  aria-describedby={passwordError ? "password-error" : undefined}
                  className={`w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 border rounded-lg text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-50 disabled:cursor-not-allowed transition-all duration-200
                    ${passwordError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                />
              </div>
              {passwordError && (
                <p id="password-error" className="mt-1.5 text-xs sm:text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle size={14} />
                  <span>La contraseña es requerida</span>
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div role="alert" className="bg-red-50 border border-red-300 text-red-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium flex items-start gap-2 animate-in slide-in-from-top duration-300">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 sm:py-3 md:py-3.5 px-4 rounded-lg 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:bg-blue-400 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 text-sm sm:text-base transition-all duration-200
                hover:shadow-lg active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Ingresando...</span>
                </>
              ) : (
                <span>Ingresar al Dashboard</span>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-4 sm:mt-5 md:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs sm:text-sm text-blue-900 font-semibold mb-1.5 sm:mb-2">Modo Demo</p>
            <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
              Puedes usar cualquier email y contraseña para ingresar al sistema.
            </p>
            <div className="mt-2 pt-2 border-t border-blue-200">
              <p className="text-xs sm:text-sm text-blue-700">
                <span className="font-medium">Ejemplo:</span>{' '}
                <span className="font-mono font-semibold">admin@demo.com</span>
                {' / '}
                <span className="font-mono font-semibold">demo123</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-4 sm:mt-5 md:mt-6 px-2 sm:px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-white text-xs sm:text-sm mb-1.5 sm:mb-2 drop-shadow-lg">
            <span>Desarrollado por</span>
            <a 
              href="https://www.instagram.com/ezerzuniga.oficial16/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-blue-200 hover:underline drop-shadow transition-all duration-200"
            >
              Ezer Zuniga
            </a>
          </div>
          <a 
            href="https://github.com/EzerZuniga/dashboard-ecosistema-digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-xs sm:text-sm hover:underline drop-shadow transition-all duration-200"
          >
            <Github size={14} className="sm:w-4 sm:h-4" />
            <span>Ver en GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
