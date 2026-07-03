import { useCallback, useRef, useState } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { formatFileSize } from '../../utils/pdf';

interface FileDropZoneProps {
  onFiles: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  icon?: 'pdf' | 'image';
}

export function FileDropZone({ onFiles, accept = '.pdf', multiple = true, maxFiles = 10, icon = 'pdf' }: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles).slice(0, maxFiles);
    setFiles(arr);
    onFiles(arr);
  }, [maxFiles, onFiles]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => {
      const next = prev.filter((_, i) => i !== index);
      onFiles(next);
      return next;
    });
  }, [onFiles]);

  const IconComponent = icon === 'image' ? ImageIcon : FileText;

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 transition-all duration-200 text-center',
          isDragOver
            ? 'border-brand-500 bg-brand-50/50 scale-[1.02]'
            : 'border-surface-300 hover:border-brand-400 hover:bg-surface-50'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors',
            isDragOver ? 'bg-brand-100 text-brand-600' : 'bg-surface-100 text-surface-400'
          )}>
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <p className="text-base font-medium text-surface-700">
              {isDragOver ? 'Drop files here' : 'Drag & drop files here'}
            </p>
            <p className="text-sm text-surface-400 mt-1">
              or <span className="text-brand-600 font-medium">browse</span> to select
            </p>
          </div>
          <p className="text-xs text-surface-400">
            {accept.replace(/,/g, ', ')} &middot; Up to {maxFiles} files
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-xl border border-surface-200 px-4 py-3 group">
              <IconComponent className="w-5 h-5 text-brand-500 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-surface-700 truncate">{file.name}</p>
                <p className="text-xs text-surface-400">{formatFileSize(file.size)}</p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
