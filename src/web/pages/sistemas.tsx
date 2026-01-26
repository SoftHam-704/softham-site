import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

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

const products = [
  {
    id: "01",
    name: "SalesMasters",
    subtitle: "Representação Comercial",
    tagline: "O sistema ideal para representantes comerciais de autopeças",
    color: "#00ff88",
    description: "Sistema desenvolvido especificamente para profissionais que atuam na área de Representação Comercial voltado para o setor de Autopeças (linha leve, pesada e agrícola).",
    features: [
      "Gestão completa de clientes e prospects",
      "Catálogo digital de produtos por marca",
      "Controle de pedidos e comissões",
      "Relatórios de vendas e metas",
      "Integração com sistema das fábricas",
      "App mobile para vendedores externos",
      "Dashboard de performance em tempo real",
      "Histórico completo de relacionamento",
    ],
    benefits: [
      "Aumente sua produtividade em 40%",
      "Elimine erros manuais em pedidos",
      "Tenha visão completa do seu negócio",
      "Acesse de qualquer lugar",
    ],
  },
  {
    id: "02",
    name: "Emissor Fiscal",
    subtitle: "Documentos Fiscais",
    tagline: "Emita NFe, NFCe, CTe e MDFe sem complicação",
    color: "#ff0033",
    description: "Ganhe mais tempo para gerir seu negócio. Emissão de MDFe, CTe, NFe e NFCe nunca foram tão simples. Sistema intuitivo e completo para todas as suas necessidades fiscais.",
    features: [
      "Emissão de NFe (Nota Fiscal Eletrônica)",
      "Emissão de NFCe (Nota Fiscal de Consumidor)",
      "Emissão de CTe (Conhecimento de Transporte)",
      "Emissão de MDFe (Manifesto de Documentos)",
      "Cancelamento e carta de correção",
      "Consulta de status na SEFAZ",
      "Backup automático em nuvem",
      "Suporte técnico especializado",
    ],
    benefits: [
      "Interface intuitiva e fácil",
      "Conformidade total com a legislação",
      "Atualizações automáticas",
      "Economia de tempo e recursos",
    ],
  },
  {
    id: "03",
    name: "SalesSpot",
    subtitle: "Comércios",
    tagline: "Solução completa para o varejo moderno",
    color: "#ffffff",
    description: "Sistema voltado para comércio em geral, atendendo às legislações fiscais, com emissor de NFe e NFCe, controle de estoque e financeiro integrados.",
    features: [
      "PDV completo e intuitivo",
      "Controle de estoque em tempo real",
      "Gestão financeira integrada",
      "Emissão de NFe e NFCe",
      "Controle de caixa e sangrias",
      "Relatórios gerenciais completos",
      "Gestão de fornecedores",
      "Cadastro ilimitado de produtos",
    ],
    benefits: [
      "Gestão simplificada do seu negócio",
      "Redução de perdas no estoque",
      "Controle financeiro preciso",
      "Atendimento mais rápido ao cliente",
    ],
  },
];

// Product Card
const ProductSection = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver();
  const isEven = index % 2 === 0;

  return (
    <section 
      ref={ref}
      className={`py-24 ${index === 0 ? "pt-40" : ""}`}
      style={{ background: index % 2 === 0 ? "#0a0a0a" : "#050505" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`grid lg:grid-cols-2 gap-16 items-start transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {/* Info side */}
          <div className={`${!isEven ? "lg:order-2" : ""}`}>
            <div className={`transform transition-all duration-700 delay-100 ${
              isVisible ? "translate-x-0" : isEven ? "-translate-x-20" : "translate-x-20"
            }`}>
              {/* Number */}
              <div 
                className="text-8xl font-black leading-none mb-6"
                style={{ color: `${product.color}20` }}
              >
                {product.id}
              </div>
              
              <h2 
                className="text-4xl md:text-6xl font-black tracking-tight"
                style={{ color: product.color }}
              >
                {product.name}
              </h2>
              <div className="text-white/40 text-sm font-bold tracking-widest uppercase mt-2">
                {product.subtitle}
              </div>
              <p className="text-white/60 text-xl mt-6 leading-relaxed max-w-xl">
                {product.description}
              </p>
              
              {/* Benefits */}
              <div className="mt-10 space-y-3">
                {product.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-2 h-2"
                      style={{ backgroundColor: product.color }}
                    />
                    <span className="text-white/80 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link
                href="/contato"
                className="inline-flex items-center gap-3 mt-10 px-8 py-4 font-black text-sm tracking-widest transition-all"
                style={{ 
                  backgroundColor: product.color,
                  color: product.color === "#ffffff" ? "#0a0a0a" : "#0a0a0a"
                }}
              >
                SOLICITAR DEMONSTRAÇÃO
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Features side */}
          <div className={`${!isEven ? "lg:order-1" : ""}`}>
            <div className={`transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-x-0 opacity-100" : isEven ? "translate-x-20 opacity-0" : "-translate-x-20 opacity-0"
            }`}>
              <div className="border border-white/10 p-8">
                <h3 className="text-white text-xs font-bold tracking-widest uppercase mb-6">
                  RECURSOS
                </h3>
                <div className="space-y-4">
                  {product.features.map((feature, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-4 py-3 border-b border-white/5 last:border-0"
                    >
                      <div 
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: product.color }}
                      />
                      <span className="text-white/60">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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

export default function Sistemas() {
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
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// NOSSOS SISTEMAS</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mt-4 leading-[0.9] tracking-tight">
            SOLUÇÕES<br/>
            <span className="text-white/20">COMPLETAS</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-2xl">
            Conheça nossos sistemas desenvolvidos com 30 anos de experiência para atender as necessidades reais do seu negócio.
          </p>
        </div>
      </section>

      {/* Products */}
      {products.map((product, index) => (
        <ProductSection key={product.id} product={product} index={index} />
      ))}

      <Footer />
    </div>
  );
}
