import React, { useState } from 'react';
import { KnowledgeDoc } from '../types';
import { 
  BookOpen, 
  Search, 
  Download, 
  FileText, 
  Plus, 
  ExternalLink, 
  Tag, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface KnowledgeHubViewProps {
  docs: KnowledgeDoc[];
  onUploadDoc: (doc: Omit<KnowledgeDoc, 'id' | 'downloadCount'>) => void;
  onAskJarvisDoc: (docTitle: string) => void;
}

export const KnowledgeHubView: React.FC<KnowledgeHubViewProps> = ({
  docs,
  onUploadDoc,
  onAskJarvisDoc,
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);

  // New doc form state
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<KnowledgeDoc['category']>('SOP & Guidelines');
  const [newAuthor, setNewAuthor] = useState<string>('Chapter Leader DPS');
  const [newVersion, setNewVersion] = useState<string>('1.0.0');
  const [newAccess, setNewAccess] = useState<KnowledgeDoc['accessLevel']>('Internal Chapter');
  const [newSummary, setNewSummary] = useState<string>('');

  const filteredDocs = docs.filter((d) => {
    const matchSearch =
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.summary.toLowerCase().includes(search.toLowerCase()) ||
      d.author.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || d.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onUploadDoc({
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      lastUpdated: new Date().toISOString().slice(0, 10),
      version: newVersion,
      accessLevel: newAccess,
      summary: newSummary,
    });
    setShowUploadModal(false);
    setNewTitle('');
    setNewSummary('');
  };

  const downloadMockDoc = (doc: KnowledgeDoc) => {
    const blob = new Blob([
      `=== TELKOM INDONESIA | CHAPTER DIGITAL PRODUCT & SOLUTION ===\nDokumen: ${doc.title}\nKategori: ${doc.category}\nVersi: ${doc.version}\nPenulis: ${doc.author}\nTanggal: ${doc.lastUpdated}\n\nRINGKASAN:\n${doc.summary}\n\n[Dokumen internal terverifikasi Chapter DPS]`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${doc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-slate-500">
              KNOWLEDGE MANAGEMENT & BEST PRACTICES (KNW-001 - KNW-010)
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 mt-1">
              Repositori Knowledge Hub Chapter DPS
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Standar baku SOP, blueprint arsitektur, template PRD, panduan BoQ, dan riset pasar terverifikasi.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Unggah Dokumen Baru</span>
            </button>
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari SOP, Blueprint, template PRD, atau regulasi..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:bg-white focus:outline-none focus:border-red-600"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto text-xs">
            {(['All', 'SOP & Guidelines', 'Solution Blueprint', 'PRD Template', 'BoQ & Pricing', 'Market Intelligence'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat === 'All' ? 'Semua Kategori' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Docs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-slate-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span className="font-bold text-slate-700">{doc.category}</span>
                <span>v{doc.version} · {doc.accessLevel}</span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mt-2">
                {doc.title}
              </h3>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {doc.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="text-[11px] text-slate-400 font-mono">
                Penulis: <strong className="text-slate-600">{doc.author}</strong> · {doc.lastUpdated}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onAskJarvisDoc(doc.title)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors text-xs font-semibold flex items-center gap-1"
                  title="Tanya isi dokumen ke JARVIS AI"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tanya JARVIS</span>
                </button>

                <button
                  onClick={() => downloadMockDoc(doc)}
                  className="p-1.5 text-slate-600 hover:bg-slate-100 rounded transition-colors text-xs font-medium flex items-center gap-1"
                  title="Unduh Dokumen"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full p-5 shadow-xl">
            <h3 className="text-sm font-bold text-slate-900">
              Unggah Dokumen ke Knowledge Hub DPS
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pastikan dokumen memenuhi klasifikasi keamanan data Telkom Indonesia.
            </p>

            <form onSubmit={handleUploadSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block text-slate-500 font-medium mb-1">Judul Dokumen:</label>
                <input
                  type="text"
                  placeholder="Contoh: Solution Architecture Blueprint Kafka Streaming v2"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:border-red-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Kategori Dokumen:</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="SOP & Guidelines">SOP & Guidelines</option>
                    <option value="Solution Blueprint">Solution Blueprint</option>
                    <option value="PRD Template">PRD Template</option>
                    <option value="BoQ & Pricing">BoQ & Pricing</option>
                    <option value="Market Intelligence">Market Intelligence</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-medium mb-1">Tingkat Akses:</label>
                  <select
                    value={newAccess}
                    onChange={(e) => setNewAccess(e.target.value as any)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  >
                    <option value="Internal Chapter">Internal Chapter</option>
                    <option value="Divisi Digital">Divisi Digital Business</option>
                    <option value="Public Restricted">Public Restricted</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Author / PIC:</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Versi Dokumen:</label>
                  <input
                    type="text"
                    value={newVersion}
                    onChange={(e) => setNewVersion(e.target.value)}
                    className="w-full px-3 py-1.5 border border-slate-200 rounded-lg font-mono text-slate-800"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-500 font-medium mb-1">Ringkasan Eksekutif Dokumen:</label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Jelaskan tujuan dokumen, batasan, dan audiens yang dituju..."
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-slate-800"
                  required
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-white bg-slate-900 hover:bg-slate-800 rounded-lg font-semibold transition-colors"
                >
                  Publikasikan Dokumen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
