import { BlogLayout } from './BlogLayout';

export function MergePDFBlogPage() {
  return (
    <BlogLayout title="How to Merge PDF Files Online for Free (No Sign-Up Required)">
      <p className="text-surface-500 leading-relaxed mb-6">
        Have you ever needed to combine multiple PDF documents into one file? Whether you're compiling reports, merging scanned contracts, or putting together a presentation, merging PDFs is a common task that shouldn't require expensive software or account creation.
      </p>
      <p className="text-surface-500 leading-relaxed mb-8">
        In this guide, I'll show you the fastest way to merge PDF files online — completely free, with no sign-up required, and with your files staying safely on your own device.
      </p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 1: Merge PDFs with PDFCraft (Recommended)</h2>
      <p className="text-surface-500 leading-relaxed mb-4">
        <a href="/merge-pdf" className="text-brand-600 hover:text-brand-700 font-medium">PDFCraft Merge PDF</a> is a free online tool that runs entirely in your browser. Here's how to use it:
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 1</p>
          <p className="text-sm text-surface-500">Open the <a href="/merge-pdf" className="text-brand-600 hover:text-brand-700">Merge PDF tool</a>.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 2</p>
          <p className="text-sm text-surface-500">Drag and drop your PDF files onto the upload area. You can add up to 20 files at once. The tool accepts files from your computer — no cloud account needed.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 3</p>
          <p className="text-sm text-surface-500">Arrange the files in your preferred order. Drag them up or down to reorder.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 4</p>
          <p className="text-sm text-surface-500">Click the "Merge N PDFs" button. The tool processes everything locally in your browser.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 5</p>
          <p className="text-sm text-surface-500">Your merged PDF will download automatically. That's it — no sign-up, no email required, no hidden limits.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-8">
        <p className="text-sm text-brand-800">
          <strong>Why this method is better:</strong> All processing happens in your browser. Your files never leave your device, so your sensitive documents stay private. No file size limits, no watermark, no daily caps.
        </p>
      </div>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 2: Using Adobe Acrobat Reader (Desktop)</h2>
      <p className="text-surface-500 leading-relaxed mb-4">If you prefer desktop software, Adobe Acrobat Reader offers a merge function:</p>
      <ol className="list-decimal pl-6 space-y-1 text-surface-500 mb-8">
        <li>Open Adobe Acrobat Reader</li>
        <li>Click "Tools" → "Combine Files"</li>
        <li>Add your PDFs and click "Combine"</li>
        <li>Save the result</li>
      </ol>
      <p className="text-surface-500 leading-relaxed mb-8">The downside: Adobe requires a paid subscription for full functionality, and the free version has significant limitations.</p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">FAQ</h2>
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Is it safe to merge PDFs online?</p>
          <p className="text-sm text-surface-500">A: Yes, when you use a tool that processes files locally. PDFCraft runs entirely in your browser — files never upload to any server.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: What's the maximum number of files I can merge?</p>
          <p className="text-sm text-surface-500">A: PDFCraft supports up to 20 files per merge session.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Can I merge password-protected PDFs?</p>
          <p className="text-sm text-surface-500">A: Yes, but you'll need to unlock them first using an <a href="/protect-pdf" className="text-brand-600 hover:text-brand-700">Unlock PDF</a> tool before merging.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Will the quality of my PDFs be affected?</p>
          <p className="text-sm text-surface-500">A: No. Merging simply combines pages — the original quality of each page is preserved.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Do I need to create an account?</p>
          <p className="text-sm text-surface-500">A: No. PDFCraft requires no registration, no email, and no payment.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-200 text-center">
        <p className="text-surface-700 mb-3">Ready to merge your PDFs?</p>
        <a href="/merge-pdf" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
          Try Merge PDF Tool →
        </a>
      </div>
    </BlogLayout>
  );
}
