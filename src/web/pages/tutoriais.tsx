import { useState, useEffect } from "react";
import { Link } from "wouter";

// Custom cursor
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
    </div>
  );
};

// Navigation
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
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black tracking-tighter">
            <span className="text-white">SOFT</span>
            <span className="text-[#00ff88]">HAM</span>
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-1">
          {[
            { label: "HOME", href: "/" },
            { label: "SISTEMAS", href: "/sistemas" },
            { label: "TUTORIAIS", href: "/tutoriais" },
            { label: "CONTATO", href: "/contato" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-4 py-2 text-white/60 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <a
          href="http://wa.me/5567996078885"
          target="_blank"
          rel="noopener noreferrer"
          className="relative px-6 py-2.5 bg-[#00ff88] text-[#0a0a0a] font-black text-xs tracking-widest hover:bg-white transition-colors"
          style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        >
          WHATSAPP
        </a>
      </div>
    </nav>
  );
};

const tutorials = [
  {
    title: "Primeiros Passos com SalesMasters",
    description: "Aprenda como configurar e começar a usar o sistema SalesMasters para representação comercial.",
    category: "SalesMasters",
    duration: "15 min",
    color: "#00ff88",
  },
  {
    title: "Emissão de NFe Passo a Passo",
    description: "Tutorial completo para emitir sua primeira Nota Fiscal Eletrônica no sistema.",
    category: "Emissor Fiscal",
    duration: "10 min",
    color: "#ff0033",
  },
  {
    title: "Configurando o SalesSpot",
    description: "Como configurar o PDV, cadastrar produtos e iniciar suas vendas no SalesSpot.",
    category: "SalesSpot",
    duration: "20 min",
    color: "#ffffff",
  },
  {
    title: "Controle de Estoque",
    description: "Gerencie seu estoque de forma eficiente com dicas e truques do sistema.",
    category: "SalesSpot",
    duration: "12 min",
    color: "#ffffff",
  },
  {
    title: "Emissão de CTe e MDFe",
    description: "Guia completo para transportadoras emitirem documentos de transporte.",
    category: "Emissor Fiscal",
    duration: "18 min",
    color: "#ff0033",
  },
  {
    title: "Relatórios e Dashboards",
    description: "Extraia insights valiosos dos relatórios gerenciais do seu sistema.",
    category: "Todos",
    duration: "8 min",
    color: "#00ff88",
  },
];

const docs = [
  {
    title: "Manual do SalesMasters",
    description: "Documentação completa do sistema de representação comercial.",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    title: "Guia do Emissor Fiscal",
    description: "Passo a passo para todas as funcionalidades fiscais.",
    format: "PDF",
    size: "1.8 MB",
  },
  {
    title: "Manual do SalesSpot",
    description: "Documentação completa do sistema para comércio.",
    format: "PDF",
    size: "3.1 MB",
  },
  {
    title: "FAQ - Perguntas Frequentes",
    description: "Respostas para as dúvidas mais comuns dos usuários.",
    format: "PDF",
    size: "850 KB",
  },
];

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-3xl font-black tracking-tighter">
            <span className="text-white">SOFT</span>
            <span className="text-[#00ff88]">HAM</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {[
              { label: "HOME", href: "/" },
              { label: "SISTEMAS", href: "/sistemas" },
              { label: "TUTORIAIS", href: "/tutoriais" },
              { label: "CONTATO", href: "/contato" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/40 hover:text-[#00ff88] transition-colors text-xs font-bold tracking-widest"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="text-white/30 text-xs tracking-wider">
            © {new Date().getFullYear()} SOFTHAM
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function Tutoriais() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const categories = ["Todos", "SalesMasters", "Emissor Fiscal", "SalesSpot"];

  const filteredTutorials = selectedCategory === "Todos" 
    ? tutorials 
    : tutorials.filter(t => t.category === selectedCategory || t.category === "Todos");

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: #00ff88; color: #0a0a0a; }
        * { cursor: none !important; }
        @media (max-width: 1023px) { * { cursor: auto !important; } }
      `}</style>
      <CustomCursor />
      <NavBar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// TUTORIAIS</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mt-4 leading-[0.9] tracking-tight">
            APRENDA<br/>
            <span className="text-white/20">CONOSCO</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-2xl">
            Vídeos tutoriais e documentação para você aproveitar ao máximo nossos sistemas.
          </p>
        </div>
      </section>

      {/* YouTube CTA */}
      <section className="px-6 lg:px-20 pb-16">
        <div className="max-w-7xl mx-auto">
          <a
            href="https://www.youtube.com/@hamiltonrodrigues7499"
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-white/10 hover:border-[#ff0033] transition-all p-8"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 flex items-center justify-center bg-[#ff0033] group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <path fill="#0a0a0a" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-black text-white group-hover:text-[#ff0033] transition-colors">
                  CANAL NO YOUTUBE
                </h3>
                <p className="text-white/50 mt-2">
                  Acesse nosso canal para vídeos tutoriais completos e novidades sobre os sistemas.
                </p>
              </div>
              <div className="md:ml-auto">
                <span className="inline-flex items-center gap-2 px-6 py-3 border border-[#ff0033] text-[#ff0033] font-bold text-sm tracking-widest group-hover:bg-[#ff0033] group-hover:text-white transition-all">
                  ACESSAR
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Tutorials */}
      <section className="py-16 px-6 lg:px-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// VÍDEO TUTORIAIS</span>
              <h2 className="text-3xl font-black text-white mt-2">APRENDA NA PRÁTICA</h2>
            </div>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest transition-all ${
                    selectedCategory === cat
                      ? "bg-[#00ff88] text-[#0a0a0a]"
                      : "border border-white/10 text-white/50 hover:border-white/30"
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial, index) => (
              <div
                key={index}
                className="group border border-white/10 hover:border-white/30 p-6 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-xs font-bold tracking-widest"
                    style={{ color: tutorial.color }}
                  >
                    {tutorial.category.toUpperCase()}
                  </span>
                  <span className="text-white/30 text-xs">{tutorial.duration}</span>
                </div>
                <h3 className="text-xl font-black text-white group-hover:text-[#00ff88] transition-colors">
                  {tutorial.title}
                </h3>
                <p className="text-white/50 mt-3 text-sm leading-relaxed">
                  {tutorial.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-[#00ff88] font-bold text-sm group-hover:gap-3 transition-all">
                  <span>ASSISTIR</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-24 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// DOCUMENTAÇÃO</span>
          <h2 className="text-3xl font-black text-white mt-2 mb-12">MANUAIS E GUIAS</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {docs.map((doc, index) => (
              <div
                key={index}
                className="group flex items-center gap-6 border border-white/10 hover:border-[#00ff88] p-6 transition-all"
              >
                <div className="w-16 h-16 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] group-hover:bg-[#00ff88]/10 transition-all">
                  <span className="text-white/60 group-hover:text-[#00ff88] text-xs font-bold">{doc.format}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-white group-hover:text-[#00ff88] transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-white/50 text-sm mt-1">{doc.description}</p>
                  <span className="text-white/30 text-xs mt-2 block">{doc.size}</span>
                </div>
                <span className="text-[#00ff88] text-xl group-hover:translate-x-1 transition-transform">↓</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 lg:px-20 bg-[#050505]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            NÃO ENCONTROU O QUE PROCURA?
          </h2>
          <p className="text-white/50 text-lg mt-6 mb-10">
            Entre em contato com nosso suporte técnico. Estamos prontos para ajudar!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="http://wa.me/5567996078885"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-widest hover:bg-white transition-colors"
            >
              FALAR NO WHATSAPP
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
            >
              ENVIAR MENSAGEM
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
