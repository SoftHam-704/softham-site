import { useState, useEffect } from "react";
import { Link } from "wouter";
import { getLocalAnalytics, clearLocalAnalytics, exportAnalyticsCSV } from "../lib/analytics";

/**
 * Analytics Dashboard
 * 
 * This page displays local analytics data stored in localStorage.
 * Protected by a simple password authentication.
 * 
 * TO CONNECT WITH GOOGLE ANALYTICS:
 * 1. Go to https://analytics.google.com/
 * 2. Navigate to Reports > Realtime or Engagement > Events
 * 3. Your custom events will appear there with the categories and actions defined in analytics.ts
 * 4. For advanced dashboards, use Google Data Studio (Looker Studio) connected to your GA4 property
 */

// Simple password protection (change this in production)
const DASHBOARD_PASSWORD = "softham2024";

interface AnalyticsEvent {
  timestamp: number;
  category: string;
  action: string;
  label?: string;
  value?: number;
  page: string;
}

export default function Analytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    // Check if already authenticated in session
    const auth = sessionStorage.getItem("analytics_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
      loadEvents();
    }
  }, []);

  const loadEvents = () => {
    const data = getLocalAnalytics();
    setEvents(data.reverse()); // Most recent first
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DASHBOARD_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("analytics_auth", "true");
      loadEvents();
      setError("");
    } else {
      setError("Senha incorreta");
    }
  };

  const handleExportCSV = () => {
    const csv = exportAnalyticsCSV();
    if (!csv) {
      alert("Nenhum dado para exportar");
      return;
    }
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `softham-analytics-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleClearData = () => {
    if (confirm("Tem certeza que deseja limpar todos os dados de analytics?")) {
      clearLocalAnalytics();
      setEvents([]);
    }
  };

  // Calculate statistics
  const stats = {
    totalEvents: events.length,
    systemClicks: events.filter(e => e.category === "Sistemas").length,
    whatsappClicks: events.filter(e => e.category === "Contato").length,
    formSubmissions: events.filter(e => e.category === "Lead").length,
    downloads: events.filter(e => e.category === "Download").length,
    videoClicks: events.filter(e => e.category === "Video").length,
  };

  // Get clicks by system
  const systemBreakdown = events
    .filter(e => e.category === "Sistemas" && e.label)
    .reduce((acc, e) => {
      const label = e.label || "Outro";
      acc[label] = (acc[label] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Get clicks by page
  const pageBreakdown = events.reduce((acc, e) => {
    acc[e.page] = (acc[e.page] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Get most clicked CTAs
  const ctaBreakdown = events
    .filter(e => e.action.includes("click"))
    .reduce((acc, e) => {
      const key = `${e.action} - ${e.label || "sem label"}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  // Filter events
  const filteredEvents = activeFilter === "all" 
    ? events 
    : events.filter(e => e.category === activeFilter);

  const categories = ["all", "Sistemas", "Contato", "Lead", "Download", "Video", "CTA", "Navegacao"];

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex flex-col items-center">
              <img 
                src="./logo.png" 
                alt="SoftHam Sistemas" 
                className="h-16 w-auto object-contain"
              />
              <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] mt-1">
                SISTEMAS
              </span>
            </Link>
            <p className="text-white/40 mt-2">Analytics Dashboard</p>
          </div>
          
          <form onSubmit={handleLogin} className="bg-white/5 border border-white/10 p-8">
            <h2 className="text-white text-xl font-bold mb-6 text-center">Acesso Restrito</h2>
            
            <div className="mb-4">
              <label className="block text-white/60 text-sm mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 text-white focus:border-[#00ff88] outline-none transition-colors"
                placeholder="Digite a senha"
              />
            </div>
            
            {error && (
              <p className="text-[#ff0033] text-sm mb-4">{error}</p>
            )}
            
            <button
              type="submit"
              className="w-full py-3 bg-[#00ff88] text-[#0a0a0a] font-bold hover:bg-white transition-colors"
            >
              Entrar
            </button>
          </form>
          
          <p className="text-white/30 text-xs text-center mt-6">
            Acesso exclusivo para administradores
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex flex-col items-start">
              <img 
                src="./logo.png" 
                alt="SoftHam Sistemas" 
                className="h-10 w-auto object-contain"
              />
              <span className="text-white/60 text-[9px] font-bold tracking-[0.3em] mt-0.5">
                SISTEMAS
              </span>
            </Link>
            <span className="text-white/40 text-sm">/ Analytics Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 text-sm border border-white/20 text-white hover:border-[#00ff88] transition-colors"
            >
              Exportar CSV
            </button>
            <button
              onClick={handleClearData}
              className="px-4 py-2 text-sm border border-[#ff0033]/50 text-[#ff0033] hover:bg-[#ff0033]/10 transition-colors"
            >
              Limpar Dados
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          <StatCard label="Total Eventos" value={stats.totalEvents} color="#00ff88" />
          <StatCard label="Cliques Sistemas" value={stats.systemClicks} color="#00ff88" />
          <StatCard label="WhatsApp" value={stats.whatsappClicks} color="#25D366" />
          <StatCard label="Formulários" value={stats.formSubmissions} color="#ff0033" />
          <StatCard label="Downloads" value={stats.downloads} color="#ffffff" />
          <StatCard label="Vídeos" value={stats.videoClicks} color="#ff0033" />
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* System Clicks */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Cliques por Sistema
            </h3>
            <div className="space-y-4">
              {Object.entries(systemBreakdown).length > 0 ? (
                Object.entries(systemBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .map(([system, count]) => (
                    <BarItem key={system} label={system} value={count} max={Math.max(...Object.values(systemBreakdown))} />
                  ))
              ) : (
                <p className="text-white/40 text-sm">Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* Pages */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Páginas Mais Visitadas
            </h3>
            <div className="space-y-4">
              {Object.entries(pageBreakdown).length > 0 ? (
                Object.entries(pageBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([page, count]) => (
                    <BarItem key={page} label={page || "/"} value={count} max={Math.max(...Object.values(pageBreakdown))} color="#ff0033" />
                  ))
              ) : (
                <p className="text-white/40 text-sm">Nenhum dado disponível</p>
              )}
            </div>
          </div>

          {/* CTAs */}
          <div className="bg-white/5 border border-white/10 p-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              CTAs Mais Clicados
            </h3>
            <div className="space-y-4">
              {Object.entries(ctaBreakdown).length > 0 ? (
                Object.entries(ctaBreakdown)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([cta, count]) => (
                    <BarItem key={cta} label={cta} value={count} max={Math.max(...Object.values(ctaBreakdown))} color="#ffffff" />
                  ))
              ) : (
                <p className="text-white/40 text-sm">Nenhum dado disponível</p>
              )}
            </div>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white/5 border border-white/10 p-6 mb-12">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">
            Taxa de Conversão
          </h3>
          <div className="flex items-center gap-8">
            <div>
              <span className="text-4xl font-black text-[#00ff88]">
                {stats.totalEvents > 0 
                  ? ((stats.formSubmissions / stats.totalEvents) * 100).toFixed(1) 
                  : "0"}%
              </span>
              <p className="text-white/40 text-sm mt-1">Formulários / Total de eventos</p>
            </div>
            <div className="flex-1 h-4 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#00ff88] transition-all duration-500"
                style={{ width: `${stats.totalEvents > 0 ? (stats.formSubmissions / stats.totalEvents) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Events Table */}
        <div className="bg-white/5 border border-white/10">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">
              Eventos Recentes
            </h3>
            
            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1 text-xs uppercase tracking-wider border transition-colors ${
                    activeFilter === cat
                      ? "bg-[#00ff88] text-[#0a0a0a] border-[#00ff88]"
                      : "border-white/20 text-white/60 hover:border-white/40"
                  }`}
                >
                  {cat === "all" ? "Todos" : cat}
                </button>
              ))}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 text-xs uppercase tracking-wider border-b border-white/10">
                  <th className="px-6 py-4">Data/Hora</th>
                  <th className="px-6 py-4">Categoria</th>
                  <th className="px-6 py-4">Ação</th>
                  <th className="px-6 py-4">Label</th>
                  <th className="px-6 py-4">Página</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.length > 0 ? (
                  filteredEvents.slice(0, 50).map((event, i) => (
                    <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 text-white/60 text-sm">
                        {new Date(event.timestamp).toLocaleString("pt-BR")}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 text-xs bg-[#00ff88]/10 text-[#00ff88]">
                          {event.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white text-sm">{event.action}</td>
                      <td className="px-6 py-4 text-white/60 text-sm">{event.label || "-"}</td>
                      <td className="px-6 py-4 text-white/40 text-sm">{event.page}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/40">
                      Nenhum evento registrado ainda. Interaja com o site para gerar dados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 border border-[#00ff88]/20 bg-[#00ff88]/5">
          <h3 className="text-[#00ff88] font-bold text-sm uppercase tracking-wider mb-4">
            📊 Como Conectar ao Google Analytics
          </h3>
          <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
            <li>Acesse <span className="text-white">analytics.google.com</span> e crie uma propriedade GA4</li>
            <li>Copie o Measurement ID (começa com G-)</li>
            <li>Abra <span className="text-[#00ff88]">src/web/lib/analytics.ts</span></li>
            <li>Substitua <span className="text-white">'G-XXXXXXXXXX'</span> pelo seu ID</li>
            <li>Deploy a aplicação - os eventos serão enviados automaticamente</li>
            <li>No GA4, vá em <span className="text-white">Reports &gt; Engagement &gt; Events</span> para ver os dados</li>
          </ol>
          <p className="text-white/40 text-xs mt-4">
            Este dashboard local é independente do Google Analytics. Os dados são armazenados no navegador do visitante.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-white/30 text-xs">
          SoftHam Analytics Dashboard — Dados armazenados localmente
        </div>
      </footer>
    </div>
  );
}

// Stat Card Component
const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="bg-white/5 border border-white/10 p-4">
    <div className="text-3xl font-black" style={{ color }}>{value}</div>
    <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{label}</div>
  </div>
);

// Bar Chart Item Component
const BarItem = ({ label, value, max, color = "#00ff88" }: { label: string; value: number; max: number; color?: string }) => (
  <div>
    <div className="flex items-center justify-between text-sm mb-1">
      <span className="text-white/60 truncate pr-4">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ 
          width: `${(value / max) * 100}%`,
          backgroundColor: color
        }}
      />
    </div>
  </div>
);
