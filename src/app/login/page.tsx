'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, TrendingUp, Github, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-xl shadow-lg mb-3 sm:mb-4">
            <TrendingUp size={28} className="text-white sm:w-8 sm:h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2 px-4">
            Ecosistema Digital Académico
          </h1>
          <p className="text-sm sm:text-base text-gray-600">Plataforma de Análisis de Datos</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
            <p className="text-sm text-gray-500 mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-md text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${emailError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300'
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
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
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
                  className={`w-full pl-10 pr-4 py-2.5 sm:py-3 border rounded-md text-sm sm:text-base
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${passwordError 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300'
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
              <div role="alert" className="bg-red-50 border border-red-300 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-md text-xs sm:text-sm font-medium flex items-start gap-2">
                <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-semibold py-2.5 sm:py-3 px-4 rounded-md 
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                disabled:bg-blue-400 disabled:cursor-not-allowed
                flex items-center justify-center gap-2 text-sm sm:text-base"
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
          <div className="mt-5 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-md">
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
        <div className="text-center mt-4 sm:mt-6 px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-gray-600 text-xs sm:text-sm mb-2">
            <span>Desarrollado por</span>
            <a 
              href="https://www.instagram.com/ezerzuniga.oficial16/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Ezer Zuniga
            </a>
          </div>
          <a 
            href="https://github.com/EzerZuniga/dashboard-ecosistema-digital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 text-xs sm:text-sm hover:underline"
          >
            <Github size={14} className="sm:w-4 sm:h-4" />
            <span>Ver en GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
