import React, { useState } from 'react';
import { DemandAssignment } from '../types';
import { X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface NewDemandModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitDemand: (demand: Omit<DemandAssignment, 'id' | 'demandNumber' | 'status' | 'slaStatus' | 'daysInStage' | 'submittedAt'>) => void;
}

export const NewDemandModal: React.FC<NewDemandModalProps> = ({
  isOpen,
  onClose,
  onSubmitDemand,
}) => {
  const [title, setTitle] = useState<string>('');
  const [requestingTribe, setRequestingTribe] = useState<string>('Tribe Enterprise Digital');
  const [targetSquad, setTargetSquad] = useState<string>('Enterprise Connectivity Squad');
  const [roleRequired, setRoleRequired] = useState<string>('Digital Product Manager');
  const [requiredSkillsStr, setRequiredSkillsStr] = useState<string>('Product Strategy, Agile Delivery, B2B Enterprise');
  const [allocationPct, setAllocationPct] = useState<number>(50);
  const [startDate, setStartDate] = useState<string>('2026-11-01');
  const [endDate, setEndDate] = useState<string>('2027-02-28');
  const [priority, setPriority] = useState<DemandAssignment['priority']>('High');
  const [submittedBy, setSubmittedBy] = useState<string>('Lead PM Enterprise');
  const [justification, setJustification] = useState<string>('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !justification.trim()) return;

    const skills = requiredSkillsStr.split(',').map(s => s.trim()).filter(Boolean);

    onSubmitDemand({
      title,
      requestingTribe,
      targetSquad,
      roleRequired,
      requiredSkills: skills.length > 0 ? skills : ['Product Strategy'],
      allocationPct: Number(allocationPct),
      startDate,
      endDate,
      priority,
      submittedBy,
      justification,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-red-600 font-mono">
              WORKFLOW US-006 · DEMAND SUBMISSION
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Pengajuan Kebutuhan Talent Baru (Demand Intake)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Judul Demand / Inisiatif Penugasan:
            </label>
            <input
              type="text"
              placeholder="Contoh: Solution Architect untuk Integrasi AI IndiBiz Marketing"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tribe Pemohon:</label>
              <select
                value={requestingTribe}
                onChange={(e) => setRequestingTribe(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="Tribe Enterprise Digital">Tribe Enterprise Digital</option>
                <option value="Tribe SME Platform">Tribe SME Platform</option>
                <option value="Tribe Core Digital Platform">Tribe Core Digital Platform</option>
                <option value="Tribe Consumer Solutions">Tribe Consumer Solutions</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Squad Sasaran:</label>
              <input
                type="text"
                value={targetSquad}
                onChange={(e) => setTargetSquad(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Peran (Role) yang Dibutuhkan:</label>
              <select
                value={roleRequired}
                onChange={(e) => setRoleRequired(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="Digital Product Manager">Digital Product Manager</option>
                <option value="Digital Product Manager Lead">Digital Product Manager Lead</option>
                <option value="Solution Architect">Solution Architect</option>
                <option value="Technical Product Owner">Technical Product Owner</option>
                <option value="Scrum Master & Agile Coach">Scrum Master & Agile Coach</option>
                <option value="Lead Business Analyst">Lead Business Analyst</option>
                <option value="UI/UX Specialist">UI/UX Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Alokasi Kapasitas yang Diminta (%):</label>
              <input
                type="number"
                min="10"
                max="100"
                step="10"
                value={allocationPct}
                onChange={(e) => setAllocationPct(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg font-mono text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Keahlian Spesifik yang Diperlukan (pisahkan dengan koma):
            </label>
            <input
              type="text"
              value={requiredSkillsStr}
              onChange={(e) => setRequiredSkillsStr(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tanggal Mulai Penugasan:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tanggal Selesai Penugasan:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 font-mono"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Tingkat Prioritas:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
              >
                <option value="High">Tinggi (High) - Kritis Q4</option>
                <option value="Medium">Menengah (Medium)</option>
                <option value="Low">Rendah (Low)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-1">Nama Pemohon (Requester):</label>
              <input
                type="text"
                value={submittedBy}
                onChange={(e) => setSubmittedBy(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Justifikasi Bisnis & Dampak Nilai Produk:
            </label>
            <textarea
              rows={3}
              placeholder="Jelaskan urgensi bisnis, keterkaitan dengan KPI produk, dan konsekuensi jika tidak terpenuhi..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800"
              required
            />
          </div>

          {/* Validation Notice */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Ketentuan PRD v1.0:</strong> Setelah diajukan, sistem TANIA akan memvalidasi kelayakan kapasitas (SLA ≤ 2 hari kerja) sebelum masuk ke antrean matching dan persetujuan Chapter Leader.
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-bold shadow-xs transition-colors"
            >
              Kirim Demand ke Verifikasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
