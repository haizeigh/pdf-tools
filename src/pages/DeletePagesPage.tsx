import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { deletePages, downloadBlob, formatFileSize } from '../utils/pdf';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function DeletePagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleFiles = async (files: File[]) => {
    const f = files[0];
    setFile(f);
    setSelectedPages([]);
    setStatus('idle');
    const { PDFDocument } = await import('pdf-lib');
    const pdf = await PDFDocument.load(await f.arrayBuffer());
    setPageCount(pdf.getPageCount());
  };

  const togglePage = (page: number) => {
    setSelectedPages(prev =>
      prev.includes(page) ? prev.filter(p => p !== page) : [...prev, page]
    );
  };

  const handleProcess = async () => {
    if (!file || selectedPages.length === 0) return;
    if (selectedPages.length >= pageCount) return;
    setStatus('processing');
    try {
      const result = await deletePages(file, selectedPages);
      const blob = new Blob([result as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `deleted-${file.name}`);
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => { setFile(null); setPageCount(0); setSelectedPages([]); setStatus('idle'); };

  return (
    <div className="max-w-2xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Delete Pages</h1>
      <p className="text-surface-500 mb-8">Remove unwanted pages from your PDF. Select the pages you want to delete.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-surface-700">{file.name}</span>
              <span className="text-xs text-surface-400">({formatFileSize(file.size)}, {pageCount} pages)</span>
            </div>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div>
            <p className="text-sm font-medium text-surface-700 mb-3">Select pages to delete ({selectedPages.length} selected):</p>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => togglePage(page - 1)}
                  className={`p-3 rounded-lg text-center border transition-all text-sm font-medium ${
                    selectedPages.includes(page - 1)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-surface-200 hover:border-surface-300 text-surface-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>

          {selectedPages.length > 0 && selectedPages.length < pageCount && (
            <button onClick={handleProcess} className="w-full py-3 px-6 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors shadow-sm">
              Delete {selectedPages.length} page{selectedPages.length > 1 ? 's' : ''}
            </button>
          )}
          {selectedPages.length >= pageCount && (
            <p className="text-sm text-red-600 text-center">Cannot delete all pages. Keep at least one page.</p>
          )}
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Deleting pages...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Deleted successfully!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Delete another</button>
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
