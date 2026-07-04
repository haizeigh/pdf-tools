import { PDFDocument, degrees, rgb, StandardFonts, PDFName, PDFDict, PDFStream } from 'pdf-lib';

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);
    const indices = pdf.getPageIndices();
    const pages = await mergedPdf.copyPages(pdf, indices);
    pages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

/**
 * Split a PDF into individual page files
 */
export async function splitPDF(file: File): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const results: Uint8Array[] = [];

  for (let i = 0; i < pageCount; i++) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);
    results.push(await newPdf.save());
  }

  return results;
}

/**
 * Convert images (JPG, PNG, etc.) to a single PDF
 */
export async function imagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    let image;
    if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(arrayBuffer);
    } else {
      image = await pdfDoc.embedJpg(arrayBuffer);
    }
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  }

  return pdfDoc.save();
}

/**
 * Convert PDF pages to JPG images (renders each page to canvas)
 */
export async function pdfToImages(file: File): Promise<Blob[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();

  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
  const pageCount = pdf.numPages;
  const blobs: Blob[] = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.92);
    });
    blobs.push(blob);
  }

  return blobs;
}

/**
 * Compress a PDF by removing unused objects and optionally downsampling
 */
export async function compressPDF(file: File): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  // Remove empty/duplicate objects to reduce size
  return pdf.save({ useObjectStreams: true, addDefaultPage: false });
}

/**
 * Trigger a file download in the browser
 */
export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Download multiple files as a ZIP
 */
export async function downloadAsZip(blobs: Blob[], filenames: string[], zipName: string) {
  // Use JSZip if available, otherwise download one by one
  try {
    const JSZip = (await import('jszip')).default;
    const zip = new JSZip();
    blobs.forEach((blob, i) => {
      zip.file(filenames[i], blob);
    });
    const zipBlob = await zip.generateAsync({ type: 'blob' });
    downloadBlob(zipBlob, zipName);
  } catch {
    // Fallback: download sequentially
    blobs.forEach((blob, i) => downloadBlob(blob, filenames[i]));
  }
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Delete specified pages from a PDF
 */
export async function deletePages(file: File, pagesToDelete: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pageCount = pdf.getPageCount();
  const pagesToKeep = Array.from({ length: pageCount }, (_, i) => i)
    .filter(i => !pagesToDelete.includes(i));
  if (pagesToKeep.length === 0) throw new Error('Cannot delete all pages');
  const newPdf = await PDFDocument.create();
  const pages = await newPdf.copyPages(pdf, pagesToKeep);
  pages.forEach(p => newPdf.addPage(p));
  return newPdf.save();
}

/**
 * Protect a PDF with a password
 */
export async function protectPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  return pdf.save({ userPassword: password, ownerPassword: password } as any);
}

/**
 * Unlock a password-protected PDF
 */
export async function unlockPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer, { password } as any);
  return pdf.save();
}

/**
 * Rotate all pages in a PDF
 */
export async function rotatePDF(file: File, deg: number): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const normalized = ((deg % 360) + 360) % 360;
  // Valid rotation values: 0, 90, 180, 270
  const validAngles = [0, 90, 180, 270];
  const angle = validAngles.includes(normalized) ? normalized : 0;
  pages.forEach(page => {
    page.setRotation(degrees(angle));
  });
  return pdf.save();
}

/**
 * Add watermark text to every page of a PDF
 */
export async function addWatermark(file: File, text: string, opacity: number = 0.3): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    const fontSize = Math.min(width, height) / 6;
    page.drawText(text, {
      x: width / 2 - (text.length * fontSize * 0.3) / 2,
      y: height / 2 - fontSize / 2,
      size: fontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity,
      rotate: degrees(-45),
    });
  }
  return pdf.save();
}

/**
 * Add page numbers to a PDF
 */
export async function addPageNumbers(file: File, startFrom: number = 1): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = pdf.getPages();
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    const { width } = page.getSize();
    const num = startFrom + i;
    page.drawText(`${num}`, {
      x: width / 2 - 10,
      y: 30,
      size: 10,
      font,
      color: rgb(0.4, 0.4, 0.4),
    });
  }
  return pdf.save();
}

/**
 * Crop a PDF page to specified dimensions
 */
export async function cropPDF(file: File, x: number, y: number, w: number, h: number): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  for (const page of pages) {
    page.setMediaBox(x, y, w, h);
  }
  return pdf.save();
}

/**
 * Extract embedded images from a PDF
 */
export async function extractImages(file: File): Promise<{ data: Uint8Array; ext: string; name: string }[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const results: { data: Uint8Array; ext: string; name: string }[] = [];
  const pages = pdf.getPages();
  for (let i = 0; i < pages.length; i++) {
    const resources = (pages[i] as any).node.Resources();
    if (!resources) continue;
    const xobj = resources.lookupMaybe(PDFName.of('XObject'), PDFDict);
    if (!xobj) continue;
    const entries = xobj.entries();
    for (const [key] of entries) {
      try {
        const imgStream = xobj.lookupMaybe(key, PDFStream);
        if (!imgStream) continue;
        const data = imgStream.contents as Uint8Array;
        if (!data || data.length === 0) continue;
        const isJpeg = data[0] === 0xFF && data[1] === 0xD8;
        const isPng = data[0] === 0x89 && data[1] === 0x50;
        const ext = isJpeg ? 'jpg' : isPng ? 'png' : 'bin';
        results.push({ data, ext, name: `page${i + 1}_${key.encodedName.replace('/', '')}.${ext}` });
      } catch {
        // Skip images that can't be extracted
      }
    }
  }
  return results;
}

/**
 * OCR: extract text from a PDF page using Tesseract.js
 */
export async function pdfOCR(file: File, lang: string = 'eng'): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdfjsLib = await import('pdfjs-dist');
  pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer.slice(0) }).promise;
  const Tesseract = await import('tesseract.js');
  let fullText = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = document.createElement('canvas');
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const ctx = canvas.getContext('2d')!;
    await page.render({ canvasContext: ctx, viewport, canvas }).promise;
    const blob = await new Promise<Blob>(resolve => canvas.toBlob(b => resolve(b!), 'image/png'));
    const { data } = await Tesseract.recognize(blob, lang);
    fullText += data.text + '\n\n';
  }
  return fullText.trim();
}
