# Product Requirements Document (PRD)
## Website Portal Chapter Digital Product & Solution (DPS)

**Telkom Indonesia | Version 1.0 | Oktober 2026**  
**Status:** Draft for Management & Product Review  
**Positioning:** AI-Powered Chapter Management & Digital Delivery Command Center  
**Vision:** One Chapter. One Platform. One Source of Truth. AI-Powered Decisions.

> Dokumen ini adalah baseline usulan untuk review. Target, integrasi, dan jadwal belum merupakan komitmen yang disetujui.

## 1. Document Control

| Atribut | Keterangan |
|---|---|
| Document ID | DPS-PRD-001 |
| Version | 1.0 |
| Owner | Chapter Leader DPS |
| Product Owner | Ditunjuk Chapter Leader |
| Sponsor | Management Divisi Digital Product |
| Product | Internal enterprise web application |
| Architecture | Modular monolith, API-first, AI-ready |

**Approval:** Sponsor (business value), Chapter Leader (scope), PO (backlog), Solution Architect (architecture), Data/Security Owner (controls), QA Lead (acceptance).

## 2. Executive Summary

Portal DPS adalah digital operating layer untuk Chapter DPS: mengintegrasikan pengelolaan talent, assignment, capacity, portfolio, delivery, performance, executive reporting, dan AI-assisted decisions. Portal **tidak menggantikan** HRIS, ERP, Jira, maupun source system resmi.

Tiga komponen utama:

1. **Portal DPS:** UX, dashboard, workflow entry point, reporting.
2. **TANIA:** talent, workload, timesheet, feasibility, budget, workforce intelligence.
3. **JARVIS:** AI agents untuk product, solution, market, proposal, BoQ, business case, dan knowledge.

### 2.1 Business Problems

- Data talent, proyek, assignment, dan kinerja tersebar.
- Capacity planning dan fulfillment belum terintegrasi.
- Delivery risk dan management action tidak cukup cepat terlihat.
- Competency assessment membutuhkan evidence-based standard.
- Reporting manual memerlukan effort tinggi.
- Knowledge dan AI assistance belum terintegrasi ke workflow.

### 2.2 Outcomes

Single source of truth; faster decisions; talent fulfillment excellence; delivery visibility; evidence-based performance; reporting efficiency; AI adoption.

## 3. Product Vision & Objectives

**Vision:** AI-Native Chapter Management Platform untuk meningkatkan efektivitas Chapter DPS.

| ID | Objective | Target usulan 12 bulan setelah go-live |
|---|---|---|
| SO-01 | Master data talent | ≥95% profil lengkap |
| SO-02 | Talent fulfillment | ≥95% permintaan valid terpenuhi sesuai SLA |
| SO-03 | Delivery visibility | ≥95% proyek aktif memiliki status terkini |
| SO-04 | Evidence-based assessment | ≥90% assessment memiliki evidence |
| SO-05 | Adoption | ≥85% pengguna sasaran aktif bulanan |
| SO-06 | Reporting efficiency | ≥50% pengurangan waktu laporan |
| SO-07 | AI-assisted operations | ≥30% workflow terpilih memakai AI assistance |

Semua target memerlukan validasi baseline dan persetujuan management.

## 4. Scope & Release Strategy

### Release 1 — Core MVP
Authentication, organization, talent directory, talent assignment, project register, executive dashboard, basic workload, reporting, administration.

### Release 2 — Integrated Operations
Timesheet, competency, performance, product portfolio, delivery analytics, budget, knowledge hub, approval workflow.

### Release 3 — AI-Native Intelligence
TANIA Copilot, JARVIS integration, predictive analytics, executive AI insights.

### Out of Scope (MVP)

Payroll; penggantian HRIS/ERP/Jira; automatic HR decisions; foundation-model training; akses publik tanpa persetujuan.

## 5. Personas & Authorization

