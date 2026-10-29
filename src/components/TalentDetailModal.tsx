import React from 'react';
import { Talent } from '../types';
import { X, Award, Briefcase, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

interface TalentDetailModalProps {
  talent: Talent | null;
  onClose: () => void;
  onAssignDemand?: () => void;
}

export const TalentDetailModal: React.FC<TalentDetailModalProps> = ({
  talent,
  onClose,
  onAssignDemand,
}) => {
  if (!talent) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl ${talent.avatarColor} text-white font-bold text-base flex items-center justify-center shadow-xs`}>
              {talent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">{talent.name}</h2>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {talent.role} · {talent.grade}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {talent.squad} · {talent.tribe}
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs">
          
          {/* Capacity & Allocation Strip */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-[10px] text-slate-500">ALOKASI AKTIF</div>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{talent.allocationPct}%</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">SISA KAPASITAS</div>
              <div className="text-base font-bold font-mono text-emerald-600 mt-0.5">{talent.availableCapacity} Jam/Mgg</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500">TOTAL KAPASITAS</div>
              <div className="text-base font-bold font-mono text-slate-900 mt-0.5">{talent.totalCapacity} Jam/Mgg</div>
            </div>
          </div>

          {/* 4 Pillars Competency Scores */}
          <div>
            <div className="text-xs font-bold text-slate-400 tracking-wider mb-2">
              SKOR KOMPETENSI TELKOM DPS (1-5 SCALE)
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold">KNOW</div>
                <div className="text-sm font-bold font-mono text-red-600 mt-0.5">{talent.competencyScores.know}</div>
              </div>
              <div className="p-2 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold">THINK</div>
                <div className="text-sm font-bold font-mono text-red-600 mt-0.5">{talent.competencyScores.think}</div>
              </div>
              <div className="p-2 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold">COMMUNICATE</div>
                <div className="text-sm font-bold font-mono text-red-600 mt-0.5">{talent.competencyScores.communicate}</div>
              </div>
              <div className="p-2 border border-slate-200 rounded-lg">
                <div className="text-[10px] text-slate-500 font-bold">INFLUENCE</div>
                <div className="text-sm font-bold font-mono text-red-600 mt-0.5">{talent.competencyScores.influence}</div>
              </div>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div>
            <div className="text-xs font-bold text-slate-400 tracking-wider mb-1.5">
              KEAHLIAN & METODOLOGI (SKILLS MATRIX)
            </div>
            <div className="text-slate-700 leading-relaxed">
              {talent.skills.join(' · ')}
            </div>
          </div>

          {/* Certifications */}
          {talent.certifications.length > 0 && (
            <div>
              <div className="text-xs font-bold text-slate-400 tracking-wider mb-1.5">
                SERTIFIKASI PROFESIONAL
              </div>
              <div className="flex items-center gap-1.5 text-slate-800 font-mono">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{talent.certifications.join(', ')}</span>
              </div>
            </div>
          )}

          {/* Active Assignments */}
          <div>
            <div className="text-xs font-bold text-slate-400 tracking-wider mb-1.5">
              PENUGASAN AKTIF
            </div>
            <ul className="list-disc list-inside text-slate-700 space-y-1">
              {talent.activeAssignments.map(a => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Past Projects */}
          <div>
            <div className="text-xs font-bold text-slate-400 tracking-wider mb-1.5">
              REKAM JEJAK PROYEK SEBELUMNYA
            </div>
            <div className="text-slate-600">
              {talent.pastProjects.join(' · ')}
            </div>
          </div>

          {/* Contact */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{talent.email}</span>
            </span>
            <span className="font-mono text-slate-600">
              {talent.evidenceCount} Dokumen Bukti
            </span>
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
