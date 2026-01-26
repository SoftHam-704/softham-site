import { useState, useEffect, useRef } from "react";

const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

const Counter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useIntersectionObserver();

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
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

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-slate-900/90 backdrop-blur-xl shadow-2xl shadow-emerald-500/10" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-shadow">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">SoftHam</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {["Home", "Sobre", "Serviços", "Clientes", "Contato"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium tracking-wide"
            >
              {item}
            </a>
          ))}
        </div>
        <a
          href="http://wa.me/5567996078885"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105"
        >
          WhatsApp
        </a>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-red-900/10 via-transparent to-transparent" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-400 text-sm font-medium">30 anos transformando negócios</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight animate-fade-in-up animation-delay-100">
          Soft<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">Ham</span>
          <br />
          <span className="text-4xl md:text-5xl lg:text-6xl text-slate-400 font-light">Sistemas</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up animation-delay-200">
          Há <span className="text-emerald-400 font-semibold">três décadas</span> desenvolvendo soluções que impulsionam o crescimento de empresas em todo o Brasil
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-300">
          <a
            href="http://wa.me/5567996078885"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-105 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg className="relative w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="relative">Fale Conosco</span>
          </a>
          <a
            href="#servicos"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 hover:bg-slate-800/50 transition-all font-semibold text-lg"
          >
            Nossos Serviços
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-emerald-500 rounded-full animate-scroll" />
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="sobre" className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/5 via-transparent to-transparent" />
      
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className={`grid md:grid-cols-2 gap-16 items-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Sobre Nós</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Mais que software,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">soluções humanas</span>
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                Empresa de Software sediada em <span className="text-white font-medium">Campo Grande/MS</span>, operando há <span className="text-emerald-400 font-medium">30 anos</span> na área de desenvolvimento de softwares.
              </p>
              <p>
                Desde a sua inauguração, possui foco principal no atendimento das demandas das empresas e seus desafios.
              </p>
              <p>
                Nós, diferentemente dos robôs, não trabalhamos apenas com nossos cérebros. Somos <span className="text-white font-medium">humanos com um amor estranho por tecnologia</span> e imenso amor por soluções.
              </p>
              <p>
                Nós somos uma empresa orientada para você. Trabalhamos para o cliente do cliente. <span className="text-emerald-400 font-medium">Entendemos você e suas necessidades.</span>
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-50" />
            <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 rounded-2xl bg-slate-800/50">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500 mb-2">
                    <Counter target={30} />
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Anos de Mercado</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-slate-800/50">
                  <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500 mb-2">
                    <Counter target={100} suffix="+" />
                  </div>
                  <div className="text-slate-400 text-sm font-medium">Clientes Ativos</div>
                </div>
                <div className="col-span-2 text-center p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-red-500/10 border border-emerald-500/20">
                  <div className="text-slate-300 text-sm">
                    "A realização profissional é apenas o começo."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const services = [
  {
    title: "SalesMasters",
    subtitle: "Representação Comercial",
    description: "Sistema desenvolvido especificamente para profissionais que atuam na área de Representação Comercial voltado para o setor de Autopeças (linha leve, pesada e agrícola).",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    title: "Emissor Fiscal",
    subtitle: "Documentos Fiscais",
    description: "Ganhe mais tempo para gerir seu negócio. Emissão de MDFe, CTe, NFe e NFCe nunca foram tão simples. Sistema intuitivo e completo.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-red-500 to-rose-600",
  },
  {
    title: "SalesSpot",
    subtitle: "Comércios",
    description: "Sistema voltado para comércio em geral, atendendo às legislações fiscais, com emissor de NFe e NFCe, controle de estoque e financeiro integrados.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600",
  },
];

const ServicesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="servicos" className="relative py-32 bg-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:80px_80px]" />
      
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Nossos Serviços</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Soluções que <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">transformam</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Softwares desenvolvidos com expertise de 30 anos para atender as necessidades reais do seu negócio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative transition-all duration-700 delay-${index * 100} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/50 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              <div className="relative h-full bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 hover:border-emerald-500/30 transition-all hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6 shadow-lg`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{service.title}</h3>
                <div className="text-emerald-400 text-sm font-medium mb-4">{service.subtitle}</div>
                <p className="text-slate-400 leading-relaxed">{service.description}</p>
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <a href="#contato" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors group/link">
                    Saiba mais
                    <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const clientLogos = [
  "https://softham.com.br/wp-content/uploads/2024/10/logofinal-fundobranco3-1-875x492-1-300x169.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/soma2-297x133-1.png",
  "https://softham.com.br/wp-content/uploads/2024/10/dama-2-780x431-1-300x166.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/tdm-297x133-297x133-1.png",
  "https://softham.com.br/wp-content/uploads/2024/10/bissao-1-297x133-1.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/logo-nds-pequena2-297x133-1.png",
  "https://softham.com.br/wp-content/uploads/2024/10/metta-297x123-1.png",
  "https://softham.com.br/wp-content/uploads/2024/10/moraes-623x361-1-300x174.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/tmb-1234-271x146-1.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/garra2-297x186-1.png",
  "https://softham.com.br/wp-content/uploads/2024/10/willames-392x151-1-300x116.jpg",
  "https://softham.com.br/wp-content/uploads/2024/10/rm-293x135-1.png",
];

const ClientsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="clientes" className="relative py-32 bg-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
      
      <div ref={ref} className="relative max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Nossos Clientes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Quem <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">confia</span> em nós
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto italic">
            "Acreditamos que um trabalho não deve parecer trabalho, essa realização profissional floresce quando pessoas talentosas se reúnem para criar coisas incríveis."
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="group relative bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-slate-700/30 hover:border-emerald-500/30 hover:bg-white/10 transition-all flex items-center justify-center aspect-[4/3]"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <img
                src={logo}
                alt={`Cliente ${index + 1}`}
                className="max-w-full max-h-full object-contain filter grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contato" className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/10 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      
      <div ref={ref} className="relative max-w-4xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
            <span className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Contato</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-500">conversar</span>
          </h2>
          <p className="text-xl text-slate-400">
            Envie seus dados e entraremos em contato o mais rápido possível!
          </p>
        </div>

        <div className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-red-500/20 rounded-3xl blur-2xl opacity-50" />
            <form
              onSubmit={handleSubmit}
              className="relative bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-slate-300 text-sm font-medium mb-2">E-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all"
                  placeholder="seu@email.com"
                />
              </div>
              <div className="mb-8">
                <label className="block text-slate-300 text-sm font-medium mb-2">Mensagem</label>
                <textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all resize-none"
                  placeholder="Como podemos ajudá-lo?"
                />
              </div>
              <button
                type="submit"
                disabled={submitted}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitted ? "Mensagem Enviada! ✓" : "Enviar Mensagem"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const links = [
    { label: "Home", href: "#home" },
    { label: "Sistemas", href: "#servicos" },
    { label: "Tutoriais", href: "https://www.youtube.com/@hamiltonrodrigues7499", external: true },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <span className="text-white font-bold text-2xl">SoftHam</span>
                <span className="text-slate-400 text-2xl"> Sistemas</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed">
              30 anos desenvolvendo soluções de software que transformam negócios em Campo Grande/MS e em todo o Brasil.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <div className="space-y-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <a
                href="tel:5567996078885"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (67) 9 9607-8885
              </a>
              <a
                href="mailto:hamilton@softham.com.br"
                className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hamilton@softham.com.br
              </a>
              <a
                href="https://www.youtube.com/@hamiltonrodrigues7499"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} SoftHam Sistemas. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Campo Grande/MS</span>
            <span>•</span>
            <span>(67) 9 9607-8885</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

function Index() {
  return (
    <div className="min-h-screen bg-slate-950">
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(6px);
            opacity: 0.5;
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-100 {
          animation-delay: 0.1s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }
        
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
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
