import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";
import { trackVideoClick, trackManualDownload } from "../lib/analytics";

// Observer hook
const useIntersectionObserver = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

// Tutorial categories
const tutorialCategories = [
  { id: "all", label: "Todos", color: "#00ff88" },
  { id: "primeiros-passos", label: "Primeiros Passos", color: "#00ff88" },
  { id: "config-avancadas", label: "Configurações", color: "#fff" },
  { id: "emissao-fiscal", label: "Emissão Fiscal", color: "#ff0033" },
  { id: "relatorios", label: "Relatórios", color: "#00ff88" },
  { id: "duvidas", label: "Dúvidas Frequentes", color: "#fff" },
];

// Full tutorials list
const tutorials = [
  // Primeiros Passos
  {
    id: 1,
    title: "Como emitir sua primeira NFe",
    description: "Guia completo passo a passo para emitir sua primeira Nota Fiscal Eletrônica no sistema.",
    category: "primeiros-passos",
    system: "Emissor Fiscal",
    duration: "12 min",
    color: "#ff0033",
    featured: true,
  },
  {
    id: 2,
    title: "Primeiros passos com SalesMasters",
    description: "Configure sua conta e comece a usar o sistema de representação comercial em minutos.",
    category: "primeiros-passos",
    system: "SalesMasters",
    duration: "15 min",
    color: "#00ff88",
    featured: true,
  },
  {
    id: 3,
    title: "Instalação e configuração inicial",
    description: "Aprenda a instalar e fazer a configuração inicial de qualquer sistema SoftHam.",
    category: "primeiros-passos",
    system: "Todos",
    duration: "10 min",
    color: "#fff",
    featured: false,
  },
  {
    id: 4,
    title: "Cadastro de produtos no SalesMasters",
    description: "Tutorial detalhado sobre como cadastrar e organizar seus produtos no sistema.",
    category: "primeiros-passos",
    system: "SalesMasters",
    duration: "8 min",
    color: "#00ff88",
    featured: false,
  },
  // Configurações Avançadas
  {
    id: 5,
    title: "Configurando impostos no SalesSpot",
    description: "Aprenda a configurar corretamente as alíquotas e regras fiscais do seu estabelecimento.",
    category: "config-avancadas",
    system: "SalesSpot",
    duration: "20 min",
    color: "#fff",
    featured: true,
  },
  {
    id: 6,
    title: "Integração com certificado digital A1/A3",
    description: "Como configurar seu certificado digital para emissão de documentos fiscais.",
    category: "config-avancadas",
    system: "Emissor Fiscal",
    duration: "15 min",
    color: "#ff0033",
    featured: false,
  },
  {
    id: 7,
    title: "Configuração de backups automáticos",
    description: "Proteja seus dados configurando backups automáticos diários ou semanais.",
    category: "config-avancadas",
    system: "Todos",
    duration: "10 min",
    color: "#fff",
    featured: false,
  },
  {
    id: 8,
    title: "Personalização de layouts e relatórios",
    description: "Customize os layouts de impressão de acordo com as necessidades da sua empresa.",
    category: "config-avancadas",
    system: "Todos",
    duration: "12 min",
    color: "#00ff88",
    featured: false,
  },
  // Emissão Fiscal
  {
    id: 9,
    title: "Emissão de CTe para transportadoras",
    description: "Guia completo para emitir Conhecimento de Transporte Eletrônico.",
    category: "emissao-fiscal",
    system: "Emissor Fiscal",
    duration: "18 min",
    color: "#ff0033",
    featured: true,
  },
  {
    id: 10,
    title: "Como emitir MDFe corretamente",
    description: "Tutorial sobre Manifesto Eletrônico de Documentos Fiscais para transporte de cargas.",
    category: "emissao-fiscal",
    system: "Emissor Fiscal",
    duration: "14 min",
    color: "#ff0033",
    featured: false,
  },
  {
    id: 11,
    title: "NFCe para vendas no balcão",
    description: "Aprenda a emitir Nota Fiscal do Consumidor Eletrônica para vendas rápidas.",
    category: "emissao-fiscal",
    system: "SalesSpot",
    duration: "8 min",
    color: "#fff",
    featured: false,
  },
  {
    id: 12,
    title: "Cancelamento e correção de notas",
    description: "Procedimentos corretos para cancelar ou corrigir documentos fiscais emitidos.",
    category: "emissao-fiscal",
    system: "Emissor Fiscal",
    duration: "10 min",
    color: "#ff0033",
    featured: false,
  },
  // Relatórios
  {
    id: 13,
    title: "Relatórios de vendas e comissões",
    description: "Extraia relatórios detalhados de vendas e calcule comissões automaticamente.",
    category: "relatorios",
    system: "SalesMasters",
    duration: "12 min",
    color: "#00ff88",
    featured: false,
  },
  {
    id: 14,
    title: "Dashboard financeiro do SalesSpot",
    description: "Entenda todos os indicadores e métricas do painel financeiro.",
    category: "relatorios",
    system: "SalesSpot",
    duration: "15 min",
    color: "#fff",
    featured: false,
  },
  {
    id: 15,
    title: "Exportação de dados para Excel",
    description: "Como exportar seus dados e relatórios para análise em planilhas.",
    category: "relatorios",
    system: "Todos",
    duration: "6 min",
    color: "#00ff88",
    featured: false,
  },
  // Dúvidas Frequentes
  {
    id: 16,
    title: "Resolvendo erros de emissão fiscal",
    description: "Soluções para os erros mais comuns na emissão de documentos fiscais.",
    category: "duvidas",
    system: "Emissor Fiscal",
    duration: "10 min",
    color: "#ff0033",
    featured: false,
  },
];

