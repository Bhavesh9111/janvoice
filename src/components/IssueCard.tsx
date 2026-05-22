import { Link } from 'react-router-dom';
import { MapPin, ThumbsUp, MessageCircle, Clock, ShieldAlert, Scale, Trash2, TreePine, Building2, CircleDot } from 'lucide-react';
import { type Issue, CATEGORIES, STATUS_COLORS } from '@/data/issues';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Road: <CircleDot className="w-3.5 h-3.5" />,
  ShieldAlert: <ShieldAlert className="w-3.5 h-3.5" />,
  Trash2: <Trash2 className="w-3.5 h-3.5" />,
  Scale: <Scale className="w-3.5 h-3.5" />,
  TreePine: <TreePine className="w-3.5 h-3.5" />,
  Building2: <Building2 className="w-3.5 h-3.5" />,
  CircleDot: <CircleDot className="w-3.5 h-3.5" />,
};

interface IssueCardProps {
  issue: Issue;
  index?: number;
}

export default function IssueCard({ issue, index = 0 }: IssueCardProps) {
  const category = CATEGORIES[issue.category];
  const statusColor = STATUS_COLORS[issue.status];
  const delay = index * 0.08;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHrs / 24);
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHrs > 0) return `${diffHrs}h ago`;
    return 'Just now';
  };

  return (
    <Link
      to={`/issue/${issue.id}`}
      className="card-elevated overflow-hidden group animate-float-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both', opacity: 0 }}
    >
      {/* Image */}
      {issue.images.length > 0 && (
        <div className="relative h-44 overflow-hidden">
          <img
            src={issue.images[0]}
            alt={issue.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#26262b] via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1"
              style={{ backgroundColor: category.color + '20', color: category.color }}
            >
              {CATEGORY_ICONS[category.icon]}
              {category.label}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className="px-2.5 py-1 rounded-md text-xs font-semibold"
              style={{
                backgroundColor: statusColor + '20',
                color: statusColor,
              }}
            >
              {issue.urgency === 'urgent' && <ShieldAlert className="w-3 h-3 inline mr-1" />}
              {issue.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-[#f5f5f5] leading-snug group-hover:text-[#f37320] transition-colors line-clamp-2">
            {issue.title}
          </h3>
        </div>

        <p className="text-xs text-[#9f9f9f] line-clamp-2 mb-3 leading-relaxed">
          {issue.description}
        </p>

        <div className="flex items-center gap-1 text-xs text-[#9f9f9f] mb-3">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{issue.location.address}, {issue.location.city}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
              <ThumbsUp className="w-3 h-3" />
              {issue.supporters}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
              <MessageCircle className="w-3 h-3" />
              {issue.comments}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#9f9f9f]">
            <Clock className="w-3 h-3" />
            {formatDate(issue.createdAt)}
          </div>
        </div>
      </div>
    </Link>
  );
}
