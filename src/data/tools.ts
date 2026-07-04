import { FileUp, FileDown, Merge, Split, Scan, FileImage, Shrink, Eraser, Lock, RotateCw, Droplets, FileDigit, Crop, Image, FileText } from 'lucide-react';
import type { Tool } from '../types';

export const tools: Tool[] = [
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDFs into one document',
    icon: 'Merge',
    path: '/merge-pdf',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size without losing quality',
    icon: 'Shrink',
    path: '/compress-pdf',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'jpg-to-pdf',
    name: 'JPG to PDF',
    description: 'Convert images to PDF documents',
    icon: 'FileImage',
    path: '/jpg-to-pdf',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'pdf-to-jpg',
    name: 'PDF to JPG',
    description: 'Extract images from PDF pages',
    icon: 'FileDown',
    path: '/pdf-to-jpg',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract pages or split into multiple files',
    icon: 'Split',
    path: '/split-pdf',
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: 'delete-pages',
    name: 'Delete Pages',
    description: 'Remove unwanted pages from your PDF',
    icon: 'Eraser',
    path: '/delete-pages',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'protect-pdf',
    name: 'Protect & Unlock PDF',
    description: 'Add or remove password protection',
    icon: 'Lock',
    path: '/protect-pdf',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'rotate-pdf',
    name: 'Rotate PDF',
    description: 'Rotate pages 90°, 180°, or 270°',
    icon: 'RotateCw',
    path: '/rotate-pdf',
    color: 'from-orange-500 to-amber-600',
  },
  {
    id: 'watermark-pdf',
    name: 'Add Watermark',
    description: 'Add text watermark to every page',
    icon: 'Droplets',
    path: '/watermark-pdf',
    color: 'from-sky-500 to-cyan-600',
  },
  {
    id: 'page-numbers-pdf',
    name: 'Add Page Numbers',
    description: 'Number pages from any starting value',
    icon: 'FileDigit',
    path: '/page-numbers-pdf',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    id: 'crop-pdf',
    name: 'Crop PDF',
    description: 'Crop pages to custom dimensions',
    icon: 'Crop',
    path: '/crop-pdf',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'extract-images',
    name: 'Extract Images',
    description: 'Extract embedded images from PDF',
    icon: 'Image',
    path: '/extract-images',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'pdf-ocr',
    name: 'PDF OCR',
    description: 'Extract text from PDF using AI OCR',
    icon: 'FileText',
    path: '/pdf-ocr',
    color: 'from-indigo-500 to-violet-600',
  },
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  Merge, Split, Scan, FileImage, Shrink, FileUp, FileDown, Eraser, Lock, RotateCw, Droplets, FileDigit, Crop, Image, FileText,
};

// Google Analytics gtag
declare var gtag: (...args: any[]) => void;
