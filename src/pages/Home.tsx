import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, BarChart3, Users, CheckCircle2, Clock, ChevronRight, Mic2, Eye, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import HeroGrid from '@/components/HeroGrid';
import Footer from '@/components/Footer';
import { mockIssues } from '@/data/issues';
import IssueCard from '@/components/IssueCard';

const STATS = [
  { label: 'Total Reports', value: '12,453', icon: Mic2, color: '#f37320' },
  { label: 'Issues Resolved', value: '68%', icon: CheckCircle2, color: '#146c17' },
  { label: 'Active Volunteers', value: '2,847', icon: Users, color: '#06b6d4' },
  { label: 'Avg Response Time', value: '4.2 days', icon: Clock, color: '#8b5cf6' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Report an Issue',
    desc: 'Citizens document civic problems with photos, location, and details. Anonymous reporting is supported.',
    icon: Mic2,
    color: '#f37320',
  },
  {
    step: '02',
    title: 'Verification & Publishing',
    desc: 'Our volunteer network verifies reports on the ground. Valid issues are published to the public feed.',
    icon: Eye,
    color: '#06b6d4',
  },
  {
    step: '03',
    title: 'Escalation to Authorities',
    desc: 'Issues are automatically escalated to the relevant government departments with digital evidence.',
    icon: Zap,
    color: '#8b5cf6',
  },
  {
    step: '04',
    title: 'Resolution & Accountability',
    desc: 'Track progress in real-time. Authority response times are publicly scored for transparency.',
    icon: CheckCircle2,
    color: '#146c17',
  },
];

const CAMPAIGNS = [
  {
    title: 'Fix Maharashtra Roads',
    category: 'Infrastructure',
    supporters: 12840,
    target: 20000,
    daysLeft: 14,
    image: '/issue-pothole.jpg',
  },
  {
    title: 'Safe Streets Initiative',
    category: 'Safety',
    supporters: 8234,
    target: 10000,
    daysLeft: 7,
    image: '/issue-sidewalk.jpg',
  },
  {
    title: 'Clean Mumbai Campaign',
    category: 'Sanitation',
    supporters: 5612,
    target: 15000,
    daysLeft: 21,
    image: '/issue-garbage.jpg',
  },
];

