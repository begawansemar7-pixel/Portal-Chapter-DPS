import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // Initialize Gemini client if API key is provided
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }

  // Health check endpoint
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Portal Chapter DPS Backend',
      version: '1.0.0',
      aiAvailable: Boolean(apiKey),
    });
  });

  // AI Executive Summary
  app.post('/api/ai/executive-summary', async (req: Request, res: Response) => {
    const { period, kpis, criticalRisks, pendingDecisions } = req.body;

    const fallbackSummary = `### Ringkasan Eksekutif Chapter DPS - Periode ${period || 'Oktober 2026'}
1. **Talent Fulfillment & Capacity:** Tingkat pemenuhan talent mencapai **95.8%**, melampaui target baseline SO-02 (≥95%). Utilisasi kapasitas berada pada posisi optimal **84.5%** tanpa over-allocation kritis.
2. **Delivery & Milestones:** 92% proyek aktif berada pada jalur aman (On Track). Terdapat 2 proyek dalam perhatian khusus: *Enterprise Cloud Portal (API Gateway latency)* dan *SME SuperApp (Migration validation)*.
3. **Pending Decisions:** Memerlukan persetujuan Chapter Leader untuk 3 alokasi talent squad lintas Tribe (Tribe Enterprise ke Core Platform) dan 1 penyesuaian milestone Q4.
4. **Rekomendasi Manajemen:** Prioritaskan review SLA alokasi Solution Architect dan optimalkan sertifikasi Cloud Native guna menutup skill gap arsitektur Q1 2027.`;

    if (!ai) {
      return res.json({ summary: fallbackSummary, source: 'TANIA Rules Engine (Offline Fallback)' });
    }

    try {
      const prompt = `Anda adalah TANIA Executive Advisor untuk Chapter Digital Product and Solution (DPS), Divisi Digital Business Telkom Indonesia.
Buat ringkasan eksekutif formal, berbasis data, dan terstruktur untuk Chapter Leader dan Management DDP.
Data Periode: ${period || 'Oktober 2026'}
KPIs: ${JSON.stringify(kpis || {})}
Critical Risks: ${JSON.stringify(criticalRisks || [])}
Pending Decisions: ${JSON.stringify(pendingDecisions || [])}

Format tanggapan dalam Bahasa Indonesia profesional:
- Ringkasan Situasi Kunci (Talent, Delivery, Kapasitas)
- Sorotan Risiko Kritis & Implikasi Bisnis
- Keputusan Manajemen yang Mendesak
- Rekomendasi Tindakan Strategis (Evidence-based)`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      res.json({
        summary: response.text || fallbackSummary,
        source: 'TANIA AI Executive Engine (Gemini 3.8 Flash)',
      });
    } catch (err: any) {
      console.warn('Gemini API call failed, using fallback:', err.message);
      res.json({ summary: fallbackSummary, source: 'TANIA Rules Engine (Fallback)' });
    }
  });

  // TANIA AI Talent Matching & Capacity Feasibility
  app.post('/api/ai/talent-match', async (req: Request, res: Response) => {
    const { demandRole, requiredSkills, tribe, allocationPct, duration } = req.body;

    const fallbackCandidates = [
      {
        id: 'TAL-002',
        name: 'Budi Raharjo',
        role: demandRole || 'Digital Product Manager',
        grade: 'Band III (Lead)',
        tribe: 'Tribe Enterprise Solutions',
        matchScore: 94,
        skillFit: ['Product Strategy', 'Agile Delivery', 'B2B Enterprise', 'Stakeholder Management'],
        availableCapacity: 60,
        recommendationReason: 'Memiliki pengalaman memimpin 4 produk enterprise serupa dengan sertifikasi PSPO II dan kapasitas 60% siap dialokasikan.',
      },
      {
        id: 'TAL-007',
        name: 'Dewi Lestari',
        role: demandRole || 'Digital Product Manager',
        grade: 'Band IV (Senior)',
        tribe: 'Tribe SME Platform',
        matchScore: 88,
        skillFit: ['Roadmapping', 'API Product', 'Data Analytics'],
        availableCapacity: 80,
        recommendationReason: 'Kapasitas sangat longgar (80%), rekam jejak delivery on-time 96% dalam sprint Q3.',
      },
    ];

    if (!ai) {
      return res.json({ candidates: fallbackCandidates, analysis: 'Pencocokan didasarkan pada matriks keahlian TANIA dan kapasitas tersisa.', source: 'TANIA Workforce Engine (Baseline)' });
    }

    try {
      const prompt = `Anda adalah TANIA Workforce Intelligence Engine untuk Chapter Digital Product and Solution Telkom Indonesia.
Bantu rekomendasikan kecocokan talent dan analisis kelayakan kapasitas untuk demand berikut:
Role yang diminta: ${demandRole}
Keahlian yang dibutuhkan: ${JSON.stringify(requiredSkills)}
Tribe Penugasan: ${tribe}
Alokasi Kapasitas: ${allocationPct}%
Durasi: ${duration}

Kembalikan evaluasi kelayakan talent dalam JSON dengan struktur:
{
  "feasibilityScore": number (0-100),
  "feasibilityStatus": "Feasible" | "Conditional" | "Constraint",
  "analysis": "Penjelasan singkat kapasitas dan ketersediaan",
  "recommendations": [
    {
      "name": "Nama Kandidat Rekomendasi",
      "grade": "Grade / Band",
      "matchScore": number,
      "skillFit": ["Skill1", "Skill2"],
      "availableCapacity": number,
      "recommendationReason": "Alasan matching"
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({
        feasibilityScore: parsed.feasibilityScore || 92,
        feasibilityStatus: parsed.feasibilityStatus || 'Feasible',
        analysis: parsed.analysis || 'Kapasitas mencukupi dengan pemenuhan SLA alokasi ≤ 3 hari kerja.',
        candidates: parsed.recommendations || fallbackCandidates,
        source: 'TANIA AI Workforce Matching (Gemini 3.8 Flash)',
      });
    } catch (err: any) {
      res.json({ candidates: fallbackCandidates, analysis: 'Kapasitas memenuhi ketentuan alokasi.', source: 'TANIA Workforce Engine (Fallback)' });
    }
  });

  // JARVIS Digital Product Proposal & BoQ Assistant
  app.post('/api/ai/jarvis-proposal', async (req: Request, res: Response) => {
    const { productName, targetSegment, problemStatement, scopeItems } = req.body;

    const fallbackProposal = {
      title: `Executive Solution Brief: ${productName || 'Digital Enterprise Platform'}`,
      executiveSummary: `Solusi terintegrasi untuk ${targetSegment || 'Enterprise B2B'} guna memecahkan ${problemStatement || 'inefisiensi integrasi operasional'}. Mengadopsi arsitektur modular microservices yang kompatibel dengan ekosistem digital Telkom Indonesia.`,
      valuePropositions: [
        'Single Source of Truth untuk operasional digital multi-channel',
        'Efisiensi biaya delivery hingga 35% melalui reusable digital assets Chapter DPS',
        'Compliance penuh terhadap regulasi perlindungan data pribadi dan standar enterprise Telkom',
      ],
      billOfQuantities: [
        { item: 'Lead Product Manager (Band III)', effortMonths: 4, allocation: '100%', estCost: 'Rp 140.000.000' },
        { item: 'Solution Architect (Band III)', effortMonths: 3, allocation: '70%', estCost: 'Rp 105.000.000' },
        { item: 'Technical Product Owner (Band IV)', effortMonths: 4, allocation: '100%', estCost: 'Rp 100.000.000' },
        { item: 'Business Analyst / UI-UX Spec', effortMonths: 3, allocation: '100%', estCost: 'Rp 75.000.000' },
        { item: 'Cloud & Sandbox Integration Ops', effortMonths: 4, allocation: '50%', estCost: 'Rp 45.000.000' },
      ],
      totalEstimatedBudget: 'Rp 465.000.000',
      keyMilestones: [
        { phase: 'Discovery & Feasibility Gate', targetWeek: 'W1 - W3' },
        { phase: 'Alpha Prototype & Architecture Freeze', targetWeek: 'W4 - W7' },
        { phase: 'Beta UAT & Enterprise Pilot', targetWeek: 'W8 - W12' },
        { phase: 'Commercial Handover & GA', targetWeek: 'W13 - W16' },
      ],
    };

    if (!ai) {
      return res.json({ proposal: fallbackProposal, source: 'JARVIS Template Engine (Standard Baseline)' });
    }

    try {
      const prompt = `Anda adalah JARVIS AI Agent untuk Chapter Digital Product and Solution (DPS) Telkom Indonesia.
Bantu buatkan draf Proposal Solusi Digital, Bill of Quantities (BoQ) SDM, dan Roadmap Deliverable untuk:
Produk: ${productName}
Target Segmen: ${targetSegment}
Masalah Bisnis: ${problemStatement}
Scope Item: ${JSON.stringify(scopeItems || [])}

Kembalikan JSON valid dengan format:
{
  "title": "Judul Proposal Lengkap",
  "executiveSummary": "Ringkasan Eksekutif 2-3 paragraf",
  "valuePropositions": ["Value 1", "Value 2", "Value 3"],
  "billOfQuantities": [
    { "item": "Role / Resource", "effortMonths": number, "allocation": "100%", "estCost": "Format Rupiah" }
  ],
  "totalEstimatedBudget": "Total Rupiah",
  "keyMilestones": [
    { "phase": "Nama Tahap", "targetWeek": "W1-W4" }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({
        proposal: parsed.title ? parsed : fallbackProposal,
        source: 'JARVIS AI Solution Agent (Gemini 3.8 Flash)',
      });
    } catch (err: any) {
      res.json({ proposal: fallbackProposal, source: 'JARVIS Template Engine (Fallback)' });
    }
  });

  // General Interactive Chat for TANIA & JARVIS
  app.post('/api/ai/chat', async (req: Request, res: Response) => {
    const { agent, message, context } = req.body;

    const agentName = agent === 'jarvis' ? 'JARVIS (Product & Solution AI)' : 'TANIA (Workforce & Delivery AI)';

    let fallbackReply = '';
    if (agent === 'jarvis') {
      fallbackReply = `[JARVIS AI]: Mengenai pertanyaan Anda tentang "${message}", sesuai best practice Chapter DPS Telkom Indonesia, kami merekomendasikan pendekatan discovery terstruktur: memvalidasi business case dengan target revenue, menyusun PRD mengacu pada standard template DPS-PRD-001, serta menyelaraskan arsitektur bersama Solution Architect Tribe terkait.`;
    } else {
      fallbackReply = `[TANIA Workforce]: Berdasarkan data operasional Chapter DPS saat ini, kapasitas talent rata-rata berada pada utilisasi 84.5%. Alokasi dapat diproses melalui modul Demand Assignment dengan SLA maksimal 2 hari kerja untuk validasi dan 3 hari kerja untuk matching.`;
    }

    if (!ai) {
      return res.json({ reply: fallbackReply, agentName, source: 'Rules Engine' });
    }

    try {
      const systemInstruction = agent === 'jarvis'
        ? `Anda adalah JARVIS, asisten AI khusus Product Management, Solution Architecture, Market Intelligence, dan Proposal BoQ untuk Chapter Digital Product & Solution (DPS), Divisi Digital Business Telkom Indonesia. Berikan jawaban profesional, lugas, mengacu pada standar PRD dan governance enterprise Telkom.`
        : `Anda adalah TANIA, asisten AI khusus Workforce Management, Capacity Planning, Talent Matching, Timesheet, dan Delivery Risk Intelligence untuk Chapter Digital Product & Solution (DPS), Divisi Digital Business Telkom Indonesia. Berikan saran berbasis data kapasitas, SLA alokasi, dan mitigasi delivery.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Konteks sistem: ${JSON.stringify(context || {})}\n\nPertanyaan pengguna: ${message}`,
        config: {
          systemInstruction,
        },
      });

      res.json({
        reply: response.text || fallbackReply,
        agentName,
        source: 'Gemini 3.8 Flash',
      });
    } catch (err: any) {
      res.json({ reply: fallbackReply, agentName, source: 'Rules Engine (Fallback)' });
    }
  });

  // Multi-Turn Chatbot Endpoint for Floating Chat Bubble (Gemini 3.8 Flash)
  app.post('/api/ai/chatbot/message', async (req: Request, res: Response) => {
    const { message, history } = req.body;

    const systemInstruction = `Anda adalah TANIA-JARVIS Unified Virtual Assistant untuk Chapter Digital Product and Solution (DPS), Divisi Digital Business Telkom Indonesia.
Tugas Anda adalah mendampingi para Chapter Leader, Capability Lead, Delivery Lead, Product Manager, Solution Architect, dan Talent Squad secara cerdas dan responsif.
Konteks Utama Chapter DPS:
1. Visi: "One Chapter. One Platform. One Source of Truth. AI-Powered Decisions."
2. Standar Dokumen: DPS-PRD-001 v1.0, PRD standard template, dan BoQ SDM berdasarkan Grade Band III sampai Band VI.
3. Alur Demand Intake: Demand Submission → Validasi Kapasitas (SLA ≤ 2 hari) → TANIA Matching (SLA ≤ 3 hari) → Approval (SLA ≤ 2 hari) → Aktivasi (SLA ≤ 1 hari).
4. 4 Tribe Penugasan: Tribe Enterprise Digital (Enterprise Cloud Portal), Tribe SME Platform (IndiBiz Merchant POS), Tribe Core Digital Platform (Antares IoT Gateway, Cloud Billing Engine), Tribe Consumer Solutions (MyTelkomsel Enterprise Hub).
5. 4 Pilar Kompetensi: KNOW (Domain & Cloud Tech), THINK (Strategi & Analisis Data), COMMUNICATE (Artikulasi PRD jernih), INFLUENCE (Kepemimpinan Squad).
6. Kapasitas & Timesheet: Standar 40 jam kerja per minggu, sinkronisasi aplikasi TeMan, utilisasi rata-rata sehat 84.5%.

Berikan respon dalam Bahasa Indonesia yang ramah, profesional, ringkas, terstruktur (gunakan markdown bold/bullet jika membantu pembacaan), dan berbasis data operasional Telkom Indonesia.`;

    const generateFallback = (q: string): string => {
      const lower = (q || '').toLowerCase();
      if (lower.includes('sla') || lower.includes('demand') || lower.includes('waktu')) {
        return `Target SLA alokasi talent Chapter DPS sesuai PRD DPS-PRD-001 adalah:\n- **Validasi Kapasitas:** ≤ 2 hari kerja\n- **Matching Kandidat:** ≤ 3 hari kerja\n- **Persetujuan (Decision):** ≤ 2 hari kerja\n- **Aktivasi Squad:** ≤ 1 hari kerja\nTotal siklus pemenuhan ditargetkan rampung dalam maksimal 8 hari kerja.`;
      }
      if (lower.includes('kompetensi') || lower.includes('pilar') || lower.includes('know')) {
        return `Framework Kompetensi Chapter DPS terdiri atas **4 Pilar Utama (Evidence-Based, Skala 1.0 - 5.0)**:\n1. **KNOW:** Kedalaman domain teknologi cloud, microservices, dan standar TOGAF.\n2. **THINK:** Analisa data telemetri produk, hipotesis bisnis, dan arsitektur modular.\n3. **COMMUNICATE:** Artikulasi PRD jernih tanpa ambigu dan kolaborasi lintas tim.\n4. **INFLUENCE:** Kepemimpinan squad dan mentoring kapabilitas talenta.`;
      }
      if (lower.includes('indibiz') || lower.includes('pos') || lower.includes('umkm')) {
        return `**IndiBiz Merchant POS Suite** saat ini telah diadopsi oleh **96.500+ merchant** di 34 provinsi. Produk ini dikawal oleh Squad SME Commerce dengan fitur unggulan settlement pembayaran QRIS instan, manajemen inventori offline-first, dan integrasi akuntansi sederhana dengan NPS 74.`;
      }
      if (lower.includes('cloud') || lower.includes('portal') || lower.includes('b2b')) {
        return `**Enterprise Cloud Portal v2.5** melayani lebih dari **14.200 akun korporat B2B** tier-1 Telkom dengan kapabilitas self-service multi-cloud interconnect, automated bandwidth throttling, dan response latency API sub-200ms terintegrasi SAP ERP.`;
      }
      return `Halo! Saya TANIA-JARVIS Virtual Assistant Chapter DPS Telkom Indonesia. Saya dapat membantu Anda seputar profil Chapter DPS, status alokasi talent, target SLA demand, 4 pilar kompetensi, portofolio produk digital (IndiBiz, Antares, Cloud Portal), atau tata kelola delivery project. Ada yang bisa saya bantu?`;
    };

    if (!ai) {
      return res.json({
        reply: generateFallback(message),
        source: 'TANIA Knowledge Base (Offline Engine)',
      });
    }

    try {
      const contentsPayload: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        for (const item of history) {
          contentsPayload.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }

      contentsPayload.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contentsPayload,
        config: {
          systemInstruction,
        },
      });

      res.json({
        reply: response.text || generateFallback(message),
        source: 'Gemini 3.8 Flash (TANIA-JARVIS Virtual Assistant)',
      });
    } catch (err: any) {
      console.warn('Gemini chat error, fallback to knowledge base:', err.message);
      res.json({
        reply: generateFallback(message),
        source: 'TANIA Knowledge Base (Resilient Fallback)',
      });
    }
  });

  // Setup Vite dev server middlewares
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portal Chapter DPS server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
