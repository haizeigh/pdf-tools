import { iconMap } from '../../data/tools';
import type { Tool } from '../../types';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = iconMap[tool.icon] || iconMap.FileUp;

  return (
    <a
      href={tool.path}
      className="group relative overflow-hidden rounded-2xl bg-white border border-surface-200 p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-brand-200"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 shadow-sm`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-surface-900 mb-1.5 group-hover:text-brand-700 transition-colors">
          {tool.name}
        </h3>
        <p className="text-sm text-surface-500 leading-relaxed">
          {tool.description}
        </p>
      </div>
    </a>
  );
}
