# 🎓 Ecosistema Digital Académico

Dashboard web profesional para el análisis del uso de plataformas digitales, rendimiento académico y uso de Inteligencia Artificial en estudiantes universitarios.

## 🚀 Stack Tecnológico

- **Framework:** Next.js 14 con App Router
- **Frontend:** React 18 + TypeScript
- **Estilos:** Tailwind CSS
- **Gráficos:** Recharts
- **Despliegue:** Compatible con Vercel

## 📊 Características

- ✅ Dashboard interactivo con KPIs académicos
- ✅ 4 visualizaciones de datos con Recharts
- ✅ Diseño responsive y moderno
- ✅ Datos cargados desde JSON local
- ✅ TypeScript para type-safety
- ✅ Sin backend ni base de datos

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/EzerZuniga/dashboard-ecosistema-digital.git
cd dashboard-ecosistema-digital
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en [http://localhost:3000](http://localhost:3000)

## 📁 Estructura del Proyecto

```
dashboard-ecosistema-digital/
│
├── public/
│   └── data/
│       └── estudiantes.json       # Datos de estudiantes
│
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Layout principal
│   │   ├── page.tsx               # Página principal del dashboard
│   │   └── globals.css            # Estilos globales
│   │
│   └── components/
│       ├── KpiCard.tsx            # Tarjetas de KPIs
│       ├── HoursVsGpaChart.tsx    # Gráfico de líneas
│       ├── ModalityDonut.tsx      # Gráfico donut
│       ├── RadarProfile.tsx       # Gráfico radar
│       └── IAVsSatisfaction.tsx   # Gráfico de barras
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

## 📈 Visualizaciones

1. **KPI Cards:** Total estudiantes, GPA promedio, nivel de estrés, horas digitales
2. **Gráfico de líneas:** Relación entre horas de estudio digital y GPA
3. **Gráfico donut:** Distribución por modalidad (Presencial/Virtual)
4. **Gráfico radar:** Perfil comparativo entre modalidades
5. **Gráfico de barras:** Impacto del uso de IA en la satisfacción

## 🎯 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter

## 📦 Despliegue en Vercel

1. Sube tu proyecto a GitHub
2. Importa el repositorio en [Vercel](https://vercel.com)
3. Vercel detectará automáticamente Next.js y desplegará

## 📄 Licencia

MIT License - Proyecto con fines académicos

---

Desarrollado con ❤️ usando Next.js y Recharts

