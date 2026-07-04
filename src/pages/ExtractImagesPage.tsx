import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { extractImages, downloadBlob, formatFileSize, downloadAsZip } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export function ExtractImagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);
  const [imageCount, setImageCount] = useState(0);

  const handleFiles = (files: File[]) => { setFile(files[0]); setStatus('idle'); };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'extract-images' });
    setStatus('processing');
    try {
      const images = await extractImages(file);
      setImageCount(images.length);
      if (images.length === 0) {
        setStatus('error');
        return;
      }
      const blobs = images.map(img => new Blob([new Uint8Array(img.data)], { type: `image/${img.ext === 'jpg' ? 'jpeg' : img.ext}` }));
      const totalSize = blobs.reduce((s, b) => s + b.size, 0);
      setResultSize(totalSize);
      if (blobs.length === 1) {
        downloadBlob(blobs[0], images[0].name);
      } else {
        await downloadAsZip(blobs, images.map(i => i.name), `images-from-${file.name.replace('.pdf', '')}.zip`);
      }
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleReset = () => { setFile(null); setStatus('idle'); };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="Extract Images" url="/extract-images" description="Extract embedded images from your PDF online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Extract Images</h1>
      <p className="text-surface-500 mb-8">Extract all embedded images from your PDF. Supports JPG and PNG formats.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-surface-700">{file.name} ({formatFileSize(file.size)})</span>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
            Extract Images
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Extracting images...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">{imageCount} image{imageCount > 1 ? 's' : ''} extracted!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Extract another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-800 font-medium">
            {imageCount === 0 ? 'No embedded images found in this PDF.' : 'Something went wrong. Try again.'}
          </span>
        </div>
      )}
    </div>
  );
}
