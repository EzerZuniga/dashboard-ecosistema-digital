'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurar tamaño del canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Crear partículas
    const particleCount = 80;
    const particles: Particle[] = [];
    const maxDistance = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2
      });
    }

    // Animar
    let animationFrame: number;
    
    const animate = () => {
      // Fondo transparente
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Actualizar posiciones de partículas
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Rebotar suavemente en los bordes
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mantener dentro de los límites
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      });

      // Dibujar conexiones entre partículas cercanas
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.6;
            
            // Línea de conexión elegante
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      // Dibujar partículas elegantes
      particles.forEach(particle => {
        // Resplandor suave
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, 8
        );
        gradient.addColorStop(0, 'rgba(125, 211, 252, 0.8)');
        gradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.5)');
        gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Partícula central
        ctx.fillStyle = 'rgba(56, 189, 248, 1)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Centro brillante
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
