import { FileUp, FileDown, Merge, Split, Scan, FileImage, Shrink, Eraser, Lock, RotateCw } from 'lucide-react';
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
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  Merge, Split, Scan, FileImage, Shrink, FileUp, FileDown, Eraser, Lock, RotateCw,
};

// Google Analytics gtag
declare var gtag: (...args: any[]) => void;
