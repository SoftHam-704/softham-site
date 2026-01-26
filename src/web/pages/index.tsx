import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

// Custom cursor component
const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const checkHover = () => {
      const hovered = document.querySelectorAll(":hover");
      const isLink = Array.from(hovered).some(
        (el) => el.tagName === "A" || el.tagName === "BUTTON"
      );
      setIsHovering(isLink);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", checkHover);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", checkHover);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100"
        style={{ left: position.x, top: position.y }}
      >
        <div className={`w-full h-full rounded-full bg-white transition-transform duration-200 ${isHovering ? "scale-[3]" : "scale-100"}`} />
      </div>
      <div
        className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 border border-[#00ff88]/50 rounded-full transition-all duration-300"
        style={{ 
          left: position.x, 
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </div>
  );
};

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Glitch text effect
const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span className="absolute top-0 left-0 -translate-x-[2px] text-[#ff0033] opacity-70 animate-glitch1 z-0" aria-hidden>{children}</span>
      <span className="absolute top-0 left-0 translate-x-[2px] text-[#00ff88] opacity-70 animate-glitch2 z-0" aria-hidden>{children}</span>
    </span>
  );
};

// Animated counter
const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2500;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Minimal navigation
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
      scrolled ? "py-3" : "py-6"
    }`}>
      <div className={`mx-6 lg:mx-12 flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5" : ""
      }`}>
        <a href="#" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-white">SOFT</span>
            <span className="text-[#00ff88]">HAM</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "HOME", href: "/", isRoute: true },
            { label: "SISTEMAS", href: "/sistemas", isRoute: true },
            { label: "TUTORIAIS", href: "/tutoriais", isRoute: true },
            { label: "CONTATO", href: "/contato", isRoute: true },
          ].map((item) => (
            item.isRoute ? (
              <Link
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-white/60 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 text-white/60 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
              >
                {item.label}
              </a>
            )
          ))}
        </div>

        <a
          href="http://wa.me/5567996078885"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-2.5 bg-[#00ff88] text-[#0a0a0a] font-black text-xs tracking-widest hover:bg-white transition-colors overflow-hidden group"
          style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        >
          CONTATO
        </a>
      </div>
    </nav>
  );
};

// Hero with split diagonal and code background
const HeroSection = () => {
  const [textIndex, setTextIndex] = useState(0);
  const dynamicTexts = ["INOVAÇÃO", "SOLUÇÕES", "TECNOLOGIA", "CONFIANÇA"];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % dynamicTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#0a0a0a]">
      {/* Code background */}
      <div className="absolute inset-0 opacity-[0.03] font-mono text-[10px] leading-tight overflow-hidden select-none pointer-events-none">
        <div className="animate-scroll-code whitespace-pre">
          {Array(50).fill(null).map((_, i) => (
            <div key={i} className="text-white/50">
              {`const cliente = new SoftHam({ solucao: true, anos: 30 });`}<br/>
              {`function transformarNegocio(empresa) { return success; }`}<br/>
              {`// SalesMasters | Emissor Fiscal | SalesSpot`}<br/>
              {`await softham.connect({ cidade: 'Campo Grande/MS' });`}<br/>
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal split */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0a0a0a] to-transparent" style={{ clipPath: "polygon(0 0, 70% 0, 40% 100%, 0 100%)" }} />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00ff88]/5" style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 20% 100%)" }} />
      </div>

      {/* Giant 30 */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 text-[40vw] font-black text-white/[0.02] leading-none select-none pointer-events-none">
        30
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-6 lg:px-20 py-32">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div className="space-y-8">
              <div className="animate-slide-in-left">
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="h-px w-12 bg-[#ff0033]" />
                  <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Desde 1994</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.85] tracking-tighter">
                  <span className="text-white block">SOFT</span>
                  <span className="text-[#00ff88] block">HAM</span>
                  <span className="text-white/30 text-3xl md:text-4xl font-light tracking-normal block mt-4">SISTEMAS</span>
                </h1>
              </div>

              <p className="text-white/50 text-lg max-w-md leading-relaxed animate-fade-in-delayed">
                Três décadas transformando desafios empresariais em
                <span className="text-[#00ff88] font-semibold"> {dynamicTexts[textIndex]}</span>
              </p>

              <div className="flex flex-wrap gap-4 animate-fade-in-delayed-2">
                <a
                  href="http://wa.me/5567996078885"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-wider hover:bg-white transition-all"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  FALE CONOSCO
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#0a0a0a] group-hover:w-full transition-all duration-300" />
                </a>
                <a
                  href="#servicos"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/10 text-white/60 hover:text-white hover:border-[#00ff88] font-bold text-sm tracking-wider transition-all"
                >
                  EXPLORAR
                  <span className="text-[#00ff88]">↓</span>
                </a>
              </div>
            </div>

            {/* Right - Big number */}
            <div className="hidden lg:flex items-center justify-end">
              <div className="relative">
                <div className="text-[20rem] font-black text-transparent leading-none" style={{ WebkitTextStroke: "2px rgba(0,255,136,0.3)" }}>
                  30
                </div>
                <div className="absolute bottom-0 right-0 text-right">
                  <span className="text-white/20 text-sm font-bold tracking-widest block">ANOS DE</span>
                  <span className="text-[#00ff88] text-2xl font-black tracking-tight">MERCADO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-[0.3em] font-bold">SCROLL</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#00ff88] to-transparent animate-pulse" />
      </div>
    </section>
  );
};

