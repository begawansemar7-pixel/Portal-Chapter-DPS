import React, { useState, useEffect, useRef } from 'react';
import { NavSection } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Award, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  Play, 
  Pause 
} from 'lucide-react';

interface CarouselSectionProps {
  onNavigate: (section: NavSection) => void;
}

interface CarouselSlide {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  ctaText: string;
  targetSection: NavSection;
  bgGradient: string;
  accentBorder: string;
  icon: React.ElementType;
}

export const CarouselSection: React.FC<CarouselSectionProps> = ({ onNavigate }) => {
  const slides: CarouselSlide[] = [
    {
      id: 'slide-1',
      badge: 'AI WORKSPACE · TANIA & JARVIS',
      badgeColor: 'text-red-400 bg-red-950/60 border-red-800/60',
      title: 'Akselerasi AI Copilot: Workforce & Solution Intelligence',
      subtitle: 'Tingkatkan Kecepatan Demand Intake & BoQ hingga 50%',
      description: 'TANIA memprediksi kelayakan kapasitas 40 jam/minggu dan mencocokkan keahlian squad secara instan. JARVIS otomatis merancang draf PRD, arsitektur microservices, dan estimasi biaya SDM dengan validasi human-in-the-loop.',
      stats: [
        { label: 'SLA MATCHING', value: '≤ 3 HARI' },
        { label: 'AKURASI REKOMENDASI', value: '94.0%' },
        { label: 'HUMAN APPROVAL', value: '100% AUDITED' },
      ],
      ctaText: 'Buka AI Workspace',
      targetSection: 'ai-workspace',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      accentBorder: 'border-red-900/40',
      icon: Sparkles,
    },
    {
      id: 'slide-2',
      badge: 'PRODUK UNGGULAN · EKOSISTEM UMKM',
      badgeColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
      title: 'IndiBiz Merchant POS Suite: Berdayakan 96.500+ UMKM',
      subtitle: 'Solusi Kasir & Settlement QRIS Instan di 34 Provinsi',
      description: 'Squad SME Commerce Chapter DPS sukses mengawal inovasi kasir digital terpadu, rekonsiliasi pembayaran real-time, dan manajemen inventori multi-outlet untuk jutaan merchant binaan Telkom Indonesia.',
      stats: [
        { label: 'MERCHANT AKTIF', value: '96.500+' },
        { label: 'NET PROMOTER SCORE', value: 'NPS 74' },
        { label: 'EST. REVENUE / BLN', value: 'Rp 4,2 M' },
      ],
      ctaText: 'Lihat Katalog Produk',
      targetSection: 'portfolio',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      accentBorder: 'border-emerald-900/40',
      icon: TrendingUp,
    },
    {
      id: 'slide-3',
      badge: 'RELEASE TRAIN · ENTERPRISE B2B',
      badgeColor: 'text-blue-400 bg-blue-950/60 border-blue-800/60',
      title: 'Enterprise Cloud Portal v2.5: Dedicated Interconnect',
      subtitle: 'Self-Service Multi-Cloud untuk 14.200 Akun Korporat',
      description: 'Platform self-service manajemen cloud korporasi tier-1 Telkom. Rilis train v2.5 menghadirkan automated bandwidth throttling dan integrasi invoicing otomatis bersama SAP ERP Telkom.',
      stats: [
        { label: 'KORPORAT TIER-1', value: '14.200 AKUN' },
        { label: 'DELIVERY PROGRESS', value: '78% ON TRACK' },
        { label: 'API LATENCY P95', value: '< 200 MS' },
      ],
      ctaText: 'Pantau Project Register',
      targetSection: 'delivery',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      accentBorder: 'border-blue-900/40',
      icon: Layers,
    },
    {
      id: 'slide-4',
      badge: 'STANDAR KOMPETENSI · EVIDENCE-BASED',
      badgeColor: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
      title: 'Framework Kompetensi DPS: KNOW · THINK · COMM · INFL',
      subtitle: 'Penilaian Berbasis Bukti Otentik (Skala 1.0 s/d 5.0)',
      description: 'Setiap Digital PM, Solution Architect, dan Tech PO dinilai secara terukur mengacu pada standar PRD DPS-PRD-001 dengan verifikasi portofolio nyata, sertifikasi internasional, dan presentasi review.',
      stats: [
        { label: 'EVIDENCE COMPLETENESS', value: '92.5%' },
        { label: 'SERTIFIKASI GLOBAL', value: 'AWS, TOGAF, PSPO' },
        { label: 'TARGET BASELINE', value: '≥ 90% (SO-04)' },
      ],
      ctaText: 'Buka Radar Kompetensi',
      targetSection: 'competency',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      accentBorder: 'border-amber-900/40',
      icon: Award,
    },
    {
      id: 'slide-5',
      badge: 'TATA KELOLA KAPASITAS · WORKFORCE HEALTH',
      badgeColor: 'text-violet-400 bg-violet-950/60 border-violet-800/60',
      title: 'Heatmap Kapasitas & Sinkronisasi Timesheet TeMan',
      subtitle: 'Rata-rata Utilisasi Optimal 84.5% Tanpa Over-Allocation',
      description: 'Sistem alokasi mingguan memantau beban 40 jam per personil secara transparan. Mencegah kejenuhan kerja (burnout) dan memastikan ketersediaan tenaga ahli siap memenuhi demand squad lintas Tribe.',
      stats: [
        { label: 'UTILISASI KAPASITAS', value: '84.5%' },
        { label: 'JAM STANDAR / MGG', value: '40 JAM' },
        { label: 'OVER-ALLOCATION', value: '0 KASUS KRITIS' },
      ],
      ctaText: 'Cek Heatmap Kapasitas',
      targetSection: 'workload',
      bgGradient: 'from-slate-950 via-slate-900 to-slate-950',
      accentBorder: 'border-violet-900/40',
      icon: Clock,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = slides[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play timer (advances every 5.5 seconds unless paused)
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 5500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  return (
    <section 
      aria-label="Sorotan Inisiatif Strategis Chapter DPS"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4"
    >
      {/* Section Header with Controls */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-red-600">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>HIGHLIGHT STRATEGIS CHAPTER DPS</span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">
            Inisiatif Utama, Pencapaian Produk & Kapabilitas
          </h2>
        </div>

        {/* Carousel Play/Pause and Step Counter */}
        <div className="flex items-center gap-2 text-xs">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Jeda carousel' : 'Putar otomatis carousel'}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          <span className="font-mono text-slate-500 font-semibold text-[11px]">
            {currentIndex + 1} / {slides.length}
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              title="Slide sebelumnya"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              title="Slide berikutnya"
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide Display Card (High Contrast Dark Slate Card with Vibrant Telkom Accents) */}
      <div 
        className={`rounded-xl p-6 sm:p-8 bg-gradient-to-br ${currentSlide.bgGradient} border ${currentSlide.accentBorder} text-white shadow-xl relative overflow-hidden transition-all duration-300 min-h-[300px] flex flex-col justify-between`}
      >
        {/* Subtle Ambient Radial Highlight */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 max-w-3xl">
          {/* Badge & Icon */}
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${currentSlide.badgeColor}`}>
              {currentSlide.badge}
            </span>
          </div>

          {/* Titles */}
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white mt-3 leading-snug">
            {currentSlide.title}
          </h3>

          <div className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
            {currentSlide.subtitle}
          </div>

          <p className="text-xs sm:text-sm text-slate-400 mt-3 leading-relaxed max-w-2xl">
            {currentSlide.description}
          </p>

          {/* Key Metrics Strip (Zero-Pill, Tabular Numbers) */}
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-xs">
            {currentSlide.stats.map((s, idx) => (
              <div key={idx}>
                <div className="text-[10px] text-slate-500 font-mono tracking-wider">{s.label}</div>
                <div className="text-sm sm:text-base font-bold font-mono text-white mt-0.5">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA and Slide Indicators */}
        <div className="relative z-10 mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onNavigate(currentSlide.targetSection)}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer self-start sm:self-auto"
          >
            <span>{currentSlide.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Indicator Bullets (Clickable) */}
          <div className="flex items-center gap-2">
            {slides.map((s, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  title={`Menuju slide: ${s.title}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive ? 'w-8 bg-red-500 shadow-sm' : 'w-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
