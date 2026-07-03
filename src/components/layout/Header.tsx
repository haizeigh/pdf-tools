import { FileText, Mail } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-surface-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-surface-900 font-[family-name:var(--font-display)]">
              PDF<span className="text-brand-600">Craft</span>
            </span>
          </a>
          <div className="flex items-center gap-4">
            <a href="mailto:support@aixiaot.com" className="hidden sm:inline-flex items-center gap-1 text-xs text-surface-400 hover:text-brand-600 transition-colors">
              <Mail className="w-3.5 h-3.5" />
              support@aixiaot.com
            </a>
            <span className="hidden sm:inline text-xs text-surface-400 bg-surface-100 px-3 py-1.5 rounded-full font-medium">
              Free · No limits · No signup
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
