import React, { useState } from 'react';
import { RATE_CARD_ITEMS } from '../data/initialData';
import { 
  Wallet, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Download, 
  Building2,
  FileSpreadsheet
} from 'lucide-react';

export const FinanceBudgetView: React.FC = () => {
  const [selectedTribe, setSelectedTribe] = useState<string>('All');

  const budgetItems = [
    {
      tribe: 'Tribe Enterprise Digital',
      productName: 'Enterprise Cloud Portal',
      plannedBudget: 'Rp 1.450.000.000',
      actualSpent: 'Rp 1.189.000.000',
      variance: '-18.0%',
      varianceStatus: 'Favorable',
      talentCostEst: 'Rp 920.000.000',
      headcount: 4,
    },
    {
      tribe: 'Tribe SME Platform',
      productName: 'IndiBiz Merchant POS Suite',
      plannedBudget: 'Rp 1.200.000.000',
      actualSpent: 'Rp 888.000.000',
      variance: '-26.0%',
      varianceStatus: 'Favorable',
      talentCostEst: 'Rp 710.000.000',
      headcount: 3,
    },
    {
      tribe: 'Tribe Core Digital Platform',
      productName: 'Enterprise Cloud Billing Engine',
      plannedBudget: 'Rp 950.000.000',
      actualSpent: 'Rp 864.500.000',
      variance: '-9.0%',
      varianceStatus: 'At Risk',
      talentCostEst: 'Rp 650.000.000',
      headcount: 2,
    },
    {
      tribe: 'Tribe Core Digital Platform',
      productName: 'Antares IoT Data Gateway',
      plannedBudget: 'Rp 1.800.000.000',
      actualSpent: 'Rp 1.242.000.000',
      variance: '-31.0%',
      varianceStatus: 'Favorable',
      talentCostEst: 'Rp 990.000.000',
      headcount: 3,
    },
  ];

  const filteredBudgets = selectedTribe === 'All'
    ? budgetItems
    : budgetItems.filter(b => b.tribe === selectedTribe);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              FINANCIAL MANAGEMENT & TALENT COSTING (FIN-001 - FIN-008)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Anggaran Chapter DPS & Standard Rate Card
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Plan vs Actual budget tenaga ahli, estimasi biaya delivery inisiatif, dan rekonsiliasi ERP SAP.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Filter Tribe:</span>
            <select
              value={selectedTribe}
              onChange={(e) => setSelectedTribe(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-red-600 font-medium"
            >
              <option value="All">Semua Tribe</option>
              <option value="Tribe Enterprise Digital">Tribe Enterprise Digital</option>
              <option value="Tribe SME Platform">Tribe SME Platform</option>
              <option value="Tribe Core Digital Platform">Tribe Core Digital Platform</option>
            </select>
          </div>
        </div>

        {/* Financial Highlights */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-slate-500">Total Anggaran Rencana (Q4 2026)</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">Rp 5.400.000.000</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Disetujui Management DDP</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-slate-500">Realisasi Penyerapan (Spent)</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">Rp 4.183.500.000</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">77.4% dari total alokasi budget</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-slate-500">Komponen Biaya SDM Talent DPS</div>
            <div className="text-lg font-bold font-mono text-red-600 mt-1">Rp 3.270.000.000</div>
            <div className="text-[10px] text-slate-400 mt-0.5">78.1% porsi serapan anggaran</div>
          </div>
        </div>
      </div>

      {/* Plan vs Actual Budget Table (FIN-002) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Monitoring Anggaran per Inisiatif Produk (Plan vs Actual)
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Data terintegrasi ke ERP Finance Telkom untuk pelaporan akuntansi manajemen.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                <th className="pb-2 font-semibold">NAMA INISIATIF / PRODUK</th>
                <th className="pb-2 font-semibold">TRIBE</th>
                <th className="pb-2 font-semibold text-right">ANGGARAN RENCANA</th>
                <th className="pb-2 font-semibold text-right">REALISASI SPENT</th>
                <th className="pb-2 font-semibold text-right">BIAYA SDM DPS</th>
                <th className="pb-2 font-semibold text-center">HEADCOUNT</th>
                <th className="pb-2 font-semibold text-right">VARIANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredBudgets.map((b) => (
                <tr key={b.productName} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 pr-3 font-sans font-bold text-slate-900">{b.productName}</td>
                  <td className="py-2.5 pr-3 font-sans text-slate-600">{b.tribe}</td>
                  <td className="py-2.5 pr-3 text-right text-slate-700">{b.plannedBudget}</td>
                  <td className="py-2.5 pr-3 text-right font-bold text-slate-900">{b.actualSpent}</td>
                  <td className="py-2.5 pr-3 text-right text-slate-600">{b.talentCostEst}</td>
                  <td className="py-2.5 text-center text-slate-700">{b.headcount} Orang</td>
                  <td className="py-2.5 text-right font-bold text-emerald-700">
                    {b.variance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Standard Rate Card (FIN-006) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Standard Rate Card Talent Chapter DPS 2026
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Acuan penyusunan Bill of Quantities (BoQ) dan cost feasibility inisiatif baru.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                <th className="pb-2 font-semibold">GRADE / BAND TELKOM</th>
                <th className="pb-2 font-semibold">ROLE REFERENSI</th>
                <th className="pb-2 font-semibold text-right">RATE / BULAN (160 JAM)</th>
                <th className="pb-2 font-semibold text-right">RATE / JAM</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {RATE_CARD_ITEMS.map((item) => (
                <tr key={item.grade} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 pr-3 font-bold text-slate-900">{item.grade}</td>
                  <td className="py-2.5 pr-3 text-slate-600">{item.role}</td>
                  <td className="py-2.5 pr-3 text-right font-mono font-bold text-slate-900">{item.ratePerMonth}</td>
                  <td className="py-2.5 text-right font-mono text-slate-600">{item.ratePerHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
