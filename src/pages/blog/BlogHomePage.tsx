import { ArrowLeft } from 'lucide-react';

const articles = [
  { path: '/blog/merge-pdf', title: 'How to Merge PDF Files Online for Free (No Sign-Up Required)', desc: 'Combine multiple PDFs into one document' },
  { path: '/blog/compress-pdf', title: 'How to Compress a PDF File Size (Reduce PDF Without Losing Quality)', desc: 'Reduce PDF file size without losing quality' },
  { path: '/blog/jpg-to-pdf', title: 'How to Convert JPG to PDF (Convert Images to PDF for Free)', desc: 'Turn images into PDF documents' },
  { path: '/blog/pdf-to-jpg', title: 'How to Convert PDF to JPG (Extract PDF Pages as Images for Free)', desc: 'Extract PDF pages as high-quality images' },
  { path: '/blog/split-pdf', title: 'How to Split a PDF into Multiple Files (Extract Pages for Free)', desc: 'Separate PDF pages into individual files' },
];

export function BlogHomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      <a href="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to tools
      </a>
      <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-2">PDF Guides & Tutorials</h1>
      <p className="text-surface-500 mb-8">Step-by-step guides to help you get the most out of our free PDF tools.</p>

      <div className="space-y-4">
        {articles.map((a, i) => (
          <a key={i} href={a.path}
            className="block p-5 rounded-xl border border-surface-200 hover:border-surface-300 transition-all hover:shadow-sm"
          >
            <h2 className="text-lg font-semibold text-surface-900 hover:text-brand-600 transition-colors">{a.title}</h2>
            <p className="text-sm text-surface-500 mt-1">{a.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
