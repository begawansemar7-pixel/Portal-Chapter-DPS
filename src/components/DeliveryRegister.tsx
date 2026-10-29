import React, { useState } from 'react';
import { ProjectRegisterItem, DeliveryRisk } from '../types';
import { 
  Kanban, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  RefreshCw, 
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  ArrowUpRight,
  Filter
} from 'lucide-react';

interface DeliveryRegisterProps {
  projects: ProjectRegisterItem[];
  risks: DeliveryRisk[];
  onUpdateMilestone: (projectId: string, milestoneId: string) => void;
  onEscalateRisk: (riskId: string) => void;
}

export const DeliveryRegister: React.FC<DeliveryRegisterProps> = ({
  projects,
  risks,
  onUpdateMilestone,
  onEscalateRisk,
}) => {
  const [selectedHealth, setSelectedHealth] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectRegisterItem | null>(projects[0] || null);

  const filteredProjects = selectedHealth === 'All'
    ? projects
    : projects.filter(p => p.health === selectedHealth);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              DELIVERY MANAGEMENT & PM COCKPIT (DLV-001 - DLV-012)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Project & Delivery Command Register
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring milestone target, progress sprint, status blocker kritis, dan sinkronisasi Jira Enterprise.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Status Filter:</span>
            {(['All', 'On Track', 'At Risk', 'Delayed'] as const).map(h => (
              <button
                key={h}
                onClick={() => setSelectedHealth(h)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  selectedHealth === h
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {h === 'All' ? 'Semua Status' : h}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Projects List (Left) & Deep Dive Milestones & Blockers (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Project Cards */}
        <div className="lg:col-span-7 space-y-4">
          {filteredProjects.map((p) => {
            const isSelected = selectedProject?.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`bg-white border rounded-xl p-4 cursor-pointer transition-all ${
                  isSelected ? 'border-red-600 ring-1 ring-red-600 shadow-xs' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="font-bold text-slate-700">{p.code}</span>
                    <span aria-hidden="true">·</span>
                    <span>{p.tribe}</span>
                  </div>

                  <span className={`text-xs font-bold ${
                    p.health === 'On Track' ? 'text-emerald-700' :
                    p.health === 'At Risk' ? 'text-amber-700' : 'text-red-700'
                  }`}>
                    {p.health}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                  {p.name}
                </h3>

                <div className="text-xs text-slate-500 mt-0.5">
                  Produk Induk: <strong className="text-slate-700">{p.productName}</strong>
                </div>

                {/* Progress Bar & Current Milestone */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Progress Milestone:</span>
                    <span className="font-mono font-bold text-slate-800">{p.progressPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full ${
                        p.health === 'Critical' ? 'bg-red-600' :
                        p.health === 'Delayed' ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${p.progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Blocker alert if present */}
                {p.criticalBlocker && (
                  <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Blocker:</strong> {p.criticalBlocker}
                    </div>
                  </div>
                )}

                {/* Footer Info */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>PM: <strong className="text-slate-600">{p.projectManager}</strong></span>
                  <span>Jira: <strong className="text-slate-600 font-mono">{p.jiraSyncStatus}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Milestone Breakdown & Escalation Cockpit */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          {selectedProject ? (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>{selectedProject.code}</span>
                  <span className="font-bold text-slate-800">Budget Terpakai: {selectedProject.budgetSpentPct}%</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {selectedProject.name}
                </h3>
              </div>

              {/* Milestones Checklist (Interactive: toggle complete) */}
              <div className="pt-2">
                <div className="text-xs font-bold text-slate-400 tracking-wider mb-2">
                  TAHAPAN MILESTONE & CRITICAL PATH
                </div>

                <div className="space-y-2">
                  {selectedProject.milestones.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => onUpdateMilestone(selectedProject.id, m.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition-colors flex items-start justify-between gap-3 ${
                        m.completed ? 'bg-slate-50/70 border-slate-200' : 'bg-white border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            m.completed ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <div>
                          <div className={`font-semibold ${m.completed ? 'text-slate-500 line-through' : 'text-slate-900'}`}>
                            {m.title}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Target Selesai: {m.dueDate}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono text-slate-500 shrink-0">
                        {m.completed ? 'Selesai' : 'Klik untuk ubah'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery Stakeholders */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Project Manager:</span>
                  <span className="font-semibold text-slate-800">{selectedProject.projectManager}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Solution Architect:</span>
                  <span className="font-semibold text-slate-800">{selectedProject.solutionArchitect}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tribe Pemilik:</span>
                  <span className="font-semibold text-slate-800">{selectedProject.tribe}</span>
                </div>
              </div>

              {/* Escalation Button */}
              {selectedProject.criticalBlocker && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      const relatedRisk = risks.find(r => r.projectName.includes(selectedProject.name) || selectedProject.name.includes(r.projectName));
                      if (relatedRisk) onEscalateRisk(relatedRisk.id);
                    }}
                    className="w-full py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>Eskalasikan Blocker ke Management DDP</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Pilih proyek di sebelah kiri untuk melihat milestone detail.
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