| Persona | Kebutuhan |
|---|---|
| Chapter Leader | KPI, risiko, talent, delivery, decisions |
| Capability Lead | Skill gap, assessment, certification |
| Delivery Lead | Workload, projects, blockers |
| Product Manager | Roadmap, product health |
| Project Manager | Milestones, resources, budget |
| Product Owner | Backlog, release, priority |
| Scrum Master | Sprint, impediment, capacity |
| Talent | Profile, assignment, timesheet |
| PMO | Reporting, validation |
| Administrator | User, role, configuration |
| Management DDP | Aggregated strategic KPIs |

### RBAC (Initial)

| Modul | Leader | Lead | PM/PO | Talent | Admin |
|---|---|---|---|---|---|
| Executive | Full | Scoped | Scoped | None | Config |
| Talent | Full | Scoped | Assigned | Self | Config |
| Assignment | Approve | Manage | Request | View | Config |
| Project | Full | Manage | Assigned | Assigned | Config |
| Timesheet | Summary | Review | Review | Own | Config |
| Competency | Summary | Assess | Scoped | Own | Config |
| Budget | Authorized | Authorized | Scoped | None | Config |
| AI | Authorized | Authorized | Authorized | Limited | Config |

Least privilege; admin tidak otomatis boleh membaca seluruh data sensitif.

## 6. Information Architecture

```text
Portal DPS
├── Executive (Overview, KPI, Decisions)
├── Organization (Structure, Roles, Chapter)
├── Talent (Directory, Skill, Career)
├── Assignment (Demand, Matching, Approval)
├── Product & Portfolio (Catalog, Roadmap, Release)
├── Delivery (Projects, Sprint, Risk)
├── Workload & Timesheet (Capacity, Effort, Utilization)
├── Performance (KPI, Assessment, Evidence)
├── Finance (Cost, Budget, Forecast)
├── Knowledge (Documents, Search, SOP)
├── AI Workspace (TANIA Copilot, JARVIS)
└── Administration (Users, Access, Integrations)
```

| ID | Navigation Requirement |
|---|---|
| NAV-001 | Collapsible sidebar |
| NAV-002 | Permission-aware menus |
| NAV-003 | Breadcrumbs |
| NAV-004 | Permission-aware global search |
| NAV-005 | Notification center |
| NAV-006 | Profile and settings |
| NAV-007 | Responsive layout |
| NAV-008 | Filters: period, Tribe, product, project |
| NAV-009 | Deep linking |
| NAV-010 | Empty/loading/error/no-access states |

## 7. Functional Requirements

### 7.1 Executive Command Center

| ID | Feature | Priority |
|---|---|---|
| EXE-001 | Executive KPI Summary | Must |
| EXE-002 | Talent Fulfillment | Must |
| EXE-003 | Delivery Health | Must |
| EXE-004 | Capacity & Utilization | Must |
| EXE-005 | Critical Risks | Must |
| EXE-006 | Pending Decisions | Must |
| EXE-007 | KPI Trends | Should |
| EXE-008 | AI Executive Summary | Could |
| EXE-009 | Report Export | Should |
| EXE-010 | KPI Drill-down | Must |

**Acceptance:** Filterable by period/unit; KPI definition/source/freshness/owner; stale-data warning; permission-aware drill-down; traceable critical issues.

### 7.2 Organization

| ID | Feature | Priority |
|---|---|---|
| ORG-001 | Hierarchy | Must |
| ORG-002 | Chapter/Tribe/Squad master | Must |
| ORG-003 | Role catalog | Must |
| ORG-004 | Reporting line | Should |
| ORG-005 | History | Should |
| ORG-006 | Organization dashboard | Should |

### 7.3 Talent Management

| ID | Feature | Priority |
|---|---|---|
| TAL-001 | Directory | Must |
| TAL-002 | Profile | Must |
| TAL-003 | Employment type | Must |
| TAL-004 | Role/grade | Must |
| TAL-005 | Skill matrix | Should |
| TAL-006 | Certification | Should |
| TAL-007 | Availability | Must |
| TAL-008 | Talent history | Should |
| TAL-009 | Development plan | Should |
| TAL-010 | Gap analysis | Should |
| TAL-011 | Search/filter | Must |
| TAL-012 | Import/export | Must |

