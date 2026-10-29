import React, { useState } from 'react';
import { Talent, TimesheetEntry } from '../types';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Calendar, 
  BarChart2,
  FileCheck
} from 'lucide-react';

interface WorkloadTimesheetViewProps {
  talents: Talent[];
  timesheets: TimesheetEntry[];
  onApproveTimesheet: (id: string) => void;
  onSubmitTimesheet: (entry: Omit<TimesheetEntry, 'id' | 'status' | 'submittedDate'>) => void;
}

export const WorkloadTimesheetView: React.FC<WorkloadTimesheetViewProps> = ({
  talents,
  timesheets,
  onApproveTimesheet,
  onSubmitTimesheet,
}) => {
  const [activeTab, setActiveTab] = useState<'heatmap' | 'timesheet'>('heatmap');
  const [newProject, setNewProject] = useState<string>('Enterprise Cloud Portal v2.5');
  const [newCategory, setNewCategory] = useState<TimesheetEntry['category']>('Product Development');
  const [newHours, setNewHours] = useState<number>(36);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  const pendingTimesheets = timesheets.filter(t => t.status === 'Submitted');

  const handleCreateTimesheet = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitTimesheet({
      talentName: 'Dimas Wicaksono',
      weekEnding: '2026-10-31',
      projectName: newProject,
      category: newCategory,
      hoursLogged: Number(newHours),
    });
    setShowSubmitModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              WORKFORCE CAPACITY & TIMESHEET (WRK-001 - WRK-010)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Workload Heatmap & Timesheet TeMan
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoring beban kerja mingguan, rasio utilisasi produktif, dan antrean approval timesheet.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('heatmap')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'heatmap'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Heatmap Kapasitas
              </button>
              <button
                onClick={() => setActiveTab('timesheet')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'timesheet'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Log Timesheet
              </button>
            </div>

            <button
              onClick={() => setShowSubmitModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Jam Kerja</span>
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'heatmap' ? (
        /* Workload & Allocation Heatmap (WRK-003) */
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Matriks Utilisasi & Beban Alokasi Talent (40 Jam/Minggu)
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Kalkulasi: Utilisasi % = Total Jam Terjadwal / Kapasitas Standar 40 Jam × 100.
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300"></span>
                <span>Optimal (70-90%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-100 border border-amber-300"></span>
                <span>High (91-100%)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-100 border border-red-300"></span>
                <span>Overload (&gt;100%)</span>
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                  <th className="pb-2 font-semibold">TALENT & PERAN</th>
                  <th className="pb-2 font-semibold">TRIBE & SQUAD</th>
                  <th className="pb-2 font-semibold text-center">W1 (OKT)</th>
                  <th className="pb-2 font-semibold text-center">W2 (OKT)</th>
                  <th className="pb-2 font-semibold text-center">W3 (OKT)</th>
                  <th className="pb-2 font-semibold text-center">W4 (OKT)</th>
                  <th className="pb-2 font-semibold text-right">RATA-RATA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {talents.map((t) => {
                  const getHeatmapClass = (pct: number) => {
                    if (pct > 95) return 'bg-red-100 text-red-800 border-red-200';
                    if (pct >= 80) return 'bg-amber-100 text-amber-800 border-amber-200';
                    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
                  };

                  return (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 pr-4">
                        <div className="font-bold text-slate-900">{t.name}</div>
                        <div className="text-[11px] text-slate-400">{t.role} · {t.grade}</div>
                      </td>
                      <td className="py-2.5 pr-4 text-slate-600">
                        <div className="font-medium">{t.squad}</div>
                        <div className="text-[10px] text-slate-400">{t.tribe}</div>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-[11px] border ${getHeatmapClass(t.allocationPct)}`}>
                          {t.allocationPct}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-[11px] border ${getHeatmapClass(t.allocationPct)}`}>
                          {t.allocationPct}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-[11px] border ${getHeatmapClass(t.allocationPct - 5)}`}>
                          {t.allocationPct - 5}%
                        </span>
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={`inline-block px-2.5 py-1 rounded font-mono font-bold text-[11px] border ${getHeatmapClass(t.allocationPct)}`}>
                          {t.allocationPct}%
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-slate-800">
                        {t.allocationPct}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Timesheets Approval & History Table (WRK-004, WRK-005) */
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Log Timesheet & Antrean Approval ({timesheets.length})
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Pengisian jam produktif Chapter DPS yang disinkronisasi ke aplikasi TeMan Telkom.
              </p>
            </div>

            {pendingTimesheets.length > 0 && (
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">
                {pendingTimesheets.length} Menunggu Persetujuan
              </span>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                  <th className="pb-2 font-semibold">NAMA TALENT</th>
                  <th className="pb-2 font-semibold">PROYEK</th>
                  <th className="pb-2 font-semibold">KATEGORI AKTIVITAS</th>
                  <th className="pb-2 font-semibold text-center">JAM LOG</th>
                  <th className="pb-2 font-semibold">WEEK ENDING</th>
                  <th className="pb-2 font-semibold">STATUS</th>
                  <th className="pb-2 font-semibold text-right">AKSI APPROVAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {timesheets.map((ts) => (
                  <tr key={ts.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 pr-3 font-bold text-slate-900">{ts.talentName}</td>
                    <td className="py-2.5 pr-3 text-slate-700 font-medium">{ts.projectName}</td>
                    <td className="py-2.5 pr-3 text-slate-500">{ts.category}</td>
                    <td className="py-2.5 text-center font-mono font-bold text-slate-800">{ts.hoursLogged} Jam</td>
                    <td className="py-2.5 font-mono text-slate-500">{ts.weekEnding}</td>
                    <td className="py-2.5">
                      <span className={`text-[11px] font-bold ${
                        ts.status === 'Approved' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {ts.status}
                      </span>
                    </td>
                    <td className="py-2.5 text-right">
                      {ts.status === 'Submitted' ? (
                        <button
                          onClick={() => onApproveTimesheet(ts.id)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-medium">Approved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Submit Timesheet Entry */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-md w-full p-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Input Timesheet Mandiri (TeMan DPS)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Catat jam kerja produktif Anda untuk evaluasi utilization rate.
            </p>

            <form onSubmit={handleCreateTimesheet} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Pilih Proyek:</label>
                <select
                  value={newProject}
                  onChange={(e) => setNewProject(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
                >
                  <option value="Enterprise Cloud Portal v2.5">Enterprise Cloud Portal v2.5</option>
                  <option value="IndiBiz Merchant POS Suite">IndiBiz Merchant POS Suite</option>
                  <option value="Antares oneM2M Ingestion Scaling">Antares oneM2M Ingestion Scaling</option>
                  <option value="Cloud Billing SAP ERP Connector">Cloud Billing SAP ERP Connector</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Kategori Aktivitas:</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
                >
                  <option value="Product Development">Product Development</option>
                  <option value="Solution Architecture">Solution Architecture</option>
                  <option value="Discovery & Research">Discovery & Research</option>
                  <option value="Operations & Support">Operations & Support</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Total Jam (Maks 40 jam):</label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={newHours}
                  onChange={(e) => setNewHours(Number(e.target.value))}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600 font-mono"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition-colors"
                >
                  Kirim ke Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
