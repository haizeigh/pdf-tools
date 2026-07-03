import { BlogLayout } from './BlogLayout';

export function PdfToJpgBlogPage() {
  return (
    <BlogLayout title="How to Convert PDF to JPG (Extract PDF Pages as Images for Free)">
      <p className="text-surface-500 leading-relaxed mb-6">
        Have you ever needed to turn a PDF page into an image? Maybe you want to insert a page into a presentation, share a document preview on social media, or use a PDF page as a reference image. Whatever the reason, converting PDF to JPG is easier than you think.
      </p>
      <p className="text-surface-500 leading-relaxed mb-8">
        Here's how to extract every page of a PDF as a high-quality JPG image — for free and without uploading your file anywhere.
      </p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 1: Convert PDF to JPG with PDFCraft</h2>
      <p className="text-surface-500 leading-relaxed mb-4">
        <a href="/pdf-to-jpg" className="text-brand-600 hover:text-brand-700 font-medium">PDFCraft PDF to JPG</a> renders each page of your PDF as a high-resolution JPG image.
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 1</p>
          <p className="text-sm text-surface-500">Open the <a href="/pdf-to-jpg" className="text-brand-600 hover:text-brand-700">PDF to JPG tool</a>.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 2</p>
          <p className="text-sm text-surface-500">Drag and drop your PDF file onto the upload area.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 3</p>
          <p className="text-sm text-surface-500">Click "Convert to JPG". The tool processes each page at 2x resolution for crisp results.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 4</p>
          <p className="text-sm text-surface-500">Download your images. If your PDF has multiple pages, they're bundled into a ZIP file for convenience. Single-page PDFs download the image directly.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-8">
        <p className="text-sm text-brand-800">
          <strong>Quality note:</strong> Images are rendered at 2x resolution (144 DPI equivalent), which is suitable for screen use, presentations, and most document needs.
        </p>
      </div>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">FAQ</h2>
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: What resolution are the output images?</p>
          <p className="text-sm text-surface-500">A: Images are rendered at 2x screen resolution, providing crisp, clear results for most use cases.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Can I convert a single page instead of the whole PDF?</p>
          <p className="text-sm text-surface-500">A: Currently, the tool converts all pages. For single-page extraction, you can use the <a href="/split-pdf" className="text-brand-600 hover:text-brand-700">Split PDF</a> tool first.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Is my document secure?</p>
          <p className="text-sm text-surface-500">A: Yes. All processing happens locally in your browser. Your file never leaves your device.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-200 text-center">
        <p className="text-surface-700 mb-3">Need to extract images from a PDF?</p>
        <a href="/pdf-to-jpg" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
          Try PDF to JPG Tool →
        </a>
      </div>
    </BlogLayout>
  );
}
