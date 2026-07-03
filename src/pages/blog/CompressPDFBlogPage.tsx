import { BlogLayout } from './BlogLayout';

export function CompressPDFBlogPage() {
  return (
    <BlogLayout title="How to Compress a PDF File Size (Reduce PDF Without Losing Quality)">
      <p className="text-surface-500 leading-relaxed mb-6">
        Nothing kills productivity like a PDF that's too large to email. Whether you're hitting the 25MB Gmail attachment limit or trying to upload a document to a portal with size restrictions, knowing how to compress a PDF is an essential skill.
      </p>
      <p className="text-surface-500 leading-relaxed mb-8">
        In this guide, I'll show you how to reduce PDF file size quickly and for free — without installing any software.
      </p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 1: Compress PDF with PDFCraft (Free, No Upload)</h2>
      <p className="text-surface-500 leading-relaxed mb-4">
        <a href="/compress-pdf" className="text-brand-600 hover:text-brand-700 font-medium">PDFCraft Compress PDF</a> reduces file size by removing redundant data while preserving your document's content and layout.
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 1</p>
          <p className="text-sm text-surface-500">Go to the <a href="/compress-pdf" className="text-brand-600 hover:text-brand-700">Compress PDF tool</a>.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 2</p>
          <p className="text-sm text-surface-500">Drag and drop your PDF file onto the upload area.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 3</p>
          <p className="text-sm text-surface-500">Click "Compress PDF". The tool processes your file instantly in your browser.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 4</p>
          <p className="text-sm text-surface-500">Download the compressed version. You'll see the original size, new size, and compression percentage displayed on screen.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-8">
        <p className="text-sm text-brand-800">
          <strong>Real-world results:</strong> Most PDFs compress by 20-60%. Scanned documents with embedded images see the biggest savings.
        </p>
      </div>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 2: Compress Using Preview (Mac)</h2>
      <ol className="list-decimal pl-6 space-y-1 text-surface-500 mb-8">
        <li>Open the PDF in Preview</li>
        <li>Go to File → Export</li>
        <li>Select "Reduce File Size" from the Quartz Filter dropdown</li>
        <li>Click Save</li>
      </ol>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">FAQ</h2>
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Does compressing a PDF reduce image quality?</p>
          <p className="text-sm text-surface-500">A: PDFCraft's compression removes redundant data without re-encoding images, so visual quality is preserved.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: What's the smallest file size I can achieve?</p>
          <p className="text-sm text-surface-500">A: It depends on the content. Text-heavy PDFs compress very well. Image-heavy PDFs have less room for reduction.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Is my file secure during compression?</p>
          <p className="text-sm text-surface-500">A: Yes. All processing happens locally in your browser. Your file never leaves your computer.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-200 text-center">
        <p className="text-surface-700 mb-3">Need to shrink a PDF?</p>
        <a href="/compress-pdf" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
          Try Compress PDF Tool →
        </a>
      </div>
    </BlogLayout>
  );
}
