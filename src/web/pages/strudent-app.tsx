import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";
import { trackCTAClick, trackVideoClick, trackTabNavigation } from "../lib/analytics";

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
  name: "Strudent-App",
  subtitle: "Gestão Escolar",
  tagline: "Transforme a administração da sua escola",
  color: "#FFD700",
  icon: "🎓",
  description: "Solução completa para gestão escolar desenvolvida para instituições com até 600 alunos. Simplifique o gerenciamento de matrículas, notas, frequência, mensalidades e comunicação com pais. Interface intuitiva que transforma a administração escolar em um processo ágil e eficiente.",
  features: [
    { title: "Gestão de Matrículas", desc: "Cadastro completo de alunos com documentação e histórico escolar" },
    { title: "Controle de Notas", desc: "Lançamento de notas por disciplina com cálculo automático de médias" },
    { title: "Emissão de Boletins", desc: "Boletins personalizados com notas, frequência e observações" },
    { title: "Registro de Frequência", desc: "Controle de presença digital com relatórios por período" },
    { title: "Gestão de Mensalidades", desc: "Controle financeiro completo com geração de boletos" },
    { title: "Comunicação com Pais", desc: "Envio de comunicados, notificações e mensagens diretas" },
    { title: "Relatórios Pedagógicos", desc: "Análises de desempenho por aluno, turma e disciplina" },
    { title: "Agenda Escolar Digital", desc: "Calendário de eventos, provas e atividades" },
    { title: "Portal do Aluno", desc: "Acesso online para alunos consultarem notas e frequência" },
    { title: "Portal do Responsável", desc: "Pais acompanham a vida escolar dos filhos online" },
    { title: "Gestão de Turmas", desc: "Organização de turmas, séries e horários de aula" },
    { title: "Biblioteca Digital", desc: "Controle de empréstimo de livros e materiais" },
  ],
  benefits: [
    { icon: "📚", title: "Até 600 Alunos", desc: "Ideal para escolas de pequeno e médio porte" },
    { icon: "📋", title: "Fim da Papelada", desc: "Tudo digital, organizado e acessível" },
    { icon: "💬", title: "Comunicação Fácil", desc: "Pais sempre informados sobre seus filhos" },
    { icon: "💰", title: "Financeiro Integrado", desc: "Controle de mensalidades simplificado" },
  ],
  tutorials: [
    { id: 1, title: "Configuração Inicial da Escola", category: "Primeiros Passos" },
    { id: 2, title: "Cadastro de Alunos e Responsáveis", category: "Matrículas" },
    { id: 3, title: "Criando Turmas e Séries", category: "Turmas" },
    { id: 4, title: "Cadastro de Professores", category: "Professores" },
    { id: 5, title: "Definindo Grade Curricular", category: "Configurações" },
    { id: 6, title: "Lançamento de Notas", category: "Notas" },
    { id: 7, title: "Registro de Frequência", category: "Frequência" },
    { id: 8, title: "Emitindo Boletins", category: "Relatórios" },
    { id: 9, title: "Gestão de Mensalidades", category: "Financeiro" },
    { id: 10, title: "Enviando Comunicados", category: "Comunicação" },
    { id: 11, title: "Usando o Portal do Aluno", category: "Portais" },
    { id: 12, title: "Relatórios Pedagógicos", category: "Relatórios" },
  ],
  plans: [
    { name: "Essencial", price: "297", features: ["Até 150 alunos", "Gestão de notas e frequência", "Boletins digitais", "Suporte por email", "Backup diário"], popular: false },
    { name: "Completo", price: "497", features: ["Até 400 alunos", "Tudo do Essencial", "Portal do aluno e responsável", "Gestão financeira", "Comunicados e notificações", "Suporte prioritário"], popular: true },
    { name: "Premium", price: "797", features: ["Até 600 alunos", "Tudo do Completo", "Biblioteca digital", "Relatórios avançados", "API de integração", "Treinamento presencial"], popular: false },
  ],
  faqs: [
    { q: "O Strudent-App funciona em dispositivos móveis?", a: "Sim! O portal do aluno e responsável são totalmente responsivos, funcionando perfeitamente em smartphones e tablets." },
    { q: "Posso personalizar os boletins com a logo da escola?", a: "Sim, os boletins são completamente personalizáveis com a identidade visual da sua instituição." },
    { q: "Como funciona a comunicação com os pais?", a: "Você pode enviar comunicados gerais, por turma ou individuais. Os pais recebem notificações por email e no app." },
    { q: "O sistema gera boletos bancários?", a: "Sim, geramos boletos registrados para os principais bancos. Também temos integração com PIX." },
    { q: "Posso importar dados de outro sistema?", a: "Sim, nossa equipe auxilia na migração de dados do seu sistema anterior sem custo adicional." },
    { q: "Existe período de teste?", a: "Sim, oferecemos 30 dias de teste gratuito com todas as funcionalidades para você avaliar o sistema." },
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
          04
        </div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-20 w-full">
        <Breadcrumbs items={[{ label: "Sistemas", href: "/sistemas" }, { label: "Strudent-App" }]} />
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            {/* Badge */}
            <div className={`inline-flex items-center gap-3 px-4 py-2 border border-[#FFD700]/30 bg-[#FFD700]/5 mb-8 transform transition-all duration-700 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <span className="text-4xl">{systemData.icon}</span>
              <span className="text-[#FFD700] text-xs font-bold tracking-[0.2em] uppercase">
                GESTÃO ESCOLAR
              </span>
              <span className="px-2 py-0.5 bg-[#00ff88] text-[#0a0a0a] text-[10px] font-black tracking-wider animate-pulse">
                NOVO
              </span>
            </div>

            {/* Title */}
            <h1 className={`text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight transform transition-all duration-700 delay-200 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
            }`}>
              STRUDENT
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#FFD700]/50">
                APP
              </span>
            </h1>

            {/* Tagline */}
            <p className={`text-white/60 text-xl md:text-2xl mt-8 leading-relaxed transform transition-all duration-700 delay-300 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {systemData.tagline}
            </p>

            {/* Description */}
            <p className={`text-white/40 mt-6 leading-relaxed max-w-xl transform transition-all duration-700 delay-400 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              {systemData.description}
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 mt-10 transform transition-all duration-700 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              <a
                href="http://wa.me/5567996078885?text=Olá! Gostaria de saber mais sobre o Strudent-App"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#FFD700] text-[#0a0a0a] font-black text-sm tracking-wider hover:bg-white transition-colors"
              >
                SOLICITAR DEMONSTRAÇÃO
              </a>
              <a
                href="#tutoriais"
                className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
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
              {/* School app mockup */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Main card - Student Dashboard */}
                <div className="relative w-72 h-48 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-xl border border-white/10 shadow-2xl transform -rotate-3">
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#FFD700]/20 flex items-center justify-center text-lg">👨‍🎓</div>
                      <div>
                        <div className="text-white text-sm font-bold">João Silva</div>
                        <div className="text-white/40 text-xs">9º Ano - Turma A</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 bg-white/5 rounded text-center">
                        <div className="text-[#00ff88] text-lg font-black">8.5</div>
                        <div className="text-white/30 text-[8px]">Média</div>
                      </div>
                      <div className="p-2 bg-white/5 rounded text-center">
                        <div className="text-[#FFD700] text-lg font-black">95%</div>
                        <div className="text-white/30 text-[8px]">Frequência</div>
                      </div>
                      <div className="p-2 bg-white/5 rounded text-center">
                        <div className="text-white text-lg font-black">12</div>
                        <div className="text-white/30 text-[8px]">Tarefas</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grades card */}
                <div className="absolute -right-8 top-1/4 w-44 h-32 bg-[#0a0a0a] border border-[#FFD700]/30 rounded-lg shadow-xl transform rotate-6">
                  <div className="p-3">
                    <div className="text-[#FFD700] text-xs font-bold mb-2">📊 Notas Recentes</div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/60">Matemática</span>
                        <span className="text-[#00ff88] font-bold">9.0</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/60">Português</span>
                        <span className="text-[#00ff88] font-bold">8.5</span>
                      </div>
                      <div className="flex justify-between text-[10px]">
                        <span className="text-white/60">Ciências</span>
                        <span className="text-[#FFD700] font-bold">7.5</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Notification card */}
                <div className="absolute -left-4 bottom-1/4 px-4 py-3 bg-[#0a0a0a] border border-white/10 rounded-lg shadow-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                    <span className="text-white/80 text-xs">3 novos comunicados</span>
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
                  ? "text-[#FFD700] border-b-2 border-[#FFD700]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {tab.label}
            </a>
          ))}
          <div className="flex-1" />
          <a
            href="#"
            className="flex items-center gap-2 px-4 py-2 text-white/40 hover:text-[#FFD700] text-xs font-medium transition-colors"
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
          <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase">// RECURSOS PRINCIPAIS</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Gestão escolar <span className="text-[#FFD700]">completa</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemData.features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 border border-white/5 hover:border-[#FFD700]/30 bg-gradient-to-br from-white/[0.02] to-transparent transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[#FFD700]/30 text-[#FFD700] font-bold text-sm mb-4 group-hover:bg-[#FFD700] group-hover:text-[#0a0a0a] transition-colors">
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
    <section id="visao-geral" ref={ref} className="py-24 relative bg-gradient-to-b from-[#FFD700]/5 to-transparent">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase">// POR QUE ESCOLHER</span>
            <h2 className={`text-4xl md:text-5xl font-black text-white mt-4 transform transition-all duration-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}>
              A escola do <span className="text-[#FFD700]">futuro</span> começa aqui
            </h2>
            <p className="text-white/50 mt-6 leading-relaxed">
              O Strudent-App foi desenvolvido especialmente para escolas que querem modernizar sua gestão 
              sem complicação. Interface intuitiva, recursos completos e suporte especializado em educação.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {systemData.benefits.map((benefit, index) => (
              <div
                key={index}
                className={`p-6 border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 transform ${
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
          <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase">// TUTORIAIS EM VÍDEO</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Aprenda a usar o Strudent-App
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl mx-auto">
            Tutoriais completos para você e sua equipe dominarem o sistema
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemData.tutorials.map((tutorial, index) => (
            <a
              key={tutorial.id}
              href="https://www.youtube.com/@softham"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative overflow-hidden border border-white/5 hover:border-[#FFD700]/30 transition-all duration-500 transform ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Fake screenshot */}
                <div className="absolute inset-4 border border-white/10 rounded bg-[#0f0f0f]/80">
                  <div className="h-4 bg-white/5 flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="h-1.5 w-3/4 bg-white/10 rounded" />
                    <div className="h-1.5 w-1/2 bg-[#FFD700]/20 rounded" />
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
                <div className="absolute top-3 left-3 px-2 py-1 bg-[#0a0a0a]/80 backdrop-blur-sm text-[10px] font-bold text-[#FFD700] tracking-wider">
                  {tutorial.category}
                </div>
              </div>

              {/* Title */}
              <div className="p-4 bg-[#0f0f0f]">
                <h3 className="text-white font-bold text-sm group-hover:text-[#FFD700] transition-colors line-clamp-2">
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
          <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase">// PLANOS E PREÇOS</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
            Escolha o plano ideal
          </h2>
          <p className="text-white/50 mt-4">30 dias de teste gratuito em todos os planos</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {systemData.plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 border transition-all duration-500 transform ${
                plan.popular
                  ? "border-[#FFD700] bg-gradient-to-b from-[#FFD700]/10 to-transparent scale-105 lg:scale-110"
                  : "border-white/10 hover:border-white/20"
              } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#FFD700] text-[#0a0a0a] text-xs font-black tracking-wider">
                  MAIS POPULAR
                </div>
              )}

              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white/40 text-sm">R$</span>
                <span className={`text-5xl font-black ${plan.popular ? "text-[#FFD700]" : "text-white"}`}>{plan.price}</span>
                <span className="text-white/40 text-sm">/mês</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-[#FFD700] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="http://wa.me/5567996078885?text=Olá! Tenho interesse no Strudent-App"
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full py-4 text-center font-bold text-sm tracking-wider transition-colors ${
                  plan.popular
                    ? "bg-[#FFD700] text-[#0a0a0a] hover:bg-white"
                    : "border border-white/20 text-white hover:border-[#FFD700] hover:text-[#FFD700]"
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
    <section id="faq" ref={ref} className="py-24 relative bg-gradient-to-b from-transparent to-[#FFD700]/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-20">
        <div className={`text-center mb-16 transform transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
          <span className="text-[#FFD700] text-xs font-bold tracking-[0.3em] uppercase">// DÚVIDAS FREQUENTES</span>
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
                  className={`w-5 h-5 text-[#FFD700] flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
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
      <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/10 via-transparent to-[#FFD700]/10" />
      
      <div className={`relative max-w-4xl mx-auto px-6 lg:px-20 text-center transform transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}>
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
          Pronto para modernizar sua <span className="text-[#FFD700]">escola</span>?
        </h2>
        <p className="text-white/50 text-xl mt-6 max-w-2xl mx-auto">
          Comece hoje com 30 dias de teste gratuito. Sem cartão de crédito necessário.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a
            href="http://wa.me/5567996078885?text=Olá! Quero testar o Strudent-App gratuitamente"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-[#FFD700] text-[#0a0a0a] font-black text-sm tracking-wider hover:bg-white transition-colors"
          >
            COMEÇAR TESTE GRATUITO
          </a>
          <Link
            href="/contato"
            className="px-10 py-5 border border-white/20 text-white font-bold text-sm tracking-wider hover:border-[#FFD700] hover:text-[#FFD700] transition-colors"
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
export default function StrudentAppPage() {
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
