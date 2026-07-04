import { useState, useRef, useEffect } from 'react';
import { useLang } from '../../i18n/LangContext';
import { LANGUAGES } from '../../i18n/languages';
import { Globe } from 'lucide-react';

export function LanguageSelector() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = LANGUAGES.find((l) => l.code === lang);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-surface-500 hover:text-surface-700 hover:bg-surface-100 transition-colors"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{current?.native || 'English'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 z-50 w-48 max-h-72 overflow-y-auto rounded-xl bg-white border border-surface-200 shadow-lg">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`w-full text-left px-4 py-2 text-sm transition-colors hover:bg-surface-100 ${
                lang === l.code
                  ? 'text-brand-600 font-medium bg-brand-50'
                  : 'text-surface-700'
              }`}
            >
              <span className="mr-2">{l.native}</span>
              <span className="text-xs text-surface-400">({l.name})</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
