import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { compressPDF, downloadBlob, formatFileSize } from '../utils/pdf';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, Shrink } from 'lucide-react';

export function CompressPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [originalSize, setOriginalSize] = useState(0);
  const [resultSize, setResultSize] = useState(0);

  const handleFiles = (files: File[]) => {
    setFile(files[0] || null);
    setStatus('idle');
  };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'compress-pdf' });
    setOriginalSize(file.size);
    setStatus('processing');
    try {
      const compressed = await compressPDF(file);
      const blob = new Blob([compressed as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `compressed_${file.name}`);
    } catch {
      setStatus('error');
    }
  };

  const savings = originalSize && resultSize ? Math.round((1 - resultSize / originalSize) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Compress PDF</h1>
      <p className="text-surface-500 mb-8">Reduce PDF file size by removing redundant data. Your file stays on your device.</p>

      <FileDropZone onFiles={handleFiles} accept=".pdf" multiple={false} />

      {file && status === 'idle' && (
        <button onClick={handleProcess} className="mt-6 w-full py-3 px-6 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 active:bg-emerald-800 transition-colors shadow-sm flex items-center justify-center gap-2">
          <Shrink className="w-5 h-5" /> Compress PDF
        </button>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-emerald-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Compressing...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Compressed successfully!</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-emerald-700 ml-8">
            <span>{formatFileSize(originalSize)} → {formatFileSize(resultSize)}</span>
            <span className="font-bold text-emerald-600">-{savings}%</span>
          </div>
          <button onClick={handleProcess} className="mt-3 ml-8 text-sm text-brand-600 hover:text-brand-700 font-medium">Compress another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Could not compress this file. Try a different file.</span>
        </div>
      )}
    </div>
  );
}
