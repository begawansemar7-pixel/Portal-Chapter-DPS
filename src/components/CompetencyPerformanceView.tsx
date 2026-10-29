import React, { useState } from 'react';
import { Talent, CompetencyAssessment } from '../types';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  BarChart, 
  ShieldCheck, 
  Sparkles, 
  Plus, 
  ExternalLink 
} from 'lucide-react';

interface CompetencyPerformanceViewProps {
  talents: Talent[];
  assessments: CompetencyAssessment[];
  onAddAssessment: (assessment: Omit<CompetencyAssessment, 'id' | 'status'>) => void;
}

export const CompetencyPerformanceView: React.FC<CompetencyPerformanceViewProps> = ({
  talents,
  assessments,
  onAddAssessment,
}) => {
  const [selectedTalentId, setSelectedTalentId] = useState<string>(talents[0]?.id || '');
  const [showAssessModal, setShowAssessModal] = useState<boolean>(false);

  // Form state
  const [assessorName, setAssessorName] = useState<string>('Chapter Leader DPS');
  const [knowScore, setKnowScore] = useState<number>(4.5);
  const [thinkScore, setThinkScore] = useState<number>(4.5);
  const [commScore, setCommScore] = useState<number>(4.6);
  const [inflScore, setInflScore] = useState<number>(4.2);
  const [evidenceNotes, setEvidenceNotes] = useState<string>('Lampiran dokumen PRD v2, sertifikasi PSPO II, dan hasil evaluasi sprint review.');

  const selectedTalent = talents.find(t => t.id === selectedTalentId) || talents[0];

  const handleCreateAssessment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTalent) return;
    const overall = Number(((knowScore + thinkScore + commScore + inflScore) / 4).toFixed(2));
    onAddAssessment({
      talentId: selectedTalent.id,
      talentName: selectedTalent.name,
      role: selectedTalent.role,
      assessor: assessorName,
      period: 'Q4 2026',
      ratings: {
        know: knowScore,
        think: thinkScore,
        communicate: commScore,
        influence: inflScore,
      },
      overallGrade: overall,
      hasEvidence: true,
      evidenceNotes,
    });
    setShowAssessModal(false);
  };

  // Helper for rendering SVG Radar polygon for KNOW, THINK, COMMUNICATE, INFLUENCE (4 vertices)
  // Center is (100, 100), max radius is 70.
  // 0 deg: top (KNOW), 90 deg: right (THINK), 180 deg: bottom (COMMUNICATE), 270 deg: left (INFLUENCE)
  const getRadarPoint = (score: number, index: number) => {
    const angle = (index * 90 - 90) * (Math.PI / 180);
    const radius = (score / 5) * 70;
    const x = 100 + radius * Math.cos(angle);
    const y = 100 + radius * Math.sin(angle);
    return `${x},${y}`;
  };

  const currentScores = selectedTalent.competencyScores;
  const radarPoints = [
    getRadarPoint(currentScores.know, 0),
    getRadarPoint(currentScores.think, 1),
    getRadarPoint(currentScores.communicate, 2),
    getRadarPoint(currentScores.influence, 3),
  ].join(' ');

  const benchmarkPoints = [
    getRadarPoint(4.2, 0),
    getRadarPoint(4.2, 1),
    getRadarPoint(4.2, 2),
    getRadarPoint(4.0, 3),
  ].join(' ');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              COMPETENCY & PERFORMANCE MANAGEMENT (CMP-001 - CMP-010)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Telkom DPS Competency Framework (1-5 Scale)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar berbasis bukti (Evidence-Based): <strong>KNOW</strong> · <strong>THINK</strong> · <strong>COMMUNICATE</strong> · <strong>INFLUENCE</strong>.
            </p>
          </div>

          <button
            onClick={() => setShowAssessModal(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Buat Penilaian Evidence-Based</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Talent Radar Visualizer & Pillar Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Talent Selector & Radar Visualizer */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <label htmlFor="talent-eval-select" className="text-xs font-bold text-slate-500">PILIH TALENT EVALUASI:</label>
              <select
                id="talent-eval-select"
                value={selectedTalentId}
                onChange={(e) => setSelectedTalentId(e.target.value)}
                className="text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-red-600"
              >
                {talents.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.grade.split(' ')[0]})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Talent Header */}
            <div className="mt-3">
              <h2 className="text-base font-bold text-slate-900">{selectedTalent.name}</h2>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                {selectedTalent.role} · {selectedTalent.grade}
              </div>
            </div>

            {/* SVG Radar Chart (Clean custom vector) */}
            <div className="my-6 flex flex-col items-center">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Concentric grid circles */}
                  {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
                    <polygon
                      key={scale}
                      points={[
                        getRadarPoint(5 * scale, 0),
                        getRadarPoint(5 * scale, 1),
                        getRadarPoint(5 * scale, 2),
                        getRadarPoint(5 * scale, 3),
                      ].join(' ')}
                      fill="none"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Axes */}
                  <line x1="100" y1="30" x2="100" y2="170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />
                  <line x1="30" y1="100" x2="170" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2,2" />

                  {/* Benchmark standard polygon (Slate) */}
                  <polygon
                    points={benchmarkPoints}
                    fill="rgba(148, 163, 184, 0.15)"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />

                  {/* Talent Score polygon (Telkom Red) */}
                  <polygon
                    points={radarPoints}
                    fill="rgba(220, 38, 38, 0.2)"
                    stroke="#dc2626"
                    strokeWidth="2"
                  />

                  {/* Vertex Dots */}
                  {[currentScores.know, currentScores.think, currentScores.communicate, currentScores.influence].map((sc, i) => {
                    const pt = getRadarPoint(sc, i).split(',');
                    return (
                      <circle
                        key={i}
                        cx={pt[0]}
                        cy={pt[1]}
                        r="3.5"
                        fill="#dc2626"
                      />
                    );
                  })}
                </svg>

                {/* Vertex Labels */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700">
                  KNOW ({currentScores.know})
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-700 text-right">
                  THINK ({currentScores.think})
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700">
                  COMMUNICATE ({currentScores.communicate})
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-700">
                  INFLUENCE ({currentScores.influence})
                </div>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-medium text-slate-500 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-red-600 rounded"></span>
                  <span>Skor Talent</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-slate-400 rounded border border-dashed"></span>
                  <span>Benchmark Standard Role</span>
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Evidence Terlampir: <strong className="text-slate-800 font-mono">{selectedTalent.evidenceCount} Dokumen</strong></span>
            <span className="text-emerald-700 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Memenuhi Target SO-04</span>
            </span>
          </div>
        </div>

        {/* Right: 4 Pillars Definition & Assessment History */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* 4 Pillars Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">
              RINCIAN PILAR KOMPETENSI TELKOM DPS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">1. KNOW (Domain & Tech)</span>
                  <span className="font-mono font-bold text-red-600">{currentScores.know} / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Penguasaan metode product management, cloud architecture, standar TOGAF, dan pemahaman regulasi telco.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">2. THINK (Strategy & Analytics)</span>
                  <span className="font-mono font-bold text-red-600">{currentScores.think} / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Kemampuan menyusun hipotesis bisnis, analisa data kuantitatif, decision-making berbasis bukti, dan arsitektur modular.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">3. COMMUNICATE (Clarity)</span>
                  <span className="font-mono font-bold text-red-600">{currentScores.communicate} / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Artikulasi requirement PRD yang tajam, presentasi ke stakeholder korporat, dan fasilitasi agile sprint tanpa ambigu.
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">4. INFLUENCE (Leadership)</span>
                  <span className="font-mono font-bold text-red-600">{currentScores.influence} / 5.0</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">
                  Mampu mengarahkan cross-functional squad, negosiasi dependensi dengan Tribe lain, dan mentoring kapabilitas talent.
                </p>
              </div>
            </div>
          </div>

          {/* Assessment History Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Riwayat Assessment Berbasis Evidence
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Setiap penilaian wajib memiliki tautan bukti nyata (portfolio/dokumen/sertifikat).
                </p>
              </div>
            </div>

            <div className="mt-3 divide-y divide-slate-100 text-xs">
              {assessments.map((ass) => (
                <div key={ass.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900">{ass.talentName}</span>
                      <span className="text-slate-400 font-mono text-[11px] ml-2">Periode {ass.period}</span>
                    </div>
                    <div className="font-mono font-bold text-slate-800">
                      Skor Akhir: {ass.overallGrade} / 5.0
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 mt-1">
                    <strong>Evidence:</strong> {ass.evidenceNotes}
                  </div>

                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Assessor: <strong>{ass.assessor}</strong></span>
                    <span className="text-emerald-700 font-semibold">{ass.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal Buat Penilaian Evidence-Based */}
      {showAssessModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Penilaian Kompetensi Talent Berbasis Evidence
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Evaluasi berkala sesuai standar tata kelola Chapter DPS v1.0.
            </p>

            <form onSubmit={handleCreateAssessment} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Talent Dinilai:</label>
                <div className="font-bold text-slate-900 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  {selectedTalent.name} ({selectedTalent.role})
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Assessor / Evaluator:</label>
                <input
                  type="text"
                  value={assessorName}
                  onChange={(e) => setAssessorName(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Skor KNOW (1-5):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={knowScore}
                    onChange={(e) => setKnowScore(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Skor THINK (1-5):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={thinkScore}
                    onChange={(e) => setThinkScore(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Skor COMMUNICATE (1-5):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={commScore}
                    onChange={(e) => setCommScore(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Skor INFLUENCE (1-5):</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={inflScore}
                    onChange={(e) => setInflScore(Number(e.target.value))}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Catatan Bukti Nyata (Evidence Mandatory):</label>
                <textarea
                  rows={3}
                  value={evidenceNotes}
                  onChange={(e) => setEvidenceNotes(e.target.value)}
                  placeholder="Deskripsikan dokumen PRD, sertifikasi, atau pencapaian konkret..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAssessModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-white bg-slate-900 hover:bg-slate-800 rounded-lg font-semibold transition-colors"
                >
                  Simpan Assessment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
