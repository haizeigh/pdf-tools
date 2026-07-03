import { tools } from '../data/tools';
import { ToolCard } from '../components/features/ToolCard';
import { FileText, Shield, Zap, Globe } from 'lucide-react';

const features = [
  { icon: Zap, title: 'Blazing Fast', desc: 'All processing happens in your browser. No uploads, no waiting.' },
  { icon: Shield, title: '100% Private', desc: 'Files never leave your device. Your documents stay yours.' },
  { icon: Globe, title: 'Free Forever', desc: 'No signups, no limits, no hidden charges. Just tools that work.' },
];

export function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="text-center py-12 sm:py-16">
        <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-5">
          <Shield className="w-4 h-4" />
          Runs in your browser · Nothing is uploaded
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-surface-900 font-[family-name:var(--font-display)] leading-tight tracking-tight">
          Free PDF tools that
          <br />
          <span className="text-brand-600">respect your privacy</span>
        </h1>
        <p className="mt-3 text-base text-surface-500 max-w-xl mx-auto">
          Merge, compress, convert, split, delete, protect, and rotate PDFs — all locally in your browser. No uploads, no signups, no limits. Your files never leave your device.
        </p>
      </section>

      {/* Tools Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-8">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </section>

      {/* Blog link */}
      <div className="text-center pb-12">
        <a href="/blog" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-600 transition-colors">
          <FileText className="w-4 h-4" />
          Browse our PDF guides & tutorials →
        </a>
      </div>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-20">
        {features.map((f, i) => (
          <div key={i} className="text-center">
            <div className="w-12 h-12 rounded-xl bg-surface-100 flex items-center justify-center mx-auto mb-4">
              <f.icon className="w-6 h-6 text-brand-600" />
            </div>
            <h3 className="text-lg font-semibold text-surface-900 mb-1.5">{f.title}</h3>
            <p className="text-sm text-surface-500 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
