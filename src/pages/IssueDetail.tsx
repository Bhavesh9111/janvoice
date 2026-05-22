import { useParams, Link } from 'react-router-dom';
import { MapPin, ThumbsUp, MessageCircle, Clock, Share2, Flag, ChevronLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StatusBeacon from '@/components/StatusBeacon';
import { mockIssues, CATEGORIES, STATUS_COLORS, STATUS_LABELS } from '@/data/issues';


const URGENCY_COLORS: Record<string, string> = {
  low: '#22c55e',
  medium: '#f37320',
  high: '#ef4444',
  urgent: '#dc2626',
};

export default function IssueDetail() {
  const { id } = useParams<{ id: string }>();
  const issue = mockIssues.find((i) => i.id === id) ?? mockIssues[0];

  const category = CATEGORIES[issue.category];
  const statusColor = STATUS_COLORS[issue.status];
  const urgencyColor = URGENCY_COLORS[issue.urgency];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        {/* Back Button */}
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Reports
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="card-elevated p-6">
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-4">
                <span
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: category.color + '20', color: category.color }}
                >
                  {category.label}
                </span>
                <span
                  className="px-2.5 py-1 rounded-md text-xs font-semibold"
                  style={{ backgroundColor: urgencyColor + '20', color: urgencyColor }}
                >
                  {issue.urgency.toUpperCase()} URGENCY
                </span>
                <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 text-[#9f9f9f]">
                  {issue.id}
                </span>
              </div>

              <h1 className="jv-heading-sm text-[#f5f5f5] mb-3">{issue.title}</h1>

              <div className="flex items-center gap-4 text-xs text-[#9f9f9f] mb-5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {issue.location.address}, {issue.location.city}, {issue.location.state}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(issue.createdAt)}
                </span>
              </div>

              <p className="text-sm text-[#9f9f9f] leading-relaxed mb-5">{issue.description}</p>

              {/* Image */}
              {issue.images.length > 0 && (
                <div className="rounded-xl overflow-hidden mb-5">
                  <img src={issue.images[0]} alt={issue.title} className="w-full h-64 object-cover" />
                </div>
              )}

              {/* Author & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#f37320]/10 flex items-center justify-center text-sm font-semibold text-[#f37320]">
                    {issue.author.isAnonymous ? '?' : issue.author.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#f5f5f5]">
                      {issue.author.isAnonymous ? 'Anonymous' : issue.author.name}
                    </p>
                    <p className="text-xs text-[#666]">Reporter</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f37320]/10 text-[#f37320] text-xs font-medium hover:bg-[#f37320]/20 transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    Support ({issue.supporters})
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#9f9f9f] hover:text-[#ef4444] transition-colors">
                    <Flag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card-elevated p-6">
              <h2 className="text-sm font-semibold text-[#f5f5f5] mb-5">Issue Timeline</h2>
              <div className="space-y-4">
                {issue.timeline.map((event, i) => {
                  const eventColor = STATUS_COLORS[event.status];
                  const isLast = i === issue.timeline.length - 1;
                  return (
                    <div key={event.id} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                          style={{ backgroundColor: eventColor + '20', border: `2px solid ${eventColor}` }}
                        >
                          {event.status === 'resolved' ? (
                            <CheckCircle2 className="w-4 h-4" style={{ color: eventColor }} />
                          ) : event.status === 'escalated' ? (
                            <AlertTriangle className="w-4 h-4" style={{ color: eventColor }} />
                          ) : (
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: eventColor }} />
                          )}
                        </div>
                        {!isLast && <div className="w-px flex-1 mt-1 bg-white/10" style={{ minHeight: 20 }} />}
                      </div>
                      <div className="pb-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span
                            className="px-2 py-0.5 rounded text-[10px] font-medium"
                            style={{ backgroundColor: eventColor + '15', color: eventColor }}
                          >
                            {STATUS_LABELS[event.status]}
                          </span>
                          <span className="text-[10px] text-[#666]">{formatDate(event.createdAt)}</span>
                        </div>
                        <p className="text-xs text-[#9f9f9f]">{event.description}</p>
                        <p className="text-[10px] text-[#666] mt-0.5">by {event.author}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Comments Section */}
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-[#f5f5f5]">
                  Comments ({issue.comments})
                </h2>
              </div>
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-[#26262b] flex items-center justify-center text-[#9f9f9f] flex-shrink-0 text-xs">
                  ?
                </div>
                <div className="flex-1">
                  <textarea
                    placeholder="Add your comment or update..."
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors resize-none"
                  />
                  <div className="flex justify-end mt-2">
                    <button className="btn-primary px-4 py-2 text-sm">Post Comment</button>
                  </div>
                </div>
              </div>
              <p className="text-xs text-center text-[#666]">Sign in to view and post comments</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Current Status */}
            <div className="card-elevated p-5">
              <h3 className="text-xs font-medium text-[#9f9f9f] uppercase tracking-wider mb-4">Current Status</h3>
              <div className="flex items-center gap-3 mb-4">
                <StatusBeacon status={issue.status} size="lg" showLabel={false} />
                <div>
                  <p className="text-sm font-semibold text-[#f5f5f5]">{STATUS_LABELS[issue.status]}</p>
                  <p className="text-xs text-[#9f9f9f]">{issue.timeline.length} updates</p>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/10 mb-1.5">
                <div
                  className="h-full rounded-full"
                  style={{
                    backgroundColor: statusColor,
                    width: `${Math.round((issue.timeline.length / 6) * 100)}%`
                  }}
                />
              </div>
              <p className="text-xs text-[#9f9f9f]">
                Step {issue.timeline.length} of 6 in the resolution pipeline
              </p>
            </div>

            {/* Stats */}
            <div className="card-elevated p-5">
              <h3 className="text-xs font-medium text-[#9f9f9f] uppercase tracking-wider mb-4">Issue Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9f9f9f] flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5" /> Supporters
                  </span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{issue.supporters}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9f9f9f] flex items-center gap-1.5">
                    <MessageCircle className="w-3.5 h-3.5" /> Comments
                  </span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">{issue.comments}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-[#9f9f9f] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Reported
                  </span>
                  <span className="text-sm font-semibold text-[#f5f5f5]">
                    {Math.floor((Date.now() - new Date(issue.createdAt).getTime()) / 86400000)}d ago
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elevated p-5">
              <h3 className="text-xs font-medium text-[#9f9f9f] uppercase tracking-wider mb-4">Actions</h3>
              <div className="space-y-2">
                <button className="w-full btn-primary py-2.5 text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  Support This Issue
                </button>
                <button className="w-full btn-secondary py-2.5 text-sm">
                  <Share2 className="w-4 h-4" />
                  Share Report
                </button>
                <Link to="/report" className="w-full btn-secondary py-2.5 text-sm flex items-center justify-center gap-2">
                  Report Similar Issue
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
