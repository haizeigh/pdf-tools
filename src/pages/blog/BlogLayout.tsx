import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface BlogLayoutProps {
  title: string;
  children: ReactNode;
}

export function BlogLayout({ title, children }: BlogLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <a href="/blog" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to guides
      </a>
      <article className="prose prose-surface max-w-none">
        <h1 className="text-3xl font-bold text-surface-900 font-[family-name:var(--font-display)] mb-8">{title}</h1>
        {children}
      </article>
    </div>
  );
}
