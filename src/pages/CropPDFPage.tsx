import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { cropPDF, downloadBlob, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function CropPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState(595);
  const [height, setHeight] = useState(842);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleFiles = (files: File[]) => { setFile(files[0]); setStatus('idle'); };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'crop-pdf' });
    setStatus('processing');
    try {
      const result = await cropPDF(file, 0, 0, width, height);
      const blob = new Blob([result as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `cropped-${file.name}`);
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => { setFile(null); setStatus('idle'); };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="Crop PDF" url="/crop-pdf" description="Crop PDF pages to custom dimensions online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Crop PDF</h1>
      <p className="text-surface-500 mb-8">Crop all pages of your PDF to custom dimensions. Default is A4 (595 x 842 pts).</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-surface-700">{file.name} ({formatFileSize(file.size)})</span>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Width (pts)</label>
              <input type="number" min="100" max="5000" value={width}
                onChange={e => setWidth(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-2">Height (pts)</label>
              <input type="number" min="100" max="5000" value={height}
                onChange={e => setHeight(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'A4', w: 595, h: 842 },
              { label: 'A3', w: 842, h: 1191 },
              { label: 'US Letter', w: 612, h: 792 },
              { label: 'Square 1:1', w: 595, h: 595 },
              { label: 'Wide 16:9', w: 842, h: 474 },
            ].map(p => (
              <button key={p.label} onClick={() => { setWidth(p.w); setHeight(p.h); }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-100 text-surface-600 hover:bg-surface-200 transition-colors"
              >
                {p.label} ({p.w}×{p.h})
              </button>
            ))}
          </div>

          <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
            Crop PDF
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Cropping PDF...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Cropped!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Crop another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Something went wrong. Try again.</span>
        </div>
      )}
    </div>
  );
}
