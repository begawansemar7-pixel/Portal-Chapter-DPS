/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  PersonaRole, 
  NavSection, 
  CurrentUser,
  Talent, 
  DemandAssignment, 
  ProjectRegisterItem, 
  DeliveryRisk, 
  PendingDecision, 
  TimesheetEntry, 
  CompetencyAssessment, 
  KnowledgeDoc, 
  AuditLogItem 
} from './types';
import { 
  INITIAL_TALENTS, 
  INITIAL_DEMANDS, 
  INITIAL_PRODUCTS, 
  INITIAL_PROJECTS, 
  INITIAL_RISKS, 
  INITIAL_PENDING_DECISIONS, 
  INITIAL_TIMESHEETS, 
  INITIAL_ASSESSMENTS, 
  INITIAL_KNOWLEDGE_DOCS, 
  INITIAL_AUDIT_LOGS 
} from './data/initialData';

import { LoginProfilePage } from './components/LoginProfilePage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { HomeView } from './components/HomeView';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { OrganizationView } from './components/OrganizationView';
import { TalentDirectory } from './components/TalentDirectory';
import { AssignmentWorkflow } from './components/AssignmentWorkflow';
import { ProductPortfolioView } from './components/ProductPortfolioView';
import { DeliveryRegister } from './components/DeliveryRegister';
import { WorkloadTimesheetView } from './components/WorkloadTimesheetView';
import { CompetencyPerformanceView } from './components/CompetencyPerformanceView';
import { FinanceBudgetView } from './components/FinanceBudgetView';
import { KnowledgeHubView } from './components/KnowledgeHubView';
import { AiWorkspaceView } from './components/AiWorkspaceView';
import { AdminGovernanceView } from './components/AdminGovernanceView';