// Downloads/Manuais
const downloads = [
  {
    title: "Manual Completo SalesMasters",
    description: "Documentação completa com todas as funcionalidades do sistema de representação.",
    format: "PDF",
    size: "4.2 MB",
    system: "SalesMasters",
    color: "#00ff88",
  },
  {
    title: "Guia Rápido - Emissor Fiscal",
    description: "Guia de referência rápida para emissão de NFe, NFCe, CTe e MDFe.",
    format: "PDF",
    size: "1.8 MB",
    system: "Emissor Fiscal",
    color: "#ff0033",
  },
  {
    title: "Manual SalesSpot Completo",
    description: "Toda documentação do sistema para comércio em geral.",
    format: "PDF",
    size: "3.5 MB",
    system: "SalesSpot",
    color: "#fff",
  },
  {
    title: "Checklist de Configuração",
    description: "Lista de verificação para garantir que tudo está configurado corretamente.",
    format: "PDF",
    size: "450 KB",
    system: "Todos",
    color: "#00ff88",
  },
  {
    title: "Guia de Certificado Digital",
    description: "Tudo sobre instalação e uso de certificados A1 e A3.",
    format: "PDF",
    size: "980 KB",
    system: "Emissor Fiscal",
    color: "#ff0033",
  },
  {
    title: "Manual Strudent-App",
    description: "Documentação completa do sistema de gestão escolar.",
    format: "PDF",
    size: "2.9 MB",
    system: "Strudent-App",
    color: "#00ff88",
  },
];

