import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { splitPDF, downloadAsZip } from '../utils/pdf';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function SplitPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [pageCount, setPageCount] = useState(0);

  const handleFiles = (files: File[]) => {
    setFile(files[0] || null);
    setStatus('idle');
  };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'split-pdf' });
    setStatus('processing');
    try {
      const pages = await splitPDF(file);
      setPageCount(pages.length);
      setStatus('success');

      const baseName = file.name.replace(/\.pdf$/i, '');
      const blobs = pages.map((p) => new Blob([p as unknown as BlobPart], { type: 'application/pdf' }));
      const filenames = pages.map((_, i) => `${baseName}_page_${i + 1}.pdf`);

      if (pages.length === 1) {
        const url = URL.createObjectURL(blobs[0]);
        const a = document.createElement('a');
        a.href = url;
        a.download = filenames[0];
        a.click();
        URL.revokeObjectURL(url);
      } else {
        await downloadAsZip(blobs, filenames, `${baseName}_pages.zip`);
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Split PDF</h1>
      <p className="text-surface-500 mb-8">Extract each page of your PDF into separate files. Every page becomes its own PDF.</p>

      <FileDropZone onFiles={handleFiles} accept=".pdf" multiple={false} />

      {file && status === 'idle' && (
        <button onClick={handleProcess} className="mt-6 w-full py-3 px-6 bg-sky-600 text-white rounded-xl font-medium hover:bg-sky-700 active:bg-sky-800 transition-colors shadow-sm">
          Split PDF into pages
        </button>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-sky-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Splitting pages...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3 mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">{pageCount} page{pageCount > 1 ? 's' : ''} extracted!</span>
          </div>
          <p className="text-sm text-emerald-600 ml-8">
            {pageCount === 1 ? 'File downloaded.' : 'ZIP file downloaded.'}
          </p>
          <button onClick={handleProcess} className="mt-3 ml-8 text-sm text-brand-600 hover:text-brand-700 font-medium">Split another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Could not split this PDF. Try a different file.</span>
        </div>
      )}
    </div>
  );
}
