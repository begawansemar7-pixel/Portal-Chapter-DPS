import React, { useState, useEffect } from 'react';
import { DemandAssignment, Talent } from '../types';
import { X, Sparkles, CheckCircle2, RefreshCw, Award, UserCheck } from 'lucide-react';

interface TaniaMatchingModalProps {
  demand: DemandAssignment | null;
  talents: Talent[];
  onClose: () => void;
  onAssignCandidate: (demandId: string, talentId: string, talentName: string) => void;
}

export const TaniaMatchingModal: React.FC<TaniaMatchingModalProps> = ({
  demand,
  talents,
  onClose,
  onAssignCandidate,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [feasibilityScore, setFeasibilityScore] = useState<number>(94);
  const [feasibilityStatus, setFeasibilityStatus] = useState<string>('Feasible');
  const [analysisText, setAnalysisText] = useState<string>('');
  const [candidates, setCandidates] = useState<any[]>([]);

  useEffect(() => {
    if (!demand) return;

    let isMounted = true;
    setIsLoading(true);

    fetch('/api/ai/talent-match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        demandRole: demand.roleRequired,
        requiredSkills: demand.requiredSkills,
        tribe: demand.requestingTribe,
        allocationPct: demand.allocationPct,
        duration: `${demand.startDate} - ${demand.endDate}`,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        setFeasibilityScore(data.feasibilityScore || 94);
        setFeasibilityStatus(data.feasibilityStatus || 'Feasible');
        setAnalysisText(data.analysis || 'Kapasitas squad mencukupi untuk alokasi baru.');
        setCandidates(data.candidates || []);
      })
      .catch(err => {
        console.error('Error fetching talent match:', err);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [demand]);

  if (!demand) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 shadow-2xl overflow-y-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TANIA WORKFORCE INTELLIGENCE (ASN-010)</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 mt-0.5">
              Matriks Kecocokan & Kelayakan Kapasitas
            </h2>
            <div className="text-xs text-slate-500 font-mono mt-0.5">
              {demand.demandNumber} · {demand.title}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-4 text-xs">
          
          {/* Feasibility Overview Card */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-700">Analisis Kelayakan Kapasitas:</span>
              <span className="font-mono font-bold text-emerald-700 text-sm">
                Skor Kelayakan: {feasibilityScore}% ({feasibilityStatus})
              </span>
            </div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              {analysisText}
            </p>
          </div>

          {/* Candidates List */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-2.5">
              KANDIDAT REKOMENDASI TERBAIK BERDASARKAN SKILL MATRIX
            </h3>

            {isLoading ? (
              <div className="py-8 flex flex-col items-center justify-center gap-2 text-slate-400">
                <RefreshCw className="w-5 h-5 animate-spin text-red-600" />
                <span>TANIA sedang menganalisis ketersediaan seluruh talent Chapter DPS...</span>
              </div>
            ) : (
              <div className="space-y-3">
                {candidates.map((cand, idx) => (
                  <div
                    key={cand.id || idx}
                    className="p-3.5 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors bg-white flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-slate-900 text-sm">{cand.name}</span>
                          <span className="text-slate-500 text-[11px] font-mono ml-2">
                            {cand.grade || 'Band IV'}
                          </span>
                        </div>

                        <span className="font-mono font-bold text-emerald-600 text-xs bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Match Score: {cand.matchScore}%
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                        {cand.recommendationReason}
                      </div>

                      {/* Skills match */}
                      {cand.skillFit && (
                        <div className="mt-2 text-[10px] text-slate-500 font-mono">
                          Fit: {cand.skillFit.join(' · ')}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        Kapasitas Bebas: <strong className="text-slate-800 font-mono">{cand.availableCapacity}%</strong>
                      </span>

                      <button
                        onClick={() => {
                          onAssignCandidate(demand.id, cand.id || 'TAL-007', cand.name);
                          onClose();
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>Pilih & Tetapkan Talent</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
