import React, { useState } from 'react';
import { DemandAssignment, Talent } from '../types';
import { 
  GitPullRequest, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  UserCheck, 
  Filter, 
  ArrowRight,
  Plus,
  Search
} from 'lucide-react';

interface AssignmentWorkflowProps {
  demands: DemandAssignment[];
  talents: Talent[];
  onOpenNewDemand: () => void;
  onApproveDemand: (demandId: string) => void;
  onRejectDemand: (demandId: string) => void;
  onMatchTalent: (demand: DemandAssignment) => void;
}

export const AssignmentWorkflow: React.FC<AssignmentWorkflowProps> = ({
  demands,
  talents,
  onOpenNewDemand,
  onApproveDemand,
  onRejectDemand,
  onMatchTalent,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedDemand, setSelectedDemand] = useState<DemandAssignment | null>(demands[0] || null);

  const filteredDemands = statusFilter === 'All'
    ? demands
    : demands.filter(d => d.status === statusFilter);

  // SLA tracking calculation
  const withinSlaCount = demands.filter(d => d.slaStatus === 'Within SLA').length;
  const approachingSlaCount = demands.filter(d => d.slaStatus === 'Approaching SLA').length;
  const breachedSlaCount = demands.filter(d => d.slaStatus === 'Breached').length;

  return (
    <div className="space-y-6">
      
      {/* Header & SLA Overview */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              TALENT ASSIGNMENT & DEMAND INTAKE (ASN-001 - ASN-010)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Workflow Alokasi & Pemenuhan Talent
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Alur end-to-end: Pengajuan Demand → Validasi Kapasitas → TANIA Matching → Persetujuan → Aktivasi.
            </p>
          </div>

          <button
            onClick={onOpenNewDemand}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Ajukan Demand Baru (US-006)</span>
          </button>
        </div>

        {/* SLA Status Strip */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-slate-500 font-medium">Within SLA Target</div>
              <div className="text-lg font-bold font-mono text-emerald-600 mt-0.5">{withinSlaCount} Demand</div>
            </div>
            <span className="text-[10px] text-slate-400">Target ≤2d</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-slate-500 font-medium">Approaching SLA Deadline</div>
              <div className="text-lg font-bold font-mono text-amber-600 mt-0.5">{approachingSlaCount} Demand</div>
            </div>
            <span className="text-[10px] text-slate-400">Sisa &lt;24 jam</span>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-slate-500 font-medium">Breached SLA</div>
              <div className="text-lg font-bold font-mono text-red-600 mt-0.5">{breachedSlaCount} Demand</div>
            </div>
            <span className="text-[10px] text-slate-400">Zero Breached Goal</span>
          </div>
        </div>
      </div>

      {/* Main List & Details Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Demands List */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-400 tracking-wider">
              DAFTAR DEMAND MASUK ({filteredDemands.length})
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-[11px]">
              {(['All', 'Pending Approval', 'Matching', 'Approved'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-2 py-1 rounded transition-colors ${
                    statusFilter === st
                      ? 'bg-slate-900 text-white font-semibold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {st === 'All' ? 'Semua' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {filteredDemands.map((demand) => {
              const isSelected = selectedDemand?.id === demand.id;
              return (
                <div
                  key={demand.id}
                  onClick={() => setSelectedDemand(demand)}
                  className={`py-3 px-3 -mx-2 rounded-lg cursor-pointer transition-all ${
                    isSelected ? 'bg-red-50/60 border border-red-200' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                      <span className="font-bold text-slate-700">{demand.demandNumber}</span>
                      <span aria-hidden="true">·</span>
                      <span>{demand.requestingTribe}</span>
                    </div>

                    <span className={`text-[11px] font-bold ${
                      demand.status === 'Approved' ? 'text-emerald-700' :
                      demand.status === 'Pending Approval' ? 'text-amber-700' :
                      demand.status === 'Matching' ? 'text-blue-700' : 'text-slate-700'
                    }`}>
                      {demand.status}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 mt-1">
                    {demand.title}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Role: <strong className="text-slate-700">{demand.roleRequired}</strong> ({demand.allocationPct}%)</span>
                    <span className={`font-mono ${demand.slaStatus === 'Approaching SLA' ? 'text-amber-600 font-bold' : 'text-slate-500'}`}>
                      {demand.slaStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Demand Detail & TANIA Matcher */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          {selectedDemand ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {selectedDemand.demandNumber}
                  </span>
                  <span className={`text-xs font-bold ${
                    selectedDemand.priority === 'High' ? 'text-red-600' : 'text-slate-600'
                  }`}>
                    Prioritas {selectedDemand.priority}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mt-1">
                  {selectedDemand.title}
                </h3>
              </div>

              {/* Scope & Details */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Tribe Pengaju:</span>
                  <span className="font-semibold text-slate-800">{selectedDemand.requestingTribe}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Squad Sasaran:</span>
                  <span className="font-semibold text-slate-800">{selectedDemand.targetSquad}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kapasitas Diminta:</span>
                  <span className="font-semibold font-mono text-slate-800">{selectedDemand.allocationPct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Durasi Penugasan:</span>
                  <span className="font-mono text-slate-800">{selectedDemand.startDate} s/d {selectedDemand.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PIC Pemohon:</span>
                  <span className="text-slate-800">{selectedDemand.submittedBy}</span>
                </div>
              </div>

              {/* Justification */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400">JUSTIFIKASI BISNIS</div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedDemand.justification}
                </p>
              </div>

              {/* Required Skills */}
              <div>
                <div className="text-[11px] font-semibold text-slate-400">KEAHLIAN YANG DIBUTUHKAN</div>
                <div className="text-xs text-slate-700 mt-1 flex flex-wrap gap-x-2 gap-y-1">
                  {selectedDemand.requiredSkills.map((sk, idx) => (
                    <span key={sk}>
                      {sk}{idx < selectedDemand.requiredSkills.length - 1 ? ' ·' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* TANIA Candidate Matching Preview */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                    <Sparkles className="w-3.5 h-3.5 text-red-600" />
                    <span>TANIA Candidate Matching</span>
                  </div>
                  <button
                    onClick={() => onMatchTalent(selectedDemand)}
                    className="text-[11px] font-semibold text-red-600 hover:text-red-700"
                  >
                    Jalankan AI Matcher
                  </button>
                </div>

                {selectedDemand.assignedTalentName ? (
                  <div className="mt-2.5 p-3 bg-emerald-50/70 border border-emerald-200 rounded-lg text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900">{selectedDemand.assignedTalentName}</span>
                      <span className="text-emerald-700 font-mono font-bold text-[11px]">Match Score 94%</span>
                    </div>
                    <div className="text-[11px] text-emerald-800 mt-1">
                      Kandidat direkomendasikan dan telah dikonfirmasi memiliki ketersediaan kapasitas 60%.
                    </div>
                  </div>
                ) : (
                  <div className="mt-2.5 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
                    Kandidat belum ditetapkan. Klik tombol di bawah untuk rekomendasi otomatis berdasarkan ketersediaan kapasitas.
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                {selectedDemand.status === 'Pending Approval' ? (
                  <>
                    <button
                      onClick={() => onApproveDemand(selectedDemand.id)}
                      className="flex-1 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      Setujui Alokasi
                    </button>
                    <button
                      onClick={() => onRejectDemand(selectedDemand.id)}
                      className="px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                    >
                      Tolak
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => onMatchTalent(selectedDemand)}
                    className="w-full py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Buka Matriks Pencocokan Talent
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Pilih salah satu demand di sebelah kiri untuk melihat rincian dan rekomendasi matching.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