import { NewDemandModal } from './components/NewDemandModal';
import { DecisionModal } from './components/DecisionModal';
import { TalentDetailModal } from './components/TalentDetailModal';
import { TaniaMatchingModal } from './components/TaniaMatchingModal';
import { FloatingChatbot } from './components/FloatingChatbot';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentPersona, setCurrentPersona] = useState<PersonaRole>('Chapter Leader');
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary Domain Data States
  const [talents, setTalents] = useState<Talent[]>(INITIAL_TALENTS);
  const [demands, setDemands] = useState<DemandAssignment[]>(INITIAL_DEMANDS);
  const [projects, setProjects] = useState<ProjectRegisterItem[]>(INITIAL_PROJECTS);
  const [risks, setRisks] = useState<DeliveryRisk[]>(INITIAL_RISKS);
  const [pendingDecisions, setPendingDecisions] = useState<PendingDecision[]>(INITIAL_PENDING_DECISIONS);
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(INITIAL_TIMESHEETS);
  const [assessments, setAssessments] = useState<CompetencyAssessment[]>(INITIAL_ASSESSMENTS);
  const [knowledgeDocs, setKnowledgeDocs] = useState<KnowledgeDoc[]>(INITIAL_KNOWLEDGE_DOCS);
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(INITIAL_AUDIT_LOGS);

  // Modals state
  const [isNewDemandModalOpen, setIsNewDemandModalOpen] = useState<boolean>(false);
  const [decisionModalItem, setDecisionModalItem] = useState<PendingDecision | null>(null);
  const [talentDetailModalItem, setTalentDetailModalItem] = useState<Talent | null>(null);
  const [taniaMatchingDemand, setTaniaMatchingDemand] = useState<DemandAssignment | null>(null);
  const [aiWorkspacePrefill, setAiWorkspacePrefill] = useState<string>('');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Log Audit Action Helper
  const logAudit = (action: string, domain: string, entityId: string, details: string) => {
    const newLog: AuditLogItem = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: `${currentPersona} (Telkom DPS)`,
      action,
      domain,
      entityId,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Auth Handlers
  const handleLogin = (user: CurrentUser) => {
    setCurrentUser(user);
    setCurrentPersona(user.role);
    setIsAuthenticated(true);
    setActiveSection('home');
    logAudit('USER_LOGIN_SUCCESS', 'Security', user.nik || user.email, `Pengguna ${user.name} (${user.role}) berhasil masuk ke portal.`);
    showToast(`Selamat datang, ${user.name} (${user.role}).`);
  };

  const handleLogout = () => {
    if (currentUser) {
      logAudit('USER_LOGOUT', 'Security', currentUser.nik || currentUser.email, `Pengguna ${currentUser.name} keluar dari portal.`);
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
    showToast('Anda telah keluar dari sesi Portal DPS.');
  };

  // Handlers
  const handleCreateDemand = (newDemandData: Omit<DemandAssignment, 'id' | 'demandNumber' | 'status' | 'slaStatus' | 'daysInStage' | 'submittedAt'>) => {
    const demandCount = demands.length + 45;
    const demandNumber = `REQ-DPS-${demandCount}`;
    const newDemand: DemandAssignment = {
      ...newDemandData,
      id: `DEM-2026-${demandCount}`,
      demandNumber,
      status: 'Submitted',
      slaStatus: 'Within SLA',
      daysInStage: 0,
      submittedAt: new Date().toISOString().slice(0, 10),
    };

    setDemands(prev => [newDemand, ...prev]);
    logAudit('DEMAND_SUBMISSION_CREATED', 'Assignment', demandNumber, `Demand baru diajukan: ${newDemand.title} (${newDemand.roleRequired})`);
    showToast(`Demand ${demandNumber} berhasil diajukan dan masuk ke antrean validasi kapasitas.`);
  };

  const handleApproveDecision = (id: string, notes: string) => {
    setPendingDecisions(prev =>
      prev.map(d => (d.id === id ? { ...d, status: 'Approved' } : d))
    );
    const target = pendingDecisions.find(d => d.id === id);
    if (target) {
      logAudit('DECISION_APPROVED', 'Governance', id, `Keputusan disetujui oleh ${currentPersona}: ${target.title}. Catatan: ${notes}`);
      showToast(`Keputusan "${target.title}" telah disetujui.`);
    }
  };

  const handleRejectDecision = (id: string, notes: string) => {
    setPendingDecisions(prev =>
      prev.map(d => (d.id === id ? { ...d, status: 'Rejected' } : d))
    );
    const target = pendingDecisions.find(d => d.id === id);
    if (target) {
      logAudit('DECISION_REJECTED', 'Governance', id, `Keputusan ditolak oleh ${currentPersona}: ${target.title}. Catatan: ${notes}`);
      showToast(`Keputusan "${target.title}" telah ditolak.`);
    }
  };

  const handleApproveDemand = (demandId: string) => {
    setDemands(prev =>
      prev.map(d => (d.id === demandId ? { ...d, status: 'Approved' } : d))
    );
    const target = demands.find(d => d.id === demandId);
    if (target) {
      logAudit('ASSIGNMENT_APPROVED', 'Assignment', target.demandNumber, `Alokasi disetujui untuk ${target.title}.`);
      showToast(`Alokasi demand ${target.demandNumber} disetujui.`);
    }
  };

  const handleRejectDemand = (demandId: string) => {
    setDemands(prev =>
      prev.map(d => (d.id === demandId ? { ...d, status: 'Closed' } : d))
    );
    const target = demands.find(d => d.id === demandId);
    if (target) {
      logAudit('ASSIGNMENT_REJECTED', 'Assignment', target.demandNumber, `Demand ditolak/ditutup.`);
      showToast(`Demand ${target.demandNumber} ditutup.`);
    }
  };

  const handleAssignCandidate = (demandId: string, talentId: string, talentName: string) => {
    setDemands(prev =>
      prev.map(d =>
        d.id === demandId
          ? {
              ...d,
              assignedTalentId: talentId,
              assignedTalentName: talentName,
              status: 'Pending Approval',
            }
          : d
      )
    );
    logAudit('TALENT_ASSIGNED', 'Assignment', demandId, `Kandidat ${talentName} dipilih untuk demand ${demandId}.`);
    showToast(`Kandidat ${talentName} telah dikaitkan ke demand. Status dialihkan ke Pending Approval.`);
  };

  const handleUpdateMilestone = (projectId: string, milestoneId: string) => {
    setProjects(prev =>
      prev.map(p => {
        if (p.id !== projectId) return p;
        const updatedMilestones = p.milestones.map(m =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        return {
          ...p,
          milestones: updatedMilestones,
          progressPct: newProgress,
        };
      })
    );
    showToast('Status milestone diperbarui.');
  };

  const handleEscalateRisk = (riskId: string) => {
    setRisks(prev =>
      prev.map(r => (r.id === riskId ? { ...r, severity: 'Critical', status: 'Mitigating' } : r))
    );
    logAudit('RISK_ESCALATED', 'Delivery', riskId, `Eskalasi formal risiko ke Management DDP.`);
    showToast('Risiko berhasil dieskalasikan ke Management DDP.');
  };

  const handleApproveTimesheet = (id: string) => {
    setTimesheets(prev =>
      prev.map(ts => (ts.id === id ? { ...ts, status: 'Approved' } : ts))
    );
    showToast('Timesheet disetujui.');
  };

  const handleSubmitTimesheet = (entry: Omit<TimesheetEntry, 'id' | 'status' | 'submittedDate'>) => {
    const newEntry: TimesheetEntry = {
      ...entry,
      id: `TS-${Date.now()}`,
      status: 'Submitted',
      submittedDate: new Date().toISOString().slice(0, 10),
    };
    setTimesheets(prev => [newEntry, ...prev]);
    showToast('Timesheet berhasil dikirim.');
  };

  const handleAddAssessment = (assessment: Omit<CompetencyAssessment, 'id' | 'status'>) => {
    const newAss: CompetencyAssessment = {
      ...assessment,
      id: `ASS-${Date.now()}`,
      status: 'Verified',
    };
    setAssessments(prev => [newAss, ...prev]);
    showToast('Penilaian kompetensi berbasis evidence berhasil disimpan.');
  };

  const handleUploadKnowledgeDoc = (doc: Omit<KnowledgeDoc, 'id' | 'downloadCount'>) => {
    const newDoc: KnowledgeDoc = {
      ...doc,
      id: `DOC-${Date.now()}`,
      downloadCount: 0,
    };
    setKnowledgeDocs(prev => [newDoc, ...prev]);
    showToast(`Dokumen "${doc.title}" berhasil dipublikasikan ke repositori.`);
  };

  const handleTriggerSync = (systemName: string) => {
    logAudit('INTEGRATION_SYNC_TRIGGERED', 'Integrations', systemName, `Manual trigger sinkronisasi dari ${systemName}.`);
    showToast(`Sinkronisasi dengan ${systemName} selesai dan data terverifikasi.`);
  };

  const handleExportReport = () => {
    const reportData = {
      application: 'Portal Chapter Digital Product & Solution (DPS) - Telkom Indonesia',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      persona: currentPersona,
      executiveSummary: {
        totalTalents: talents.length,
        averageUtilization: `${Math.round(talents.reduce((a, t) => a + t.allocationPct, 0) / talents.length)}%`,
        activeProjects: projects.length,
        onTrackProjects: projects.filter(p => p.health === 'On Track').length,
        openDemands: demands.filter(d => d.status !== 'Closed').length,
        criticalRisks: risks.filter(r => r.severity === 'Critical').length,
        pendingDecisions: pendingDecisions.filter(d => d.status === 'Pending').length,
      },
      talents,
      demands,
      projects,
      risks,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Portal_DPS_Executive_Snapshot_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Snapshot laporan eksekutif berhasil diunduh.');
  };

  const handleAskJarvisDoc = (docTitle: string) => {
    setAiWorkspacePrefill(`Bantu jelaskan poin-poin utama dan implikasi implementasi dari dokumen: "${docTitle}"`);
    setActiveSection('ai-workspace');
  };

  const pendingDecisionsCount = pendingDecisions.filter(d => d.status === 'Pending').length;
  const openDemandsCount = demands.filter(d => d.status === 'Submitted' || d.status === 'Validating' || d.status === 'Matching' || d.status === 'Pending Approval').length;

  if (!isAuthenticated) {
    return (
      <>
        <LoginProfilePage onLogin={handleLogin} />
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
        )}
        <FloatingChatbot />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Top Bar Contract (Wordmark — Links — Primary Action & Persona) */}
      <Navbar
        currentUser={currentUser}
        onLogout={handleLogout}
        currentPersona={currentPersona}
        onSelectPersona={(role) => {
          setCurrentPersona(role);
          if (currentUser) {
            setCurrentUser({ ...currentUser, role });
          }
        }}
        activeSection={activeSection}
        onNavigate={setActiveSection}
        onOpenNewDemand={() => setIsNewDemandModalOpen(true)}
        onExportReport={handleExportReport}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        pendingDecisionsCount={pendingDecisionsCount}
      />

      {/* Main Workspace: Collapsible Sidebar + Content Viewport */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        
        {/* Sidebar Navigation (12 Information Architecture modules per PRD) */}
        <Sidebar
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          pendingDecisionsCount={pendingDecisionsCount}
          openDemandsCount={openDemandsCount}
          currentPersona={currentPersona}
        />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-y-auto">
          
          {activeSection === 'home' && (
            <HomeView
              onNavigate={setActiveSection}
              onOpenNewDemand={() => setIsNewDemandModalOpen(true)}
              talents={talents}
            />
          )}

          {activeSection === 'executive' && (
            <ExecutiveDashboard
              talents={talents}
              demands={demands}
              projects={projects}
              risks={risks}
              pendingDecisions={pendingDecisions}
              onNavigate={setActiveSection}
              onOpenDecisionModal={setDecisionModalItem}
              onOpenNewDemand={() => setIsNewDemandModalOpen(true)}
              onExportReport={handleExportReport}
            />
          )}

          {activeSection === 'organization' && (
            <OrganizationView
              talents={talents}
              onSelectTalent={setTalentDetailModalItem}
            />
          )}

          {activeSection === 'talent' && (
            <TalentDirectory
              talents={talents}
              onSelectTalent={setTalentDetailModalItem}
              onOpenNewDemand={() => setIsNewDemandModalOpen(true)}
              searchQuery={searchQuery}
            />
          )}

          {activeSection === 'assignment' && (
            <AssignmentWorkflow
              demands={demands}
              talents={talents}
              onOpenNewDemand={() => setIsNewDemandModalOpen(true)}
              onApproveDemand={handleApproveDemand}
              onRejectDemand={handleRejectDemand}
              onMatchTalent={setTaniaMatchingDemand}
            />
          )}

          {activeSection === 'portfolio' && (
            <ProductPortfolioView
              products={INITIAL_PRODUCTS}
              onOpenNewProposal={() => setActiveSection('ai-workspace')}
            />
          )}

          {activeSection === 'delivery' && (
            <DeliveryRegister
              projects={projects}
              risks={risks}
              onUpdateMilestone={handleUpdateMilestone}
              onEscalateRisk={handleEscalateRisk}
            />
          )}

          {activeSection === 'workload' && (
            <WorkloadTimesheetView
              talents={talents}
              timesheets={timesheets}
              onApproveTimesheet={handleApproveTimesheet}
              onSubmitTimesheet={handleSubmitTimesheet}
            />
          )}

          {activeSection === 'competency' && (
            <CompetencyPerformanceView
              talents={talents}
              assessments={assessments}
              onAddAssessment={handleAddAssessment}
            />
          )}

          {activeSection === 'finance' && (
            <FinanceBudgetView />
          )}

          {activeSection === 'knowledge' && (
            <KnowledgeHubView
              docs={knowledgeDocs}
              onUploadDoc={handleUploadKnowledgeDoc}
              onAskJarvisDoc={handleAskJarvisDoc}
            />
          )}

          {activeSection === 'ai-workspace' && (
            <AiWorkspaceView
              talents={talents}
              demands={demands}
              projects={projects}
              prefilledQuery={aiWorkspacePrefill}
            />
          )}

          {activeSection === 'admin' && (
            <AdminGovernanceView
              auditLogs={auditLogs}
              onTriggerSync={handleTriggerSync}
            />
          )}

        </main>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl text-xs flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      <NewDemandModal
        isOpen={isNewDemandModalOpen}
        onClose={() => setIsNewDemandModalOpen(false)}
        onSubmitDemand={handleCreateDemand}
      />

      <DecisionModal
        decision={decisionModalItem}
        onClose={() => setDecisionModalItem(null)}
        onApprove={handleApproveDecision}
        onReject={handleRejectDecision}
      />

      <TalentDetailModal
        talent={talentDetailModalItem}
        onClose={() => setTalentDetailModalItem(null)}
        onAssignDemand={() => {
          setTalentDetailModalItem(null);
          setIsNewDemandModalOpen(true);
        }}
      />

      <TaniaMatchingModal
        demand={taniaMatchingDemand}
        talents={talents}
        onClose={() => setTaniaMatchingDemand(null)}
        onAssignCandidate={handleAssignCandidate}
      />

      {/* Floating Chatbot Bubble di kanan bawah */}
      <FloatingChatbot />

    </div>
  );
}
