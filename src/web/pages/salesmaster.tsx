import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";
import { trackCTAClick, trackVideoClick, trackTabNavigation } from "../lib/analytics";
import { Car, Zap, Brain, BarChart3, History, Target, Check } from "lucide-react";

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

// Pillar Data - Using Lucide React icons
const pillarIcons = {
  "01": Zap,
  "02": Brain,
  "03": BarChart3,
  "04": History,
  "05": Target,
};

const pillars = [
  {
    number: "01",
    title: "Precisão Cirúrgica em Cálculos Complexos",
    text: "Esqueça a dor de cabeça com IPI e Substituição Tributária (ST). Nosso sistema processa complexidades tributárias em milissegundos. Gere PDFs profissionais, detalhados e com cálculo exato de impostos, adaptados para o modelo de relatório que sua indústria exige (Modelos 3, 9, 12, 13 ou 14). Transmita confiança e autoridade em cada cotação.",
    gradient: "from-[#00ff88]/20 to-[#00ff88]/5"
  },
  {
    number: "02",
    title: "IA Insight: Sua Inteligência Própria de Recuperação",
    text: "O SalesMasters não apenas armazena dados; ele pensa por você. Nossa Inteligência Artificial analisa o comportamento de compra da sua carteira em tempo real. Ela te avisa exatamente quem parou de comprar, quem diminuiu a frequência e, mais importante: identifica a Receita Potencial acumulada em orçamentos perdidos. Você nunca mais deixará dinheiro na mesa por falta de acompanhamento.",
    gradient: "from-purple-500/20 to-purple-500/5"
  },
  {
    number: "03",
    title: "Visão 360º de Sell-Out e Performance",
    text: "Tenha o controle total do giro dos seus produtos no PDV. Através de dashboards dinâmicos, visualize o faturamento por indústria, compare o desempenho entre segmentos e aplique o Princípio de Pareto para focar seus esforços nos 20% de clientes que geram 80% do seu lucro.",
    gradient: "from-cyan-500/20 to-cyan-500/5"
  },
  {
    number: "04",
    title: "O Poder do Histórico Chronos (5 Anos)",
    text: 'Decisões baseadas no "acho que..." são perigosas. Com o SalesMasters, você tem acesso a uma análise cronológica profunda de até 5 anos. Entenda a sazonalidade do mercado agrícola, as oscilações da linha pesada e os picos da linha leve com uma clareza que nenhum Excel consegue entregar.',
    gradient: "from-orange-500/20 to-orange-500/5"
  },
  {
    number: "05",
    title: "O Centro de Operações Digital",
    text: "Envio de Emails Estratégicos: Segmente sua comunicação por área de atuação, produtos ou aniversários. Catálogo Digital Integrado: Apresente seus fornecedores com o brilho que eles merecem. Agenda Inteligente: Otimize sua rota de visitas com base na lucratividade e na urgência de atendimento.",
    gradient: "from-[#ff0033]/20 to-[#ff0033]/5"
  }
];

// Tutorial Data
const tutorials = [
  { id: 1, title: "Apresentação do Sistema", category: "Primeiros Passos" },
  { id: 2, title: "Cadastro de Clientes", category: "Primeiros Passos" },
  { id: 3, title: "Detalhes do Cadastro de Clientes", category: "Primeiros Passos" },
  { id: 4, title: "Detalhes dos Clientes (relatórios)", category: "Relatórios" },
  { id: 5, title: "Cadastro de Indústrias", category: "Configurações" },
  { id: 6, title: "Detalhes da Indústria", category: "Configurações" },
  { id: 7, title: "Requisitos para Importar Tab. Preços", category: "Configurações" },
  { id: 8, title: "Importar Tabela de Preços", category: "Configurações" },
  { id: 9, title: "Digitação dos Pedidos Parte 1", category: "Pedidos" },
  { id: 10, title: "Digitação Pedidos Parte 2 (via excel)", category: "Pedidos" },
  { id: 11, title: "Botões na Aba de Conf. do Pedido", category: "Pedidos" },
  { id: 12, title: "Emissão de Pedidos em Lote", category: "Pedidos" },
];