**Talent attributes:** ID, name, organization, role, grade, skills, certifications, assignments, allocation, availability, project experience, evidence. Data minimization applies.

### 7.4 Talent Assignment

```text
Demand Submission → Validation → Matching → Approval
→ Talent Confirmation → Activation → Monitoring/Reallocation
```

| ID | Feature | Priority |
|---|---|---|
| ASN-001 | Demand submission | Must |
| ASN-002 | Validation | Must |
| ASN-003 | Skill matching | Must |
| ASN-004 | Capacity validation | Must |
| ASN-005 | Approval | Must |
| ASN-006 | Lifecycle tracking | Must |
| ASN-007 | Fulfillment dashboard | Must |
| ASN-008 | SLA tracking | Must |
| ASN-009 | Reallocation | Should |
| ASN-010 | AI matching | Could |

**Rules:** No over-allocation without exception approval; required dates, role, project, allocation; full audit; human approval for AI suggestions.

| SLA step | Initial proposed target |
|---|---|
| Validation | ≤2 business days |
| Matching | ≤3 business days |
| Decision | ≤2 business days |
| Activation | ≤1 business day |

### 7.5 Product & Portfolio

| ID | Feature | Priority |
|---|---|---|
| PRT-001 | Catalog | Should |
| PRT-002 | Ownership | Should |
| PRT-003 | Lifecycle | Should |
| PRT-004 | Roadmap | Should |
| PRT-005 | Initiative/epic | Should |
| PRT-006 | Feature/release | Should |
| PRT-007 | Product health | Could |
| PRT-008 | Dependencies | Should |
| PRT-009 | Investment | Could |
| PRT-010 | Dashboard | Should |

Hierarchy: Portfolio → Product/Program → Initiative → Epic → Feature/Story → Task. Product/project relations may be many-to-many.

### 7.6 Delivery

| ID | Feature | Priority |
|---|---|---|
| DLV-001 | Project register | Must |
| DLV-002 | Ownership | Must |
| DLV-003 | Milestones | Must |
| DLV-004 | Health | Must |
| DLV-005 | Risk/issue | Must |
| DLV-006 | Dependencies | Should |
| DLV-007 | Sprint summary | Should |
| DLV-008 | Delivery performance | Should |
| DLV-009 | Blockers/escalation | Must |
| DLV-010 | Reports | Must |
| DLV-011 | Jira/ADO sync | Could |
| DLV-012 | PM cockpit | Should |

Health states: On Track, At Risk, Delayed, Critical; transparent rules and audited overrides.

### 7.7 Workload & Timesheet

| ID | Feature | Priority |
|---|---|---|
| WRK-001 | Capacity | Must |
| WRK-002 | Allocation | Must |
| WRK-003 | Heatmap | Should |
| WRK-004 | Timesheet entry | Should |
| WRK-005 | Approval | Should |
| WRK-006 | Utilization | Must |
| WRK-007 | Overtime | Should |
| WRK-008 | Compliance | Should |
| WRK-009 | Labor cost | Should |
| WRK-010 | Forecast | Could |

Allocation % = allocated hours / available capacity hours × 100. Utilization % = eligible productive hours / available working hours × 100. Productive categories require policy definition.

### 7.8 Competency & Performance

| ID | Feature | Priority |
|---|---|---|
| CMP-001 | Framework | Should |
| CMP-002 | Role standards | Should |
| CMP-003 | Assessment | Should |
| CMP-004 | Evidence | Should |
| CMP-005 | History | Should |
| CMP-006 | Radar | Could |
| CMP-007 | Development plan | Should |
| CMP-008 | KPI scorecard | Should |
| CMP-009 | Review | Should |
| CMP-010 | Certification readiness | Could |

Evidence-based scale 1–5; KNOW, THINK, COMMUNICATE, INFLUENCE. AI cannot independently decide HR outcomes.

