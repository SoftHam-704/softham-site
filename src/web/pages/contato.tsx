import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { FloatingWhatsApp, CustomCursor, NavBar, Breadcrumbs } from "../components/shared";
import { trackFormSubmit, trackWhatsAppClick, trackCTAClick } from "../lib/analytics";
import { Phone, Mail, MapPin } from "lucide-react";

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

// Quick FAQ items
const quickFaqs = [
  {
    question: "Qual o horário de atendimento?",
    answer: "Segunda a Sexta, das 8h às 18h (horário de Brasília/MS).",
  },
  {
    question: "Quanto tempo para resposta?",
    answer: "WhatsApp: imediato em horário comercial. E-mail: até 24h úteis.",
  },
  {
    question: "Vocês fazem demonstração?",
    answer: "Sim! Agende uma demonstração gratuita pelo WhatsApp.",
  },
  {
    question: "Atendem fora de Campo Grande?",
    answer: "Sim, atendemos todo o Brasil com suporte remoto e treinamento online.",
  },
];

// Systems for select
const systems = [
  { value: "", label: "Selecione um sistema (opcional)" },
  { value: "salesmasters", label: "SalesMasters - Representação Comercial" },
  { value: "emissor", label: "Emissor Fiscal - NFe/NFCe/CTe/MDFe" },
  { value: "salesspot", label: "SalesSpot - Comércio" },
  { value: "strudent", label: "Strudent-App - Gestão Escolar" },
  { value: "outro", label: "Outro / Não sei ainda" },
];

