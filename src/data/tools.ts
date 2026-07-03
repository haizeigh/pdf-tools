import { FileUp, FileDown, Merge, Split, Scan, FileImage, Shrink } from 'lucide-react';
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
];

export const iconMap: Record<string, React.ComponentType<any>> = {
  Merge, Split, Scan, FileImage, Shrink, FileUp, FileDown,
};
