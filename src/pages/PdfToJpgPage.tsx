import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { pdfToImages, downloadAsZip, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, ImageDown } from 'lucide-react';

export function PdfToJpgPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [pageCount, setPageCount] = useState(0);

  const handleFiles = (files: File[]) => {
    setFile(files[0] || null);
    setStatus('idle');
  };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'pdf-to-jpg' });
    setStatus('processing');
    try {
      const blobs = await pdfToImages(file);
      setPageCount(blobs.length);
      setStatus('success');

      const baseName = file.name.replace(/\.pdf$/i, '');
      const filenames = blobs.map((_, i) => `${baseName}_page_${i + 1}.jpg`);

      if (blobs.length === 1) {
        const url = URL.createObjectURL(blobs[0]);
        const a = document.createElement('a');
        a.href = url;
        a.download = filenames[0];
        a.click();
        URL.revokeObjectURL(url);
      } else {
        await downloadAsZip(blobs, filenames, `${baseName}_images.zip`);
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="PDF to JPG" url="/pdf-to-jpg" description="Extract PDF pages as high-quality JPG images online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">PDF to JPG</h1>
      <p className="text-surface-500 mb-8">Convert each page of your PDF into a high-quality JPG image.</p>

      <FileDropZone onFiles={handleFiles} accept=".pdf" multiple={false} icon="image" />

      {file && status === 'idle' && (
        <button onClick={handleProcess} className="mt-6 w-full py-3 px-6 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 active:bg-rose-800 transition-colors shadow-sm flex items-center justify-center gap-2">
          <ImageDown className="w-5 h-5" /> Convert to JPG
        </button>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-rose-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Converting pages...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3 mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">{pageCount} page{pageCount > 1 ? 's' : ''} converted!</span>
          </div>
          <p className="text-sm text-emerald-600 ml-8">
            {pageCount === 1 ? 'Image downloaded.' : 'ZIP file downloaded.'}
          </p>
          <button onClick={handleProcess} className="mt-3 ml-8 text-sm text-brand-600 hover:text-brand-700 font-medium">Convert another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">Could not convert this PDF. Try a different file.</span>
        </div>
      )}
    </div>
  );
}