// FAQ
const faqs = [
  {
    question: "Como faço para emitir minha primeira NFe?",
    answer: "Após configurar seu certificado digital e dados da empresa, acesse o módulo de emissão, preencha os dados do cliente e produtos, e clique em 'Emitir'. O sistema validará automaticamente antes do envio.",
    category: "Emissão Fiscal",
  },
  {
    question: "Qual a diferença entre certificado A1 e A3?",
    answer: "O certificado A1 fica armazenado no computador (arquivo .pfx) e tem validade de 1 ano. O A3 fica em um token ou cartão físico e tem validade de até 3 anos. Ambos funcionam com nossos sistemas.",
    category: "Configuração",
  },
  {
    question: "Como fazer backup dos meus dados?",
    answer: "Acesse Configurações > Backup. Você pode fazer backup manual ou configurar backups automáticos diários. Recomendamos salvar também em nuvem ou HD externo.",
    category: "Segurança",
  },
  {
    question: "O sistema funciona offline?",
    answer: "Sim, todas as operações de cadastro e vendas funcionam offline. Apenas a emissão de documentos fiscais requer conexão com internet para comunicação com a SEFAZ.",
    category: "Funcionamento",
  },
  {
    question: "Como configurar múltiplos usuários?",
    answer: "Acesse Administração > Usuários. Você pode criar usuários com diferentes níveis de permissão, definindo quais módulos cada um pode acessar.",
    category: "Configuração",
  },
  {
    question: "Posso usar o sistema em mais de um computador?",
    answer: "Sim, com a licença de rede você pode instalar em múltiplos computadores. Todos compartilham o mesmo banco de dados em um servidor central.",
    category: "Licenciamento",
  },
  {
    question: "Como cancelar uma nota fiscal emitida?",
    answer: "Você tem até 24 horas para cancelar uma NFe. Acesse a nota no histórico, clique em 'Cancelar' e informe o motivo. O sistema enviará a solicitação à SEFAZ.",
    category: "Emissão Fiscal",
  },
  {
    question: "O que fazer quando aparece 'Rejeição SEFAZ'?",
    answer: "Verifique o código e descrição do erro. Os mais comuns são: certificado expirado, dados do destinatário incorretos, ou produto sem NCM. Nosso suporte pode ajudar.",
    category: "Erros",
  },
  {
    question: "Como atualizar o sistema?",
    answer: "As atualizações são automáticas. Ao abrir o sistema, ele verifica se há nova versão e solicita permissão para atualizar. Mantenha sempre atualizado para novas funcionalidades.",
    category: "Atualizações",
  },
  {
    question: "Qual o horário de funcionamento do suporte?",
    answer: "Nosso suporte funciona de segunda a sexta, das 8h às 18h (horário de MS). Para urgências, temos WhatsApp disponível para clientes com contrato de suporte.",
    category: "Suporte",
  },
  {
    question: "Como importar cadastros de outro sistema?",
    answer: "Exportamos uma planilha modelo para você preencher com seus dados. Após preenchida, nosso sistema importa automaticamente produtos, clientes e fornecedores.",
    category: "Migração",
  },
  {
    question: "O sistema emite NFe de serviço?",
    answer: "Não, nossos sistemas são focados em NFe de produto. Para NFSe (serviços), é necessário usar o sistema da prefeitura, pois cada município tem regras diferentes.",
    category: "Emissão Fiscal",
  },
  {
    question: "Como gerar relatório de vendas por período?",
    answer: "Acesse Relatórios > Vendas. Selecione o período desejado, filtre por vendedor ou produto se necessário, e clique em Gerar. Você pode exportar para PDF ou Excel.",
    category: "Relatórios",
  },
  {
    question: "O sistema calcula comissão de vendedores?",
    answer: "Sim, no SalesMasters você configura o percentual de comissão por vendedor ou por produto. O sistema calcula automaticamente e gera relatórios para pagamento.",
    category: "Funcionalidades",
  },
  {
    question: "Como funciona a integração com balança?",
    answer: "O SalesSpot integra com as principais marcas de balanças (Toledo, Filizola, etc). Configure a porta COM e protocolo nas configurações de hardware.",
    category: "Hardware",
  },
];

