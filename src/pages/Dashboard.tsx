import { TrendingUp, Users, CheckCircle2, Clock, AlertTriangle, ArrowUp, ArrowDown, Shield, Mic2 } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { dashboardStats, departmentScores, mockIssues, STATUS_COLORS } from '@/data/issues';

const MONTHS = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];

const TOP_STATS = [
  {
    label: 'Total Reports',
    value: '12,453',
    change: '+18%',
    up: true,
    icon: Mic2,
    color: '#f37320',
  },
  {
    label: 'Resolution Rate',
    value: '68%',
    change: '+5%',
    up: true,
    icon: CheckCircle2,
    color: '#146c17',
  },
  {
    label: 'Avg Response Time',
    value: '4.2 days',
    change: '-0.8d',
    up: true,
    icon: Clock,
    color: '#06b6d4',
  },
  {
    label: 'Active Volunteers',
    value: '2,847',
    change: '+312',
    up: true,
    icon: Users,
    color: '#8b5cf6',
  },
];

const CATEGORY_BREAKDOWN = [
  { label: 'Infrastructure', count: 4820, pct: 39, color: '#f37320' },
  { label: 'Sanitation', count: 2890, pct: 23, color: '#22c55e' },
  { label: 'Safety', count: 1987, pct: 16, color: '#ef4444' },
  { label: 'Corruption', count: 1245, pct: 10, color: '#f37320' },
  { label: 'Public Services', count: 987, pct: 8, color: '#06b6d4' },
  { label: 'Environment', count: 524, pct: 4, color: '#146c17' },
];

const TOP_CITIES = [
  { city: 'Mumbai', reports: 3240, resolved: 71 },
  { city: 'Pune', reports: 2180, resolved: 65 },
  { city: 'Delhi', reports: 1870, resolved: 58 },
  { city: 'Bangalore', reports: 1540, resolved: 72 },
  { city: 'Hyderabad', reports: 1120, resolved: 69 },
];

export default function Dashboard() {
  const maxBar = Math.max(...dashboardStats.weeklyReports);

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        {/* Header */}
        <div className="mb-10">
          <p className="jv-caption text-[#f37320] mb-2">TRANSPARENCY DASHBOARD</p>
          <h1 className="jv-heading-lg text-[#f5f5f5] mb-2">Real-Time Accountability</h1>
          <p className="text-sm text-[#9f9f9f]">Live data on civic issue reporting, resolution, and government performance across India</p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {TOP_STATS.map((stat) => (
            <div key={stat.label} className="card-elevated p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <span className={`flex items-center gap-0.5 text-xs font-medium ${stat.up ? 'text-[#146c17]' : 'text-[#ef4444]'}`}>
                  {stat.up ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-semibold text-[#f5f5f5] mb-0.5">{stat.value}</p>
              <p className="text-xs text-[#9f9f9f]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Chart */}
          <div className="lg:col-span-2 card-elevated p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-[#f5f5f5]">Reports vs Resolved</h3>
                <p className="text-xs text-[#9f9f9f]">Last 12 months</p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 text-[#9f9f9f]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#f37320]" /> Reports
                </span>
                <span className="flex items-center gap-1.5 text-[#9f9f9f]">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#146c17]" /> Resolved
                </span>
              </div>
            </div>
            <div className="flex items-end gap-1.5 h-36">
              {dashboardStats.weeklyReports.map((val, i) => {
                const resolved = dashboardStats.weeklyResolved[i];
                const reportH = (val / maxBar) * 100;
                const resolvedH = (resolved / maxBar) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div className="w-full flex items-end gap-0.5 h-32">
                      <div className="flex-1 rounded-sm" style={{ height: `${reportH}%`, backgroundColor: '#f37320', minHeight: 4 }} />
                      <div className="flex-1 rounded-sm" style={{ height: `${resolvedH}%`, backgroundColor: '#146c17', minHeight: 4 }} />
                    </div>
                    <span className="text-[9px] text-[#666]">{MONTHS[i]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="card-elevated p-6">
            <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1">By Category</h3>
            <p className="text-xs text-[#9f9f9f] mb-5">Issue distribution</p>
            <div className="space-y-3">
              {CATEGORY_BREAKDOWN.map((cat) => (
                <div key={cat.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#9f9f9f]">{cat.label}</span>
                    <span className="text-[#f5f5f5] font-medium">{cat.count.toLocaleString()}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10">
                    <div className="h-full rounded-full" style={{ width: `${cat.pct}%`, backgroundColor: cat.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Department Scores */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-[#f37320]" />
              <h3 className="text-sm font-semibold text-[#f5f5f5]">Department Accountability Index</h3>
            </div>
            <div className="space-y-4">
              {departmentScores.map((dept) => {
                const color = dept.score >= 70 ? '#146c17' : dept.score >= 50 ? '#f37320' : '#ef4444';
                return (
                  <div key={dept.name} className="flex items-center gap-3">
                    <div className="w-36 flex-shrink-0">
                      <p className="text-xs text-[#9f9f9f] leading-tight">{dept.name}</p>
                    </div>
                    <div className="flex-1 h-2 rounded-full bg-white/10">
                      <div className="h-full rounded-full transition-all" style={{ width: `${dept.score}%`, backgroundColor: color }} />
                    </div>
                    <span className="text-sm font-mono font-medium w-7 text-right" style={{ color }}>
                      {dept.score}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-[#666] mt-4">Score out of 100 · Updated weekly</p>
          </div>

          {/* Top Cities */}
          <div className="card-elevated p-6">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-[#06b6d4]" />
              <h3 className="text-sm font-semibold text-[#f5f5f5]">Top Cities by Activity</h3>
            </div>
            <div className="space-y-3">
              {TOP_CITIES.map((c, i) => (
                <div key={c.city} className="flex items-center gap-3 py-2.5 border-b border-white/5 last:border-0">
                  <span className="text-xs font-mono text-[#666] w-5">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#f5f5f5] font-medium">{c.city}</span>
                      <span className="text-xs text-[#9f9f9f]">{c.reports.toLocaleString()} reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#06b6d4]" style={{ width: `${c.resolved}%` }} />
                      </div>
                      <span className="text-xs text-[#06b6d4] font-mono">{c.resolved}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent High-Priority Issues */}
        <div className="card-elevated p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#ef4444]" />
              <h3 className="text-sm font-semibold text-[#f5f5f5]">High Priority — Needs Attention</h3>
            </div>
            <a href="/explore" className="text-xs text-[#f37320] hover:text-[#f37320]/80 transition-colors">View all</a>
          </div>
          <div className="space-y-3">
            {mockIssues.filter(i => i.urgency === 'urgent' || i.urgency === 'high').slice(0, 4).map((issue) => {
              const statusColor = STATUS_COLORS[issue.status];
              return (
                <a key={issue.id} href={`/issue/${issue.id}`} className="flex items-center gap-3 py-3 border-b border-white/5 last:border-0 group">
                  <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                    {issue.images[0] ? (
                      <img src={issue.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#333] flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-[#666]" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#f5f5f5] font-medium truncate group-hover:text-[#f37320] transition-colors">{issue.title}</p>
                    <p className="text-xs text-[#9f9f9f]">{issue.location.city} · {issue.supporters} supporters</p>
                  </div>
                  <span className="px-2 py-1 rounded text-xs font-medium flex-shrink-0" style={{ backgroundColor: statusColor + '15', color: statusColor }}>
                    {issue.status.replace(/_/g, ' ')}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
