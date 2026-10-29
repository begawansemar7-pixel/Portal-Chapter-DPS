import React from 'react';
import { AuditLogItem } from '../types';
import { 
  Settings, 
  ShieldCheck, 
  RefreshCw, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  Lock,
  Server
} from 'lucide-react';

interface AdminGovernanceViewProps {
  auditLogs: AuditLogItem[];
  onTriggerSync: (systemName: string) => void;
}

export const AdminGovernanceView: React.FC<AdminGovernanceViewProps> = ({
  auditLogs,
  onTriggerSync,
}) => {
  const integrations = [
    { name: 'Corporate SSO (IAM Telkom)', purpose: 'Single Sign-On & Identity Provider', status: 'Connected', lastSync: 'Real-time', type: 'OAuth 2.0 / SAML' },
    { name: 'HRIS Employee Master', purpose: 'Sinkronisasi profil & data kepegawaian', status: 'Connected', lastSync: 'Hari ini, 06:00 WIB', type: 'Batch SFTP / API' },
    { name: 'TeMan (Timesheet Telkom)', purpose: 'Rekonsiliasi jam kerja produktif', status: 'Connected', lastSync: 'Kemarin, 23:59 WIB', type: 'REST API' },
    { name: 'Jira Enterprise & ADO', purpose: 'Sinkronisasi sprint, milestone & delivery backlog', status: 'Connected', lastSync: '2 jam lalu', type: 'Webhook & Polling' },
    { name: 'ERP Finance SAP', purpose: 'Validasi realisasi anggaran & rate card', status: 'Connected', lastSync: 'Mingguan (Senin)', type: 'RFC Adapter' },
    { name: 'LLM Gateway (TANIA & JARVIS)', purpose: 'Orkestrasi model AI (Gemini 3.8 Flash)', status: 'Connected', lastSync: 'Aktif (Server-side)', type: 'Secure Proxy' },
  ];

  const rbacMatrix = [
    { module: 'Executive Command', leader: 'Full', lead: 'Scoped', pmPo: 'Scoped', talent: 'None', admin: 'Config' },
    { module: 'Talent Management', leader: 'Full', lead: 'Scoped', pmPo: 'Assigned', talent: 'Self', admin: 'Config' },
    { module: 'Demand Assignment', leader: 'Approve', lead: 'Manage', pmPo: 'Request', talent: 'View', admin: 'Config' },
    { module: 'Project & Delivery', leader: 'Full', lead: 'Manage', pmPo: 'Assigned', talent: 'Assigned', admin: 'Config' },
    { module: 'Workload & Timesheet', leader: 'Summary', lead: 'Review', pmPo: 'Review', talent: 'Own', admin: 'Config' },
    { module: 'Competency Framework', leader: 'Summary', lead: 'Assess', pmPo: 'Scoped', talent: 'Own', admin: 'Config' },
    { module: 'Budget & Finance', leader: 'Authorized', lead: 'Authorized', pmPo: 'Scoped', talent: 'None', admin: 'Config' },
    { module: 'AI Workspace Agents', leader: 'Authorized', lead: 'Authorized', pmPo: 'Authorized', talent: 'Limited', admin: 'Config' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Settings className="w-4 h-4 text-slate-700" />
          <span>ADMINISTRATION, GOVERNANCE & INTEGRATIONS (PRD SECTION 5 & 10)</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
          Tata Kelola Sistem, Integrasi & Audit Trail
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Matriks RBAC Least-Privilege, status sinkronisasi sistem eksternal, dan jejak audit mutasi operasional.
        </p>
      </div>

      {/* External Integrations Status (PRD Section 10) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Konektivitas Sistem Eksternal & Data Pipeline
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Portal beroperasi sebagai digital operating layer terhubung ke source system resmi Telkom.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          {integrations.map((item) => (
            <div key={item.name} className="p-4 border border-slate-200 rounded-lg bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{item.name}</span>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                  {item.purpose}
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-2">
                  Protokol: {item.type}
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[10px] text-slate-500 font-mono">Sync: {item.lastSync}</span>
                <button
                  onClick={() => onTriggerSync(item.name)}
                  className="text-[11px] font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3 text-slate-500" />
                  <span>Sync Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC Matrix (PRD Section 5) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Matriks Hak Akses Peran (RBAC - Initial Baseline)
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Prinsip Least-Privilege: Admin sistem tidak otomatis berhak membaca data sensitif tanpa otorisasi.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                <th className="pb-2 font-semibold">MODUL PORTAL DPS</th>
                <th className="pb-2 font-semibold">CHAPTER LEADER</th>
                <th className="pb-2 font-semibold">CAPABILITY/DELIVERY LEAD</th>
                <th className="pb-2 font-semibold">PRODUCT/PROJECT MGR</th>
                <th className="pb-2 font-semibold">TALENT / SQUAD</th>
                <th className="pb-2 font-semibold">ADMINISTRATOR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {rbacMatrix.map((row) => (
                <tr key={row.module} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 pr-3 font-sans font-bold text-slate-900">{row.module}</td>
                  <td className="py-2.5 pr-3 text-emerald-700 font-semibold">{row.leader}</td>
                  <td className="py-2.5 pr-3 text-slate-800">{row.lead}</td>
                  <td className="py-2.5 pr-3 text-slate-700">{row.pmPo}</td>
                  <td className="py-2.5 pr-3 text-slate-600">{row.talent}</td>
                  <td className="py-2.5 text-slate-500">{row.admin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Audit Log (PRD Section 9 & 11) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Audit Trail Mutasi Kritis ({auditLogs.length} Entri Terakhir)
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Setiap perubahan status demand, persetujuan alokasi, dan penyesuaian target terekam permanen.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                  <span className="font-bold text-slate-800">{log.action}</span>
                  <span aria-hidden="true">·</span>
                  <span>{log.domain} ({log.entityId})</span>
                </div>
                <div className="text-xs text-slate-700 mt-0.5">
                  {log.details}
                </div>
              </div>

              <div className="text-right shrink-0 text-[11px] text-slate-400 font-mono">
                <div>{log.actor}</div>
                <div>{log.timestamp}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
