import { BlogLayout } from './BlogLayout';

export function JpgToPDFBlogPage() {
  return (
    <BlogLayout title="How to Convert JPG to PDF (Convert Images to PDF for Free)">
      <p className="text-surface-500 leading-relaxed mb-6">
        Need to turn a collection of photos, scanned documents, or screenshots into a single PDF? Converting images to PDF is one of the most common document tasks — whether you're sending a photo album, compiling scanned receipts, or creating a portfolio.
      </p>
      <p className="text-surface-500 leading-relaxed mb-8">
        Here's how to convert JPG, PNG, and other images to PDF — for free, without any software installation.
      </p>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">Method 1: Convert Images to PDF with PDFCraft</h2>
      <p className="text-surface-500 leading-relaxed mb-4">
        <a href="/jpg-to-pdf" className="text-brand-600 hover:text-brand-700 font-medium">PDFCraft JPG to PDF</a> lets you convert multiple images into a single PDF document in seconds.
      </p>

      <div className="space-y-4 mb-8">
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 1</p>
          <p className="text-sm text-surface-500">Open the <a href="/jpg-to-pdf" className="text-brand-600 hover:text-brand-700">JPG to PDF tool</a>.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 2</p>
          <p className="text-sm text-surface-500">Drag and drop your images onto the upload area. You can add up to 50 images at once. Supported formats include JPG, PNG, BMP, and GIF.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 3</p>
          <p className="text-sm text-surface-500">Arrange the images in your desired order by dragging them.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 4</p>
          <p className="text-sm text-surface-500">Click "Convert N images to PDF". The tool processes everything in your browser.</p>
        </div>
        <div className="p-4 rounded-xl bg-surface-50 border border-surface-200">
          <p className="font-medium text-surface-800 mb-1">Step 5</p>
          <p className="text-sm text-surface-500">Download your new PDF. All images are combined into one document, each image on its own page.</p>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-brand-50 border border-brand-200 mb-8">
        <p className="text-sm text-brand-800">
          <strong>Pro tip:</strong> Use this for scanning documents with your phone. Take photos of each page, then convert them all to a single PDF in one go.
        </p>
      </div>

      <h2 className="text-xl font-bold text-surface-900 mt-8 mb-4">FAQ</h2>
      <div className="space-y-4 mb-8">
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: What image formats are supported?</p>
          <p className="text-sm text-surface-500">A: JPG, PNG, BMP, and GIF images are all supported.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: How many images can I convert at once?</p>
          <p className="text-sm text-surface-500">A: Up to 50 images per session.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Will my images be compressed?</p>
          <p className="text-sm text-surface-500">A: Images are embedded at their original resolution. No quality loss.</p>
        </div>
        <div>
          <p className="font-medium text-surface-800 mb-1">Q: Can I convert images to PDF on my phone?</p>
          <p className="text-sm text-surface-500">A: Yes, the tool works in any modern mobile browser. No app download needed.</p>
        </div>
      </div>

      <div className="p-5 rounded-xl bg-gradient-to-r from-brand-50 to-surface-50 border border-brand-200 text-center">
        <p className="text-surface-700 mb-3">Ready to convert images to PDF?</p>
        <a href="/jpg-to-pdf" className="inline-block px-6 py-2.5 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors shadow-sm">
          Try JPG to PDF Tool →
        </a>
      </div>
    </BlogLayout>
  );
}
