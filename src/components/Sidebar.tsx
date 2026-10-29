import React from 'react';
import { NavSection, PersonaRole } from '../types';
import {
  Home,
  LayoutDashboard,
  Network,
  Users,
  GitPullRequest,
  Layers,
  Kanban,
  Clock,
  Award,
  Wallet,
  BookOpen,
  Sparkles,
  Settings,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  pendingDecisionsCount: number;
  openDemandsCount: number;
  currentPersona: PersonaRole;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  pendingDecisionsCount,
  openDemandsCount,
  currentPersona,
}) => {
  // Navigation items mapping per PRD Section 6 (Information Architecture)
  const navItems: {
    id: NavSection;
    label: string;
    subtext: string;
    icon: React.ElementType;
    badgeCount?: number;
    badgeColor?: string;
  }[] = [
    {
      id: 'home',
      label: 'Home & Profil Chapter',
      subtext: 'Visi, Berita & Aktivitas',
      icon: Home,
    },
    {
      id: 'executive',
      label: 'Executive Command',
      subtext: 'KPIs, Health & Decisions',
      icon: LayoutDashboard,
      badgeCount: pendingDecisionsCount > 0 ? pendingDecisionsCount : undefined,
      badgeColor: 'bg-red-100 text-red-700',
    },
    {
      id: 'organization',
      label: 'Struktur Organisasi',
      subtext: 'Chapter, Tribe & Squads',
      icon: Network,
    },
    {
      id: 'talent',
      label: 'Talent Directory',
      subtext: 'Profiles, Skills & Grades',
      icon: Users,
    },
    {
      id: 'assignment',
      label: 'Assignment & Demand',
      subtext: 'Matching & SLA Tracking',
      icon: GitPullRequest,
      badgeCount: openDemandsCount > 0 ? openDemandsCount : undefined,
      badgeColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'portfolio',
      label: 'Product & Portfolio',
      subtext: 'Roadmap & Releases',
      icon: Layers,
    },
    {
      id: 'delivery',
      label: 'Delivery Register',
      subtext: 'Projects, Milestones & Risks',
      icon: Kanban,
    },
    {
      id: 'workload',
      label: 'Workload & Timesheet',
      subtext: 'Capacity & Utilization',
      icon: Clock,
    },
    {
      id: 'competency',
      label: 'Competency & Perf.',
      subtext: 'Radar, Evidence & KPIs',
      icon: Award,
    },
    {
      id: 'finance',
      label: 'Finance & Budget',
      subtext: 'Rate Cards & Plan vs Actual',
      icon: Wallet,
    },
    {
      id: 'knowledge',
      label: 'Knowledge Hub',
      subtext: 'SOPs, Blueprints & PRD',
      icon: BookOpen,
    },
    {
      id: 'ai-workspace',
      label: 'AI Workspace',
      subtext: 'TANIA & JARVIS Agents',
      icon: Sparkles,
      badgeCount: 2,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'admin',
      label: 'Admin & Governance',
      subtext: 'RBAC, Audit & Sync',
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 min-h-[calc(100vh-4rem)]">
      {/* Quick Chapter Status Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider">
          CHAPTER OPERATING LAYER
        </div>
        <div className="text-xs font-bold text-slate-800 mt-1 flex items-center justify-between">
          <span>Digital Product & Solution</span>
          <span className="text-[10px] text-slate-500 font-mono font-medium">v1.0 MVP</span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectSection(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-left rounded-lg transition-colors group ${
                isActive
                  ? 'bg-red-50 text-red-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-red-600' : 'text-slate-400 group-hover:text-slate-600'
                  }`}
                />
                <div className="truncate">
                  <div className="text-xs truncate">{item.label}</div>
                  <div className="text-[10px] text-slate-400 truncate group-hover:text-slate-500">
                    {item.subtext}
                  </div>
                </div>
              </div>

              {item.badgeCount !== undefined ? (
                <span
                  className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded ${item.badgeColor}`}
                >
                  {item.badgeCount}
                </span>
              ) : (
                <ChevronRight
                  className={`w-3.5 h-3.5 text-slate-300 transition-opacity ${
                    isActive ? 'opacity-100 text-red-500' : 'opacity-0 group-hover:opacity-100'
                  }`}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* AI Assistance Badge in Bottom Sidebar */}
      <div className="p-3 border-t border-slate-100 bg-slate-50/70">
        <div className="p-2.5 bg-white border border-slate-200 rounded-lg">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>AI Copilots Siap</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-1 leading-relaxed">
            <strong>TANIA</strong> untuk workforce & <strong>JARVIS</strong> untuk solusi digital.
          </div>
          <button
            onClick={() => onSelectSection('ai-workspace')}
            className="w-full mt-2 py-1 text-center text-[11px] font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded transition-colors"
          >
            Buka AI Workspace
          </button>
        </div>
      </div>
    </aside>
  );
};
