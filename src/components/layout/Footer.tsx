import { useLang } from '../../i18n/LangContext';
import { t } from '../../i18n/translations';

export function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-surface-200 bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-surface-400">
            {t(lang, 'footer')}
          </p>
          <div className="flex items-center gap-4 text-sm text-surface-400">
            <a href="/privacy" className="hover:text-brand-600 transition-colors">{t(lang, 'privacyTitle')}</a>
            <span className="text-surface-300">·</span>
            <a href="mailto:support@aixiaot.com" className="hover:text-brand-600 transition-colors">
              support@aixiaot.com
            </a>
            <span className="text-surface-300">·</span>
            <span>{t(lang, 'footerBrand')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
