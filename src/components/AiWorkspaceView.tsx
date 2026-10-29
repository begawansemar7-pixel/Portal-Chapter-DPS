import React, { useState } from 'react';
import { Talent, DemandAssignment, ProjectRegisterItem } from '../types';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Layers, 
  Users, 
  FileText, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  RefreshCw,
  Building,
  CheckCircle2
} from 'lucide-react';

interface AiWorkspaceViewProps {
  talents: Talent[];
  demands: DemandAssignment[];
  projects: ProjectRegisterItem[];
  prefilledQuery?: string;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  agent: 'tania' | 'jarvis';
  text: string;
  timestamp: string;
  sourceNote?: string;
  structuredData?: any;
}

export const AiWorkspaceView: React.FC<AiWorkspaceViewProps> = ({
  talents,
  demands,
  projects,
  prefilledQuery,
}) => {
  const [activeAgent, setActiveAgent] = useState<'tania' | 'jarvis'>('tania');
  const [inputMessage, setInputMessage] = useState<string>(prefilledQuery || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Proposal Generator state (JARVIS)
  const [showBoqBuilder, setShowBoqBuilder] = useState<boolean>(false);
  const [productName, setProductName] = useState<string>('IndiBiz Smart Logistics Suite');
  const [targetSegment, setTargetSegment] = useState<string>('UMKM & Logistik B2B Regional');
  const [problemStatement, setProblemStatement] = useState<string>('Inefisiensi biaya tracking armada dan rekonsiliasi pembayaran merchant multi-lokasi');
  const [generatedProposal, setGeneratedProposal] = useState<any>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      agent: 'tania',
      text: `Halo! Saya **TANIA**, asisten Workforce & Delivery Intelligence untuk Chapter Digital Product and Solution (DPS) Telkom Indonesia.
Saya dapat membantu Anda mengevaluasi ketersediaan kapasitas talent, matching skill matrix untuk demand baru, rekomendasi mitigasi risiko proyek, dan ringkasan eksekutif mingguan.`,
      timestamp: '09:00',
      sourceNote: 'TANIA Operating Layer v1.0',
    },
    {
      id: 'm-2',
      sender: 'ai',
      agent: 'jarvis',
      text: `Selamat datang! Saya **JARVIS**, AI Agent khusus Product & Solution Architecture Divisi Digital Business.
Saya siap membantu Anda menyusun draf Proposal Solusi, estimasi Bill of Quantities (BoQ) SDM, analisis pasar B2B enterprise, dan review PRD standar Telkom.`,
      timestamp: '09:01',
      sourceNote: 'JARVIS Enterprise Agent v1.0',
    },
  ]);

  const activeMessages = messages.filter(m => m.agent === activeAgent || m.sender === 'user');

  const quickPrompts = {
    tania: [
      'Bagaimana kelayakan kapasitas Solution Architect untuk inisiatif baru di November 2026?',
      'Rekomendasikan talent terbaik untuk demand Lead Product Manager B2B Logistics.',
      'Analisis mitigasi untuk proyek Cloud Billing SAP ERP yang mengalami delay sandbox.',
      'Buat draf evaluasi pemenuhan SLA alokasi Chapter DPS bulan ini.',
    ],
    jarvis: [
      'Susun kerangka PRD untuk platform MyTelkomsel Enterprise Hub v4.',
      'Hitung estimasi BoQ SDM untuk inisiatif Smart POS 4 bulan dengan 1 Lead PM & 1 SA.',
      'Apa value proposition kunci platform Antares IoT untuk industri utilitas air & listrik?',
      'Bagaimana arsitektur event-driven messaging standar di lingkungan Telkom?',
    ],
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      agent: activeAgent,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agent: activeAgent,
          message: textToSend,
          context: {
            totalTalents: talents.length,
            activeProjects: projects.map(p => ({ name: p.name, health: p.health })),
            demandsCount: demands.length,
          },
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        agent: activeAgent,
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceNote: `${data.agentName} · ${data.source || 'Operational Engine'}`,
      };

      setMessages(prev => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        agent: activeAgent,
        text: activeAgent === 'jarvis'
          ? `Berdasarkan guideline PRD DPS-PRD-001 Telkom Indonesia, inisiatif ini disarankan untuk mengikuti fase Discovery selama 2-3 minggu sebelum architecture freeze.`
          : `Kapasitas talent rata-rata pada periode Oktober 2026 berada pada utilisasi 84.5%. Alokasi baru dapat diproses melalui modul Demand Assignment.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceNote: 'Rules Engine (Local Fallback)',
      };
      setMessages(prev => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateBoq = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/jarvis-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName,
          targetSegment,
          problemStatement,
          scopeItems: ['Discovery', 'Architecture & Microservice Design', 'Piloting UAT', 'Go-to-market Handover'],
        }),
      });
      const data = await res.json();
      setGeneratedProposal(data.proposal);
    } catch (err) {
      console.error('BoQ error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Agent Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              AI-POWERED CHAPTER MANAGEMENT (PRD SECTION 2 & 7.11)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              AI Workspace: TANIA & JARVIS Copilots
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Dual-Agent Architecture: <strong>TANIA</strong> untuk workforce & kapasitas, <strong>JARVIS</strong> untuk proposal produk & solusi.
            </p>
          </div>

          {/* Agent Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg text-xs font-semibold">
            <button
              onClick={() => { setActiveAgent('tania'); setShowBoqBuilder(false); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all ${
                activeAgent === 'tania'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>TANIA (Workforce & Delivery)</span>
            </button>

            <button
              onClick={() => { setActiveAgent('jarvis'); }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md transition-all ${
                activeAgent === 'jarvis'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>JARVIS (Product & Solution)</span>
            </button>
          </div>
        </div>

        {/* Action Toggle if in JARVIS: Proposal Builder */}
        {activeAgent === 'jarvis' && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <div className="text-slate-600">
              Gunakan mode dialog interaktif atau jalankan <strong>Generator Proposal & BoQ Otomatis</strong>.
            </div>
            <button
              onClick={() => setShowBoqBuilder(!showBoqBuilder)}
              className="text-xs font-semibold text-red-600 hover:text-red-700 font-medium"
            >
              {showBoqBuilder ? 'Tutup Form BoQ Generator' : '+ Buka Form BoQ & Proposal Generator'}
            </button>
          </div>
        )}
      </div>

      {/* JARVIS BoQ & Solution Proposal Generator Form (When open) */}
      {activeAgent === 'jarvis' && showBoqBuilder && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Generator Proposal Solusi Digital & Bill of Quantities (BoQ)
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Otomatis menyusun struktur proposal, estimasi kebutuhan SDM DPS, dan jadwal deliverable.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-500 font-medium mb-1">Nama Inisiatif / Produk:</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">Target Segmen Pelanggan:</label>
              <input
                type="text"
                value={targetSegment}
                onChange={(e) => setTargetSegment(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
            <div>
              <label className="block text-slate-500 font-medium mb-1">Masalah Bisnis Kunci:</label>
              <input
                type="text"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleGenerateBoq}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors"
            >
              {isLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>{isLoading ? 'Menyusun Proposal...' : 'Generate Proposal & BoQ'}</span>
            </button>
          </div>

          {/* Generated Proposal Output */}
          {generatedProposal && (
            <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-900 text-sm">{generatedProposal.title}</h3>
                <span className="font-mono font-bold text-red-600 text-sm">
                  Est. Budget: {generatedProposal.totalEstimatedBudget}
                </span>
              </div>

              <div>
                <strong className="text-slate-700">Ringkasan Eksekutif:</strong>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  {generatedProposal.executiveSummary}
                </p>
              </div>

              <div>
                <strong className="text-slate-700">Value Propositions:</strong>
                <ul className="mt-1 list-disc list-inside text-slate-600 space-y-0.5">
                  {generatedProposal.valuePropositions?.map((vp: string, idx: number) => (
                    <li key={idx}>{vp}</li>
                  ))}
                </ul>
              </div>

              {/* BoQ Table */}
              <div>
                <strong className="text-slate-700">Bill of Quantities (BoQ) SDM:</strong>
                <table className="w-full mt-2 text-left text-xs bg-white border border-slate-200 rounded">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 text-[10px]">
                      <th className="p-2">RESOURCE / ROLE</th>
                      <th className="p-2 text-center">EFFORT (BULAN)</th>
                      <th className="p-2 text-center">ALOKASI</th>
                      <th className="p-2 text-right">EST. COST</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {generatedProposal.billOfQuantities?.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="p-2 font-sans font-medium text-slate-800">{item.item}</td>
                        <td className="p-2 text-center">{item.effortMonths} Bln</td>
                        <td className="p-2 text-center">{item.allocation}</td>
                        <td className="p-2 text-right font-bold text-slate-900">{item.estCost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Chat Console */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col h-[520px]">
        
        {/* Agent Info Strip */}
        <div className="pb-3 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${activeAgent === 'jarvis' ? 'bg-red-600' : 'bg-blue-600'}`}></div>
            <span className="font-bold text-slate-900">
              {activeAgent === 'jarvis' ? 'JARVIS · Product & Solution Assistant' : 'TANIA · Workforce & Capacity Intelligence'}
            </span>
          </div>

          <span className="text-[11px] text-slate-400 font-mono">
            Model: Gemini 3.8 Flash · Human in the loop
          </span>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
          {activeMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'ai' && (
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white font-bold text-xs ${
                  msg.agent === 'jarvis' ? 'bg-red-600' : 'bg-blue-600'
                }`}>
                  {msg.agent === 'jarvis' ? 'J' : 'T'}
                </div>
              )}

              <div className={`max-w-xl rounded-xl p-3.5 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 border border-slate-200 text-slate-800'
              }`}>
                <div className="whitespace-pre-line text-xs">
                  {msg.text}
                </div>

                <div className={`mt-2 flex items-center justify-between text-[10px] font-mono ${
                  msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'
                }`}>
                  <span>{msg.sourceNote || 'User'}</span>
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  Me
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-xs text-slate-400 py-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-600" />
              <span>{activeAgent === 'jarvis' ? 'JARVIS' : 'TANIA'} sedang menganalisis data operasional...</span>
            </div>
          )}
        </div>

        {/* Quick Prompt Chips */}
        <div className="pt-2 pb-2 border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-slate-400 shrink-0 font-medium">Prompt Cepat:</span>
          {quickPrompts[activeAgent].map((promptText, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(promptText)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md whitespace-nowrap transition-colors"
            >
              {promptText}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Tanya ${activeAgent === 'jarvis' ? 'JARVIS tentang solusi/PRD...' : 'TANIA tentang kapasitas talent/delivery...'}`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:border-red-600"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !inputMessage.trim()}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            <span>Kirim</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