### 7.9 Finance

| ID | Feature | Priority |
|---|---|---|
| FIN-001 | Budget register | Should |
| FIN-002 | Plan vs actual | Should |
| FIN-003 | Talent cost | Should |
| FIN-004 | Forecast | Could |
| FIN-005 | Variance | Should |
| FIN-006 | Rate card | Should |
| FIN-007 | Dashboard | Should |
| FIN-008 | Approval | Could |

ERP/Finance remains official financial source where applicable.

### 7.10 Knowledge

| ID | Feature | Priority |
|---|---|---|
| KNW-001 | Repository | Should |
| KNW-002 | Upload | Should |
| KNW-003 | Classification | Should |
| KNW-004 | Search | Should |
| KNW-005 | Versioning | Should |
| KNW-006 | Review/approval | Should |
| KNW-007 | Ownership | Should |
| KNW-008 | Semantic search | Could |
| KNW-009 | Citations | Could |
| KNW-010 | Retention | Should |

### 7.11 AI Workspace

| ID | Use case | Release |
|---|---|---|
| AI-001 | Executive summary | R3 |
| AI-002 | Talent matching | R3 |
| AI-003 | Skill gap | R3 |
| AI-004 | Delivery risk explanation | R3 |
| AI-005 | Knowledge Q&A | R3 |
| AI-006 | Requirement assistant | R3 |
| AI-007 | JARVIS proposal | R3 |
| AI-008 | Business case | R3 |
| AI-009 | Meeting summary | R3 |
| AI-010 | Recommendation feedback | R3 |

**Guardrails:** Source citations; permission-aware retrieval; labeled recommendations; feedback; human confirmation for mutations; model/prompt usage telemetry; approved data-processing boundaries.

## 8. MVP User Stories

| ID | User story | Acceptance |
|---|---|---|
| US-001 | Leader sees KPIs | Correct scope, period, source, freshness |
| US-002 | Leader sees critical issues | Owner, status, due date, detail |
| US-003 | Lead sees projects | Filter and health sort |
| US-004 | PM updates milestone | Validation and audit history |
| US-005 | Talent Lead searches skills | Role/skill/availability filters |
| US-006 | Requester submits demand | Unique ID and workflow status |
| US-007 | Approver approves assignment | RBAC and audit |
| US-008 | Talent sees assignments | Permission-scoped records |
| US-009 | Analyst exports reports | Permission-aware filters |
| US-010 | Admin manages roles | Audited consistent access |

**US-006 detailed:** Given authorized requester, when required demand fields are submitted, then validate required values/dates, create unique demand ID, set Submitted status, assign approver, record timestamp/creator, and show in fulfillment dashboard.

## 9. Data Requirements

| Domain | Entities |
|---|---|
| Identity | User, Role, Permission, Session |
| Organization | Chapter, Unit, Tribe, Squad |
| Talent | Talent, Skill, Certification, Competency |
| Assignment | Demand, Candidate, Assignment, Approval |
| Product | Product, Roadmap, Feature, Release |
| Delivery | Project, Milestone, Risk, Issue |
| Workload | Capacity, Allocation, Timesheet |
| Performance | KPI, Assessment, Evidence |
| Finance | Budget, Cost, Rate Card |
| Knowledge | Document, Version, Access Policy |
| AI | Conversation, Prompt, Model, Evaluation |
| Governance | Audit, Notification, Configuration |

Use stable IDs, referential integrity, data owner, controlled imports, reconciliation, retention, and compliance with applicable PDP and internal policies.

## 10. Integrations

| System | Purpose | Priority |
|---|---|---|
| Corporate SSO | Identity | Must if available |
| HRIS | Employee master | Should |
| TeMan | Timesheet | Should |
| Jira / Azure DevOps | Delivery | Could |
| GitHub / GitLab | Engineering | Could |
| ERP | Finance | Could |
| Microsoft 365 | Notifications/documents | Should |
| TANIA | Workforce | Architecture Must; staged rollout |
| JARVIS | AI agents | R3 |
| ModelHub / Gateway | LLM | R3 |

