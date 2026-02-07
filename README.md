<div align="center">

# 🎓 Dashboard Ecosistema Digital Académico

### Plataforma de Análisis Avanzado del Rendimiento Estudiantil

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-18.2.0-61dafb?style=for-the-badge&logo=react)](https://reactjs.org/)

[Demo en Vivo](#) · [Reporte de Bug](https://github.com/EzerZuniga/dashboard-ecosistema-digital/issues) · [Solicitar Feature](https://github.com/EzerZuniga/dashboard-ecosistema-digital/issues)

</div>

---

## 📋 Tabla de Contenidos

- [Sobre el Proyecto](#-sobre-el-proyecto)
- [Características Principales](#-características-principales)
- [Stack Tecnológico](#-stack-tecnológico)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Configuración](#-configuración)
- [Scripts Disponibles](#-scripts-disponibles)
- [Despliegue](#-despliegue)
- [Roadmap](#-roadmap)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

---

## 🎯 Sobre el Proyecto

**Dashboard Ecosistema Digital Académico** es una plataforma web profesional de análisis de datos diseñada para instituciones educativas. Proporciona insights estratégicos sobre el rendimiento estudiantil, uso de plataformas digitales y la integración de Inteligencia Artificial en el aprendizaje.

### ¿Por qué este proyecto?

- 📊 **Visualización intuitiva** de métricas académicas complejas
- 🎯 **Toma de decisiones** basada en datos en tiempo real
- 🌐 **Accesibilidad global** con soporte multi-idioma
- 🎨 **UX/UI profesional** sin animaciones distractivas
- 🔒 **Sistema de autenticación** integrado

---

## ✨ Características Principales

### 🎨 Interfaz de Usuario
- ✅ **Diseño Responsive** - Adaptable a móviles, tablets y escritorio
- ✅ **Modo Oscuro/Claro** - Toggle con persistencia en localStorage
- ✅ **Sistema Multi-idioma** - Español, English y Português
- ✅ **UI/UX Profesional** - Sin animaciones, diseño limpio y moderno
- ✅ **Navegación Intuitiva** - Sidebar colapsable y breadcrumbs

### 📊 Visualizaciones de Datos
- 📈 **Gráfico de Líneas** - Correlación entre horas digitales y GPA
- 🍩 **Gráfico Donut** - Distribución por modalidad de estudio
- 🎯 **Gráfico Radar** - Perfil estudiantil comparativo
- 📊 **Gráfico de Barras** - Impacto de IA en la satisfacción
- 💳 **KPI Cards** - Métricas clave en tiempo real

### 🔐 Características Avanzadas
- ✅ **Autenticación** - Sistema de login con Context API
- ✅ **Gestión de Estado** - 4 contextos globales (Auth, Sidebar, Theme, Language)
- ✅ **Persistencia de Datos** - localStorage para preferencias de usuario
- ✅ **TypeScript** - Type-safety en todo el proyecto
- ✅ **SSR/SSG** - Server-Side Rendering con Next.js 16

### 📄 Páginas Implementadas
1. **Dashboard** - Vista general con KPIs y gráficos principales
2. **Análisis** - Correlaciones avanzadas y tendencias
3. **Estudiantes** - Gestión y visualización de datos estudiantiles
4. **Reportes** - Generación de informes personalizados
5. **Métricas** - Análisis detallado de indicadores
6. **Configuración** - Personalización de preferencias
7. **Login** - Acceso seguro al sistema

---

## 🚀 Stack Tecnológico

### Frontend
- **[Next.js 16.1.6](https://nextjs.org/)** - Framework React con App Router
- **[React 18.2.0](https://reactjs.org/)** - Biblioteca de UI
- **[TypeScript 5.3.3](https://www.typescriptlang.org/)** - Superset tipado de JavaScript
- **[Tailwind CSS 3.4.1](https://tailwindcss.com/)** - Framework CSS utility-first

### Visualización de Datos
- **[Recharts 2.15.0](https://recharts.org/)** - Biblioteca de gráficos para React
- **[Lucide React 0.563.0](https://lucide.dev/)** - Iconos SVG optimizados

### Gestión de Estado
- **React Context API** - State management global
- **localStorage** - Persistencia de preferencias

### Herramientas de Desarrollo
- **ESLint** - Linter para código JavaScript/TypeScript
- **PostCSS** - Procesador de CSS
- **Turbopack** - Bundler de alta velocidad

---

## 🛠️ Instalación

### Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** 18.x o superior
- **npm** 9.x o superior (o yarn/pnpm)
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/EzerZuniga/dashboard-ecosistema-digital.git
cd dashboard-ecosistema-digital
```

2. **Instala las dependencias**
```bash
npm install
# o con yarn
yarn install
# o con pnpm
pnpm install
```

3. **Ejecuta el servidor de desarrollo**
```bash
npm run dev
```

4. **Abre tu navegador**

Visita [http://localhost:3000](http://localhost:3000) para ver la aplicación.

### Inicio Rápido (Modo Demo)

La aplicación incluye un sistema de autenticación en modo demo:
- **Email:** Cualquier email válido
- **Password:** Cualquier contraseña

Ejemplo: `usuario@ejemplo.com` / `demo123`

---

## 📖 Uso

### Navegación Principal

- **Dashboard** (`/`) - Vista general con KPIs y gráficos principales
- **Análisis** (`/analisis`) - Análisis avanzado con correlaciones
- **Estudiantes** (`/estudiantes`) - Gestión de base de datos estudiantil
- **Reportes** (`/reportes`) - Generación de informes
- **Métricas** (`/metricas`) - Indicadores detallados
- **Configuración** (`/configuracion`) - Preferencias de usuario

### Características por Página

#### 🏠 Dashboard
- KPIs: Total estudiantes, GPA promedio, nivel de estrés, horas digitales
- Gráfico de correlación horas digitales vs GPA
- Distribución por modalidad (Presencial/Virtual)
- Perfil estudiantil comparativo
- Impacto de IA en satisfacción académica

#### 📊 Análisis
- Indicadores de correlación avanzados
- Insights automáticos
- Recomendaciones basadas en datos
- Visualizaciones comparativas

#### 👥 Estudiantes
- Tabla completa de estudiantes
- Filtros por modalidad
- Búsqueda en tiempo real
- Estadísticas agregadas

#### 📄 Reportes
- Generación de reportes personalizados
- Multi-formato (PDF, Excel, CSV simulado)
- Filtros por fecha y categoría

#### 📈 Métricas
- KPIs avanzados
- Gráficos de tendencias
- Análisis temporal
- Comparativas por modalidad

#### ⚙️ Configuración
- **Tema:** Modo claro/oscuro
- **Idioma:** Español, English, Português
- **Notificaciones:** Push, Email, Móvil
- **Respaldo automático**
- **Seguridad y privacidad**

---

## 📁 Estructura del Proyecto

```
dashboard-ecosistema-digital/
│
├── public/
│   ├── data/
│   │   └── estudiantes.json           # Dataset de estudiantes
│   └── favicon.png                     # Favicon de la aplicación
│
├── src/
│   ├── app/
│   │   ├── analisis/
│   │   │   └── page.tsx               # Página de análisis avanzado
│   │   ├── configuracion/
│   │   │   └── page.tsx               # Página de configuración
│   │   ├── estudiantes/
│   │   │   └── page.tsx               # Gestión de estudiantes
│   │   ├── login/
│   │   │   └── page.tsx               # Página de login
│   │   ├── metricas/
│   │   │   └── page.tsx               # Métricas detalladas
│   │   ├── reportes/
│   │   │   └── page.tsx               # Generación de reportes
│   │   ├── layout.tsx                 # Layout principal con providers
│   │   ├── page.tsx                   # Dashboard principal
│   │   └── globals.css                # Estilos globales + Tailwind
│   │
│   ├── components/
│   │   ├── Header.tsx                 # Barra de navegación superior
│   │   ├── Sidebar.tsx                # Menú lateral con navegación
│   │   ├── KpiCard.tsx                # Tarjeta de KPI reutilizable
│   │   ├── HoursVsGpaChart.tsx        # Gráfico de líneas (horas vs GPA)
│   │   ├── ModalityDonut.tsx          # Gráfico donut (modalidades)
│   │   ├── RadarProfile.tsx           # Gráfico radar (perfil comparativo)
│   │   └── IAVsSatisfaction.tsx       # Gráfico de barras (IA vs satisfacción)
│   │
│   └── context/
│       ├── AuthContext.tsx            # Contexto de autenticación
│       ├── SidebarContext.tsx         # Estado del sidebar
│       ├── ThemeContext.tsx           # Gestión de tema claro/oscuro
│       └── LanguageContext.tsx        # Sistema multi-idioma (i18n)
│
├── .eslintrc.json                     # Configuración de ESLint
├── .gitignore                         # Archivos ignorados por Git
├── next.config.ts                     # Configuración de Next.js
├── package.json                       # Dependencias del proyecto
├── postcss.config.mjs                 # Configuración de PostCSS
├── tailwind.config.ts                 # Configuración de Tailwind CSS
├── tsconfig.json                      # Configuración de TypeScript
├── LICENSE                            # Licencia MIT
└── README.md                          # Este archivo
```


## 🔐 Seguridad

- ✅ **TypeScript** para prevenir errores en tiempo de compilación
- ✅ **ESLint** para detectar vulnerabilidades
- ✅ **Sanitización** de inputs en formularios
- ✅ **Headers de seguridad** configurados en Next.js
- ⚠️ **Nota:** El sistema de autenticación actual es demo. Para producción, implementa JWT/OAuth

---

## 📝 Licencia

Distribuido bajo la Licencia MIT. Ver [`LICENSE`](LICENSE) para más información.

```
MIT License

Copyright (c) 2026 Ezer Zuñiga

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

## 👨‍💻 Contacto

**Ezer Zuñiga**

- Instagram: [@ezerzuniga.oficial16](https://www.instagram.com/ezerzuniga.oficial16/)
---
---

<div align="center">

</div>