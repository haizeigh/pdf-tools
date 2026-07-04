import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { addPageNumbers, downloadBlob, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function PageNumbersPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [startFrom, setStartFrom] = useState(1);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleFiles = (files: File[]) => { setFile(files[0]); setStatus('idle'); };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'page-numbers-pdf' });
    setStatus('processing');
    try {
      const result = await addPageNumbers(file, startFrom);
      const blob = new Blob([result as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `numbered-${file.name}`);
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => { setFile(null); setStatus('idle'); };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="Add Page Numbers" url="/page-numbers-pdf" description="Add page numbers to your PDF online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Add Page Numbers</h1>
      <p className="text-surface-500 mb-8">Add page numbers to every page of your PDF. Numbers are placed at the bottom center.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-surface-700">{file.name} ({formatFileSize(file.size)})</span>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Start Numbering From</label>
            <input type="number" min="1" max="999" value={startFrom}
              onChange={e => setStartFrom(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
            Add Page Numbers
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Adding page numbers...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Page numbers added!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Add another</button>
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
