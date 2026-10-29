import React, { useState } from 'react';
import { Talent } from '../types';
import { 
  Network, 
  Users, 
  Briefcase, 
  Building, 
  Layers, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface OrganizationViewProps {
  talents: Talent[];
  onSelectTalent: (talent: Talent) => void;
}

export const OrganizationView: React.FC<OrganizationViewProps> = ({
  talents,
  onSelectTalent,
}) => {
  const [selectedTribe, setSelectedTribe] = useState<string>('Tribe Enterprise Digital');

  const tribes = [
    {
      id: 'Tribe Enterprise Digital',
      name: 'Tribe Enterprise Digital',
      description: 'Layanan digital terintegrasi B2B, konektivitas premium, cloud platform, dan solusi korporasi enterprise tier-1 Telkom.',
      headOfTribe: 'SVP Enterprise Digital Business',
      squads: ['Enterprise Connectivity Squad', 'IoT & Antares Data Squad'],
    },
    {
      id: 'Tribe SME Platform',
      name: 'Tribe SME Platform (IndiBiz)',
      description: 'Ekosistem produk digital untuk jutaan UMKM dan merchant di Indonesia, mencakup Merchant POS, sistem kasir, dan pembayaran terpadu.',
      headOfTribe: 'VP SME Digital Ecosystem',
      squads: ['SME Commerce & POS Squad'],
    },
    {
      id: 'Tribe Core Digital Platform',
      name: 'Tribe Core Digital Platform',
      description: 'Fondasi infrastruktur digital, API Gateway terpusat, billing engine korporasi, dan middleware microservices standar.',
      headOfTribe: 'VP Digital Core Architecture',
      squads: ['Cloud Billing & Gateway Squad', 'Omni-Channel Core Squad'],
    },
    {
      id: 'Tribe Consumer Solutions',
      name: 'Tribe Consumer Solutions',
      description: 'Platform self-service dan customer experience digital untuk jutaan pelanggan ritel dan korporat via MyTelkomsel Hub.',
      headOfTribe: 'VP Consumer Digital Experience',
      squads: ['Omni-Channel Core Squad'],
    },
  ];

  const roleCatalog = [
    {
      title: 'Digital Product Manager (DPM)',
      grades: 'Band III (Lead), Band IV (Senior), Band V (Associate)',
      scope: 'Bertanggung jawab atas strategi produk, roadmap bisnis, discovery kebutuhan pasar, PRD, dan pencapaian target product market fit.',
      activeCount: talents.filter(t => t.role.includes('Product Manager')).length,
    },
    {
      title: 'Digital Solution Architect (SA)',
      grades: 'Band III (Lead), Band IV (Senior)',
      scope: 'Merancang arsitektur sistem end-to-end, memastikan interoperabilitas microservices, standar TOGAF, keamanan data, dan reliability.',
      activeCount: talents.filter(t => t.role.includes('Solution Architect')).length,
    },
    {
      title: 'Technical Product Owner (TPO)',
      grades: 'Band IV (Senior), Band V (Specialist)',
      scope: 'Mengelola technical backlog, menerjemahkan BRD menjadi user stories detail, spesifikasi API, dan pengawalan sprint bersama tim engineering.',
      activeCount: talents.filter(t => t.role.includes('Product Owner')).length,
    },
    {
      title: 'Scrum Master & Agile Coach',
      grades: 'Band IV (Senior)',
      scope: 'Memfasilitasi agile ceremonies, menghapus impediment squad, tracking sprint burndown & velocity, serta evaluasi continuous improvement.',
      activeCount: talents.filter(t => t.role.includes('Scrum Master')).length,
    },
    {
      title: 'Lead Business Analyst (BA)',
      grades: 'Band IV (Senior), Band V (Specialist)',
      scope: 'Menyusun BRD, pemodelan proses bisnis BPMN, analisis kelayakan operasional, dan kriteria penerimaan fungsional.',
      activeCount: talents.filter(t => t.role.includes('Business Analyst')).length,
    },
    {
      title: 'UI/UX & Product Design Specialist',
      grades: 'Band IV (Senior), Band V (Specialist)',
      scope: 'Riset pengguna, pembuatan design system, wireframe, prototipe interaktif high-fidelity, dan usability testing.',
      activeCount: talents.filter(t => t.role.includes('UI/UX')).length,
    },
  ];

  const currentTribeData = tribes.find(t => t.id === selectedTribe) || tribes[0];
  const tribeTalents = talents.filter(t => t.tribe === selectedTribe);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Network className="w-4 h-4 text-red-600" />
          <span>STRUKTUR ORGANISASI & ROLE CATALOG · CHAPTER DPS</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
          Tata Kelola Chapter, Tribe & Squads
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Matriks penugasan lintas Tribe dan standardisasi kompetensi role digital Telkom Indonesia.
        </p>
      </div>

      {/* Main Hierarchy & Tribe Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tribe Selector List */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2">
          <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-3">
            DAFTAR TRIBE PENUGASAN ({tribes.length})
          </h2>
          {tribes.map((t) => {
            const isSelected = selectedTribe === t.id;
            const count = talents.filter(tl => tl.tribe === t.id).length;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedTribe(t.id)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  isSelected
                    ? 'border-red-600 bg-red-50/50 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{t.name}</span>
                  <span className="text-[11px] font-mono text-slate-500">{count} Talent</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {t.squads.join(' · ')}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tribe Squads & Assigned Talents */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-red-600">{currentTribeData.headOfTribe}</div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">{currentTribeData.name}</h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {currentTribeData.description}
            </p>
          </div>

          {/* Squads in Tribe */}
          <div className="mt-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider">
              SQUADS AKTIF & TALENT CHAPTER TERDELIBERASI
            </h3>

            {currentTribeData.squads.map((squadName) => {
              const squadTalents = tribeTalents.filter(t => t.squad === squadName);
              return (
                <div key={squadName} className="border border-slate-200 rounded-lg p-3 bg-slate-50/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{squadName}</span>
                    <span className="text-[11px] text-slate-500 font-mono">{squadTalents.length} Personil DPS</span>
                  </div>

                  <div className="mt-2.5 divide-y divide-slate-200/60">
                    {squadTalents.length === 0 ? (
                      <div className="text-[11px] text-slate-400 py-2">
                        Belum ada talent yang dialokasikan penuh ke squad ini.
                      </div>
                    ) : (
                      squadTalents.map((talent) => (
                        <div
                          key={talent.id}
                          onClick={() => onSelectTalent(talent)}
                          className="py-2 flex items-center justify-between cursor-pointer hover:bg-white rounded px-2 -mx-2 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">{talent.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <span>{talent.role}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono text-slate-600">{talent.grade}</span>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs font-mono font-bold text-slate-800">
                              Alokasi {talent.allocationPct}%
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Tersedia: {talent.availableCapacity}h/mgg
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Role Catalog (ORG-003) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="pb-3 border-b border-slate-100">
          <h2 className="text-sm font-bold text-slate-900">
            Role Catalog Chapter DPS Telkom
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Definisi tanggung jawab, tingkatan grade karier, dan jumlah personil aktif per peran.
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roleCatalog.map((role) => (
            <div key={role.title} className="p-3.5 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{role.title}</span>
                <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                  {role.activeCount} Orang
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono mt-1">
                {role.grades}
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {role.scope}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
