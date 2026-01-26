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

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    telefone: "",
    email: "",
    assunto: "",
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
          <span className="text-[#00ff88] text-xs font-bold tracking-[0.3em] uppercase">// CONTATO</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mt-4 leading-[0.9] tracking-tight">
            FALE<br/>
            <span className="text-[#ff0033]">CONOSCO</span>
          </h1>
          <p className="text-white/50 text-xl mt-8 max-w-2xl">
            Estamos prontos para ajudar você a encontrar a solução ideal para o seu negócio.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">INFORMAÇÕES</h2>
            
            <div className="space-y-6">
              {/* WhatsApp */}
              <a
                href="http://wa.me/5567996078885"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-6 p-6 border border-white/10 hover:border-[#00ff88] transition-all"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-[#25D366]/20 group-hover:bg-[#25D366]/30 transition-all">
                  <svg className="w-8 h-8 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-black text-lg group-hover:text-[#00ff88] transition-colors">WHATSAPP</h3>
                  <p className="text-white/50 mt-1">(67) 9 9607-8885</p>
                  <span className="text-[#00ff88] text-sm font-bold mt-3 inline-block">Clique para conversar →</span>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:5567996078885"
                className="group flex items-start gap-6 p-6 border border-white/10 hover:border-[#00ff88] transition-all"
              >
                <div className="w-16 h-16 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] transition-all">
                  <span className="text-3xl">📞</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-lg group-hover:text-[#00ff88] transition-colors">TELEFONE</h3>
                  <p className="text-white/50 mt-1">(67) 9 9607-8885</p>
                  <span className="text-white/30 text-sm mt-3 inline-block">Segunda a Sexta, 8h às 18h</span>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hamilton@softham.com.br"
                className="group flex items-start gap-6 p-6 border border-white/10 hover:border-[#00ff88] transition-all"
              >
                <div className="w-16 h-16 flex items-center justify-center border border-white/20 group-hover:border-[#00ff88] transition-all">
                  <span className="text-3xl">✉️</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-lg group-hover:text-[#00ff88] transition-colors">E-MAIL</h3>
                  <p className="text-white/50 mt-1">hamilton@softham.com.br</p>
                  <span className="text-white/30 text-sm mt-3 inline-block">Respondemos em até 24h</span>
                </div>
              </a>

              {/* Address */}
              <div className="flex items-start gap-6 p-6 border border-white/10">
                <div className="w-16 h-16 flex items-center justify-center border border-white/20">
                  <span className="text-3xl">📍</span>
                </div>
                <div>
                  <h3 className="text-white font-black text-lg">LOCALIZAÇÃO</h3>
                  <p className="text-white/50 mt-1">Campo Grande, MS</p>
                  <span className="text-white/30 text-sm mt-3 inline-block">Brasil</span>
                </div>
              </div>
            </div>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@hamiltonrodrigues7499"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 mt-8 p-4 bg-[#ff0033]/10 hover:bg-[#ff0033]/20 transition-all"
            >
              <svg className="w-8 h-8 text-[#ff0033]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"/>
                <path fill="#0a0a0a" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <div>
                <span className="text-white font-bold group-hover:text-[#ff0033] transition-colors">Tutoriais no YouTube</span>
                <span className="text-white/40 text-sm block">Assista nossos vídeos</span>
              </div>
            </a>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-3xl font-black text-white mb-8">ENVIE SUA MENSAGEM</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                    focused === "nome" ? "text-[#00ff88]" : "text-white/40"
                  }`}>
                    NOME *
                  </label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    onFocus={() => setFocused("nome")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>

                <div className="relative">
                  <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                    focused === "telefone" ? "text-[#00ff88]" : "text-white/40"
                  }`}>
                    TELEFONE *
                  </label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                    onFocus={() => setFocused("telefone")}
                    onBlur={() => setFocused(null)}
                    required
                    className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors"
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>

              <div className="relative">
                <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                  focused === "email" ? "text-[#00ff88]" : "text-white/40"
                }`}>
                  E-MAIL *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  required
                  className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors"
                  placeholder="seu@email.com"
                />
              </div>

              <div className="relative">
                <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                  focused === "assunto" ? "text-[#00ff88]" : "text-white/40"
                }`}>
                  ASSUNTO
                </label>
                <select
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  onFocus={() => setFocused("assunto")}
                  onBlur={() => setFocused(null)}
                  className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white focus:outline-none transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0a0a0a]">Selecione um assunto</option>
                  <option value="salesmaster" className="bg-[#0a0a0a]">SalesMasters - Representação Comercial</option>
                  <option value="emissor" className="bg-[#0a0a0a]">Emissor Fiscal</option>
                  <option value="salesspot" className="bg-[#0a0a0a]">SalesSpot - Comércios</option>
                  <option value="suporte" className="bg-[#0a0a0a]">Suporte Técnico</option>
                  <option value="outros" className="bg-[#0a0a0a]">Outros</option>
                </select>
              </div>

              <div className="relative">
                <label className={`text-xs font-bold tracking-widest transition-colors duration-300 ${
                  focused === "mensagem" ? "text-[#00ff88]" : "text-white/40"
                }`}>
                  MENSAGEM *
                </label>
                <textarea
                  value={formData.mensagem}
                  onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                  onFocus={() => setFocused("mensagem")}
                  onBlur={() => setFocused(null)}
                  required
                  rows={5}
                  className="w-full mt-2 px-0 py-4 bg-transparent border-b border-white/10 focus:border-[#00ff88] text-white placeholder-white/20 focus:outline-none transition-colors resize-none"
                  placeholder="Como podemos ajudá-lo?"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full mt-4 py-5 bg-[#00ff88] text-[#0a0a0a] font-black text-sm tracking-widest hover:bg-white transition-colors disabled:opacity-50"
              >
                {submitted ? "MENSAGEM ENVIADA ✓" : "ENVIAR MENSAGEM"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="py-16 px-6 lg:px-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-[16/6] bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl mb-4 block">📍</span>
              <h3 className="text-white font-black text-xl">Campo Grande, MS</h3>
              <p className="text-white/40 mt-2">Brasil</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
