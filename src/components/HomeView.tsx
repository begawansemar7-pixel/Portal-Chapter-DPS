import React, { useState } from 'react';
import { NavSection, Talent } from '../types';
import { CarouselSection } from './CarouselSection';
import { 
  Building2, 
  Sparkles, 
  Users, 
  Layers, 
  Kanban, 
  Award, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Compass, 
  Network, 
  Clock, 
  ShieldCheck, 
  FileText,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (section: NavSection) => void;
  onOpenNewDemand: () => void;
  talents: Talent[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenNewDemand,
  talents,
}) => {
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');
  const [expandedNewsId, setExpandedNewsId] = useState<string | null>(null);

  const activitiesNews = [
    {
      id: 'news-1',
      date: '26 Oktober 2026',
      category: 'Townhall & Strategy',
      title: 'Chapter DPS Townhall Q4 2026: Akselerasi Adopsi AI Copilot TANIA & JARVIS',
      summary: 'Chapter Leader DPS memaparkan pencapaian kuartal ketiga dengan tingkat pemenuhan talent 95.8% dan mengumumkan perluasan operasional copilot AI untuk efisiensi penyusunan BoQ dan pencocokan keahlian lintas Tribe.',
      content: 'Dalam Townhall yang dihadiri oleh seluruh Digital Product Manager, Solution Architect, dan Tech PO se-Divisi Digital Business, ditegaskan visi "One Chapter. One Platform. One Source of Truth." Sistem TANIA dan JARVIS diperkenalkan sebagai layer kecerdasan terpadu guna mempercepat proses demand intake dari rata-rata 5 hari kerja menjadi di bawah 48 jam.',
      author: 'PMO Chapter DPS',
      readTime: '3 min read',
    },
    {
      id: 'news-2',
      date: '22 Oktober 2026',
      category: 'Product Release',
      title: 'Go-Live Enterprise Cloud Portal v2.5: Integrasi Multi-Cloud Interconnect Terpadu',
      summary: 'Tribe Enterprise Digital bersama personil Chapter DPS sukses menyelesaikan rilis train v2.5, memungkinkan 14.200 akun korporat Telkom mengelola interkoneksi cloud secara mandiri.',
      content: 'Fitur baru mencakup real-time bandwidth throttling, billing usage forecasting berbasis machine learning, dan integrasi dengan Telkom API Gateway Core dengan response latency sub-200ms.',
      author: 'Dimas Wicaksono (Lead PM)',
      readTime: '4 min read',
    },
    {
      id: 'news-3',
      date: '18 Oktober 2026',
      category: 'Achievement',
      title: 'IndiBiz Merchant POS Capai Rekor 96.500 Merchant di 34 Provinsi',
      summary: 'Pertumbuhan eksponensial produk UMKM binaan Telkom didukung oleh delivery stabil Squad SME Commerce dengan rata-rata sprint velocity 42 story points dan zero-critical bugs.',
      content: 'Akselerasi settlement pembayaran QRIS dan sinkronisasi inventori real-time menjadi diferensiator utama yang mendorong kenaikan NPS produk hingga angka 74 pada periode evaluasi Oktober 2026.',
      author: 'Dewi Lestari (Product Manager)',
      readTime: '3 min read',
    },
    {
      id: 'news-4',
      date: '14 Oktober 2026',
      category: 'Knowledge Sharing',
      title: 'Tech Session #12: Arsitektur Event-Driven Berkinerja Tinggi dengan Apache Kafka',
      summary: 'Budi Raharjo (Solution Architect Lead) membagikan blueprint standar message streaming terdistribusi untuk pengolahan 50.000 events/second pada Antares IoT Gateway.',
      content: 'Sesi ini merangkum pedoman tata kelola schema registry, failover cluster, dan best practices decoupling services yang wajib diacu oleh seluruh architect di lingkungan Divisi Digital Business.',
      author: 'Guild Architecture DPS',
      readTime: '5 min read',
    },
    {
      id: 'news-5',
      date: '08 Oktober 2026',
      category: 'Capability & Culture',
      title: 'Program Peningkatan Kompetensi: 8 Talent DPS Raih Sertifikasi Global Cloud & Agile',
      summary: 'Sebagai bukti komitmen terhadap pilar KNOW dan THINK, 8 anggota squad berhasil meraih sertifikasi AWS Solutions Architect, Google Cloud Professional, dan PSPO II.',
      content: 'Program akselerasi sertifikasi ini merupakan bagian dari target strategis SO-04 guna mempertahankan standar kapabilitas bertaraf internasional bagi seluruh talenta digital Telkom Indonesia.',
      author: 'Capability Lead DPS',
      readTime: '2 min read',
    },
  ];

  const filteredNews = selectedNewsCategory === 'All'
    ? activitiesNews
    : activitiesNews.filter(n => n.category === selectedNewsCategory);

  const leadershipRoster = [
    {
      role: 'Chapter Leader DPS',
      name: 'Chapter Leader DPS',
      unit: 'Divisi Digital Business · Telkom Indonesia',
      mandate: 'Memimpin visi strategis, tata kelola alokasi kapasitas talenta, standar kualitas delivery produk, dan adopsi AI operasional.',
      avatarBg: 'bg-red-600',
      initials: 'CL',
    },
    {
      role: 'Capability Lead (Product & Solution)',
      name: 'Capability Lead DPS',
      unit: 'Professional Standards & Guild',
      mandate: 'Mengawal standar kompetensi (KNOW, THINK, COMMUNICATE, INFLUENCE), kurikulum pelatihan, serta sertifikasi profesional personil.',
      avatarBg: 'bg-blue-600',
      initials: 'CP',
    },
    {
      role: 'Delivery Lead (Cross-Tribe Governance)',
      name: 'Delivery Lead DPS',
      unit: 'Agile & Delivery Management',
      mandate: 'Memantau kepatuhan SLA pemenuhan talent, resolusi blocker lintas Tribe, dan sinkronisasi project register bersama PMO.',
      avatarBg: 'bg-slate-800',
      initials: 'DL',
    },
  ];

  return (
    <div className="space-y-8">
      
      {/* Hero Section: Chapter DPS Profile & Corporate Mission */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background gradient accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-red-600 tracking-wider">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>TELKOM INDONESIA · DIVISI DIGITAL BUSINESS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 mt-2 leading-tight">
            Chapter Digital Product & Solution (DPS)
          </h1>

          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="font-mono text-red-700 font-bold">Visi:</span>
            <span>"One Chapter. One Platform. One Source of Truth. AI-Powered Decisions."</span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Chapter Digital Product and Solution (DPS) adalah pusat keunggulan (*center of excellence*) talenta digital di lingkungan Divisi Digital Business Telkom Indonesia. Kami menaungi peran strategis meliputi <strong>Digital Product Manager</strong>, <strong>Solution Architect</strong>, <strong>Technical Product Owner</strong>, <strong>Scrum Master</strong>, <strong>Lead Business Analyst</strong>, dan <strong>UI/UX Specialist</strong> yang diterjunkan ke squad-squad produk di seluruh Tribe bisnis Telkom.
          </p>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Portal ini bertindak sebagai <strong>Digital Operating Layer</strong> yang mengintegrasikan direktori talent terverifikasi, alur penugasan demand berbasis kapasitas, register proyek terpadu, evaluasi kompetensi berbasis bukti (*evidence-based*), serta kecerdasan buatan operasional (<strong>TANIA</strong> & <strong>JARVIS</strong>).
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('executive')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-xl shadow-xs transition-colors"
            >
              <span>Buka Executive Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigate('talent')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-slate-600" />
              <span>Direktori Talent ({talents.length} Personil)</span>
            </button>

            <button
              onClick={() => onNavigate('ai-workspace')}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-red-600" />
              <span>AI Workspace (TANIA & JARVIS)</span>
            </button>
          </div>
        </div>

        {/* Strategic Operating Metrics Strip (Zero-Pill, Tabular Numbers) */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">TALENT FULFILLMENT</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">95.8%</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Target SO-02 ≥95%</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-medium">RATA-RATA UTILISASI</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">84.5%</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Rentang Sehat (75-90%)</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-medium">DELIVERY VISIBILITY</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">94.0%</div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">Target SO-03 ≥95%</div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-medium">EVIDENCE ASSESSMENT</div>
            <div className="text-xl font-bold font-mono text-slate-900 mt-0.5">92.5%</div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Target SO-04 ≥90%</div>
          </div>
        </div>
      </div>

      {/* Featured Strategic Carousel Section */}
      <CarouselSection onNavigate={onNavigate} />

      {/* The 3 Core Pillars of Chapter DPS (Architecture Positioning PRD Section 20) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Tiga Komponen Arsitektur Portal Chapter DPS
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ekosistem terintegrasi untuk mengoptimalkan efektivitas talent dan kualitas produk digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Pillar 1 */}
          <div 
            onClick={() => onNavigate('executive')}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-red-600 transition-colors">
                Portal Chapter DPS
              </h3>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Front Door & Digital Operating Layer
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Antarmuka pengguna terpadu, Executive Dashboard, hierarki organisasi, register proyek, kontrol tata kelola penugasan, dan pelaporan manajemen lintas Tribe.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Buka Operating Layer</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => onNavigate('workload')}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-blue-600 transition-colors">
                TANIA
              </h3>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Talent & Workforce Intelligence
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Domain kecerdasan tenaga kerja: mengelola ketersediaan kapasitas 40h/minggu, timesheet TeMan, pencocokan skill matrix, kelayakan alokasi, dan forecasting biaya SDM.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Kelola Kapasitas & Workload</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => onNavigate('ai-workspace')}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-3 group-hover:text-amber-700 transition-colors">
                JARVIS
              </h3>
              <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                Product & Solution AI Agents
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                AI Agent khusus untuk pembuatan draf PRD, perancangan arsitektur microservices, estimasi Bill of Quantities (BoQ), business case inisiatif, dan pencarian knowledge semantik.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Konsultasi AI Agents</span>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-all" />
            </div>
          </div>

        </div>
      </div>

      {/* Activities & News Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
              <Calendar className="w-3.5 h-3.5" />
              <span>AKTIVITAS & KABAR TERKINI CHAPTER DPS</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              News, Knowledge Sharing & Rilis Inisiatif
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto text-xs font-medium">
            {(['All', 'Townhall & Strategy', 'Product Release', 'Achievement', 'Knowledge Sharing', 'Capability & Culture'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedNewsCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedNewsCategory === cat
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? 'Semua Berita' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNews.map((item) => {
            const isExpanded = expandedNewsId === item.id;
            return (
              <div
                key={item.id}
                className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors flex flex-col justify-between bg-slate-50/40"
              >
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
                    <span className="font-semibold text-slate-800">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Expanded Content if toggled */}
                  {isExpanded && (
                    <div className="mt-3 p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 leading-relaxed space-y-2">
                      <p>{item.content}</p>
                      <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                        Kontributor: {item.author}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">
                    PIC: {item.author}
                  </span>
                  <button
                    onClick={() => setExpandedNewsId(isExpanded ? null : item.id)}
                    className="font-semibold text-red-600 hover:text-red-700 transition-colors"
                  >
                    {isExpanded ? 'Sembunyikan' : 'Baca Selengkapnya →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Struktur Organisasi & 4 Tribe Penugasan */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
              <Network className="w-3.5 h-3.5 text-red-600" />
              <span>TATA KELOLA KEPEMIMPINAN & SQUAD MATRIX</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              Struktur Organisasi Chapter DPS
            </h2>
          </div>

          <button
            onClick={() => onNavigate('organization')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>Buka Master Organisasi Detail</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leadershipRoster.map((leader) => (
            <div key={leader.role} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${leader.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-xs`}>
                    {leader.initials}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{leader.role}</h3>
                    <div className="text-[11px] text-slate-500 font-mono">{leader.unit}</div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {leader.mandate}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-200/60 text-[11px] text-slate-500 flex items-center justify-between font-mono">
                <span>Status: Aktif</span>
                <span>Role Governance</span>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Tribes Matrix Overview */}
        <div className="pt-2">
          <h3 className="text-xs font-bold text-slate-400 tracking-wider mb-3">
            EMPAT TRIBE UTAMA PENUGASAN SQUAD CHAPTER DPS
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="font-bold text-slate-900">Tribe Enterprise Digital</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Konektivitas B2B, Dedicated Cloud, Enterprise Cloud Portal v2.5.
              </div>
              <div className="text-[10px] text-red-600 font-mono font-semibold mt-2">
                2 Squads · 3 Talent DPS
              </div>
            </div>

            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="font-bold text-slate-900">Tribe SME Platform</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Ekosistem UMKM IndiBiz, Merchant POS, QRIS Instant Settlement.
              </div>
              <div className="text-[10px] text-red-600 font-mono font-semibold mt-2">
                1 Squad · 2 Talent DPS
              </div>
            </div>

            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="font-bold text-slate-900">Tribe Core Digital Platform</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Antares IoT Data Gateway, Cloud Billing Engine, API Gateway Core.
              </div>
              <div className="text-[10px] text-red-600 font-mono font-semibold mt-2">
                2 Squads · 3 Talent DPS
              </div>
            </div>

            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="font-bold text-slate-900">Tribe Consumer Solutions</div>
              <div className="text-[11px] text-slate-500 mt-1">
                MyTelkomsel Enterprise Hub, Self-Care Portal, B2B Account switcher.
              </div>
              <div className="text-[10px] text-red-600 font-mono font-semibold mt-2">
                1 Squad · 2 Talent DPS
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nilai Budaya Kerja AKHLAK & 4 Pilar Kompetensi */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-red-400 font-mono tracking-wider">
            NILAI INTI & BUDAYA KERJA TALENTA
          </div>
          <h2 className="text-xl font-bold tracking-tight mt-1">
            AKHLAK BUMN dipadukan dengan 4 Pilar Keunggulan DPS
          </h2>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Setiap personil Chapter DPS dinilai secara objektif menggunakan kerangka kerja berbasis bukti nyata (*evidence-based framework*):
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-red-400 font-mono font-bold text-sm">01 · KNOW</div>
            <div className="font-bold text-white mt-1">Kedalaman Domain & Teknologi</div>
            <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
              Penguasaan metode product discovery, arsitektur cloud, standar TOGAF, microservices, dan regulasi perlindungan data.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-red-400 font-mono font-bold text-sm">02 · THINK</div>
            <div className="font-bold text-white mt-1">Analisa & Strategi Solusi</div>
            <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
              Kemampuan validasi hipotesis pasar, perancangan roadmapping, analisa data telemetri produk, dan pengambilan keputusan berbasis bukti.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-red-400 font-mono font-bold text-sm">03 · COMMUNICATE</div>
            <div className="font-bold text-white mt-1">Artikulasi & Kolaborasi</div>
            <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
              Penyusunan PRD standar yang jelas tanpa ambigu, presentasi ke level eksekutif, dan fasilitasi sprint ceremonies yang produktif.
            </p>
          </div>

          <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700">
            <div className="text-red-400 font-mono font-bold text-sm">04 · INFLUENCE</div>
            <div className="font-bold text-white mt-1">Kepemimpinan & Mentoring</div>
            <p className="text-slate-400 text-[11px] mt-1.5 leading-relaxed">
              Mampu menggerakkan squad multidisiplin, negosiasi dependensi antar-Tribe, dan membina kapabilitas talenta generasi penerus.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="text-slate-400">
            Standar PRD DPS-PRD-001 v1.0 · Evaluasi berkala dengan skala 1.0 s/d 5.0
          </div>
          <button
            onClick={() => onNavigate('competency')}
            className="px-4 py-2 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap self-start sm:self-auto"
          >
            Lihat Matriks Kompetensi & Radar
          </button>
        </div>
      </div>

    </div>
  );
};