// Featured videos from YouTube
const featuredVideos = [
  {
    title: "Configuração Completa do Sistema",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "25:30",
    views: "1.2K",
  },
  {
    title: "Emissão de NFe - Tutorial Completo",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "18:45",
    views: "856",
  },
  {
    title: "Novidades da Versão 2024",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "12:20",
    views: "634",
  },
];

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="text-3xl font-black tracking-tighter mb-4">
              <span className="text-white">SOFT</span>
              <span className="text-[#00ff88]">HAM</span>
            </div>
            <p className="text-white/40 text-sm">
              30 anos transformando negócios em Campo Grande/MS.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Navegação</h4>
            <ul className="space-y-2">
              {["Home", "Sistemas", "Tutoriais", "Contato"].map((link) => (
                <li key={link}>
                  <Link href={link === "Home" ? "/" : `/${link.toLowerCase()}`} className="text-white/40 hover:text-[#00ff88] transition-colors text-sm">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Sistemas</h4>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>SalesMasters</li>
              <li>Emissor Fiscal</li>
              <li>SalesSpot</li>
              <li>Strudent-App</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4 uppercase">Contato</h4>
            <ul className="space-y-2 text-white/40 text-sm">
              <li>(67) 9 9607-8885</li>
              <li>hamilton@softham.com.br</li>
              <li>Campo Grande/MS</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-white/30 text-xs tracking-wider">
          © {new Date().getFullYear()} SOFTHAM SISTEMAS — TODOS OS DIREITOS RESERVADOS
        </div>
      </div>
    </footer>
  );
};

export default function Tutoriais() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const { ref: tutorialsRef, isVisible: tutorialsVisible } = useIntersectionObserver();
  const { ref: videosRef, isVisible: videosVisible } = useIntersectionObserver();
  const { ref: downloadsRef, isVisible: downloadsVisible } = useIntersectionObserver();
  const { ref: faqRef, isVisible: faqVisible } = useIntersectionObserver();

  const filteredTutorials = tutorials.filter((t) => {
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesSearch = searchQuery === "" || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.system.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTutorials = tutorials.filter((t) => t.featured);

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
      <section className="pt-32 pb-20 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,136,0.05)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#ff0033]" />
            <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Central de Ajuda</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
            TUTORIAIS<br/>
            <span className="text-[#00ff88]">&</span> <span className="text-white/20">DOCS</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-2xl leading-relaxed">
            Vídeos tutoriais, manuais e documentação completa para você dominar nossos sistemas.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar tutoriais, manuais, dúvidas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-4 bg-white/5 border border-white/10 focus:border-[#00ff88] text-white placeholder-white/30 focus:outline-none transition-colors text-sm"
              />
              <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube CTA */}
      <section ref={videosRef} className="px-6 lg:px-20 pb-16">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${videosVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <a
            href="https://www.youtube.com/@hamiltonrodrigues7499"
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-white/10 hover:border-[#ff0033] transition-all p-8 bg-gradient-to-r from-[#ff0033]/5 to-transparent"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 flex items-center justify-center bg-[#ff0033] group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                  <path fill="#0a0a0a" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl font-black text-white group-hover:text-[#ff0033] transition-colors">
                  CANAL NO YOUTUBE
                </h3>
                <p className="text-white/50 mt-2">
                  Vídeos tutoriais completos, novidades e dicas exclusivas sobre nossos sistemas.
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                {/* Mini video cards */}
                <div className="hidden lg:flex gap-3">
                  {featuredVideos.slice(0, 2).map((video, i) => (
                    <div key={i} className="w-32 h-20 bg-white/10 relative overflow-hidden group-hover:scale-105 transition-transform">
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                          <span className="text-white text-xs">▶</span>
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1">{video.duration}</span>
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 px-6 py-3 border border-[#ff0033] text-[#ff0033] font-bold text-sm tracking-widest group-hover:bg-[#ff0033] group-hover:text-white transition-all whitespace-nowrap">
                  ACESSAR
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Category Filters + Tutorials */}
      <section ref={tutorialsRef} className="py-16 px-6 lg:px-20 bg-[#050505]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${tutorialsVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// VÍDEO TUTORIAIS</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">APRENDA NA PRÁTICA</h2>
            </div>
            
            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              {tutorialCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#00ff88] text-[#0a0a0a]"
                      : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {cat.label.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Featured tutorials (only show when no filter/search) */}
          {selectedCategory === "all" && searchQuery === "" && (
            <div className="mb-12">
              <h3 className="text-white/40 text-xs font-bold tracking-widest mb-6 uppercase">⭐ Em Destaque</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTutorials.map((tutorial, index) => (
                  <div
                    key={tutorial.id}
                    className="group relative border border-[#00ff88]/30 bg-[#00ff88]/5 p-6 transition-all hover:bg-[#00ff88]/10"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute top-0 right-0 px-3 py-1 bg-[#00ff88] text-[#0a0a0a] text-[10px] font-bold tracking-wider">
                      DESTAQUE
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold tracking-widest" style={{ color: tutorial.color }}>
                        {tutorial.system.toUpperCase()}
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
          )}

          {/* All tutorials grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTutorials.map((tutorial, index) => (
              <div
                key={tutorial.id}
                className={`group border border-white/10 hover:border-white/30 p-5 transition-all ${
                  tutorialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold tracking-widest px-2 py-1 border" style={{ color: tutorial.color, borderColor: tutorial.color + "40" }}>
                    {tutorial.system.toUpperCase()}
                  </span>
                  <span className="text-white/30 text-xs">{tutorial.duration}</span>
                </div>
                <h3 className="text-base font-bold text-white group-hover:text-[#00ff88] transition-colors leading-tight">
                  {tutorial.title}
                </h3>
                <p className="text-white/40 mt-2 text-xs leading-relaxed line-clamp-2">
                  {tutorial.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-[#00ff88] font-bold text-xs group-hover:gap-3 transition-all">
                  <span>VER TUTORIAL</span>
                  <span>→</span>
                </div>
              </div>
            ))}
          </div>

          {filteredTutorials.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/40 text-lg">Nenhum tutorial encontrado para sua busca.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                className="mt-4 text-[#00ff88] text-sm font-bold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Downloads / Documentation */}
      <section ref={downloadsRef} className="py-24 px-6 lg:px-20">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${downloadsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// DOWNLOADS</span>
              <h2 className="text-3xl md:text-4xl font-black text-white mt-2">MANUAIS E GUIAS</h2>
              <p className="text-white/50 mt-3 max-w-xl">
                Baixe manuais completos, guias rápidos e checklists para configurar e usar nossos sistemas.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((doc, index) => (
              <div
                key={index}
                className={`group flex gap-4 border border-white/10 hover:border-[#00ff88] p-5 transition-all ${
                  downloadsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="w-14 h-14 flex-shrink-0 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] group-hover:bg-[#00ff88]/10 transition-all">
                  <div className="text-center">
                    <span className="text-white/60 group-hover:text-[#00ff88] text-xs font-bold block">{doc.format}</span>
                    <span className="text-white/30 text-[10px]">{doc.size}</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-bold tracking-widest mb-1" style={{ color: doc.color }}>
                    {doc.system.toUpperCase()}
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors truncate">
                    {doc.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-1 line-clamp-2">{doc.description}</p>
                </div>
                <div className="flex-shrink-0 self-center">
                  <span className="text-[#00ff88] text-lg group-hover:translate-y-1 transition-transform inline-block">↓</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-24 px-6 lg:px-20 bg-[#050505]">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${faqVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
              PERGUNTAS <span className="text-white/20">FREQUENTES</span>
            </h2>
            <p className="text-white/50 mt-4 max-w-xl mx-auto">
              Respostas rápidas para as dúvidas mais comuns dos nossos clientes.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border border-white/10 transition-all ${
                  expandedFaq === index ? "border-[#00ff88]/30 bg-[#00ff88]/5" : "hover:border-white/20"
                } ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                style={{ transitionDelay: `${index * 40}ms` }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-[10px] font-bold tracking-wider text-white/30 border border-white/10 px-2 py-1">
                      {faq.category.toUpperCase()}
                    </span>
                    <span className={`font-bold text-sm transition-colors ${expandedFaq === index ? "text-[#00ff88]" : "text-white"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <span className={`text-[#00ff88] text-xl transition-transform ${expandedFaq === index ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-5 pb-5 pt-0">
                    <div className="pl-20 text-white/60 text-sm leading-relaxed border-l-2 border-[#00ff88]/20 ml-2">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* More questions CTA */}
          <div className="mt-12 text-center">
            <p className="text-white/40 text-sm mb-4">Não encontrou sua dúvida?</p>
            <a
              href="http://wa.me/5567996078885"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-wider hover:bg-white transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              FALE COM O SUPORTE
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
