import { useEffect, useRef, useState } from "react";

// Canvas with connected particles (neural network style)
export const ParticleNetwork = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    
    // Particle class
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }
    
    const particles: Particle[] = [];
    const particleCount = 80;
    const connectionDistance = 150;
    const mouseRadius = 200;
    let mouseX = -1000;
    let mouseY = -1000;
    
    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
      });
    }
    
    // Mouse tracking
    const handleMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouse);
    
    // Animation loop
    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx -= (dx / dist) * force * 0.02;
          p.vy -= (dy / dist) * force * 0.02;
        }
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Keep in bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 255, 136, 0.6)";
        ctx.fill();
        
        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            const opacity = 1 - dist / connectionDistance;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 136, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
};

// Scanlines effect
export const Scanlines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden opacity-[0.03]">
      <div className="scanlines-container absolute inset-0">
        {Array(30).fill(null).map((_, i) => (
          <div
            key={i}
            className="scanline-row"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #00ff88, transparent)",
              animation: `scanline-rise 8s linear infinite`,
              animationDelay: `${i * 0.3}s`,
              top: `${(i / 30) * 100}%`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes scanline-rise {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Binary numbers floating
export const BinaryRain = () => {
  const [columns, setColumns] = useState<{ id: number; x: number; delay: number; duration: number; chars: string[] }[]>([]);
  
  useEffect(() => {
    const generateColumns = () => {
      const newColumns = [];
      const colCount = Math.floor(window.innerWidth / 60);
      
      for (let i = 0; i < colCount; i++) {
        const chars = [];
        const charCount = Math.floor(Math.random() * 8) + 4;
        for (let j = 0; j < charCount; j++) {
          chars.push(Math.random() > 0.5 ? "1" : "0");
        }
        
        newColumns.push({
          id: i,
          x: (i / colCount) * 100,
          delay: Math.random() * 10,
          duration: Math.random() * 10 + 15,
          chars,
        });
      }
      
      setColumns(newColumns);
    };
    
    generateColumns();
    window.addEventListener("resize", generateColumns);
    return () => window.removeEventListener("resize", generateColumns);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none z-[1] overflow-hidden">
      {columns.map((col) => (
        <div
          key={col.id}
          className="binary-column absolute font-mono text-xs"
          style={{
            left: `${col.x}%`,
            animation: `binary-rise ${col.duration}s linear infinite`,
            animationDelay: `${col.delay}s`,
            color: "#00ff88",
            opacity: 0.08,
            textShadow: "0 0 10px #00ff88",
          }}
        >
          {col.chars.map((char, i) => (
            <div key={i} className="leading-tight">{char}</div>
          ))}
        </div>
      ))}
      <style>{`
        @keyframes binary-rise {
          0% { bottom: -100px; opacity: 0; }
          5% { opacity: 0.08; }
          95% { opacity: 0.08; }
          100% { bottom: 100vh; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// Terminal cursor blinking
export const TerminalCursor = ({ className = "" }: { className?: string }) => {
  return (
    <span className={`inline-block ${className}`}>
      <span 
        className="inline-block w-3 h-6 bg-[#00ff88] ml-1"
        style={{
          animation: "terminal-blink 1s step-end infinite",
        }}
      />
      <style>{`
        @keyframes terminal-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

// Glitch effect that triggers periodically
export const PeriodicGlitch = ({ children, className = "" }: { children: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  
  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };
    
    // Initial delay
    const initialDelay = setTimeout(() => {
      triggerGlitch();
      // Then set interval for every 5 seconds
      const interval = setInterval(triggerGlitch, 5000);
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(initialDelay);
  }, []);
  
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      {isGlitching && (
        <>
          <span 
            className="absolute top-0 left-0 text-[#ff0033] z-0 opacity-80"
            style={{
              animation: "periodic-glitch-1 0.2s linear",
              clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
            }}
            aria-hidden
          >
            {children}
          </span>
          <span 
            className="absolute top-0 left-0 text-[#00ff88] z-0 opacity-80"
            style={{
              animation: "periodic-glitch-2 0.2s linear",
              clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
            }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
      <style>{`
        @keyframes periodic-glitch-1 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-5px, -2px); }
          40% { transform: translate(5px, 2px); }
          60% { transform: translate(-3px, 1px); }
          80% { transform: translate(3px, -1px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes periodic-glitch-2 {
          0% { transform: translate(0, 0); }
          20% { transform: translate(5px, 2px); }
          40% { transform: translate(-5px, -2px); }
          60% { transform: translate(3px, -1px); }
          80% { transform: translate(-3px, 1px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </span>
  );
};

// 3D Grid with perspective
export const PerspectiveGrid = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 h-[60%]"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(60deg)",
            transformOrigin: "50% 0%",
            background: `
              linear-gradient(90deg, transparent 0%, transparent 49.5%, rgba(0, 255, 136, 0.1) 49.5%, rgba(0, 255, 136, 0.1) 50.5%, transparent 50.5%, transparent 100%),
              linear-gradient(0deg, transparent 0%, transparent 49%, rgba(0, 255, 136, 0.08) 49%, rgba(0, 255, 136, 0.08) 51%, transparent 51%, transparent 100%)
            `,
            backgroundSize: "80px 80px",
            animation: "grid-scroll 20s linear infinite",
          }}
        />
      </div>
      <style>{`
        @keyframes grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 80px; }
        }
      `}</style>
    </div>
  );
};

// Data flow visualization
export const DataFlow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    
    interface DataPoint {
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      color: string;
    }
    
    const dataPoints: DataPoint[] = [];
    const maxPoints = 15;
    
    const colors = ["#00ff88", "#ff0033", "#00ff88"];
    
    const createDataPoint = () => {
      const side = Math.floor(Math.random() * 4);
      let x, y, targetX, targetY;
      
      switch (side) {
        case 0: // top
          x = Math.random() * canvas.width;
          y = 0;
          targetX = Math.random() * canvas.width;
          targetY = canvas.height;
          break;
        case 1: // right
          x = canvas.width;
          y = Math.random() * canvas.height;
          targetX = 0;
          targetY = Math.random() * canvas.height;
          break;
        case 2: // bottom
          x = Math.random() * canvas.width;
          y = canvas.height;
          targetX = Math.random() * canvas.width;
          targetY = 0;
          break;
        default: // left
          x = 0;
          y = Math.random() * canvas.height;
          targetX = canvas.width;
          targetY = Math.random() * canvas.height;
      }
      
      dataPoints.push({
        x,
        y,
        targetX,
        targetY,
        progress: 0,
        speed: Math.random() * 0.003 + 0.001,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    };
    
    // Initialize some points
    for (let i = 0; i < 5; i++) {
      createDataPoint();
    }
    
    let lastTime = 0;
    let animationId: number;
    
    const animate = (time: number) => {
      const delta = time - lastTime;
      
      // Add new points occasionally
      if (dataPoints.length < maxPoints && Math.random() < 0.01) {
        createDataPoint();
      }
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = dataPoints.length - 1; i >= 0; i--) {
        const dp = dataPoints[i];
        
        dp.progress += dp.speed * delta;
        
        if (dp.progress >= 1) {
          dataPoints.splice(i, 1);
          continue;
        }
        
        const currentX = dp.x + (dp.targetX - dp.x) * dp.progress;
        const currentY = dp.y + (dp.targetY - dp.y) * dp.progress;
        
        // Draw trailing line
        const trailLength = 0.15;
        const trailStart = Math.max(0, dp.progress - trailLength);
        const startX = dp.x + (dp.targetX - dp.x) * trailStart;
        const startY = dp.y + (dp.targetY - dp.y) * trailStart;
        
        const gradient = ctx.createLinearGradient(startX, startY, currentX, currentY);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, dp.color);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw point
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = dp.color;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(currentX, currentY, 6, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 6);
        glowGradient.addColorStop(0, dp.color + "80");
        glowGradient.addColorStop(1, "transparent");
        ctx.fillStyle = glowGradient;
        ctx.fill();
      }
      
      lastTime = time;
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
};

// Combined Hero Animations Component
export const HeroAnimations = () => {
  return (
    <>
      <ParticleNetwork />
      <Scanlines />
      <BinaryRain />
      <PerspectiveGrid />
      <DataFlow />
    </>
  );
};

export default HeroAnimations;