// About section with asymmetric layout
const AboutSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="sobre" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      {/* Accent line */}
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-[#ff0033] to-transparent" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`grid lg:grid-cols-12 gap-12 items-start transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Left - Title area */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className={`transform transition-all duration-700 delay-100 ${isVisible ? "translate-x-0" : "-translate-x-20"}`}>
              <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// SOBRE NÓS</span>
              <h2 className="text-4xl md:text-6xl font-black text-white mt-4 leading-[0.9] tracking-tight">
                HUMANOS<br/>
                <span className="text-[#00ff88]">CRIANDO</span><br/>
                SOLUÇÕES
              </h2>
              
              <div className="mt-12 grid grid-cols-2 gap-6">
                <div className="border-l-2 border-[#00ff88] pl-4">
                  <div className="text-5xl font-black text-white">
                    <Counter target={30} />
                  </div>
                  <div className="text-white/40 text-xs tracking-widest mt-1 uppercase">Anos</div>
                </div>
                <div className="border-l-2 border-[#ff0033] pl-4">
                  <div className="text-5xl font-black text-white">
                    <Counter target={100} suffix="+" />
                  </div>
                  <div className="text-white/40 text-xs tracking-widest mt-1 uppercase">Clientes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className={`lg:col-span-7 transform transition-all duration-700 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
            <div className="space-y-8 text-lg text-white/60 leading-relaxed">
              <p className="text-xl text-white/80">
                Empresa de Software sediada em <span className="text-[#00ff88] font-semibold">Campo Grande/MS</span>, operando há <span className="text-[#00ff88] font-semibold">30 anos</span> na área de desenvolvimento de softwares.
              </p>
              <p>
                Desde a sua inauguração, possui foco principal no atendimento das demandas das empresas e seus desafios.
              </p>
              <p className="relative pl-6 border-l-2 border-[#00ff88]/30">
                Nós, diferentemente dos robôs, não trabalhamos apenas com nossos cérebros. Somos <span className="text-white font-medium">humanos com um amor estranho por tecnologia</span> e imenso amor por soluções.
              </p>
              <p>
                Nós somos uma empresa orientada para você. Trabalhamos para o cliente do cliente.
              </p>
              <p className="text-2xl text-white font-bold tracking-tight">
                Entendemos você e suas necessidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Services with broken grid
const services = [
  {
    id: "01",
    title: "SalesMasters",
    subtitle: "Representação Comercial",
    description: "Sistema desenvolvido especificamente para profissionais que atuam na área de Representação Comercial voltado para o setor de Autopeças (linha leve, pesada e agrícola).",
    color: "#00ff88",
  },
  {
    id: "02",
    title: "Emissor Fiscal",
    subtitle: "Documentos Fiscais",
    description: "Ganhe mais tempo para gerir seu negócio. Emissão de MDFe, CTe, NFe e NFCe nunca foram tão simples. Sistema intuitivo e completo.",
    color: "#ff0033",
  },
  {
    id: "03",
    title: "SalesSpot",
    subtitle: "Comércios",
    description: "Sistema voltado para comércio em geral, atendendo às legislações fiscais, com emissor de NFe e NFCe, controle de estoque e financeiro integrados.",
    color: "#fff",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="servicos" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`mb-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// NOSSOS SERVIÇOS</span>
          <h2 className="text-4xl md:text-7xl font-black text-white mt-4 leading-[0.9] tracking-tight max-w-3xl">
            SOLUÇÕES QUE<br/>
            <span className="text-white/20">TRANSFORMAM</span>
          </h2>
        </div>

        {/* Asymmetric card grid */}
        <div className="space-y-6">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative transition-all duration-700 ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                marginLeft: index === 1 ? "auto" : index === 2 ? "5%" : "0",
                marginRight: index === 0 ? "auto" : index === 1 ? "0" : "auto",
                maxWidth: index === 1 ? "90%" : "85%",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                className={`relative p-8 md:p-12 border border-white/5 hover:border-white/20 transition-all duration-500 ${
                  hoveredIndex === index ? "bg-white/5" : "bg-white/[0.02]"
                }`}
              >
                {/* Number */}
                <div 
                  className="absolute -top-6 -left-3 text-8xl font-black leading-none transition-colors duration-300"
                  style={{ color: hoveredIndex === index ? service.color : "rgba(255,255,255,0.05)" }}
                >
                  {service.id}
                </div>
                
                <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-2">
                    <h3 
                      className="text-3xl md:text-4xl font-black tracking-tight transition-colors duration-300"
                      style={{ color: hoveredIndex === index ? service.color : "white" }}
                    >
                      {service.title}
                    </h3>
                    <div className="text-white/40 text-sm font-bold tracking-widest uppercase mt-2">{service.subtitle}</div>
                    <p className="text-white/50 mt-4 max-w-xl leading-relaxed">{service.description}</p>
                  </div>
                  <div className="flex justify-end">
                    <a
                      href="#contato"
                      className="group/btn flex items-center gap-3 px-6 py-3 border transition-all duration-300"
                      style={{ borderColor: hoveredIndex === index ? service.color : "rgba(255,255,255,0.1)" }}
                    >
                      <span className="text-white/60 group-hover/btn:text-white text-sm font-bold tracking-wider transition-colors">SAIBA MAIS</span>
                      <span 
                        className="text-lg transition-transform duration-300 group-hover/btn:translate-x-1"
                        style={{ color: service.color }}
                      >
                        →
                      </span>
                    </a>
                  </div>
                </div>

                {/* Accent bar */}
                <div 
                  className="absolute bottom-0 left-0 h-1 transition-all duration-500"
                  style={{ 
                    backgroundColor: service.color,
                    width: hoveredIndex === index ? "100%" : "0%"
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clients with spotlight effect
const clientLogos = [
  { url: "https://softham.com.br/wp-content/uploads/2024/10/logofinal-fundobranco3-1-875x492-1-300x169.jpg", name: "Target" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/soma2-297x133-1.png", name: "Soma" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/dama-2-780x431-1-300x166.jpg", name: "Damasceno" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/tdm-297x133-297x133-1.png", name: "TDM Tresita" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/bissao-1-297x133-1.jpg", name: "Bissão-10" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/logo-nds-pequena2-297x133-1.png", name: "NDS" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/metta-297x123-1.png", name: "Metta" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/moraes-623x361-1-300x174.jpg", name: "Moraes" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/tmb-1234-271x146-1.jpg", name: "TMB" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/garra2-297x186-1.png", name: "Garra" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/willames-392x151-1-300x116.jpg", name: "Willames" },
  { url: "https://softham.com.br/wp-content/uploads/2024/10/rm-293x135-1.png", name: "RM" },
];

const ClientsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="clientes" className="relative py-32 bg-[#0a0a0a] overflow-hidden">
      <div ref={ref} className="relative max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// NOSSOS CLIENTES</span>
          <h2 className="text-3xl md:text-5xl font-black text-white mt-4 leading-tight tracking-tight max-w-3xl mx-auto">
            QUEM <span className="text-[#00ff88]">CONFIA</span> EM NÓS
          </h2>
          <p className="text-white/40 mt-6 max-w-2xl mx-auto italic text-lg">
            "Acreditamos que um trabalho não deve parecer trabalho, essa realização profissional floresce quando pessoas talentosas se reúnem para criar coisas incríveis."
          </p>
        </div>

        {/* Client logos - uniform grid with fixed dimensions */}
        <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {clientLogos.map((client, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index ? "opacity-30 scale-95" : "opacity-100"
              }`}
              style={{ transitionDelay: `${index * 30}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Fixed size container - all cards exactly the same */}
              <div className="w-full h-24 bg-white/[0.03] border border-white/10 rounded-lg transition-all duration-300 group-hover:border-[#00ff88]/50 group-hover:bg-white/[0.08] flex items-center justify-center p-4 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={client.url}
                    alt={client.name}
                    className="max-w-[90%] max-h-[90%] object-contain opacity-70 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
              {/* Spotlight effect */}
              {hoveredIndex === index && (
                <div className="absolute -inset-4 bg-[#00ff88]/10 blur-2xl rounded-full pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact section
const ContactSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contato" className="relative py-32 bg-[#050505] overflow-hidden">
      {/* Accent elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#00ff88]/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-px h-1/2 bg-gradient-to-t from-[#ff0033] to-transparent" />
      
      <div ref={ref} className="relative max-w-5xl mx-auto px-6 lg:px-20">
        <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Left */}
          <div className="lg:sticky lg:top-32">
            <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// CONTATO</span>
            <h2 className="text-4xl md:text-6xl font-black text-white mt-4 leading-[0.9] tracking-tight">
              VAMOS<br/>
              <span className="text-[#ff0033]">CONVERSAR</span>
            </h2>
            <p className="text-white/50 mt-6 text-lg max-w-md">
              Envie seus dados e entraremos em contato o mais rápido possível!
            </p>
            
            <div className="mt-12 space-y-4">
              <a href="tel:5567996078885" className="flex items-center gap-4 text-white/60 hover:text-[#00ff88] transition-colors group">
                <div className="w-12 h-12 border border-white/10 group-hover:border-[#00ff88] flex items-center justify-center transition-colors">
                  <span className="text-lg">📞</span>
                </div>
                <span className="font-bold">(67) 9 9607-8885</span>
              </a>
              <a href="mailto:hamilton@softham.com.br" className="flex items-center gap-4 text-white/60 hover:text-[#00ff88] transition-colors group">
                <div className="w-12 h-12 border border-white/10 group-hover:border-[#00ff88] flex items-center justify-center transition-colors">
                  <span className="text-lg">✉️</span>
                </div>
                <span className="font-bold">hamilton@softham.com.br</span>
              </a>
            </div>
          </div>

          {/* Right - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              {[
                { name: "nome", label: "NOME", type: "text", placeholder: "Seu nome" },
                { name: "telefone", label: "TELEFONE", type: "tel", placeholder: "(00) 00000-0000" },
                { name: "email", label: "E-MAIL", type: "email", placeholder: "seu@email.com" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                    focused === field.name ? "text-[#00ff88]" : "text-white/40"
                  }`}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    onFocus={() => setFocused(field.name)}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="relative">
                <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                  focused === "mensagem" ? "text-[#00ff88]" : "text-white/40"
                }`}>
                  MENSAGEM
                </label>
                <textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  onFocus={() => setFocused("mensagem")}
                  onBlur={() => setFocused(null)}
                  required
                  rows={4}
                  className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                  placeholder="Como podemos ajudá-lo?"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="w-full mt-8 py-5 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-widest hover:bg-white transition-colors disabled:opacity-50"
              >
                {submitted ? "MENSAGEM ENVIADA ✓" : "ENVIAR MENSAGEM"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const links = [
    { label: "HOME", href: "/", isRoute: true },
    { label: "SISTEMAS", href: "/sistemas", isRoute: true },
    { label: "TUTORIAIS", href: "/tutoriais", isRoute: true },
    { label: "CONTATO", href: "/contato", isRoute: true },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Logo */}
          <div>
            <div className="text-3xl font-black tracking-tighter">
              <span className="text-white">SOFT</span>
              <span className="text-[#00ff88]">HAM</span>
            </div>
            <p className="text-white/40 mt-4 text-sm leading-relaxed max-w-xs">
              30 anos desenvolvendo soluções de software que transformam negócios em Campo Grande/MS e em todo o Brasil.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6">
            {links.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/40 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/40 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <a href="tel:5567996078885" className="text-white/40 hover:text-[#00ff88] transition-colors text-sm">
              (67) 9 9607-8885
            </a>
            <a href="mailto:hamilton@softham.com.br" className="text-white/40 hover:text-[#00ff88] transition-colors text-sm">
              hamilton@softham.com.br
            </a>
            <a
              href="https://www.youtube.com/@hamiltonrodrigues7499"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-[#ff0033] transition-colors text-sm"
            >
              YouTube
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} SOFTHAM SISTEMAS — TODOS OS DIREITOS RESERVADOS
          </p>
          <div className="text-white/30 text-xs tracking-wider">
            CAMPO GRANDE/MS
          </div>
        </div>
      </div>
    </footer>
  );
};

function Index() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] cursor-none lg:cursor-none">
      <style>{`
        @keyframes glitch1 {
          0%, 100% { transform: translateX(-2px); }
          50% { transform: translateX(2px); }
        }
        @keyframes glitch2 {
          0%, 100% { transform: translateX(2px); }
          50% { transform: translateX(-2px); }
        }
        @keyframes scroll-code {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fade-in-delayed {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-glitch1 {
          animation: glitch1 0.3s ease-in-out infinite;
        }
        .animate-glitch2 {
          animation: glitch2 0.3s ease-in-out infinite;
          animation-delay: 0.15s;
        }
        .animate-scroll-code {
          animation: scroll-code 60s linear infinite;
        }
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out forwards;
        }
        .animate-fade-in-delayed {
          animation: fade-in-delayed 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-delayed-2 {
          animation: fade-in-delayed 0.8s ease-out 0.5s forwards;
          opacity: 0;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        ::selection {
          background: #00ff88;
          color: #0a0a0a;
        }
        
        * {
          cursor: none !important;
        }
        
        @media (max-width: 1023px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <CustomCursor />
      <NavBar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ClientsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default Index;
