import React from 'react';
import { PersonaRole, NavSection, CurrentUser } from '../types';
import { 
  Bell, 
  Search, 
  Sparkles, 
  ChevronDown, 
  CheckCircle2, 
  ShieldCheck, 
  Building2,
  FileSpreadsheet,
  LogOut
} from 'lucide-react';

interface NavbarProps {
  currentUser: CurrentUser | null;
  onLogout: () => void;
  currentPersona: PersonaRole;
  onSelectPersona: (persona: PersonaRole) => void;
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenNewDemand: () => void;
  onExportReport: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  pendingDecisionsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onLogout,
  currentPersona,
  onSelectPersona,
  activeSection,
  onNavigate,
  onOpenNewDemand,
  onExportReport,
  searchQuery,
  onSearchChange,
  pendingDecisionsCount,
}) => {
  const personas: PersonaRole[] = [
    'Chapter Leader',
    'Capability Lead',
    'Delivery Lead',
    'Product Manager',
    'Project Manager',
    'Product Owner',
    'Scrum Master',
    'Talent',
    'PMO',
    'Administrator',
    'Management DDP',
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Clean Single-Line Nav Links) — Zone 3 (Primary Action & Persona) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 rounded"
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-sm">
              DPS
            </div>
            <div>
              <div className="text-base font-bold tracking-tight text-slate-900 leading-none">
                Portal Chapter DPS
              </div>
              <div className="text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                Telkom Indonesia · Divisi Digital Business
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: Fast Navigation & Global Search */}
        <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari talent, produk, project, atau SOP..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg placeholder-slate-400 focus:outline-none focus:bg-white focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-colors"
            />
          </div>
        </div>

        {/* Zone 3: Persona Switcher & Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Quick Home Jump */}
          <button
            onClick={() => onNavigate('home')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              activeSection === 'home'
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <span>Home</span>
          </button>

          {/* Quick AI Workspace Jump */}
          <button
            onClick={() => onNavigate('ai-workspace')}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap ${
              activeSection === 'ai-workspace'
                ? 'bg-red-50 text-red-700 border-red-200'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>TANIA & JARVIS</span>
          </button>

          {/* Pending Decisions Indicator */}
          {pendingDecisionsCount > 0 && (
            <button
              onClick={() => onNavigate('executive')}
              title={`${pendingDecisionsCount} keputusan pending menunggu approval`}
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white" />
            </button>
          )}

          {/* Persona Switcher Dropdown (RBAC simulation) */}
          <div className="relative flex items-center">
            <label htmlFor="persona-select" className="sr-only">Pilih Persona</label>
            <div className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 cursor-pointer">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
              <select
                id="persona-select"
                value={currentPersona}
                onChange={(e) => onSelectPersona(e.target.value as PersonaRole)}
                className="bg-transparent text-xs font-semibold text-slate-900 focus:outline-none cursor-pointer pr-1"
              >
                {personas.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={onOpenNewDemand}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>+ Ajukan Demand</span>
          </button>

          {/* User Profile & Logout Action */}
          {currentUser && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div 
                title={`${currentUser.name} (${currentUser.role})`}
                className={`w-8 h-8 rounded-full ${currentUser.avatarColor} text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs`}
              >
                {currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>

              <button
                onClick={onLogout}
                title="Keluar ke Halaman Profil & Login"
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px]">Keluar</span>
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Secondary Contextual Strip: Global KPI Freshness & Scope */}
      <div className="bg-slate-50/80 border-t border-slate-200/70 px-4 sm:px-6 lg:px-8 py-1.5 text-[11px] text-slate-500 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700">Baseline PRD v1.0 (Oktober 2026)</span>
          <span aria-hidden="true">·</span>
          <span>Role Aktif: <strong className="text-slate-800 font-semibold">{currentPersona}</strong></span>
          <span aria-hidden="true">·</span>
          <span>SLA Target: Validasi ≤2d / Matching ≤3d</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onExportReport}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 font-medium transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-500" />
            <span>Export Snapshot Laporan</span>
          </button>
          <span aria-hidden="true">·</span>
          <span>Single Source of Truth: Operational Layer</span>
        </div>
      </div>
    </header>
  );
};
