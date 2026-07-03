'use client'

import { useState } from 'react';
import { FileDropZone } from '../components/features/FileDropZone';
import { downloadBlob, formatFileSize } from '../utils/pdf';
import { Loader2, CheckCircle2, AlertCircle, ArrowLeft, Lock } from 'lucide-react';

export function ProtectPDFPage() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [resultSize, setResultSize] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFiles = (files: File[]) => {
    setFile(files[0]);
    setPassword('');
    setConfirmPassword('');
    setStatus('idle');
    setErrorMsg('');
  };

  const handleProcess = async () => {
    if (!file || !password) return;
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    gtag('event', 'tool_used', { tool_name: 'protect-pdf' });
    setStatus('processing');
    setErrorMsg('');
    try {
      const { encryptPDF } = await import('@pdfsmaller/pdf-encrypt-lite');
      const arrayBuffer = await file.arrayBuffer();
      const encrypted = await encryptPDF(new Uint8Array(arrayBuffer), password);
      const blob = new Blob([encrypted as unknown as BlobPart], { type: 'application/pdf' });
      setResultSize(blob.size);
      setStatus('success');
      downloadBlob(blob, `protected-${file.name}`);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e instanceof Error ? e.message : 'Failed to process PDF');
    }
  };

  const handleReset = () => { setFile(null); setPassword(''); setConfirmPassword(''); setStatus('idle'); setErrorMsg(''); };

  return (
    <div className="max-w-2xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">Protect PDF</h1>
      <p className="text-surface-500 mb-8">Add password protection to your PDF. The encrypted PDF can only be opened with the password.</p>

      {!file && <FileDropZone onFiles={handleFiles} accept=".pdf" maxFiles={1} />}

      {file && status === 'idle' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-surface-100 rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-600" />
              <span className="text-sm font-medium text-surface-700">{file.name}</span>
              <span className="text-xs text-surface-400">({formatFileSize(file.size)})</span>
            </div>
            <button onClick={handleReset} className="text-xs text-surface-500 hover:text-surface-700">Change file</button>
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Set Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter a password to protect the PDF"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Re-enter the password"
              className="w-full px-4 py-2.5 rounded-xl border border-surface-200 bg-white text-surface-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
            />
          </div>

          {errorMsg && (
            <p className="text-sm text-red-600">{errorMsg}</p>
          )}

          {password && password === confirmPassword && password.length > 0 && (
            <button onClick={handleProcess} className="w-full py-3 px-6 bg-brand-600 text-white rounded-xl font-medium hover:bg-brand-700 transition-colors shadow-sm">
              Protect PDF
            </button>
          )}
        </div>
      )}

      {status === 'processing' && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4 text-brand-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Protecting PDF...</span>
        </div>
      )}

      {status === 'success' && (
        <div className="mt-6 flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-800 font-medium">Protected!</span>
            <span className="text-sm text-emerald-600">({formatFileSize(resultSize)})</span>
          </div>
          <button onClick={handleReset} className="text-sm text-brand-600 hover:text-brand-700 font-medium">Protect another</button>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <div>
            <span className="text-red-800 font-medium">Failed</span>
            {errorMsg && <p className="text-sm text-red-600 mt-1">{errorMsg}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
