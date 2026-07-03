import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { imagesToPDF, downloadBlob, formatFileSize } from '../utils/pdf';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function JpgToPDFPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);

  const handleProcess = async () => {
    if (files.length === 0) return;
    setStatus('processing');
    try {
      const pdfBytes = await imagesToPDF(files);
      const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, 'images.pdf');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">JPG to PDF</h1>
      <p className="text-surface-500 mb-8">Convert your images (JPG, PNG, BMP, GIF) into a PDF document.</p>

      <FileDropZone onFiles={setFiles} accept="image/*" multiple maxFiles={50} icon="image" />

      {files.length > 0 && status === 'idle' && (
        <button onClick={handleProcess} className="mt-6 w-full py-3 px-6 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 active:bg-amber-800 transition-colors shadow-sm">
          Convert {files.length} image{files.length > 1 ? 's' : ''} to PDF
        </button>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-amber-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Creating PDF...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">PDF created!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleProcess} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Convert more</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Could not convert images. Try different files.</span>
        </div>
      )}
    </div>
  );
}