export default function Home() {
  const recentIssues = mockIssues.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroGrid />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#17171a]/60 via-transparent to-[#17171a] pointer-events-none z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#17171a] via-transparent to-transparent pointer-events-none z-10" />

        <div className="jv-container relative z-20 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f37320]/10 border border-[#f37320]/20 text-xs text-[#f37320] font-medium mb-8 animate-float-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f37320]" />
              India's First Citizen Accountability Platform
            </div>

            <h1 className="jv-heading-xl text-[#f5f5f5] mb-6 animate-float-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Speak.<br />
              <span style={{ color: '#f37320' }}>Report.</span><br />
              Change.
            </h1>

            <p className="text-base sm:text-lg text-[#9f9f9f] max-w-xl mb-10 leading-relaxed animate-float-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              JanVoice empowers citizens to expose civic failures, demand accountability,
              and drive real change through transparency and collective action.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-float-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              <Link to="/report" className="btn-primary px-8 py-4 text-base">
                Report an Issue
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/explore" className="btn-secondary px-8 py-4 text-base">
                Explore Reports
              </Link>
            </div>

            {/* Mini Stats Row */}
            <div className="flex items-center gap-6 mt-14 animate-float-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              {[
                { v: '12K+', l: 'Reports filed' },
                { v: '68%', l: 'Resolved' },
                { v: '2.8K', l: 'Volunteers' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-semibold text-[#f5f5f5]">{s.v}</p>
                  <p className="text-xs text-[#9f9f9f]">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#9f9f9f] animate-bounce">
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 bg-[#17171a] border-y border-white/5">
        <div className="jv-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label} className="card-elevated p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: stat.color + '15' }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <p className="text-3xl font-semibold text-[#f5f5f5] mb-1">{stat.value}</p>
                <p className="text-xs text-[#9f9f9f]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RECENT ISSUES ── */}
      <section className="py-24">
        <div className="jv-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="jv-caption text-[#f37320] mb-2">LATEST REPORTS</p>
              <h2 className="jv-heading-lg text-[#f5f5f5]">Issues Happening<br />Right Now</h2>
            </div>
            <Link to="/explore" className="hidden sm:flex items-center gap-2 text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors">
              View all reports
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentIssues.map((issue, i) => (
              <IssueCard key={issue.id} issue={issue} index={i} />
            ))}
          </div>

          <Link to="/explore" className="sm:hidden flex items-center justify-center gap-2 mt-8 text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors">
            View all reports
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 bg-[#0f0f12]">
        <div className="jv-container">
          <div className="text-center mb-16">
            <p className="jv-caption text-[#f37320] mb-3">PROCESS</p>
            <h2 className="jv-heading-lg text-[#f5f5f5] mb-4">How JanVoice Works</h2>
            <p className="text-sm text-[#9f9f9f] max-w-lg mx-auto">
              From citizen report to government action — a transparent, end-to-end accountability pipeline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%-12px)] w-6 h-px bg-white/10 z-10" />
                )}
                <div className="card-elevated p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: step.color + '15' }}>
                      <step.icon className="w-5 h-5" style={{ color: step.color }} />
                    </div>
                    <span className="text-xs font-mono text-[#666]">{step.step}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2">{step.title}</h3>
                  <p className="text-xs text-[#9f9f9f] leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVE CAMPAIGNS ── */}
      <section className="py-24">
        <div className="jv-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="jv-caption text-[#f37320] mb-2">CAMPAIGNS</p>
              <h2 className="jv-heading-lg text-[#f5f5f5]">Active Campaigns<br />Needing Support</h2>
            </div>
            <Link to="/community" className="hidden sm:flex items-center gap-2 text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors">
              All campaigns
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAMPAIGNS.map((c) => {
              const pct = Math.round((c.supporters / c.target) * 100);
              return (
                <div key={c.title} className="card-elevated overflow-hidden group cursor-pointer">
                  <div className="relative h-40 overflow-hidden">
                    <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#26262b] to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#f37320]/20 text-[#f37320]">
                      {c.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-semibold text-[#f5f5f5] mb-3">{c.title}</h3>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-[#9f9f9f] mb-1.5">
                        <span>{c.supporters.toLocaleString()} supporters</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#f37320]" style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9f9f9f]">{c.daysLeft} days left</span>
                      <button className="text-xs text-[#f37320] font-medium flex items-center gap-1 hover:gap-2 transition-all">
                        Support <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 bg-[#0f0f12]">
        <div className="jv-container">
          <div className="relative overflow-hidden rounded-2xl p-12 sm:p-16 text-center" style={{ background: 'linear-gradient(135deg, #1a1007 0%, #17171a 50%, #0a1a0a 100%)' }}>
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, #f37320 0%, transparent 40%), radial-gradient(circle at 80% 50%, #146c17 0%, transparent 40%)'
            }} />
            <div className="relative z-10">
              <AlertTriangle className="w-12 h-12 text-[#f37320] mx-auto mb-6" />
              <h2 className="jv-heading-md text-[#f5f5f5] mb-4">See Something Wrong?</h2>
              <p className="text-sm text-[#9f9f9f] max-w-md mx-auto mb-8">
                Don't scroll past injustice. Every report matters. Your voice creates accountability.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/report" className="btn-primary px-8 py-4">
                  Report Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/report?emergency=true" className="btn-secondary px-8 py-4 border-red-500/30 text-red-400">
                  <AlertTriangle className="w-4 h-4" />
                  Emergency Report
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRANSPARENCY SCORES ── */}
      <section className="py-24">
        <div className="jv-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="jv-caption text-[#f37320] mb-3">ACCOUNTABILITY INDEX</p>
              <h2 className="jv-heading-lg text-[#f5f5f5] mb-6">Government Department<br />Transparency Scores</h2>
              <p className="text-sm text-[#9f9f9f] mb-8 leading-relaxed">
                We score every government department based on response time, resolution rate, and citizen satisfaction.
                Public pressure drives better governance.
              </p>
              <Link to="/dashboard" className="btn-primary inline-flex px-6 py-3">
                Full Dashboard
                <BarChart3 className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-4">
              {[
                { name: 'Municipal Corporation', score: 72, color: '#f37320' },
                { name: 'Traffic Police', score: 64, color: '#06b6d4' },
                { name: 'Public Works Dept', score: 58, color: '#8b5cf6' },
                { name: 'Electricity Board', score: 45, color: '#ef4444' },
                { name: 'Water Supply Dept', score: 38, color: '#ef4444' },
              ].map((dept) => (
                <div key={dept.name} className="flex items-center gap-4">
                  <div className="w-40 flex-shrink-0">
                    <p className="text-xs text-[#9f9f9f] truncate">{dept.name}</p>
                  </div>
                  <div className="flex-1 h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${dept.score}%`, backgroundColor: dept.color }}
                    />
                  </div>
                  <span className="text-sm font-mono text-[#f5f5f5] w-8 text-right">{dept.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
