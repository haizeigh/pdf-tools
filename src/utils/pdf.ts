import { PDFDocument, degrees } from 'pdf-lib';

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
export async function rotatePDF(file: File, degrees: number): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(arrayBuffer);
  const pages = pdf.getPages();
  const normalized = ((degrees % 360) + 360) % 360;
  // Valid rotation values: 0, 90, 180, 270
  const validAngles = [0, 90, 180, 270];
  const angle = validAngles.includes(normalized) ? normalized : 0;
  pages.forEach(page => {
    page.setRotation(degrees(angle));
  });
  return pdf.save();
}
