import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { mergePDFs, downloadBlob, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function MergePDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleProcess = async () => {
    if (files.length < 2) return;
    gtag('event', 'tool_used', { tool_name: 'merge-pdf' });
    setStatus('processing');
    try {
      const merged = await mergePDFs(files);
      const blob = new Blob([merged as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, 'merged.pdf');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="Merge PDF" url="/merge-pdf" description="Combine multiple PDF files into one document for free online." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Merge PDF</h1>
      <p className="text-surface-500 mb-8">Combine multiple PDFs into a single document. Select at least 2 files.</p>

      <FileDropZone onFiles={setFiles} accept=".pdf" multiple maxFiles={20} />

      {files.length >= 2 && status === 'idle' && (
        <button onClick={handleProcess} className="mt-6 w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 active:bg-brand-800 transition-colors shadow-sm">
          Merge {files.length} PDFs
        </button>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Merging PDFs...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Merged successfully!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleProcess} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Merge again</button>
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