// Footer
const Footer = () => {
  return (
    <footer className="relative bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="mb-4">
              <img 
                src="./logo.png" 
                alt="SoftHam Sistemas" 
                className="h-14 w-auto object-contain"
              />
              <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] mt-1 block">
                SISTEMAS
              </span>
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

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    sistema: "",
    assunto: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [errors, setErrors] = useState<{[key: string]: boolean}>({});
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  const { ref: faqRef, isVisible: faqVisible } = useIntersectionObserver();
  const { ref: mapRef, isVisible: mapVisible } = useIntersectionObserver();
  const { ref: formRef, isVisible: formVisible } = useIntersectionObserver();

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "nome":
        return value.length >= 2;
      case "telefone":
        return value.replace(/\D/g, "").length >= 10;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      case "mensagem":
        return value.length >= 10;
      default:
        return true;
    }
  };

  const handleBlur = (name: string) => {
    setFocused(null);
    if (formData[name as keyof typeof formData]) {
      setErrors({ ...errors, [name]: !validateField(name, formData[name as keyof typeof formData]) });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all required fields
    const newErrors: {[key: string]: boolean} = {};
    ["nome", "telefone", "email", "mensagem"].forEach((field) => {
      if (!validateField(field, formData[field as keyof typeof formData])) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Track form submission
    trackFormSubmit(formData.sistema || 'geral');

    setSubmitted(true);
    setFormData({
      nome: "",
      telefone: "",
      email: "",
      sistema: "",
      assunto: "",
      mensagem: "",
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <style>{`
        html { scroll-behavior: smooth; }
        ::selection { background: #00ff88; color: #0a0a0a; }
        * { cursor: none !important; }
        @media (max-width: 1023px) { * { cursor: auto !important; } }
        @keyframes success-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .success-animation {
          animation: success-pulse 0.5s ease-in-out;
        }
      `}</style>
      <CustomCursor />
      <NavBar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,255,136,0.05)_0%,transparent_60%)]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#00ff88]" />
            <span className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase">Fale Conosco</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tight">
            CONTATO<br/>
            <span className="text-[#ff0033]">DIRETO</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-2xl leading-relaxed">
            Estamos prontos para ajudar você a encontrar a solução ideal para o seu negócio. Entre em contato agora!
          </p>
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section ref={faqRef} className="py-12 px-6 lg:px-20 bg-[#050505]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// DÚVIDAS RÁPIDAS</span>
              <h2 className="text-2xl font-black text-white mt-2">ANTES DE ENTRAR EM CONTATO</h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickFaqs.map((faq, index) => (
              <div
                key={index}
                className={`group border border-white/10 hover:border-[#00ff88]/30 p-5 transition-all cursor-pointer ${
                  expandedFaq === index ? "border-[#00ff88]/30 bg-[#00ff88]/5" : ""
                }`}
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00ff88] transition-colors">
                    {faq.question}
                  </h3>
                  <span className={`text-[#00ff88] text-lg transition-transform ${expandedFaq === index ? "rotate-45" : ""}`}>+</span>
                </div>
                {expandedFaq === index && (
                  <p className="text-white/60 text-sm mt-3 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main content: Contact Info + Form */}
      <section ref={formRef} className="py-16 px-6 lg:px-20">
        <div className={`max-w-7xl mx-auto grid lg:grid-cols-5 gap-12 transition-all duration-1000 ${formVisible ? "opacity-100" : "opacity-0"}`}>
          {/* Contact info - 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="text-[#ff0033] text-xs font-bold tracking-[0.3em] uppercase">// CANAIS DE ATENDIMENTO</span>
              <h2 className="text-3xl font-black text-white mt-2">FALE CONOSCO</h2>
            </div>
            
            {/* WhatsApp - Main CTA */}
            <a
              href="http://wa.me/5567996078885"
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-6 bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 border border-[#25D366]/30 hover:border-[#25D366] transition-all"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 flex items-center justify-center bg-[#25D366] rounded-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-black text-xl group-hover:text-[#25D366] transition-colors">WHATSAPP</h3>
                  <p className="text-white/70 text-lg font-bold mt-1">(67) 9 9607-8885</p>
                  <p className="text-white/40 text-sm mt-2">Atendimento rápido em horário comercial</p>
                  <span className="inline-flex items-center gap-2 text-[#25D366] text-sm font-bold mt-3 group-hover:gap-3 transition-all">
                    Iniciar conversa <span>→</span>
                  </span>
                </div>
              </div>
            </a>

            {/* Other contacts */}
            <div className="grid gap-4">
              <a href="tel:5567996078885" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-[#00ff88]/30 transition-all">
                <div className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] transition-all">
                  <Phone className="w-6 h-6 text-[#00ff88]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-[#00ff88] transition-colors">Telefone</h3>
                  <p className="text-white/50 text-sm">(67) 9 9607-8885</p>
                </div>
              </a>

              <a href="mailto:hamilton@softham.com.br" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-[#00ff88]/30 transition-all">
                <div className="w-12 h-12 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] transition-all">
                  <Mail className="w-6 h-6 text-[#00ff88]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-[#00ff88] transition-colors">E-mail</h3>
                  <p className="text-white/50 text-sm">hamilton@softham.com.br</p>
                </div>
              </a>

              <a href="https://www.youtube.com/@hamiltonrodrigues7499" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 border border-white/10 hover:border-[#ff0033]/30 transition-all">
                <div className="w-12 h-12 flex items-center justify-center bg-[#ff0033]/10 group-hover:bg-[#ff0033]/20 transition-all">
                  <svg className="w-6 h-6 text-[#ff0033]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                    <path fill="#0a0a0a" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-[#ff0033] transition-colors">YouTube</h3>
                  <p className="text-white/50 text-sm">Tutoriais e novidades</p>
                </div>
              </a>
            </div>

            {/* Business hours */}
            <div className="p-5 border border-white/10 bg-white/[0.02]">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
                <span>🕐</span> HORÁRIO DE ATENDIMENTO
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-white/40">Segunda a Sexta</span>
                  <span className="text-[#00ff88] font-bold">08:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Sábado</span>
                  <span className="text-white/60">Fechado</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/40">Domingo</span>
                  <span className="text-white/60">Fechado</span>
                </div>
              </div>
              <p className="text-white/30 text-xs mt-3">* Horário de Brasília (GMT-3)</p>
            </div>
          </div>

          {/* Contact form - 3 columns */}
          <div className="lg:col-span-3">
            <div className="border border-white/10 p-8 lg:p-10 bg-gradient-to-br from-white/[0.02] to-transparent">
              <div className="mb-8">
                <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// FORMULÁRIO</span>
                <h2 className="text-3xl font-black text-white mt-2">ENVIE SUA MENSAGEM</h2>
                <p className="text-white/50 text-sm mt-2">Preencha o formulário abaixo e entraremos em contato.</p>
              </div>

              {submitted ? (
                <div className="text-center py-16 success-animation">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#00ff88]/20 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[#00ff88]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#00ff88] mb-2">MENSAGEM ENVIADA!</h3>
                  <p className="text-white/60">Entraremos em contato em breve.</p>
                  <p className="text-white/40 text-sm mt-4">Tempo médio de resposta: 2-4 horas úteis</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Nome */}
                    <div className="relative">
                      <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                        focused === "nome" ? "text-[#00ff88]" : errors.nome ? "text-[#ff0033]" : "text-white/40"
                      }`}>
                        NOME COMPLETO *
                      </label>
                      <input
                        type="text"
                        value={formData.nome}
                        onChange={(e) => {
                          setFormData({ ...formData, nome: e.target.value });
                          if (errors.nome) setErrors({ ...errors, nome: false });
                        }}
                        onFocus={() => setFocused("nome")}
                        onBlur={() => handleBlur("nome")}
                        required
                        className={`w-full mt-2 px-0 py-4 bg-transparent border-b text-white placeholder-white/20 focus:outline-none transition-colors ${
                          errors.nome ? "border-[#ff0033]" : "border-white/10 focus:border-[#00ff88]"
                        }`}
                        placeholder="Seu nome"
                      />
                      {errors.nome && <span className="text-[#ff0033] text-xs mt-1">Nome inválido</span>}
                    </div>

                    {/* Telefone */}
                    <div className="relative">
                      <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                        focused === "telefone" ? "text-[#00ff88]" : errors.telefone ? "text-[#ff0033]" : "text-white/40"
                      }`}>
                        TELEFONE / WHATSAPP *
                      </label>
                      <input
                        type="tel"
                        value={formData.telefone}
                        onChange={(e) => {
                          setFormData({ ...formData, telefone: e.target.value });
                          if (errors.telefone) setErrors({ ...errors, telefone: false });
                        }}
                        onFocus={() => setFocused("telefone")}
                        onBlur={() => handleBlur("telefone")}
                        required
                        className={`w-full mt-2 px-0 py-4 bg-transparent border-b text-white placeholder-white/20 focus:outline-none transition-colors ${
                          errors.telefone ? "border-[#ff0033]" : "border-white/10 focus:border-[#00ff88]"
                        }`}
                        placeholder="(00) 00000-0000"
                      />
                      {errors.telefone && <span className="text-[#ff0033] text-xs mt-1">Telefone inválido</span>}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="relative">
                      <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                        focused === "email" ? "text-[#00ff88]" : errors.email ? "text-[#ff0033]" : "text-white/40"
                      }`}>
                        E-MAIL *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: false });
                        }}
                        onFocus={() => setFocused("email")}
                        onBlur={() => handleBlur("email")}
                        required
                        className={`w-full mt-2 px-0 py-4 bg-transparent border-b text-white placeholder-white/20 focus:outline-none transition-colors ${
                          errors.email ? "border-[#ff0033]" : "border-white/10 focus:border-[#00ff88]"
                        }`}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <span className="text-[#ff0033] text-xs mt-1">E-mail inválido</span>}
                    </div>

                    {/* Sistema */}
                    <div className="relative">
                      <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                        focused === "sistema" ? "text-[#00ff88]" : "text-white/40"
                      }`}>
                        SISTEMA DE INTERESSE
                      </label>
                      <select
                        value={formData.sistema}
                        onChange={(e) => setFormData({ ...formData, sistema: e.target.value })}
                        onFocus={() => setFocused("sistema")}
                        onBlur={() => setFocused(null)}
                        className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff88'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right center", backgroundSize: "20px" }}
                      >
                        {systems.map((sys) => (
                          <option key={sys.value} value={sys.value} className="bg-[#0a0a0a] text-white">
                            {sys.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Assunto */}
                  <div className="relative">
                    <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                      focused === "assunto" ? "text-[#00ff88]" : "text-white/40"
                    }`}>
                      ASSUNTO
                    </label>
                    <input
                      type="text"
                      value={formData.assunto}
                      onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                      onFocus={() => setFocused("assunto")}
                      onBlur={() => setFocused(null)}
                      className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors"
                      placeholder="Ex: Orçamento, Demonstração, Dúvida técnica..."
                    />
                  </div>

                  {/* Mensagem */}
                  <div className="relative">
                    <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                      focused === "mensagem" ? "text-[#00ff88]" : errors.mensagem ? "text-[#ff0033]" : "text-white/40"
                    }`}>
                      MENSAGEM *
                    </label>
                    <textarea
                      value={formData.mensagem}
                      onChange={(e) => {
                        setFormData({ ...formData, mensagem: e.target.value });
                        if (errors.mensagem) setErrors({ ...errors, mensagem: false });
                      }}
                      onFocus={() => setFocused("mensagem")}
                      onBlur={() => handleBlur("mensagem")}
                      required
                      rows={4}
                      className={`w-full mt-2 px-0 py-4 bg-transparent border-b text-white placeholder-white/20 focus:outline-none transition-colors resize-none ${
                        errors.mensagem ? "border-[#ff0033]" : "border-white/10 focus:border-[#00ff88]"
                      }`}
                      placeholder="Descreva como podemos ajudá-lo..."
                    />
                    {errors.mensagem && <span className="text-[#ff0033] text-xs mt-1">Mensagem muito curta (mínimo 10 caracteres)</span>}
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-6 py-5 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-widest hover:bg-white transition-all relative overflow-hidden group"
                  >
                    <span className="relative z-10">ENVIAR MENSAGEM</span>
                    <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </button>

                  <p className="text-white/30 text-xs text-center">
                    * Campos obrigatórios. Seus dados estão seguros conosco.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map + Address Section */}
      <section ref={mapRef} className="py-16 px-6 lg:px-20 bg-[#050505]">
        <div className={`max-w-7xl mx-auto transition-all duration-1000 ${mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Address Info */}
            <div className="space-y-6">
              <div>
                <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// LOCALIZAÇÃO</span>
                <h2 className="text-3xl font-black text-white mt-2">ONDE ESTAMOS</h2>
              </div>

              <div className="p-6 border border-white/10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#00ff88]/10">
                    <MapPin className="w-6 h-6 text-[#00ff88]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Endereço</h3>
                    <p className="text-white/60 text-sm mt-1 leading-relaxed">
                      Rua 14 de Julho, 1234<br/>
                      Centro<br/>
                      Campo Grande - MS<br/>
                      CEP: 79002-333
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 border border-[#00ff88]/20 bg-[#00ff88]/5">
                <p className="text-white/60 text-sm">
                  <span className="text-[#00ff88] font-bold">💡 Dica:</span> Atendemos clientes de todo o Brasil com suporte remoto. Não é necessário visitar nosso escritório!
                </p>
              </div>
            </div>

            {/* Map */}
            <div className="lg:col-span-2 h-[400px] border border-white/10 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3737.9686668574445!2d-54.6295!3d-20.4697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9486e6726b2b9f3d%3A0x7c5e5e5e5e5e5e5e!2sCampo%20Grande%2C%20MS!5e0!3m2!1spt-BR!2sbr!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(1) invert(1) contrast(1.2)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização SoftHam"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
