import React, { useState } from 'react';
import { PendingDecision } from '../types';
import { X, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface DecisionModalProps {
  decision: PendingDecision | null;
  onClose: () => void;
  onApprove: (id: string, notes: string) => void;
  onReject: (id: string, notes: string) => void;
}

export const DecisionModal: React.FC<DecisionModalProps> = ({
  decision,
  onClose,
  onApprove,
  onReject,
}) => {
  const [notes, setNotes] = useState<string>('Disetujui mengacu pada rekomendasi kelayakan kapasitas TANIA dan SLA pemenuhan Chapter DPS.');

  if (!decision) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="text-[11px] font-bold text-red-600 font-mono">
              EXECUTIVE APPROVAL GATEWAY
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Review Keputusan Manajemen: {decision.type}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Judul Pengajuan:</span>
              <span className="font-bold text-slate-900 text-right">{decision.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tribe Pemohon:</span>
              <span className="font-semibold text-slate-800">{decision.tribe}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Requester:</span>
              <span className="text-slate-800">{decision.requester}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Tanggal Diajukan:</span>
              <span className="font-mono text-slate-700">{decision.submittedDate}</span>
            </div>
          </div>

          <div>
            <div className="text-slate-500 font-medium">Rincian Pertimbangan:</div>
            <p className="text-slate-700 mt-1 leading-relaxed p-3 bg-white border border-slate-200 rounded-lg">
              {decision.details}
            </p>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Catatan Keputusan (Audit Trail Mandatory):
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
              required
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              onClick={() => { onReject(decision.id, notes); onClose(); }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg font-semibold transition-colors flex items-center gap-1.5"
            >
              <XCircle className="w-4 h-4" />
              <span>Tolak Pengajuan</span>
            </button>
            <button
              onClick={() => { onApprove(decision.id, notes); onClose(); }}
              className="px-5 py-2 text-white bg-slate-900 hover:bg-slate-800 rounded-lg font-bold transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Setujui (Approve)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
