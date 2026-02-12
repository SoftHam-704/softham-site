import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { trackWhatsAppClick, trackCTAClick } from "../lib/analytics";

// Reusable Logo Component
export const Logo = ({ 
  size = "default", 
  showSubtitle = false,
  className = "" 
}: { 
  size?: "small" | "default" | "large" | "footer";
  showSubtitle?: boolean;
  className?: string;
}) => {
  const sizeClasses = {
    small: "h-8 md:h-9",
    default: "h-10 md:h-12",
    large: "h-14 md:h-16",
    footer: "h-12 md:h-14"
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <img 
        src="./logo.png" 
        alt="SoftHam Sistemas" 
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105`}
      />
      {showSubtitle && (
        <span className="text-white/60 text-[10px] md:text-xs font-bold tracking-[0.3em] mt-1">
          SISTEMAS
        </span>
      )}
    </div>
  );
};

// Floating WhatsApp Button - appears on all pages
export const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPulsing, setIsPulsing] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    // Show after scroll
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    
    // Stop pulsing after 10 seconds
    const timer = setTimeout(() => setIsPulsing(false), 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = () => {
    trackWhatsAppClick(location || 'home');
  };

  return (
    <a
      href="http://wa.me/5567996078885"
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      data-category="Contato"
      data-action-type="click_whatsapp"
      data-product-name="floating-button"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {/* Tooltip */}
      <span className="hidden md:block bg-white text-[#0a0a0a] px-4 py-2 rounded-lg font-bold text-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
        Fale Conosco
      </span>
      
      {/* Button */}
      <div className={`relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform ${
        isPulsing ? "animate-bounce" : ""
      }`}>
        {/* Pulse ring */}
        {isPulsing && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40" />
        )}
        <svg className="w-7 h-7 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </div>
    </a>
  );
};

// Breadcrumbs for internal pages
interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav className="flex items-center gap-2 text-sm mb-6">
      <Link href="/" className="text-white/40 hover:text-[#00ff88] transition-colors">
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-white/20">/</span>
          {item.href ? (
            <Link href={item.href} className="text-white/40 hover:text-[#00ff88] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#00ff88]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

// Mobile menu component
export const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [location] = useLocation();

  const menuItems = [
    { label: "HOME", href: "/" },
    { label: "SISTEMAS", href: "/sistemas" },
    { label: "TUTORIAIS", href: "/tutoriais" },
    { label: "CONTATO", href: "/contato" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/80 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      
      {/* Menu panel */}
      <div className={`fixed top-0 right-0 w-[80%] max-w-sm h-full bg-[#0a0a0a] z-[70] transform transition-transform duration-500 ease-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#00ff88] transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="pt-8 px-8">
          <Link href="/" onClick={onClose} className="block">
            <Logo size="default" showSubtitle />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-12 px-8">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location === item.href;
              return (
                <li 
                  key={item.label}
                  className="overflow-hidden"
                  style={{ 
                    animation: isOpen ? `slideIn 0.5s ease-out ${index * 0.1}s forwards` : "none",
                    opacity: 0,
                    transform: "translateX(20px)"
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`block py-4 text-2xl font-black tracking-wider transition-colors border-b border-white/5 ${
                      isActive 
                        ? "text-[#00ff88]" 
                        : "text-white hover:text-[#00ff88]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-8 border-t border-white/5">
          <a
            href="http://wa.me/5567996078885"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('mobile-menu')}
            data-category="Contato"
            data-action-type="click_whatsapp"
            data-product-name="mobile-menu"
            className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-white font-black text-sm tracking-wider hover:bg-[#20bd5a] transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WHATSAPP
          </a>
          <p className="text-white/40 text-xs text-center mt-4">
            (67) 9 9607-8885
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

// Enhanced NavBar with mobile menu
export const NavBar = ({ transparent = false }: { transparent?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "py-3" : "py-6"
      }`}>
        <div className={`mx-4 lg:mx-12 flex items-center justify-between px-4 lg:px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled || !transparent ? "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5" : ""
        }`}>
          <Link href="/" className="flex items-center gap-2 group">
            <Logo size="small" showSubtitle />
          </Link>
          
          {/* Desktop menu */}
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
                className="px-4 py-2 transition-colors text-xs font-bold tracking-widest text-white/60 hover:text-[#00ff88]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href="http://wa.me/5567996078885"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('contato', 'navbar')}
              data-category="CTA"
              data-action-type="click_cta"
              data-product-name="navbar-contato"
              className="hidden md:block relative px-6 py-2.5 bg-[#00ff88] text-[#0a0a0a] font-black text-xs tracking-widest hover:bg-white transition-colors"
              style={{ clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)" }}
            >
              CONTATO
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Abrir menu"
            >
              <span className="w-6 h-0.5 bg-white transition-all" />
              <span className="w-4 h-0.5 bg-[#00ff88] transition-all" />
              <span className="w-6 h-0.5 bg-white transition-all" />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
};

// Custom cursor (shared)
export const CustomCursor = () => {
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
      <div
        className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 border border-[#00ff88]/50 rounded-full transition-all duration-300"
        style={{ 
          left: position.x, 
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      />
    </div>
  );
};

// Global styles
export const GlobalStyles = () => (
  <style>{`
    html { scroll-behavior: smooth; }
    ::selection { background: #00ff88; color: #0a0a0a; }
    * { cursor: none !important; }
    @media (max-width: 1023px) { * { cursor: auto !important; } }
    
    @keyframes slideIn {
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `}</style>
);
