import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { MergePDFPage } from './pages/MergePDFPage';
import { CompressPDFPage } from './pages/CompressPDFPage';
import { JpgToPDFPage } from './pages/JpgToPDFPage';
import { PdfToJpgPage } from './pages/PdfToJpgPage';
import { SplitPDFPage } from './pages/SplitPDFPage';
import { DeletePagesPage } from './pages/DeletePagesPage';
import { ProtectPDFPage } from './pages/ProtectPDFPage';
import { RotatePDFPage } from './pages/RotatePDFPage';
import { WatermarkPDFPage } from './pages/WatermarkPDFPage';
import { PageNumbersPDFPage } from './pages/PageNumbersPDFPage';
import { CropPDFPage } from './pages/CropPDFPage';
import { ExtractImagesPage } from './pages/ExtractImagesPage';
import { PdfOcrPage } from './pages/PdfOcrPage';
import { BlogHomePage } from './pages/blog/BlogHomePage';
import { MergePDFBlogPage } from './pages/blog/MergePDFBlogPage';
import { CompressPDFBlogPage } from './pages/blog/CompressPDFBlogPage';
import { JpgToPDFBlogPage } from './pages/blog/JpgToPDFBlogPage';
import { PdfToJpgBlogPage } from './pages/blog/PdfToJpgBlogPage';
import { SplitPDFBlogPage } from './pages/blog/SplitPDFBlogPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-b from-surface-50 to-white flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/merge-pdf" element={<MergePDFPage />} />
            <Route path="/compress-pdf" element={<CompressPDFPage />} />
            <Route path="/jpg-to-pdf" element={<JpgToPDFPage />} />
            <Route path="/pdf-to-jpg" element={<PdfToJpgPage />} />
            <Route path="/split-pdf" element={<SplitPDFPage />} />
            <Route path="/delete-pages" element={<DeletePagesPage />} />
            <Route path="/protect-pdf" element={<ProtectPDFPage />} />
            <Route path="/rotate-pdf" element={<RotatePDFPage />} />
            <Route path="/watermark-pdf" element={<WatermarkPDFPage />} />
            <Route path="/page-numbers-pdf" element={<PageNumbersPDFPage />} />
            <Route path="/crop-pdf" element={<CropPDFPage />} />
            <Route path="/extract-images" element={<ExtractImagesPage />} />
            <Route path="/pdf-ocr" element={<PdfOcrPage />} />
            <Route path="/blog" element={<BlogHomePage />} />
            <Route path="/blog/merge-pdf" element={<MergePDFBlogPage />} />
            <Route path="/blog/compress-pdf" element={<CompressPDFBlogPage />} />
            <Route path="/blog/jpg-to-pdf" element={<JpgToPDFBlogPage />} />
            <Route path="/blog/pdf-to-jpg" element={<PdfToJpgBlogPage />} />
            <Route path="/blog/split-pdf" element={<SplitPDFBlogPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