const plans = [
  { name: "Starter", price: "197", features: ["1 Usuário", "Até 100 clientes", "5 Representadas", "Suporte por email", "Backup diário"], popular: false },
  { name: "Professional", price: "397", features: ["3 Usuários", "Clientes ilimitados", "Representadas ilimitadas", "Suporte prioritário", "App mobile", "Integração com fábricas"], popular: true },
  { name: "Enterprise", price: "697", features: ["Usuários ilimitados", "Tudo do Professional", "API personalizada", "Gerente de conta dedicado", "Treinamento presencial", "SLA garantido"], popular: false },
];

const faqs = [
  { q: "O SalesMasters funciona offline?", a: "Sim! O app mobile permite trabalhar offline e sincroniza automaticamente quando conectado à internet." },
  { q: "Posso importar dados de outro sistema?", a: "Sim, nossa equipe de implantação auxilia na migração de dados de qualquer sistema anterior." },
  { q: "Quantas representadas posso cadastrar?", a: "Depende do plano. O Starter permite até 5, enquanto Professional e Enterprise são ilimitados." },
  { q: "Existe período de teste?", a: "Sim, oferecemos 15 dias de teste gratuito com todas as funcionalidades." },
  { q: "Como funciona o suporte técnico?", a: "Oferecemos suporte por email, chat e telefone dependendo do plano contratado." },
  { q: "O sistema é atualizado automaticamente?", a: "Sim, todas as atualizações são automáticas e sem custo adicional." },
];

