import React, { useState } from 'react';
import { ProductItem } from '../types';
import { 
  Layers, 
  Calendar, 
  TrendingUp, 
  Users, 
  ExternalLink, 
  ArrowUpRight,
  Filter,
  CheckCircle2,
  Clock
} from 'lucide-react';

interface ProductPortfolioViewProps {
  products: ProductItem[];
  onOpenNewProposal: () => void;
}

export const ProductPortfolioView: React.FC<ProductPortfolioViewProps> = ({
  products,
  onOpenNewProposal,
}) => {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'catalog' | 'roadmap'>('catalog');

  const filteredProducts = selectedPortfolio === 'All'
    ? products
    : products.filter(p => p.portfolio === selectedPortfolio);

  // Roadmap timeline data
  const roadmapQuarters = [
    {
      quarter: 'Q4 2026 (Aktif)',
      releases: [
        { product: 'Enterprise Cloud Portal', version: 'v2.5', status: 'Testing', target: '15 Nov 2026', scope: 'Multi-cloud interconnect & Dedicated API Gateway' },
        { product: 'IndiBiz Merchant POS Suite', version: 'v1.4', status: 'Pilot UAT', target: '20 Nov 2026', scope: 'QRIS Settlement Instant & Inventory sync microservice' },
        { product: 'Enterprise Cloud Billing Engine', version: 'v2.0', status: 'Delayed', target: '30 Nov 2026', scope: 'Automated SAP ERP Invoice Reconciliation' },
        { product: 'Antares IoT Data Gateway', version: 'v3.1', status: 'Dev', target: '05 Des 2026', scope: 'Kafka cluster throughput 50,000 EPS' },
      ],
    },
    {
      quarter: 'Q1 2027 (Rencana)',
      releases: [
        { product: 'MyTelkomsel Enterprise Hub', version: 'MVP Pilot', status: 'Discovery', target: '15 Jan 2027', scope: 'B2B Corporate Account Switcher in App' },
        { product: 'IndiBiz AI Marketing', version: 'v1.0 Alpha', status: 'Matching', target: '28 Feb 2027', scope: 'Smart customer recommendation model for merchant' },
        { product: 'Telkom API Gateway Core', version: 'v4.0', status: 'Backlog', target: '15 Mar 2027', scope: 'Global Rate Limiting & Zero Trust Mutual TLS' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              PRODUCT & PORTFOLIO MANAGEMENT (PRT-001 - PRT-010)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Katalog Produk & Roadmap Rilis DPS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Hierarki: Portofolio → Produk → Inisiatif → Rilis. Dilengkapi metrik adopsi pengguna dan status lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* View Switcher Tabs (Functional buttons, not pills) */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'catalog'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Katalog Produk
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeTab === 'roadmap'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Timeline Roadmap
              </button>
            </div>

            <button
              onClick={onOpenNewProposal}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <span>+ Susun Proposal Produk (JARVIS)</span>
            </button>
          </div>
        </div>

        {/* Portfolio Filter Bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">Portofolio:</span>
          {(['All', 'Enterprise B2B', 'SME Digital', 'Digital Core', 'Consumer Platforms'] as const).map(p => (
            <button
              key={p}
              onClick={() => setSelectedPortfolio(p)}
              className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                selectedPortfolio === p
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {p === 'All' ? 'Semua Portofolio' : p}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'catalog' ? (
        /* Catalog Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Code, Portfolio, Lifecycle */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span className="font-bold text-slate-700">{prod.code}</span>
                  <div className="flex items-center gap-1.5">
                    <span>{prod.portfolio}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-slate-900">{prod.lifecycle}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 mt-2">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {prod.description}
                </p>

                {/* Metrics Grid */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">PRODUCT OWNER</div>
                    <div className="font-medium text-slate-800 truncate mt-0.5">{prod.owner}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">STATUS HEALTH</div>
                    <div className={`font-bold mt-0.5 ${
                      prod.health === 'On Track' ? 'text-emerald-600' :
                      prod.health === 'At Risk' ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {prod.health}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">PENGGUNA / SCALE</div>
                    <div className="font-mono text-slate-800 truncate mt-0.5">{prod.activeUsers}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400">EST. REVENUE / BLN</div>
                    <div className="font-mono text-slate-800 truncate mt-0.5">{prod.monthlyRevenueEst}</div>
                  </div>
                </div>
              </div>

              {/* Bottom: Next Release & NPS */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div className="text-slate-500 font-mono">
                  Rilis Berikut: <strong className="text-slate-800">{prod.nextRelease}</strong>
                </div>
                <div className="font-mono text-slate-700 font-bold">
                  NPS: {prod.npsScore}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Roadmap Timeline View */
        <div className="space-y-6">
          {roadmapQuarters.map((q) => (
            <div key={q.quarter} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900">{q.quarter}</h3>
                <span className="text-xs font-mono text-slate-500">{q.releases.length} Target Rilis</span>
              </div>

              <div className="mt-4 space-y-3">
                {q.releases.map((rel) => (
                  <div key={rel.product + rel.version} className="p-3.5 border border-slate-200 rounded-lg hover:bg-slate-50/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{rel.product}</span>
                        <span className="text-[11px] font-mono text-slate-500">{rel.version}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className={`text-[11px] font-bold ${
                          rel.status === 'Testing' || rel.status === 'Pilot UAT' ? 'text-emerald-600' :
                          rel.status === 'Delayed' ? 'text-red-600' : 'text-slate-600'
                        }`}>
                          {rel.status}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-slate-600">
                        Target Go-Live: <strong>{rel.target}</strong>
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 mt-1.5">
                      <strong className="text-slate-700">Fitur & Scope:</strong> {rel.scope}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
