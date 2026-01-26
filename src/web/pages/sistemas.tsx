import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";
import { trackSaibaMaisClick } from "../lib/analytics";

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

const products = [
  {
    id: "01",
    name: "SalesMasters",
    subtitle: "Representação Comercial",
    tagline: "O sistema ideal para representantes comerciais de autopeças",
    color: "#00ff88",
    icon: "🚗",
    featured: false,
    link: "/salesmaster",
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
    icon: "📄",
    featured: false,
    link: "/emissor-fiscal",
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
    icon: "🏪",
    featured: false,
    link: "/salesspot",
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
  {
    id: "04",
    name: "Strudent-App",
    subtitle: "Gestão Escolar",
    tagline: "Transforme a administração da sua escola",
    color: "#FFD700",
    icon: "🎓",
    featured: true,
    isNew: true,
    link: "/strudent-app",
    description: "Solução completa para gestão escolar desenvolvida para instituições com até 600 alunos. Simplifique o gerenciamento de matrículas, notas, frequência, mensalidades e comunicação com pais. Interface intuitiva que transforma a administração escolar em um processo ágil e eficiente. Controle financeiro integrado, emissão de boletins, relatórios pedagógicos e muito mais em uma única plataforma.",
    features: [
      "Gestão completa de matrículas",
      "Controle de notas e boletins",
      "Registro de frequência digital",
      "Gestão de mensalidades e financeiro",
      "Comunicação com pais e responsáveis",
      "Relatórios pedagógicos avançados",
      "Agenda escolar digital",
      "Portal do aluno e responsável",
    ],
    benefits: [
      "Suporte para até 600 alunos",
      "Elimine papelada e burocracia",
      "Comunicação instantânea com pais",
      "Gestão financeira simplificada",
    ],
  },
];

// Hero Section
const HeroSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end pb-20 pt-40 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 text-[25vw] font-black text-white/[0.02] leading-none select-none">
          SYS
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
      </div>
      
      {/* Floating shapes */}
      <div className="absolute top-1/3 right-1/4 w-40 h-40 border border-[#00ff88]/10 rotate-45 animate-pulse" />
      <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#ff0033]/5 rounded-full blur-xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Label */}
          <div className={`flex items-center gap-4 mb-8 transform transition-all duration-700 delay-100 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="w-12 h-px bg-[#00ff88]" />
            <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">
              // TECNOLOGIA QUE TRANSFORMA
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[0.85] tracking-tight transform transition-all duration-700 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}>
            NOSSOS
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ff88]/50">
                SISTEMAS
              </span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M0 6C50 0 100 12 150 6C200 0 250 12 300 6" stroke="#00ff88" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          
          {/* Description */}
          <p className={`text-white/50 text-xl md:text-2xl mt-10 max-w-2xl leading-relaxed transform transition-all duration-700 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            30 anos de experiência traduzidos em soluções que 
            <span className="text-white"> resolvem problemas reais </span>
            e impulsionam seu negócio.
          </p>
          
          {/* Stats */}
          <div className={`flex gap-12 mt-12 transform transition-all duration-700 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#00ff88]">4</div>
              <div className="text-white/40 text-sm font-medium tracking-wider mt-1">SOLUÇÕES</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-4xl md:text-5xl font-black text-white">100+</div>
              <div className="text-white/40 text-sm font-medium tracking-wider mt-1">CLIENTES</div>
            </div>
            <div className="w-px bg-white/10" />
            <div>
              <div className="text-4xl md:text-5xl font-black text-[#ff0033]">30</div>
              <div className="text-white/40 text-sm font-medium tracking-wider mt-1">ANOS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const { ref, isVisible } = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);
  
  // Vary card sizes for visual interest
  const isFeatured = product.featured || index === 0;
  
  return (
    <div 
      ref={ref}
      className={`relative group ${isFeatured ? "lg:col-span-2 lg:row-span-2" : ""}`}
      style={{ 
        animationDelay: `${index * 150}ms`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`relative h-full border border-white/10 overflow-hidden transition-all duration-700 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
        } ${isHovered ? "border-white/20" : ""}`}
        style={{ 
          transitionDelay: `${index * 100}ms`,
          background: `linear-gradient(135deg, ${product.color}08 0%, transparent 50%)`,
        }}
      >
        {/* New Badge */}
        {product.isNew && (
          <div className="absolute top-6 right-6 z-20">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00ff88] blur-md opacity-50" />
              <div className="relative px-4 py-1.5 bg-[#00ff88] text-[#0a0a0a] text-xs font-black tracking-widest">
                NOVO
              </div>
            </div>
          </div>
        )}
        
        {/* Background Number */}
        <div 
          className="absolute -top-10 -right-5 text-[12rem] font-black leading-none select-none transition-transform duration-700"
          style={{ 
            color: `${product.color}08`,
            transform: isHovered ? "scale(1.1) rotate(-5deg)" : "scale(1) rotate(0deg)"
          }}
        >
          {product.id}
        </div>
        
        {/* Content */}
        <div className={`relative z-10 p-8 lg:p-10 h-full flex flex-col ${isFeatured ? "lg:p-14" : ""}`}>
          {/* Icon */}
          <div 
            className={`text-5xl mb-6 transition-transform duration-500 ${isFeatured ? "text-7xl" : ""}`}
            style={{ transform: isHovered ? "scale(1.2) rotate(-10deg)" : "scale(1)" }}
          >
            {product.icon}
          </div>
          
          {/* Title Group */}
          <div className="mb-6">
            <div className="text-white/30 text-xs font-bold tracking-[0.2em] uppercase mb-2">
              {product.subtitle}
            </div>
            <h3 
              className={`font-black tracking-tight transition-colors duration-300 ${
                isFeatured ? "text-4xl lg:text-5xl" : "text-3xl"
              }`}
              style={{ color: isHovered ? product.color : "white" }}
            >
              {product.name}
            </h3>
          </div>
          
          {/* Tagline */}
          <p className="text-white/40 text-sm font-medium mb-6">{product.tagline}</p>
          
          {/* Description */}
          <p className={`text-white/60 leading-relaxed flex-grow ${
            isFeatured ? "text-lg" : "text-sm"
          }`}>
            {product.description}
          </p>
          
          {/* Features Preview */}
          <div className={`mt-8 overflow-hidden transition-all duration-500 ${
            isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}>
            <div className="grid grid-cols-2 gap-2">
              {product.features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/50">
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: product.color }} />
                  <span className="truncate">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-8 pt-6 border-t border-white/5">
            <Link
              href={product.link}
              onClick={() => trackSaibaMaisClick(product.name)}
              data-category="Sistemas"
              data-action-type="click_saiba_mais"
              data-product-name={product.name}
              className="inline-flex items-center gap-3 group/btn"
            >
              <span 
                className="text-xs font-black tracking-widest transition-colors"
                style={{ color: product.color }}
              >
                SAIBA MAIS
              </span>
              <div 
                className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
                style={{ 
                  borderColor: isHovered ? product.color : "rgba(255,255,255,0.1)",
                  backgroundColor: isHovered ? product.color : "transparent",
                  transform: isHovered ? "translateX(4px)" : "translateX(0)"
                }}
              >
                <span style={{ color: isHovered ? "#0a0a0a" : product.color }}>→</span>
              </div>
            </Link>
          </div>
        </div>
        
        {/* Hover Border Effect */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ 
            opacity: isHovered ? 1 : 0,
            boxShadow: `inset 0 0 0 2px ${product.color}30`
          }}
        />
        
        {/* 3D Tilt Effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.1 : 0,
            background: `linear-gradient(135deg, ${product.color} 0%, transparent 60%)`
          }}
        />
      </div>
    </div>
  );
};

// Products Grid
const ProductsGrid = () => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section ref={ref} className="py-20 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className={`mb-16 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <span className="text-white/30 text-sm font-bold tracking-widest">04 SOLUÇÕES</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">
                Escolha a ideal para você
              </h2>
            </div>
            <Link 
              href="/contato"
              className="px-6 py-3 border border-white/20 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-[#0a0a0a] transition-all"
            >
              FALE COM UM ESPECIALISTA
            </Link>
          </div>
        </div>
        
        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  
  return (
    <section ref={ref} className="py-32 px-6 lg:px-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/5 via-transparent to-[#ff0033]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
      
      <div className={`relative max-w-4xl mx-auto text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}>
        <div className="text-6xl mb-8">💬</div>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
          Ainda tem <span className="text-[#00ff88]">dúvidas</span>?
        </h2>
        <p className="text-white/50 text-xl mb-10 max-w-2xl mx-auto">
          Nossa equipe está pronta para entender suas necessidades e indicar a melhor solução para o seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="http://wa.me/5567996078885"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-widest hover:bg-white transition-colors"
          >
            <span>📱</span>
            WHATSAPP
          </a>
          <Link
            href="/contato"
            className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white/20 text-white font-black text-sm tracking-widest hover:border-white hover:bg-white hover:text-[#0a0a0a] transition-all"
          >
            FORMULÁRIO DE CONTATO
          </Link>
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
          <div className="flex flex-col items-center md:items-start">
            <img 
              src="./logo.png" 
              alt="SoftHam Sistemas" 
              className="h-12 w-auto object-contain"
            />
            <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] mt-1">
              SISTEMAS
            </span>
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
      
      <HeroSection />
      <ProductsGrid />
      <CTASection />
      
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
