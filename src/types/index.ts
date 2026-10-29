export type PersonaRole =
  | 'Chapter Leader'
  | 'Capability Lead'
  | 'Delivery Lead'
  | 'Product Manager'
  | 'Project Manager'
  | 'Product Owner'
  | 'Scrum Master'
  | 'Talent'
  | 'PMO'
  | 'Administrator'
  | 'Management DDP';

export interface CurrentUser {
  name: string;
  email: string;
  nik: string;
  role: PersonaRole;
  tribe?: string;
  avatarColor: string;
}

export type NavSection =
  | 'home'
  | 'executive'
  | 'organization'
  | 'talent'
  | 'assignment'
  | 'portfolio'
  | 'delivery'
  | 'workload'
  | 'competency'
  | 'finance'
  | 'knowledge'
  | 'ai-workspace'
  | 'admin';

export type HealthStatus = 'On Track' | 'At Risk' | 'Delayed' | 'Critical';

export type AllocationStatus = 'Available' | 'Optimal' | 'Overallocated';

export interface Talent {
  id: string;
  name: string;
  email: string;
  role: string;
  grade: 'Band III (Lead)' | 'Band IV (Senior)' | 'Band V (Specialist)' | 'Band VI (Associate)';
  tribe: string;
  squad: string;
  skills: string[];
  certifications: string[];
  allocationPct: number; // 0 - 100+
  availableCapacity: number; // in hours/week
  totalCapacity: number; // default 40h/week
  competencyScores: {
    know: number; // 1-5
    think: number; // 1-5
    communicate: number; // 1-5
    influence: number; // 1-5
  };
  activeAssignments: string[];
  pastProjects: string[];
  evidenceCount: number;
  avatarColor: string;
}

export interface DemandAssignment {
  id: string;
  demandNumber: string;
  title: string;
  requestingTribe: string;
  targetSquad: string;
  roleRequired: string;
  requiredSkills: string[];
  allocationPct: number;
  startDate: string;
  endDate: string;
  status: 'Submitted' | 'Validating' | 'Matching' | 'Pending Approval' | 'Approved' | 'Active' | 'Closed';
  slaStatus: 'Within SLA' | 'Approaching SLA' | 'Breached';
  daysInStage: number;
  assignedTalentId?: string;
  assignedTalentName?: string;
  priority: 'High' | 'Medium' | 'Low';
  submittedBy: string;
  submittedAt: string;
  justification: string;
}

export interface ProductItem {
  id: string;
  code: string;
  name: string;
  tribe: string;
  portfolio: 'Enterprise B2B' | 'SME Digital' | 'Consumer Platforms' | 'Digital Core';
  lifecycle: 'Discovery' | 'Alpha' | 'Beta' | 'GA' | 'Maintenance';
  owner: string;
  health: HealthStatus;
  activeInitiatives: number;
  nextRelease: string;
  npsScore: number;
  activeUsers: string;
  monthlyRevenueEst: string;
  description: string;
}

export interface ProjectRegisterItem {
  id: string;
  code: string;
  name: string;
  productName: string;
  tribe: string;
  projectManager: string;
  solutionArchitect: string;
  health: HealthStatus;
  progressPct: number;
  currentMilestone: string;
  milestoneDueDate: string;
  milestones: {
    id: string;
    title: string;
    dueDate: string;
    completed: boolean;
  }[];
  criticalBlocker?: string;
  budgetSpentPct: number;
  jiraSyncStatus: 'Synced' | 'Pending' | 'Manual Import';
}

export interface DeliveryRisk {
  id: string;
  title: string;
  projectName: string;
  tribe: string;
  severity: 'Critical' | 'High' | 'Medium';
  impact: string;
  owner: string;
  status: 'Open' | 'Mitigating' | 'Resolved';
  actionPlan: string;
  dueDate: string;
}

export interface PendingDecision {
  id: string;
  type: 'Talent Assignment' | 'Milestone Extension' | 'Budget Exception' | 'Architecture Approval';
  title: string;
  requester: string;
  tribe: string;
  submittedDate: string;
  priority: 'High' | 'Medium';
  details: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface TimesheetEntry {
  id: string;
  talentName: string;
  weekEnding: string;
  projectName: string;
  category: 'Product Development' | 'Solution Architecture' | 'Discovery & Research' | 'Operations & Support';
  hoursLogged: number;
  status: 'Submitted' | 'Approved' | 'Revision Requested';
  submittedDate: string;
}

export interface CompetencyAssessment {
  id: string;
  talentId: string;
  talentName: string;
  role: string;
  assessor: string;
  period: string;
  ratings: {
    know: number;
    think: number;
    communicate: number;
    influence: number;
  };
  overallGrade: number;
  hasEvidence: boolean;
  evidenceNotes: string;
  status: 'Verified' | 'Pending Review';
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'SOP & Guidelines' | 'Solution Blueprint' | 'PRD Template' | 'BoQ & Pricing' | 'Market Intelligence';
  author: string;
  lastUpdated: string;
  version: string;
  accessLevel: 'Internal Chapter' | 'Divisi Digital' | 'Public Restricted';
  summary: string;
  downloadCount: number;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  domain: string;
  entityId: string;
  details: string;
}