Use approved APIs or controlled imports with source and sync timestamps.

## 11. Non-Functional Requirements

| ID | Area | Initial target |
|---|---|---|
| NFR-001 | Availability | ≥99.5% MVP; 99.9% later |
| NFR-002 | Dashboard load | P95 ≤3 s under agreed load |
| NFR-003 | API | P95 ≤500 ms for simple endpoints |
| NFR-004 | Security | RBAC, TLS, audit, sessions |
| NFR-005 | Accessibility | WCAG 2.2 AA design target |
| NFR-006 | Responsive | Desktop/tablet/mobile |
| NFR-007 | Browser | Supported Chrome/Edge/Safari |
| NFR-008 | Backup | Automated and restore tested |
| NFR-009 | Observability | Metrics/logs/traces/alerts |
| NFR-010 | Scalability | Capacity tested |
| NFR-011 | Maintainability | Modular/tests/contracts |
| NFR-012 | Recovery | RTO/RPO from BIA |
| NFR-013 | Privacy | Encryption/minimization/retention |
| NFR-014 | Auditability | Traceable critical mutations |
| NFR-015 | AI reliability | Evaluation/guardrails/fallback |

## 12. Technology Direction

| Layer | Preferred option |
|---|---|
| Frontend | Next.js, React, TypeScript |
| UI | Tailwind, shadcn/ui |
| Charts | ECharts / Recharts |
| Backend | Next.js BFF; NestJS if needed |
| DB | PostgreSQL |
| Auth | Enterprise SSO / approved Supabase Auth |
| Storage | Approved S3-compatible |
| Search | PostgreSQL FTS, pgvector |
| AI | TANIA / Multica orchestration |
| LLM | Gemini or approved gateway |
| Hosting | Approved Vercel/private/on-prem |
| Monitoring | OpenTelemetry-compatible |
| CI/CD | GitHub Actions / approved platform |

**Decision:** Start modular monolith; extract services when justified.

## 13. KPI Framework

| KPI | Formula |
|---|---|
| Talent Fulfillment | Filled valid demand / valid demand ×100% |
| Capacity Utilization | Productive hours / available hours ×100% |
| Assignment SLA | On-time completed assignments / completed assignments ×100% |
| On-time Delivery | On-time milestones / due milestones ×100% |
| Competency Coverage | Qualified / required talent ×100% |
| Timesheet Compliance | Compliant / expected submissions ×100% |
| Adoption | Active target / eligible users ×100% |
| Evidence Completeness | Assessments with evidence / total assessments ×100% |

All KPIs need data owner, definition, grain, period, filters, exclusions, and freshness. Analytics events: `dashboard_viewed`, `talent_searched`, `demand_submitted`, `assignment_approved`, `project_updated`, `report_exported`, `ai_recommendation_feedback`.

## 14. Prioritized Epic Backlog

| Epic | Name | Priority | Initial story points |
|---|---|---|---:|
| EP-01 | Identity & Access | Must | 21 |
| EP-02 | Executive Dashboard | Must | 34 |
| EP-03 | Organization Master | Must | 21 |
| EP-04 | Talent Directory | Must | 34 |
| EP-05 | Talent Assignment | Must | 55 |
| EP-06 | Project & Delivery Register | Must | 34 |
| EP-07 | Capacity & Workload | Must | 34 |
| EP-08 | Reporting & Notifications | Must | 21 |
| EP-09 | Timesheet & Approval | Should | 34 |
| EP-10 | Competency & Performance | Should | 55 |
| EP-11 | Product Portfolio | Should | 55 |
| EP-12 | Knowledge Hub | Should | 34 |
| EP-13 | Financial Management | Should | 34 |
| EP-14 | TANIA/JARVIS AI Integration | Could | 55 |

Story points are relative preliminary estimates, subject to refinement.

## 15. Delivery Roadmap (Proposed)

