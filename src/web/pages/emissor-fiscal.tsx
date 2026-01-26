import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";

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

// System Data
const systemData = {
  name: "Emissor Fiscal",
  subtitle: "Documentos Fiscais",
  tagline: "Emita NFe, NFCe, CTe e MDFe sem complicação",
  color: "#ff0033",
  icon: "📄",
  description: "Ganhe mais tempo para gerir seu negócio. Emissão de MDFe, CTe, NFe e NFCe nunca foram tão simples. Sistema intuitivo e completo para todas as suas necessidades fiscais, com atualização automática conforme as mudanças na legislação.",
  features: [
    { title: "NFe - Nota Fiscal Eletrônica", desc: "Emissão completa de notas fiscais para vendas de produtos e mercadorias" },
    { title: "NFCe - Nota Fiscal Consumidor", desc: "Cupom fiscal eletrônico para vendas ao consumidor final no varejo" },
    { title: "CTe - Conhecimento de Transporte", desc: "Documento fiscal para prestação de serviços de transporte" },
    { title: "MDFe - Manifesto de Documentos", desc: "Controle de cargas para fiscalização em postos de fronteira" },
    { title: "Cancelamento Simplificado", desc: "Cancele documentos em poucos cliques dentro do prazo legal" },
    { title: "Carta de Correção", desc: "Corrija informações não tributárias de documentos já emitidos" },
    { title: "Consulta SEFAZ", desc: "Verifique o status dos documentos diretamente na Receita" },
    { title: "Backup Automático", desc: "Todos os XMLs salvos automaticamente em nuvem segura" },
    { title: "Certificado Digital A1/A3", desc: "Compatível com certificados A1 e A3 de qualquer autoridade" },
    { title: "DANFE Personalizado", desc: "Customize o layout do DANFE com sua logo e informações" },
    { title: "Contingência Automática", desc: "Emissão em modo offline quando SEFAZ estiver indisponível" },
    { title: "Multi-empresa", desc: "Gerencie múltiplas empresas e filiais em um único sistema" },
  ],
  benefits: [
    { icon: "⚡", title: "Emissão Rápida", desc: "Emita documentos em segundos, não minutos" },
    { icon: "✅", title: "100% Legal", desc: "Sempre atualizado com a legislação vigente" },
    { icon: "🔄", title: "Atualizações Gratuitas", desc: "Todas as mudanças fiscais sem custo extra" },
    { icon: "🛡️", title: "Dados Seguros", desc: "Backup automático de todos os XMLs" },
  ],
  tutorials: [
    { id: 1, title: "Como Emitir sua Primeira NFe", category: "NFe" },
    { id: 2, title: "Configurando Impostos e Tributação", category: "Configurações" },
    { id: 3, title: "Emissão de NFCe no PDV", category: "NFCe" },
    { id: 4, title: "Gerando CTe para Transportadora", category: "CTe" },
    { id: 5, title: "Criando MDFe de Carga", category: "MDFe" },
    { id: 6, title: "Cancelamento de Documentos", category: "Geral" },
    { id: 7, title: "Carta de Correção Passo a Passo", category: "Geral" },
    { id: 8, title: "Configurando Certificado Digital", category: "Configurações" },
    { id: 9, title: "Importando Produtos por XML", category: "Configurações" },
    { id: 10, title: "Relatórios Fiscais Mensais", category: "Relatórios" },
    { id: 11, title: "Emissão em Contingência", category: "Avançado" },
    { id: 12, title: "Consulta de Status na SEFAZ", category: "Geral" },
  ],
  plans: [
    { name: "Básico", price: "97", features: ["1 Empresa", "NFe ilimitadas", "Suporte por email", "Backup diário", "DANFE padrão"], popular: false },
    { name: "Completo", price: "197", features: ["1 Empresa", "NFe + NFCe + CTe + MDFe", "Suporte prioritário", "Backup em tempo real", "DANFE personalizado", "Contingência automática"], popular: true },
    { name: "Multi-empresa", price: "397", features: ["Até 5 empresas", "Todos os documentos", "Suporte por telefone", "Gerente de conta", "API de integração", "Treinamento incluído"], popular: false },
  ],
  faqs: [
    { q: "Preciso de certificado digital?", a: "Sim, é obrigatório ter certificado digital A1 ou A3 para emissão de documentos fiscais eletrônicos." },
    { q: "O sistema funciona para qualquer estado?", a: "Sim, nosso sistema está homologado para emissão em todos os estados brasileiros." },
    { q: "Como faço a migração do meu sistema atual?", a: "Nossa equipe auxilia gratuitamente na importação de dados do seu sistema anterior." },
    { q: "E se a SEFAZ ficar fora do ar?", a: "O sistema possui modo de contingência que permite continuar emitindo mesmo quando a SEFAZ está indisponível." },
    { q: "Quantas notas posso emitir?", a: "Não há limite de emissão em nenhum dos planos. Emita quantas notas precisar." },
    { q: "O sistema calcula impostos automaticamente?", a: "Sim, após configurar as regras tributárias, o sistema calcula todos os impostos automaticamente." },
  ],
};

