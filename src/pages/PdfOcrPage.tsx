import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { pdfOCR, formatFileSize } from '../utils/pdf';
import { SchemaMarkup } from '../components/features/SchemaMarkup';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, Copy, Download } from 'lucide-react';

const LANGUAGES = [
  { code: 'eng', label: 'English' },
  { code: 'chi_sim', label: 'Chinese (Simplified)' },
  { code: 'jpn', label: 'Japanese' },
  { code: 'kor', label: 'Korean' },
  { code: 'fra', label: 'French' },
  { code: 'deu', label: 'German' },
  { code: 'spa', label: 'Spanish' },
  { code: 'rus', label: 'Russian' },
  { code: 'ara', label: 'Arabic' },
];

export function PdfOcrPage() {
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState('eng');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFiles = (files: File[]) => { setFile(files[0]); setStatus('idle'); setText(''); };

  const handleProcess = async () => {
    if (!file) return;
    gtag('event', 'tool_used', { tool_name: 'pdf-ocr' });
    setStatus('processing');
    try {
      const result = await pdfOCR(file, lang);
      setText(result);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name?.replace('.pdf', '') || 'ocr'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => { setFile(null); setStatus('idle'); setText(''); };

  return (
    <div className="max-w-2xl mx-auto">
      <SchemaMarkup name="PDF OCR" url="/pdf-ocr" description="Extract text from PDF documents using AI OCR online for free." />
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">PDF OCR</h1>
      <p className="text-surface-500 mb-8">Extract text from PDF documents using AI-powered OCR. Supports 10+ languages.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <span className="text-sm font-medium text-surface-700">{file.name} ({formatFileSize(file.size)})</span>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Language</label>
            <select value={lang} onChange={e => setLang(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>

          <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
            Extract Text
          </button>
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Extracting text...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-800 font-medium">Text extracted!</span>
              <span className="text-sm text-emerald-600">({text.length} characters)</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleCopy} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                <Copy className="w-3.5 h-3.5" /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={handleDownload} className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-surface-50 border border-surface-200 max-h-80 overflow-y-auto">
            <pre className="text-sm text-surface-700 whitespace-pre-wrap font-sans">{text}</pre>
          </div>
          <button onClick={handleReset} className="w-full py-2.5 px-6 bg-surface-100 text-surface-700 rounded-xl font-medium hover:bg-surface-200 transition-colors">
            Extract another
          </button>
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
