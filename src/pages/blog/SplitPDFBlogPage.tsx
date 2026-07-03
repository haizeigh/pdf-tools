import { BlogLayout } from './BlogLayout';

export function SplitPDFBlogPage() {
  return (
    <BlogLayout title="How to Split a PDF into Multiple Files (Extract Pages for Free)">
      <p className="text-surface-500 leading-relaxed mb-6">
        Sometimes you don't need the whole PDF — just a few pages. Whether you're extracting a single chapter from an ebook, separating invoices from a batch, or pulling out specific pages from a contract, knowing how to split a PDF is a valuable skill.
      </p>
      <p className="text-surface-500 leading-relaxed mb-8">
        Here's how to split any PDF into individual page files — completely free, with no sign-up required.
      </p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 1: Split PDF with PDFCraft</h2>
      <p className="text-surface-500 leading-relaxed mb-4">
        <a href="/split-pdf" className="text-brand-600 hover:text-brand-700 font-medium">PDFCraft Split PDF</a> extracts every page of your PDF into its own separate file.
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 1</p>
          <p className="text-sm text-surface-500">Open the <a href="/split-pdf" className="text-brand-600 hover:text-brand-700">Split PDF tool</a>.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 2</p>
          <p className="text-sm text-surface-500">Drag and drop your PDF file onto the upload area.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 3</p>
          <p className="text-sm text-surface-500">Click "Split PDF into pages". The tool processes your file instantly.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 4</p>
          <p className="text-sm text-surface-500">Download the results. Each page becomes its own PDF file. If your document has multiple pages, they're packaged in a ZIP file.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-8">
        <p className="text-sm text-brand-800">
          <strong>Use case example:</strong> You scanned a 10-page contract as one PDF but need to send individual pages to different stakeholders. Split the PDF, then share each page separately.
        </p>
      </div>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">FAQ</h2>
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: How many pages can a PDF have?</p>
          <p className="text-sm text-surface-500">A: There's no hard limit, but very large PDFs may take longer to process.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Can I extract a specific range of pages?</p>
          <p className="text-sm text-surface-500">A: Currently, the tool extracts every page individually. For page range extraction, consider using the <a href="/merge-pdf" className="text-brand-600 hover:text-brand-700">Merge PDF</a> tool after splitting.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: What format are the output files?</p>
          <p className="text-sm text-surface-500">A: Each page is saved as a separate PDF file.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Is my document secure?</p>
          <p className="text-sm text-surface-500">A: Yes. All processing happens locally in your browser. Your file never leaves your device.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Can I split password-protected PDFs?</p>
          <p className="text-sm text-surface-500">A: You'll need to unlock the PDF first using an <a href="/protect-pdf" className="text-brand-600 hover:text-brand-700">Unlock PDF</a> tool before splitting.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-200 text-center">
        <p className="text-surface-700 mb-3">Need to separate PDF pages?</p>
        <a href="/split-pdf" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
          Try Split PDF Tool →
        </a>
      </div>
    </BlogLayout>
  );
}
