import React, { useState } from 'react';
import { CurrentUser, PersonaRole } from '../types';
import { 
  Building2, 
  ShieldCheck, 
  Lock, 
  Sparkles, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  Kanban, 
  Award, 
  KeyRound, 
  ExternalLink,
  ChevronRight,
  Info
} from 'lucide-react';

interface LoginProfilePageProps {
  onLogin: (user: CurrentUser) => void;
}

export const LoginProfilePage: React.FC<LoginProfilePageProps> = ({ onLogin }) => {
  const [authMethod, setAuthMethod] = useState<'sso' | 'credential'>('sso');
  const [selectedRole, setSelectedRole] = useState<PersonaRole>('Chapter Leader');
  const [emailOrNik, setEmailOrNik] = useState<string>('henriset2023@gmail.com');
  const [password, setPassword] = useState<string>('••••••••••••');
  const [rememberMe, setRememberMe] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-configured role profiles for fast switching / demoing
  const demoProfiles: {
    role: PersonaRole;
    name: string;
    email: string;
    nik: string;
    tribe: string;
    avatarColor: string;
    description: string;
  }[] = [
    {
      role: 'Chapter Leader',
      name: 'Chapter Leader DPS',
      email: 'chapter.leader.dps@telkom.co.id',
      nik: 'NIK-840912',
      tribe: 'Chapter DPS Management',
      avatarColor: 'bg-red-600',
      description: 'Otoritas penuh: KPI eksekutif, persetujuan alokasi demand, & mitigasi risiko.',
    },
    {
      role: 'Capability Lead',
      name: 'Capability Lead Architecture',
      email: 'capability.lead@telkom.co.id',
      nik: 'NIK-881204',
      tribe: 'Professional Standards Guild',
      avatarColor: 'bg-blue-600',
      description: 'Standardisasi kompetensi KNOW/THINK/COMM/INFL, skill gap, & sertifikasi.',
    },
    {
      role: 'Delivery Lead',
      name: 'Hendro Sasongko',
      email: 'hendro.sasongko@telkom.co.id',
      nik: 'NIK-870519',
      tribe: 'Tribe Core Digital Platform',
      avatarColor: 'bg-slate-800',
      description: 'Monitoring sprint velocity, SLA alokasi, & eskalasi blocker Jira/ADO.',
    },
    {
      role: 'Product Manager',
      name: 'Dimas Wicaksono',
      email: 'dimas.wicaksono@telkom.co.id',
      nik: 'NIK-910328',
      tribe: 'Tribe Enterprise Digital',
      avatarColor: 'bg-emerald-600',
      description: 'Manajemen roadmap produk, PRD, backlog inisiatif, & feedback pengguna.',
    },
    {
      role: 'Talent',
      name: 'Dewi Lestari',
      email: 'dewi.lestari@telkom.co.id',
      nik: 'NIK-940715',
      tribe: 'Tribe SME Platform',
      avatarColor: 'bg-amber-600',
      description: 'Profil pribadi, timesheet mandiri TeMan, & riwayat assessment.',
    },
    {
      role: 'Administrator',
      name: 'System Administrator',
      email: 'admin.dps@telkom.co.id',
      nik: 'NIK-990101',
      tribe: 'Digital Governance & IT Ops',
      avatarColor: 'bg-indigo-600',
      description: 'Konfigurasi RBAC least-privilege, audit trail, & sinkronisasi integrasi.',
    },
  ];

  const handleExecuteLogin = (profileOverride?: typeof demoProfiles[0]) => {
    setIsSubmitting(true);
    setTimeout(() => {
      if (profileOverride) {
        onLogin({
          name: profileOverride.name,
          email: profileOverride.email,
          nik: profileOverride.nik,
          role: profileOverride.role,
          tribe: profileOverride.tribe,
          avatarColor: profileOverride.avatarColor,
        });
      } else {
        const matchingProfile = demoProfiles.find(p => p.role === selectedRole) || demoProfiles[0];
        onLogin({
          name: matchingProfile.name,
          email: emailOrNik.includes('@') ? emailOrNik : matchingProfile.email,
          nik: !emailOrNik.includes('@') ? emailOrNik : matchingProfile.nik,
          role: selectedRole,
          tribe: matchingProfile.tribe,
          avatarColor: matchingProfile.avatarColor,
        });
      }
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white">
      
      {/* Top Corporate Strip */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-md">
              DPS
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white leading-none">
                Portal Chapter Digital Product & Solution
              </div>
              <div className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                Telkom Indonesia · Divisi Digital Business
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Enterprise Single Sign-On (SSO) Ready</span>
            <span className="font-mono text-slate-500">· v1.0 MVP</span>
          </div>
        </div>
      </header>

      {/* Main Container: Split Two-Column (Profile Showcase on Left, Login Gateway on Right) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col lg:flex-row items-stretch gap-10">
        
        {/* Left Column: Chapter DPS Profile Showcase */}
        <div className="flex-1 flex flex-col justify-between space-y-8">
          
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span>AI-POWERED CHAPTER MANAGEMENT & COMMAND CENTER</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mt-4 leading-tight">
              Satu Wadah Keunggulan Talenta Digital Telkom
            </h1>

            <p className="mt-3 text-base text-red-400 font-semibold">
              "One Chapter. One Platform. One Source of Truth. AI-Powered Decisions."
            </p>

            <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Selamat datang di <strong>Portal Chapter Digital Product and Solution (DPS)</strong>, digital operating layer resmi Divisi Digital Business Telkom Indonesia. Portal ini mengintegrasikan seluruh orkestrasi talenta digital, alokasi kapasitas squad lintas Tribe, tata kelola proyek produk, evaluasi kompetensi berbasis bukti (*evidence-based*), serta kecerdasan buatan operasional (<strong>TANIA</strong> & <strong>JARVIS</strong>).
            </p>

            {/* 3 Pillars Overview Card Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div className="font-bold text-white mt-2.5">Portal Chapter DPS</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Single source of truth untuk Executive Command, direktori talent, portfolio produk, dan reporting audit.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div className="font-bold text-white mt-2.5">TANIA Copilot</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Workforce Intelligence: kapasitas 40h/minggu, timesheet TeMan, skill matching, & kelayakan alokasi.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/70 border border-slate-700/80 hover:border-slate-600 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-amber-600/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div className="font-bold text-white mt-2.5">JARVIS AI Agent</div>
                <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Product & Solution Intelligence: draf PRD, arsitektur microservices, BoQ SDM, & market business case.
                </div>
              </div>
            </div>

            {/* 4 Core Pillars of Talent Assessment */}
            <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
              <div className="text-[11px] font-bold text-slate-400 tracking-wider">
                FRAMEWORK KOMPETENSI TELKOM DPS (SKALA 1 - 5)
              </div>
              <div className="mt-2.5 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="font-bold text-red-400">KNOW</span>
                  <p className="text-slate-400 text-[10px] mt-0.5">Kedalaman domain teknologi & cloud</p>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="font-bold text-red-400">THINK</span>
                  <p className="text-slate-400 text-[10px] mt-0.5">Strategi hipotesis & analisa data</p>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="font-bold text-red-400">COMMUNICATE</span>
                  <p className="text-slate-400 text-[10px] mt-0.5">Artikulasi PRD jernih & kolaborasi</p>
                </div>
                <div className="p-2 bg-slate-900 rounded border border-slate-800">
                  <span className="font-bold text-red-400">INFLUENCE</span>
                  <p className="text-slate-400 text-[10px] mt-0.5">Kepemimpinan squad & mentoring</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Compliance Indicator */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Standar PRD DPS-PRD-001 v1.0</span>
            <span aria-hidden="true">·</span>
            <span>Kepatuhan UU PDP No. 27/2022</span>
            <span aria-hidden="true">·</span>
            <span>Least-Privilege RBAC Security</span>
          </div>

        </div>

        {/* Right Column: Secure Enterprise Authentication Card */}
        <div className="w-full lg:w-[440px] shrink-0">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-2xl space-y-6">
            
            {/* Login Card Header */}
            <div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-red-500 font-bold tracking-wider">
                  TELKOM ACCESS GATEWAY
                </span>
                <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  Enkripsi TLS 1.3
                </span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Masuk ke Portal Chapter DPS
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Gunakan kredensial SSO korporat atau pilih peran akses untuk evaluasi sistem.
              </p>
            </div>

            {/* Auth Method Switcher */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setAuthMethod('sso')}
                className={`flex-1 py-2 text-center rounded-lg transition-colors ${
                  authMethod === 'sso'
                    ? 'bg-red-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Telkom Corporate SSO
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('credential')}
                className={`flex-1 py-2 text-center rounded-lg transition-colors ${
                  authMethod === 'credential'
                    ? 'bg-slate-800 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Email / NIK Telkom
              </button>
            </div>

            {/* SSO Mode Form */}
            {authMethod === 'sso' ? (
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-3">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold">
                    <Building2 className="w-4 h-4 text-red-500" />
                    <span>Integrasi Telkom IAM Single Sign-On</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Sistem terhubung ke master identity provider Telkom. Pilih peran (*Persona RBAC*) yang akan Anda gunakan dalam sesi ini:
                  </p>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5 text-xs">
                      Pilih Peran Akun:
                    </label>
                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value as PersonaRole)}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-red-500 cursor-pointer"
                    >
                      {demoProfiles.map((p) => (
                        <option key={p.role} value={p.role}>
                          {p.role} — {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleExecuteLogin()}
                  disabled={isSubmitting}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-bold text-xs shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Mengautentikasi Sesi SSO...</span>
                  ) : (
                    <>
                      <span>Masuk dengan Corporate SSO Telkom</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* Credential Mode Form */
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleExecuteLogin();
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Email Resmi / NIK Telkom:
                  </label>
                  <input
                    type="text"
                    value={emailOrNik}
                    onChange={(e) => setEmailOrNik(e.target.value)}
                    placeholder="nama@telkom.co.id atau NIK"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Kata Sandi:
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Peran Otorisasi (RBAC Scope):
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value as PersonaRole)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white font-medium focus:outline-none focus:border-red-500 cursor-pointer"
                  >
                    {demoProfiles.map((p) => (
                      <option key={p.role} value={p.role}>
                        {p.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-400 text-[11px]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-900 text-red-600 focus:ring-0"
                    />
                    <span>Ingat sesi di perangkat ini</span>
                  </label>
                  <span className="text-[11px] text-red-400 hover:text-red-300 cursor-pointer">
                    Bantuan Akun
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-3 py-3 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl font-bold text-xs shadow-lg shadow-red-900/30 transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Memverifikasi Kredensial...</span>
                  ) : (
                    <>
                      <span>Masuk ke Portal Chapter DPS</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick Demo Access Bar: One-click entrance for any role */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-[11px] font-bold text-slate-400 tracking-wider mb-2.5 flex items-center justify-between">
                <span>AKSES CEPAT PERAN (ONE-CLICK LOGIN)</span>
                <span className="text-[10px] text-slate-500">Pilih Persona</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {demoProfiles.slice(0, 4).map((p) => (
                  <button
                    key={p.role}
                    type="button"
                    onClick={() => handleExecuteLogin(p)}
                    className="p-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-white text-[11px] group-hover:text-red-400 transition-colors truncate">
                      {p.role}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {p.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Disclaimer & Privacy Notice */}
            <div className="text-[10px] text-slate-500 leading-relaxed text-center">
              Akses hanya untuk personil yang berwenang. Semua aktivitas dicatat dalam log audit keamanan sesuai tata kelola Divisi Digital Business Telkom Indonesia.
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-4 text-center text-xs text-slate-500">
        &copy; 2026 PT Telkom Indonesia (Persero) Tbk. Divisi Digital Business · Chapter Digital Product and Solution (DPS-PRD-001 v1.0).
      </footer>

    </div>
  );
};
