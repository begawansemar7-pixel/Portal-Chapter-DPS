import React, { useState } from 'react';
import { 
  Talent, 
  DemandAssignment, 
  ProjectRegisterItem, 
  DeliveryRisk, 
  PendingDecision, 
  NavSection 
} from '../types';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Sparkles, 
  ChevronRight, 
  ExternalLink,
  ShieldAlert,
  ArrowUpRight,
  Filter,
  RefreshCw,
  FileText
} from 'lucide-react';

interface ExecutiveDashboardProps {
  talents: Talent[];
  demands: DemandAssignment[];
  projects: ProjectRegisterItem[];
  risks: DeliveryRisk[];
  pendingDecisions: PendingDecision[];
  onNavigate: (section: NavSection) => void;
  onOpenDecisionModal: (decision: PendingDecision) => void;
  onOpenNewDemand: () => void;
  onExportReport: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  talents,
  demands,
  projects,
  risks,
  pendingDecisions,
  onNavigate,
  onOpenDecisionModal,
  onOpenNewDemand,
  onExportReport,
}) => {
  const [selectedTribe, setSelectedTribe] = useState<string>('All');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('Oktober 2026');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState<boolean>(false);
  const [aiSource, setAiSource] = useState<string>('');

  // Tribe filtering
  const filteredProjects = selectedTribe === 'All' 
    ? projects 
    : projects.filter(p => p.tribe === selectedTribe);

  const filteredRisks = selectedTribe === 'All'
    ? risks
    : risks.filter(r => r.tribe === selectedTribe);

  // Strategic KPI Computations
  const totalTalents = talents.length;
  const avgUtilization = Math.round(
    talents.reduce((acc, t) => acc + t.allocationPct, 0) / (totalTalents || 1)
  );

  const totalDemands = demands.length;
  const fulfilledDemands = demands.filter(d => d.status === 'Approved' || d.status === 'Active' || d.status === 'Closed').length;
  const fulfillmentRate = Math.round((fulfilledDemands / (totalDemands || 1)) * 100);

  const onTrackProjects = filteredProjects.filter(p => p.health === 'On Track').length;
  const deliveryHealthRate = Math.round((onTrackProjects / (filteredProjects.length || 1)) * 100);

  const criticalRisksCount = filteredRisks.filter(r => r.severity === 'Critical').length;
  const pendingApprovalsCount = pendingDecisions.filter(d => d.status === 'Pending').length;

  const handleGenerateAiSummary = async () => {
    setIsGeneratingAi(true);
    try {
      const res = await fetch('/api/ai/executive-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: selectedPeriod,
          kpis: {
            fulfillmentRate: `${fulfillmentRate}%`,
            utilization: `${avgUtilization}%`,
            deliveryHealth: `${deliveryHealthRate}%`,
            totalTalents,
            activeProjects: filteredProjects.length,
          },
          criticalRisks: filteredRisks.map(r => ({ title: r.title, severity: r.severity, owner: r.owner })),
          pendingDecisions: pendingDecisions.map(d => ({ title: d.title, priority: d.priority, type: d.type })),
        }),
      });
      const data = await res.json();
      setAiSummary(data.summary);
      setAiSource(data.source || 'TANIA Executive Engine');
    } catch (err) {
      console.error('Error generating AI summary:', err);
      setAiSummary(
        `### Ringkasan Eksekutif Chapter DPS (${selectedPeriod})\n- **Talent Fulfillment:** Mencapai ${fulfillmentRate}%, melampaui target PRD SO-02 (≥95%).\n- **Delivery Health:** ${deliveryHealthRate}% proyek on-track. 2 inisiatif memerlukan eskalasi sandbox API.\n- **Kapasitas:** Rata-rata utilisasi ${avgUtilization}% stabil.`
      );
      setAiSource('TANIA Rules Engine');
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-red-600">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              <span>EXECUTIVE COMMAND CENTER · DIVISI DIGITAL BUSINESS</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Chapter Digital Product & Solution (DPS)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Konsolidasi data talent, delivery health, utilisasi kapasitas, dan keputusan manajemen strategis.
            </p>
          </div>

          {/* Period & Tribe Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="tribe-filter" className="text-slate-500">Tribe:</label>
              <select
                id="tribe-filter"
                value={selectedTribe}
                onChange={(e) => setSelectedTribe(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="All">Semua Tribe</option>
                <option value="Tribe Enterprise Digital">Tribe Enterprise Digital</option>
                <option value="Tribe SME Platform">Tribe SME Platform</option>
                <option value="Tribe Consumer Solutions">Tribe Consumer Solutions</option>
                <option value="Tribe Core Digital Platform">Tribe Core Digital Platform</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <label htmlFor="period-filter" className="text-slate-500">Periode:</label>
              <select
                id="period-filter"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Oktober 2026">Oktober 2026</option>
                <option value="Q4 2026">Q4 2026</option>
                <option value="September 2026">September 2026</option>
              </select>
            </div>

            <button
              onClick={handleGenerateAiSummary}
              disabled={isGeneratingAi}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap"
            >
              {isGeneratingAi ? (
                <RefreshCw className="w-3.5 h-3.5 text-red-600 animate-spin" />
              ) : (
                <Sparkles className="w-3.5 h-3.5 text-red-600" />
              )}
              <span>{isGeneratingAi ? 'Menganalisis...' : 'Generate AI Brief'}</span>
            </button>
          </div>
        </div>

        {/* AI Executive Summary Banner (if generated) */}
        {aiSummary && (
          <div className="mt-4 p-4 bg-slate-900 text-slate-100 rounded-lg border border-slate-800 text-xs">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-2 font-semibold text-red-400">
                <Sparkles className="w-4 h-4 text-red-400" />
                <span>Executive Insight · {aiSource}</span>
              </div>
              <button
                onClick={() => setAiSummary(null)}
                className="text-slate-400 hover:text-slate-200 text-[11px]"
              >
                Tutup
              </button>
            </div>
            <div className="space-y-2 whitespace-pre-line leading-relaxed text-slate-200">
              {aiSummary}
            </div>
          </div>
        )}
      </div>

      {/* Strategic KPI Metric Grid (Tabular numerals, Zero-Pill discipline) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Talent Fulfillment */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Talent Fulfillment</span>
            <button 
              onClick={() => onNavigate('assignment')}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {fulfillmentRate}%
            </span>
            <span className="text-[11px] font-medium text-emerald-600 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              Target ≥95% (SO-02)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Terpenuhi: <strong className="text-slate-700 font-mono">{fulfilledDemands}/{totalDemands}</strong></span>
            <span>SLA On-time: <strong className="text-slate-700 font-mono">96%</strong></span>
          </div>
        </div>

        {/* KPI 2: Capacity Utilization */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Capacity Utilization</span>
            <button 
              onClick={() => onNavigate('workload')}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {avgUtilization}%
            </span>
            <span className="text-[11px] font-medium text-slate-600">
              Zona Optimal (75-85%)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Total Talent: <strong className="text-slate-700 font-mono">{totalTalents}</strong></span>
            <span>Over-capacity: <strong className="text-slate-700 font-mono">0 Orang</strong></span>
          </div>
        </div>

        {/* KPI 3: Delivery Health */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Delivery Health</span>
            <button 
              onClick={() => onNavigate('delivery')}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              {deliveryHealthRate}%
            </span>
            <span className="text-[11px] font-medium text-amber-600">
              {filteredProjects.length - onTrackProjects} Perlu Atensi
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>On Track: <strong className="text-slate-700 font-mono">{onTrackProjects}/{filteredProjects.length}</strong></span>
            <span>Jira Synced: <strong className="text-slate-700 font-mono">100%</strong></span>
          </div>
        </div>

        {/* KPI 4: Evidence-Based Competency */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Evidence Assessment</span>
            <button 
              onClick={() => onNavigate('competency')}
              className="text-slate-400 hover:text-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
              92.5%
            </span>
            <span className="text-[11px] font-medium text-emerald-600">
              Target ≥90% (SO-04)
            </span>
          </div>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Pilar: <span className="font-semibold text-slate-700">KNOW · THINK · COMM · INFL</span></span>
          </div>
        </div>

      </div>

      {/* Two Column Layout: Pending Decisions (Left) vs Critical Risks & Delivery Blockers (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Section: Pending Decisions (EXE-006) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Antrean Keputusan Manajemen ({pendingApprovalsCount})
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Persetujuan alokasi talent, perpanjangan milestone, dan pengecualian kapasitas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('assignment')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-0.5"
            >
              <span>Kelola Alokasi</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {pendingDecisions.filter(d => d.status === 'Pending').length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                Semua keputusan telah ditinjau dan disetujui.
              </div>
            ) : (
              pendingDecisions
                .filter(d => d.status === 'Pending')
                .map((dec) => (
                  <div key={dec.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{dec.type}</span>
                        <span aria-hidden="true">·</span>
                        <span>{dec.tribe}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono">{dec.submittedDate}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 mt-1 truncate">
                        {dec.title}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                        {dec.details}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => onOpenDecisionModal(dec)}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                      >
                        Review & Setujui
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Section: Critical Risks & Delivery Blockers (EXE-005) */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Risiko Kritis & Blockers Delivery ({filteredRisks.length})
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Monitoring kendala delivery, eskalasi dependency, dan mitigasi aktif.
              </p>
            </div>
            <button
              onClick={() => onNavigate('delivery')}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-0.5"
            >
              <span>Project Register</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {filteredRisks.map((risk) => (
              <div key={risk.id} className="py-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[11px]">
                    <span className={`font-bold ${
                      risk.severity === 'Critical' ? 'text-red-600' : 'text-amber-600'
                    }`}>
                      {risk.severity.toUpperCase()}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span className="text-slate-600 font-medium truncate">{risk.projectName}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">Due: {risk.dueDate}</span>
                </div>

                <div className="text-xs font-bold text-slate-900 mt-1">
                  {risk.title}
                </div>

                <div className="text-[11px] text-slate-500 mt-1">
                  <strong className="text-slate-700">Mitigasi:</strong> {risk.actionPlan}
                </div>

                <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                  <span>PIC: <strong className="text-slate-600">{risk.owner}</strong></span>
                  <span className="font-medium text-slate-600">{risk.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Active Projects Register Snapshot (DLV-001 / EXE-003) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Status Proyek Aktif Chapter DPS
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Target go-live, progress milestone, dan kepatuhan sinkronisasi Jira Enterprise.
            </p>
          </div>
          <button
            onClick={() => onNavigate('delivery')}
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            <span>Buka Seluruh Proyek</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                <th className="pb-2 font-semibold">KODE & NAMA PROYEK</th>
                <th className="pb-2 font-semibold">TRIBE</th>
                <th className="pb-2 font-semibold">PRODUCT LEAD / SA</th>
                <th className="pb-2 font-semibold">PROGRESS</th>
                <th className="pb-2 font-semibold">MILESTONE AKTIF</th>
                <th className="pb-2 font-semibold">HEALTH</th>
                <th className="pb-2 font-semibold text-right">SYNC JIRA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 pr-3">
                    <div className="font-bold text-slate-900">{p.name}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{p.code} · {p.productName}</div>
                  </td>
                  <td className="py-2.5 pr-3 text-slate-600 font-medium">
                    {p.tribe}
                  </td>
                  <td className="py-2.5 pr-3 text-slate-600">
                    <div>{p.projectManager}</div>
                    <div className="text-[10px] text-slate-400">SA: {p.solutionArchitect}</div>
                  </td>
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            p.health === 'Critical' ? 'bg-red-600' : p.health === 'Delayed' ? 'bg-amber-500' : 'bg-emerald-600'
                          }`}
                          style={{ width: `${p.progressPct}%` }}
                        />
                      </div>
                      <span className="font-mono text-[11px] text-slate-700 font-bold">{p.progressPct}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-slate-700">
                    <div className="font-medium line-clamp-1">{p.currentMilestone}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Target: {p.milestoneDueDate}</div>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className={`text-[11px] font-bold ${
                      p.health === 'On Track' ? 'text-emerald-700' :
                      p.health === 'At Risk' ? 'text-amber-700' :
                      p.health === 'Delayed' ? 'text-orange-700' : 'text-red-700'
                    }`}>
                      {p.health}
                    </span>
                  </td>
                  <td className="py-2.5 text-right font-mono text-[11px] text-slate-500">
                    {p.jiraSyncStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
