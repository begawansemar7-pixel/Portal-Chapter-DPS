import React, { useState } from 'react';
import { Talent } from '../types';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  Download, 
  UserPlus,
  BarChart2
} from 'lucide-react';

interface TalentDirectoryProps {
  talents: Talent[];
  onSelectTalent: (talent: Talent) => void;
  onOpenNewDemand: () => void;
  searchQuery: string;
}

export const TalentDirectory: React.FC<TalentDirectoryProps> = ({
  talents,
  onSelectTalent,
  onOpenNewDemand,
  searchQuery: globalSearch,
}) => {
  const [roleFilter, setRoleFilter] = useState<string>('All');
  const [tribeFilter, setTribeFilter] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');
  const [localSearch, setLocalSearch] = useState<string>('');

  const search = globalSearch || localSearch;

  const filteredTalents = talents.filter((t) => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.role.toLowerCase().includes(search.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(search.toLowerCase())) ||
      t.certifications.some(c => c.toLowerCase().includes(search.toLowerCase()));

    const matchRole = roleFilter === 'All' || t.role.includes(roleFilter);
    const matchTribe = tribeFilter === 'All' || t.tribe === tribeFilter;
    
    let matchAvail = true;
    if (availabilityFilter === 'Available') {
      matchAvail = t.allocationPct < 80;
    } else if (availabilityFilter === 'Optimal') {
      matchAvail = t.allocationPct >= 80 && t.allocationPct <= 95;
    } else if (availabilityFilter === 'Full') {
      matchAvail = t.allocationPct > 95;
    }

    return matchSearch && matchRole && matchTribe && matchAvail;
  });

  const exportTalentCsv = () => {
    const headers = ['ID', 'Nama', 'Role', 'Grade', 'Tribe', 'Alokasi %', 'Kapasitas Tersisa (jam)', 'Skills', 'Sertifikasi'];
    const rows = filteredTalents.map(t => [
      t.id,
      `"${t.name}"`,
      `"${t.role}"`,
      `"${t.grade}"`,
      `"${t.tribe}"`,
      t.allocationPct,
      t.availableCapacity,
      `"${t.skills.join(', ')}"`,
      `"${t.certifications.join(', ')}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Talent_Directory_DPS_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              TALENT MANAGEMENT & CAPABILITY ROSTER (TAL-001 - TAL-012)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Direktori Talent Chapter DPS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Profil terverifikasi, matriks kompetensi 4 pilar, sertifikasi industri, dan ketersediaan kapasitas.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={exportTalentCsv}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onOpenNewDemand}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Alokasikan Talent</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-slate-500 mb-1 font-medium">Pencarian Talent / Skill:</label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Nama, skill (AWS, TOGAF), dll..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-medium">Filter Peran (Role):</label>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
            >
              <option value="All">Semua Role</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Solution Architect">Solution Architect</option>
              <option value="Product Owner">Technical Product Owner</option>
              <option value="Scrum Master">Scrum Master</option>
              <option value="Business Analyst">Business Analyst</option>
              <option value="UI/UX">UI/UX Specialist</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-medium">Filter Tribe:</label>
            <select
              value={tribeFilter}
              onChange={(e) => setTribeFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
            >
              <option value="All">Semua Tribe</option>
              <option value="Tribe Enterprise Digital">Tribe Enterprise Digital</option>
              <option value="Tribe SME Platform">Tribe SME Platform</option>
              <option value="Tribe Core Digital Platform">Tribe Core Digital Platform</option>
              <option value="Tribe Consumer Solutions">Tribe Consumer Solutions</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-1 font-medium">Ketersediaan Kapasitas:</label>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
            >
              <option value="All">Semua Status</option>
              <option value="Available">Tersedia (&lt;80% Alokasi)</option>
              <option value="Optimal">Optimal (80-95%)</option>
              <option value="Full">Penuh / Limit (&gt;95%)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Talent Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTalents.map((talent) => (
          <div
            key={talent.id}
            onClick={() => onSelectTalent(talent)}
            className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Avatar & Basic Info */}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg ${talent.avatarColor} text-white font-bold flex items-center justify-center shrink-0 text-sm shadow-xs`}>
                  {talent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {talent.name}
                  </div>
                  <div className="text-[11px] text-slate-600 truncate mt-0.5">
                    {talent.role}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {talent.grade} · {talent.tribe.replace('Tribe ', '')}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-xs font-mono font-bold ${
                    talent.allocationPct > 95 ? 'text-red-600' :
                    talent.allocationPct >= 80 ? 'text-slate-800' : 'text-emerald-600'
                  }`}>
                    {talent.allocationPct}%
                  </span>
                  <div className="text-[10px] text-slate-400">
                    {talent.availableCapacity}h sisa
                  </div>
                </div>
              </div>

              {/* Skills List (Zero-Pill: Clean unboxed text with bullets) */}
              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="text-[10px] font-semibold text-slate-400 tracking-wider">
                  KOMPETENSI UTAMA
                </div>
                <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap gap-x-1.5 gap-y-0.5 leading-snug">
                  {talent.skills.slice(0, 4).map((s, idx) => (
                    <span key={s}>
                      {s}{idx < Math.min(talent.skills.length, 4) - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              {talent.certifications.length > 0 && (
                <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <Award className="w-3 h-3 text-amber-500 shrink-0" />
                  <span className="truncate">{talent.certifications.join(', ')}</span>
                </div>
              )}
            </div>

            {/* Bottom Row: Active Assignment & Evidence Count */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate max-w-[170px]" title={talent.activeAssignments.join(', ')}>
                {talent.activeAssignments[0] || 'Tersedia untuk assignment baru'}
              </span>
              <span className="font-mono text-slate-600 shrink-0">
                {talent.evidenceCount} Evidence
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredTalents.length === 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
          Tidak ditemukan talent yang sesuai dengan kriteria filter saat ini.
        </div>
      )}

    </div>
  );
};