// Hero Section
const HeroSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 text-[30vw] font-black text-white/[0.02] leading-none select-none">
          02
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#ff0033]/30 to-transparent" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#ff0033]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <Breadcrumbs items={[{ label: "Sistemas", href: "/sistemas" }, { label: "Emissor Fiscal" }]} />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 border border-[#ff0033]/30 bg-[#ff0033]/5 mb-8 transform transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <span className="text-4xl">{systemData.icon}</span>
              <span className="text-[#ff0033] text-xs font-bold tracking-[0.2em] uppercase">
                DOCUMENTOS FISCAIS
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight transform transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}>
              EMISSOR
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff0033] to-[#ff0033]/50">
                FISCAL
              </span>
            </h1>

            {/* Tagline */}
            <p className={`text-white/60 text-xl md:text-2xl mt-8 leading-relaxed transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {systemData.tagline}
            </p>

            {/* Document Types */}
            <div className={`flex flex-wrap gap-3 mt-6 transform transition-all duration-700 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {["NFe", "NFCe", "CTe", "MDFe"].map((doc) => (
                <span key={doc} className="px-4 py-2 border border-[#ff0033]/30 text-[#ff0033] text-sm font-bold tracking-wider">
                  {doc}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className={`text-white/40 mt-6 leading-relaxed max-w-xl transform transition-all duration-700 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {systemData.description}
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 mt-10 transform transition-all duration-700 delay-600 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <a
                href="http://wa.me/5567996078885?text=Olá! Gostaria de saber mais sobre o Emissor Fiscal"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#ff0033] text-white font-black text-sm tracking-wider hover:bg-[#cc0029] transition-colors"
              >
                SOLICITAR DEMONSTRAÇÃO
              </a>
              <a
                href="#tutoriais"
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-[#ff0033] hover:text-[#ff0033] transition-colors"
              >
                VER TUTORIAIS
              </a>
            </div>
          </div>

          {/* Hero Visual */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}>
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Document mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-80 bg-white rounded-lg shadow-2xl transform -rotate-3">
                  {/* DANFE header */}
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-[#ff0033]/10 rounded flex items-center justify-center text-2xl">📄</div>
                      <div className="text-right">
                        <div className="text-[8px] text-gray-400 font-bold">DANFE</div>
                        <div className="text-[10px] text-[#ff0033] font-black">NFe</div>
                      </div>
                    </div>
                    <div className="mt-2 h-8 bg-gray-100 flex items-center justify-center">
                      <div className="flex gap-0.5">
                        {Array(40).fill(0).map((_, i) => (
                          <div key={i} className="w-0.5 h-6 bg-gray-800" style={{ height: Math.random() * 20 + 10 }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Content lines */}
                  <div className="p-4 space-y-2">
                    <div className="h-2 w-full bg-gray-100 rounded" />
                    <div className="h-2 w-3/4 bg-gray-100 rounded" />
                    <div className="h-2 w-5/6 bg-gray-100 rounded" />
                    <div className="mt-4 p-2 border border-dashed border-gray-200">
                      <div className="h-2 w-1/2 bg-gray-100 rounded mb-1" />
                      <div className="h-2 w-1/3 bg-gray-100 rounded" />
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded mt-4" />
                    <div className="h-2 w-2/3 bg-gray-100 rounded" />
                  </div>
                  {/* Approved stamp */}
                  <div className="absolute bottom-8 right-4 w-16 h-16 border-4 border-[#00ff88] rounded-full flex items-center justify-center transform rotate-12">
                    <span className="text-[#00ff88] text-[8px] font-black text-center leading-tight">AUTORIZADO</span>
                  </div>
                </div>
                
                {/* Floating status cards */}
                <div className="absolute -right-4 top-1/4 px-4 py-3 bg-[#0a0a0a] border border-[#00ff88]/30 rounded shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse" />
                    <span className="text-[#00ff88] text-xs font-bold">AUTORIZADA</span>
                  </div>
                </div>
                <div className="absolute -left-8 bottom-1/3 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded shadow-xl">
                  <div className="text-white/40 text-[10px] font-medium">Tempo de emissão</div>
                  <div className="text-white text-lg font-black">2.3s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Navigation Tabs
const NavTabs = () => {
  const [activeSection, setActiveSection] = useState("visao-geral");

  const tabs = [
    { id: "visao-geral", label: "Visão Geral" },
    { id: "recursos", label: "Recursos" },
    { id: "tutoriais", label: "Tutoriais" },
    { id: "precos", label: "Preços" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-20 z-40 bg-[#0a0a0a]/90 backdrop-blur-xl border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => setActiveSection(tab.id)}
              className={`px-6 py-4 text-xs font-bold tracking-wider whitespace-nowrap transition-colors ${
                activeSection === tab.id
                  ? "text-[#ff0033] border-b-2 border-[#ff0033]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </a>
          ))}
          <div className="flex-1" />
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-[#ff0033] text-xs font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            MANUAL PDF
          </a>
        </div>
      </div>
    </nav>
  );
};

// Features Section
const FeaturesSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="recursos" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// RECURSOS PRINCIPAIS</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Todos os documentos em <span className="text-[#ff0033]">um só lugar</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemData.features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 border border-white/5 hover:border-[#ff0033]/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[#ff0033]/30 text-[#ff0033] font-bold text-sm mb-4 group-hover:bg-[#ff0033] group-hover:text-white transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Benefits Section
const BenefitsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="visao-geral" ref={ref} className="py-24 relative bg-gradient-to-b from-[#ff0033]/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// POR QUE ESCOLHER</span>
            <h2 className={`text-4xl md:text-5xl font-black text-white mt-4 transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              Emissão fiscal <span className="text-[#ff0033]">descomplicada</span>
            </h2>
            <p className="text-white/50 mt-6 leading-relaxed">
              Esqueça a burocracia e os sistemas complexos. Nosso emissor foi desenvolvido para ser 
              simples e eficiente, permitindo que você foque no que realmente importa: seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {systemData.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`p-6 border border-white/5 hover:border-[#ff0033]/30 transition-all duration-500 transform ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="text-4xl mb-4 block">{benefit.icon}</span>
                <h3 className="text-white font-bold mb-2">{benefit.title}</h3>
                <p className="text-white/40 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Tutorials Section
const TutorialsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="tutoriais" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// TUTORIAIS EM VÍDEO</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Aprenda a emitir documentos
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Tutoriais completos para você dominar a emissão de NFe, NFCe, CTe e MDFe
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemData.tutorials.map((tutorial, index) => (
            <a
              key={tutorial.id}
              href="https://www.youtube.com/@softham"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden border border-white/5 hover:border-[#ff0033]/30 transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff0033]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Fake screenshot */}
                <div className="absolute inset-4 border border-white/10 rounded bg-[#0f0f0f]/80">
                  <div className="h-4 bg-white/5 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                    <div className="h-1.5 w-1/2 bg-[#ff0033]/20 rounded" />
                    <div className="h-1.5 w-2/3 bg-white/5 rounded" />
                  </div>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#ff0000] flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>

                {/* Category badge */}
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-[10px] font-bold text-[#ff0033] tracking-wider">
                  {tutorial.category}
                </div>
              </div>

              {/* Title */}
              <div className="p-4 bg-[#0f0f0f]">
                <h3 className="text-white font-bold text-sm group-hover:text-[#ff0033] transition-colors line-clamp-2">
                  {tutorial.title}
                </h3>
                <p className="text-white/30 text-xs mt-2">SoftHam Sistemas</p>
              </div>
            </a>
          ))}
        </div>

        {/* YouTube CTA */}
        <div className={`text-center mt-12 transform transition-all duration-700 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <a
            href="https://www.youtube.com/@softham"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#ff0000] text-white font-bold text-sm tracking-wider hover:bg-[#cc0000] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            VER TODOS OS TUTORIAIS NO YOUTUBE
          </a>
        </div>
      </div>
    </section>
  );
};

// Pricing Section
const PricingSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="precos" ref={ref} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// PLANOS E PREÇOS</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Escolha o plano ideal
          </h2>
          <p className="text-white/50 mt-4">Emissão ilimitada em todos os planos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {systemData.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border transition-all duration-500 transform ${
                plan.popular
                  ? "border-[#ff0033] bg-gradient-to-b from-[#ff0033]/10 to-transparent scale-105 lg:scale-110"
                  : "border-white/10 hover:border-white/20"
              } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#ff0033] text-white text-xs font-black tracking-wider">
                  MAIS POPULAR
                </div>
              )}

              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white/40 text-sm">R$</span>
                <span className={`text-5xl font-black ${plan.popular ? "text-[#ff0033]" : "text-white"}`}>{plan.price}</span>
                <span className="text-white/40 text-sm">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-[#ff0033] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="http://wa.me/5567996078885?text=Olá! Tenho interesse no Emissor Fiscal"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 text-center font-bold text-sm tracking-wider transition-colors ${
                  plan.popular
                    ? "bg-[#ff0033] text-white hover:bg-[#cc0029]"
                    : "border border-white/20 text-white hover:border-[#ff0033] hover:text-[#ff0033]"
                }`}
              >
                COMEÇAR AGORA
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// FAQ Section
const FAQSection = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="py-24 relative bg-gradient-to-b from-transparent to-[#ff0033]/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// DÚVIDAS FREQUENTES</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Perguntas e Respostas
          </h2>
        </div>

        <div className="space-y-4">
          {systemData.faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-white/10 overflow-hidden transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-white font-bold pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-[#ff0033] flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-40" : "max-h-0"}`}>
                <p className="px-6 pb-6 text-white/50 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Section
const CTASection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#ff0033]/10 via-transparent to-[#ff0033]/10" />
      
      <div className={`relative max-w-4xl mx-auto px-6 lg:px-20 text-center transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Pronto para simplificar sua <span className="text-[#ff0033]">emissão fiscal</span>?
        </h2>
        <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">
          Comece hoje com 15 dias de teste gratuito. Sem cartão de crédito necessário.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="http://wa.me/5567996078885?text=Olá! Quero testar o Emissor Fiscal gratuitamente"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-[#ff0033] text-white font-black text-sm tracking-wider hover:bg-[#cc0029] transition-colors"
          >
            COMEÇAR TESTE GRATUITO
          </a>
          <Link
            href="/contato"
            className="px-10 py-5 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-[#ff0033] hover:text-[#ff0033] transition-colors"
          >
            FALAR COM CONSULTOR
          </Link>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-12 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-6 lg:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="text-xl font-black tracking-tighter">
          <span className="text-white">SOFT</span>
          <span className="text-[#00ff88]">HAM</span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Home</Link>
          <Link href="/sistemas" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Sistemas</Link>
          <Link href="/tutoriais" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Tutoriais</Link>
          <Link href="/contato" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Contato</Link>
        </nav>
        <p className="text-white/30 text-xs">© 2024 SoftHam Sistemas</p>
      </div>
    </div>
  </footer>
);

// Main Page Component
export default function EmissorFiscalPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <CustomCursor />
      <NavBar />
      <HeroSection />
      <NavTabs />
      <BenefitsSection />
      <FeaturesSection />
      <TutorialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
