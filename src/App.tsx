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
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