// Hero Manifesto Section
const HeroManifesto = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (isVisible && counter < 30) {
      const timer = setInterval(() => {
        setCounter(prev => Math.min(prev + 1, 30));
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isVisible, counter]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden">
      {/* Circuit background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M0 50h40m10 0h50" stroke="#00ff88" strokeWidth="0.5" fill="none" opacity="0.3"/>
              <path d="M50 0v40m0 10v50" stroke="#00ff88" strokeWidth="0.5" fill="none" opacity="0.3"/>
              <circle cx="50" cy="50" r="3" fill="none" stroke="#00ff88" strokeWidth="0.5" opacity="0.5"/>
              <circle cx="0" cy="50" r="2" fill="#00ff88" opacity="0.3"/>
              <circle cx="100" cy="50" r="2" fill="#00ff88" opacity="0.3"/>
              <circle cx="50" cy="0" r="2" fill="#00ff88" opacity="0.3"/>
              <circle cx="50" cy="100" r="2" fill="#00ff88" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00ff88]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#ff0033]/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Giant number background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[35vw] font-black text-white/[0.02] leading-none select-none pointer-events-none">
        {counter}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <Breadcrumbs items={[{ label: "SalesMasters" }]} />
        
        <div className="max-w-4xl">
          {/* Badge */}
          <div className={`inline-flex items-center gap-3 mb-8 transform transition-all duration-700 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}>
            <Car className="w-10 h-10 text-[#00ff88]" strokeWidth={1.5} />
            <div className="h-px w-12 bg-[#00ff88]" />
            <span className="text-[#00ff88] text-xs font-black tracking-[0.3em] uppercase">
              REPRESENTAÇÃO COMERCIAL
            </span>
          </div>

          {/* Main Title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.85] tracking-tighter transform transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}>
            <span className="text-white">DOMINE O</span>
            <br />
            <span className="text-white">MERCADO DE</span>
            <br />
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] via-[#00ff88] to-[#00ff88]/60">
                AUTOPEÇAS
              </span>
              {/* Neon underline effect */}
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#00ff88] to-transparent" />
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-[#00ff88] blur-md opacity-50" />
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/60 mt-10 max-w-2xl leading-relaxed font-light transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            Onde a <span className="text-white font-medium">Tradição da Representação</span> se une ao{" "}
            <span className="text-[#00ff88] font-medium">Poder da Tecnologia de Ponta</span>
          </p>

          {/* Stats inline */}
          <div className={`flex flex-wrap items-center gap-8 mt-12 transform transition-all duration-1000 delay-300 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-black text-[#00ff88]">{counter}</span>
              <span className="text-white/40 text-sm uppercase tracking-wider">Anos<br/>no Mercado</span>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-black text-white">100+</span>
              <span className="text-white/40 text-sm uppercase tracking-wider">Clientes<br/>Ativos</span>
            </div>
          </div>

          {/* CTA */}
          <div className={`flex flex-wrap gap-4 mt-12 transform transition-all duration-1000 delay-400 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}>
            <a
              href="http://wa.me/5567996078885?text=Olá! Gostaria de saber mais sobre o SalesMasters"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-10 py-5 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-wider overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(0,255,136,0.3)]"
            >
              <span className="relative z-10">SOLICITAR DEMONSTRAÇÃO</span>
              <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </a>
            <a
              href="#pilares"
              className="px-10 py-5 border-2 border-white/20 text-white font-bold text-sm tracking-wider hover:border-[#00ff88] hover:text-[#00ff88] transition-all"
            >
              DESCUBRA OS 5 PILARES →
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
};

// Navigation Tabs
const NavTabs = () => {
  const [activeSection, setActiveSection] = useState("pilares");

  const tabs = [
    { id: "pilares", label: "5 Pilares" },
    { id: "diferencial", label: "Diferencial" },
    { id: "tutoriais", label: "Tutoriais" },
    { id: "precos", label: "Preços" },
    { id: "faq", label: "FAQ" },
  ];

  return (
    <nav className="sticky top-20 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-hide">
          {tabs.map((tab) => (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={() => {
                setActiveSection(tab.id);
                trackTabNavigation("SalesMasters", tab.label);
              }}
              className={`px-6 py-4 text-xs font-bold tracking-wider whitespace-nowrap transition-all ${
                activeSection === tab.id
                  ? "text-[#00ff88] border-b-2 border-[#00ff88]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </a>
          ))}
          <div className="flex-1" />
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-[#00ff88] text-xs font-medium transition-colors"
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

// 5 Pillars Section
const PillarsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="pilares" ref={ref} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
        {/* Section Header */}
        <div className={`text-center mb-20 transform transition-all duration-1000 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}>
          <span className="text-[#00ff88] text-xs font-black tracking-[0.4em] uppercase">// FUNDAMENTOS</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 leading-tight">
            OS 5 PILARES DA
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60">
              DOMINAÇÃO
            </span>
          </h2>
        </div>

        {/* Pillars Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`group relative p-8 lg:p-10 border border-white/5 hover:border-[#00ff88]/30 bg-gradient-to-br ${pillar.gradient} transition-all duration-700 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              } ${index === 4 ? "lg:col-span-2 lg:max-w-3xl lg:mx-auto" : ""}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Neon border effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88] to-transparent" />
                <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#00ff88] to-transparent" />
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#00ff88] to-transparent" />
              </div>

              {/* Number + Icon */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <span className="text-7xl font-black text-white/[0.03] group-hover:text-white/[0.06] transition-colors">
                    {pillar.number}
                  </span>
                  {(() => {
                    const IconComponent = pillarIcons[pillar.number as keyof typeof pillarIcons];
                    return <IconComponent className="w-10 h-10 text-[#00ff88] transform group-hover:scale-110 transition-transform" strokeWidth={1.5} />;
                  })()}
                </div>
                <div className="w-12 h-12 border border-[#00ff88]/20 flex items-center justify-center text-[#00ff88] font-black text-sm group-hover:bg-[#00ff88] group-hover:text-[#0a0a0a] transition-all">
                  {pillar.number}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 group-hover:text-[#00ff88] transition-colors leading-tight">
                {pillar.title}
              </h3>

              {/* Text */}
              <p className="text-white/50 leading-relaxed text-sm md:text-base">
                {pillar.text}
              </p>

              {/* Corner accent */}
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#00ff88]/20 group-hover:border-[#00ff88]/50 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Differentiator Section
const DifferentiatorSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="diferencial" ref={ref} className="py-32 relative overflow-hidden bg-gradient-to-b from-transparent via-[#00ff88]/[0.03] to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className={`transform transition-all duration-1000 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
          }`}>
            <span className="text-[#00ff88] text-xs font-black tracking-[0.4em] uppercase">// DIFERENCIAL</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-6 leading-tight">
              POR QUE O
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60">
                SALESMASTERS
              </span>
              <br />
              É DIFERENTE?
            </h2>
            
            <div className="mt-10 p-8 border-l-4 border-[#00ff88] bg-gradient-to-r from-[#00ff88]/10 to-transparent">
              <p className="text-white/70 text-lg md:text-xl leading-relaxed italic">
                "Nós não somos um CRM genérico. Nós falamos a língua do balcão de autopeças, do mecânico, do frotista e do usineiro. 
                Entendemos que o representante de sucesso não é o que mais viaja, mas o que{" "}
                <span className="text-[#00ff88] font-bold not-italic">visita com inteligência</span>."
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10">
                <Check className="w-4 h-4 text-[#00ff88]" strokeWidth={2} />
                <span className="text-white/60 text-sm">Linha Leve</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10">
                <Check className="w-4 h-4 text-[#00ff88]" strokeWidth={2} />
                <span className="text-white/60 text-sm">Linha Pesada</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10">
                <Check className="w-4 h-4 text-[#00ff88]" strokeWidth={2} />
                <span className="text-white/60 text-sm">Linha Agrícola</span>
              </div>
            </div>
          </div>

          {/* Dashboard Mockup */}
          <div className={`relative transform transition-all duration-1000 delay-200 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
          }`}>
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88]/20 to-[#00ff88]/5 blur-3xl rounded-2xl" />
              
              {/* Main Dashboard Card */}
              <div className="relative bg-[#0f0f0f] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                {/* Window controls */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  <span className="ml-4 text-white/30 text-xs">SalesMasters Dashboard</span>
                </div>
                
                {/* Dashboard content */}
                <div className="p-6 space-y-4">
                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-4 bg-[#00ff88]/10 border border-[#00ff88]/20 rounded">
                      <div className="text-[#00ff88] text-2xl font-black">R$ 247K</div>
                      <div className="text-white/40 text-xs mt-1">Faturamento</div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded">
                      <div className="text-white text-2xl font-black">+47%</div>
                      <div className="text-white/40 text-xs mt-1">Crescimento</div>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded">
                      <div className="text-white text-2xl font-black">89</div>
                      <div className="text-white/40 text-xs mt-1">Pedidos</div>
                    </div>
                  </div>
                  
                  {/* Chart mockup */}
                  <div className="p-4 bg-white/[0.02] border border-white/5 rounded">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-white/60 text-sm font-medium">Performance Mensal</span>
                      <span className="text-[#00ff88] text-xs">↑ 23.5%</span>
                    </div>
                    <div className="flex items-end gap-2 h-24">
                      {[45, 62, 38, 75, 55, 82, 67, 90, 72, 85, 78, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 bg-gradient-to-t from-[#00ff88]/40 to-[#00ff88]/10 rounded-t transition-all hover:from-[#00ff88]/60 hover:to-[#00ff88]/30"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-white/30">
                      <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span>
                      <span>Jul</span><span>Ago</span><span>Set</span><span>Out</span><span>Nov</span><span>Dez</span>
                    </div>
                  </div>

                  {/* Recent activity */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#00ff88]/20 flex items-center justify-center text-xs">AP</div>
                        <div>
                          <div className="text-white text-sm font-medium">Auto Peças Silva</div>
                          <div className="text-white/30 text-xs">Novo pedido #4521</div>
                        </div>
                      </div>
                      <span className="text-[#00ff88] font-bold">R$ 12.450</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-xs">DN</div>
                        <div>
                          <div className="text-white text-sm font-medium">Distribuidora Norte</div>
                          <div className="text-white/30 text-xs">Pedido aprovado</div>
                        </div>
                      </div>
                      <span className="text-white font-bold">R$ 8.320</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 p-4 bg-[#0a0a0a] border border-[#00ff88]/30 rounded-lg shadow-xl animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00ff88]/20 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5 text-[#00ff88]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-white text-xs font-bold">IA Insight</div>
                    <div className="text-[#00ff88] text-xs">3 clientes para recuperar</div>
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

// Tutorials Section
const TutorialsSection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section id="tutoriais" ref={ref} className="py-24 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBtLTEgMGExIDEgMCAxIDAgMiAwYTEgMSAwIDEgMCAtMiAwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// TUTORIAIS EM VÍDEO</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Aprenda passo a passo
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Tutoriais completos para você dominar todas as funcionalidades do SalesMasters
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <a
              key={tutorial.id}
              href="https://www.youtube.com/@softham"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackVideoClick("SalesMasters", tutorial.title)}
              className={`group relative overflow-hidden border border-white/5 hover:border-[#00ff88]/30 transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Fake screenshot overlay */}
                <div className="absolute inset-4 border border-white/10 rounded bg-[#0f0f0f]/80">
                  <div className="h-4 bg-white/5 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                    <div className="h-1.5 w-1/2 bg-[#00ff88]/20 rounded" />
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
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-[10px] font-bold text-[#00ff88] tracking-wider">
                  {tutorial.category}
                </div>
              </div>

              {/* Title */}
              <div className="p-4 bg-[#0f0f0f]">
                <h3 className="text-white font-bold text-sm group-hover:text-[#00ff88] transition-colors line-clamp-2">
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
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// PLANOS E PREÇOS</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Escolha o plano ideal
          </h2>
          <p className="text-white/50 mt-4">Todos os planos incluem 15 dias de teste gratuito</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border transition-all duration-500 transform ${
                plan.popular
                  ? "border-[#00ff88] bg-gradient-to-b from-[#00ff88]/10 to-transparent scale-105 lg:scale-110"
                  : "border-white/10 hover:border-white/20"
              } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#00ff88] text-[#0a0a0a] text-xs font-black tracking-wider">
                  MAIS POPULAR
                </div>
              )}

              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white/40 text-sm">R$</span>
                <span className={`text-5xl font-black ${plan.popular ? "text-[#00ff88]" : "text-white"}`}>{plan.price}</span>
                <span className="text-white/40 text-sm">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-[#00ff88] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="http://wa.me/5567996078885?text=Olá! Tenho interesse no plano SalesMasters"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCTAClick("SalesMasters", `Plano ${plan.name}`)}
                className={`block w-full py-4 text-center font-bold text-sm tracking-wider transition-colors ${
                  plan.popular
                    ? "bg-[#00ff88] text-[#0a0a0a] hover:bg-white"
                    : "border border-white/20 text-white hover:border-[#00ff88] hover:text-[#00ff88]"
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
    <section id="faq" ref={ref} className="py-24 relative bg-gradient-to-b from-transparent to-[#00ff88]/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// DÚVIDAS FREQUENTES</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Perguntas e Respostas
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
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
                  className={`w-5 h-5 text-[#00ff88] flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
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
const FinalCTASection = () => {
  const { ref, isVisible } = useIntersectionObserver();

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88]/5 via-transparent to-[#00ff88]/5" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/50 to-transparent" />
      </div>

      {/* Floating circuit elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border border-[#00ff88]/20 rotate-45 animate-pulse" />
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border border-[#00ff88]/20 rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }} />

      <div className={`relative max-w-5xl mx-auto px-6 lg:px-20 text-center transform transition-all duration-1000 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}>
        {/* Question mark accent */}
        <div className="text-[20vw] font-black text-[#00ff88]/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none">
          ?
        </div>

        <div className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Você está pronto para sair da era dos{" "}
            <span className="text-white/40 line-through">pedidos</span>
            <br />
            e entrar na era do{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff88] to-[#00ff88]/60">
                FATURAMENTO INTELIGENTE
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ff88]" />
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#00ff88] blur-sm" />
            </span>
            ?
          </h2>

          <p className="text-white/50 text-lg md:text-xl mt-8 max-w-2xl mx-auto">
            Comece hoje com 15 dias de teste gratuito. Sem compromisso. Sem cartão de crédito.
          </p>

          <div className="mt-12">
            <Link
              href="/contato"
              onClick={() => trackCTAClick("SalesMasters", "CTA Final - Quero o SalesMasters")}
              className="group relative inline-flex items-center gap-3 px-12 py-6 bg-[#00ff88] text-[#0a0a0a] font-black text-lg tracking-wider overflow-hidden transition-all hover:shadow-[0_0_60px_rgba(0,255,136,0.4)]"
            >
              <span className="relative z-10">QUERO O SALESMASTERS AGORA</span>
              <svg className="w-6 h-6 relative z-10 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-white/30 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Dados Seguros</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Implantação Rápida</span>
            </div>
          </div>
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
        <Link href="/" className="flex flex-col items-center md:items-start">
          <img 
            src="./logo.png" 
            alt="SoftHam Sistemas" 
            className="h-10 w-auto object-contain hover:scale-105 transition-transform"
          />
          <span className="text-white/60 text-[9px] font-bold tracking-[0.3em] mt-1">
            SISTEMAS
          </span>
        </Link>
        <nav className="flex flex-wrap justify-center gap-6">
          <Link href="/" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Home</Link>
          <Link href="/tutoriais" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Tutoriais</Link>
          <Link href="/contato" className="text-white/40 hover:text-[#00ff88] text-sm transition-colors">Contato</Link>
        </nav>
        <p className="text-white/30 text-xs">© 2024 SoftHam Sistemas</p>
      </div>
    </div>
  </footer>
);

// Main Page Component
export default function SalesMasterPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      <CustomCursor />
      <NavBar />
      <HeroManifesto />
      <NavTabs />
      <PillarsSection />
      <DifferentiatorSection />
      <TutorialsSection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
