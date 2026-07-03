import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { rotatePDF, downloadBlob, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, RotateCw } from 'lucide-react';

const ROTATIONS = [
  { degrees: 90, label: '90° Clockwise' },
  { degrees: 180, label: '180°' },
  { degrees: 270, label: '90° Counter-clockwise' },
];

export function RotatePDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [rotation, setRotation] = useState(90);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleFiles = (files: File[]) => {
    setFile(files[0]);
    setStatus('idle');
  };

  const handleProcess = async () => {
    if (!file) return;
    try { gtag('event', 'tool_used', { tool_name: 'rotate-pdf' }); } catch {}
    setStatus('processing');
    try {
      const result = await rotatePDF(file, rotation);
      const blob = new Blob([result as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `rotated-${rotation}-${file.name}`);
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => { setFile(null); setStatus('idle'); };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="Rotate PDF" url="/rotate-pdf" description="Rotate PDF pages 90°, 180°, or 270° online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Rotate PDF</h1>
      <p className="text-surface-500 mb-8">Rotate all pages in your PDF by 90°, 180°, or 270°.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-surface-700">{file.name}</span>
              <span className="text-xs text-surface-400">({formatFileSize(file.size)})</span>
            </div>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-3">Rotation Angle</label>
            <div className="grid grid-cols-3 gap-3">
              {ROTATIONS.map(r => (
                <button
                  key={r.degrees}
                  onClick={() => setRotation(r.degrees)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-xl border transition-all ${
                    rotation === r.degrees
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-surface-200 hover:border-surface-300 text-surface-700'
                  }`}
                >
                  <RotateCw className="w-6 h-6" style={{ transform: `rotate(${r.degrees}deg)` }} />
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
            Rotate PDF
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Rotating pages...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Rotated successfully!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Rotate another</button>
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