| Stage | Duration | Deliverables |
|---|---|---|
| Sprint 0 | 2 weeks | Validation, UX, data audit, architecture, security |
| MVP Build | 8–12 weeks | Core features |
| Pilot & Stabilization | 4 weeks | UAT, reconciliation, training, defects |
| Release 2 | 8–12 weeks | Competency, timesheet, portfolio, knowledge |
| Release 3 | 8–12 weeks | AI copilot, agents, advanced analytics |

Dates depend on approved staffing, data access, integrations, and funding.

## 16. Quality Assurance & UAT

Test functional, integration, RBAC, security, accessibility, performance, reconciliation, regression, backup/restore.

### MVP Go-Live Gates

- [ ] All Must-have requirements pass acceptance tests.
- [ ] No unresolved Critical/High defects.
- [ ] RBAC tested.
- [ ] Master and assignment data reconciled.
- [ ] Business owner validates KPIs.
- [ ] NFR tested under agreed load.
- [ ] Backup/restore verified.
- [ ] Monitoring and audit operational.
- [ ] User/admin documentation ready.
- [ ] Business Owner and PO sign UAT.

## 17. Risks & Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Fragmented data | Inaccurate dashboards | Owners, cleansing, reconciliation |
| HRIS/ERP access | Delayed integration | Controlled import |
| Scope creep | MVP delay | MoSCoW and gates |
| Limited engineers | Low velocity | Dedicated squad |
| Personal data exposure | Legal/security | RBAC, encryption, review |
| Incorrect AI | Bad decisions | Evidence, evaluation, human approval |
| Low adoption | Low ROI | Champions, training, adoption metrics |
| Vendor lock-in | Cost/dependency | Standards, abstraction |

## 18. RACI

| Activity | Chapter Leader | PO | Tech Lead | QA | Data Owner |
|---|---|---|---|---|---|
| Vision | A | R | C | I | C |
| Backlog | C | A/R | C | C | C |
| Architecture | I | C | A/R | C | C |
| Data definitions | C | C | R | C | A |
| Development | I | A | R | C | C |
| UAT | A | R | C | R | C |
| Go-live | A | R | C | C | C |
| Incident | I | A | R | C | C |

RACI to be reconciled with official enterprise decision rights.

## 19. Open Decisions

| ID | Question | Proposed direction |
|---|---|---|
| DEC-01 | Portal vs TANIA | Portal front door; TANIA workforce domain |
| DEC-02 | Talent system of record | HRIS if available |
| DEC-03 | Authentication | Enterprise SSO |
| DEC-04 | Hosting | Based on classification/security |
| DEC-05 | KPI owner | Chapter Leader + domain owners |
| DEC-06 | Delivery integration | Controlled import then API |
| DEC-07 | AI platform | Approved multi-model gateway |
| DEC-08 | Pilot users | Leaders, PMO, talent lead, selected PMs |
| DEC-09 | Initial migration | Talent, assignment, project, org |
| DEC-10 | Budget/capacity | Validate before schedule commitment |

## 20. Architecture Positioning

```text
              PORTAL CHAPTER DPS
     UX • Executive • Workflow • Reporting
                      |
              Shared APIs / IAM
                  /       \
                 /         \
      TANIA Workforce     JARVIS AI Agents
      Talent, Capacity    Product, Solution,
      Assignment, Cost    Proposal, Knowledge
                 \         /
                  \       /
         Shared Enterprise Foundation
    PostgreSQL • Integration • Security
       Audit • Monitoring • Governance
```

Avoid duplicating TANIA business logic inside Portal; use shared identity and APIs. AI decisions require human accountability.

## 21. Definition of Ready & Recommendation

Before development baseline: approve MVP scope, appoint data owners, decide TANIA integration, approve RBAC, confirm team/budget. Prioritize **Release 1 Core MVP**, pilot, measure outcomes, then expand product/delivery intelligence and AI-native capabilities.

---

**End of Document — DPS-PRD-001 v1.0**
