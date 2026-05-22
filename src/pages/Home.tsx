import { Link } from 'react-router-dom';
import {
  ArrowRight,
  AlertTriangle,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  ChevronRight,
  Mic2,
  Eye,
  Zap,
} from 'lucide-react';

import Navigation from '@/components/Navigation';
import HeroGrid from '@/components/HeroGrid';
import Footer from '@/components/Footer';
import { mockIssues } from '@/data/issues';
import IssueCard from '@/components/IssueCard';

const STATS = [
  {
    label: 'Total Reports',
    value: '0',
    icon: Mic2,
    color: '#f37320',
  },

  {
    label: 'Issues Resolved',
    value: '0%',
    icon: CheckCircle2,
    color: '#146c17',
  },

  {
    label: 'Active Volunteers',
    value: '0',
    icon: Users,
    color: '#06b6d4',
  },

  {
    label: 'Avg Response Time',
    value: '0 days',
    icon: Clock,
    color: '#8b5cf6',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Report an Issue',
    desc:
      'Citizens document civic problems with photos, location, and details. Anonymous reporting is supported.',
    icon: Mic2,
    color: '#f37320',
  },

  {
    step: '02',
    title: 'Verification & Publishing',
    desc:
      'Our volunteer network verifies reports on the ground. Valid issues are published to the public feed.',
    icon: Eye,
    color: '#06b6d4',
  },

  {
    step: '03',
    title: 'Escalation to Authorities',
    desc:
      'Issues are automatically escalated to the relevant government departments with digital evidence.',
    icon: Zap,
    color: '#8b5cf6',
  },

  {
    step: '04',
    title: 'Resolution & Accountability',
    desc:
      'Track progress in real-time. Authority response times are publicly scored for transparency.',
    icon: CheckCircle2,
    color: '#146c17',
  },
];

/* EMPTY CAMPAIGNS */
const CAMPAIGNS: any[] = [];

export default function Home() {
  const recentIssues = mockIssues.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroGrid />

        <div className="absolute inset-0 bg-gradient-to-b from-[#17171a]/60 via-transparent to-[#17171a] pointer-events-none z-10" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#17171a] via-transparent to-transparent pointer-events-none z-10" />

        <div className="jv-container relative z-20 pt-24 pb-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f37320]/10 border border-[#f37320]/20 text-xs text-[#f37320] font-medium mb-8 animate-float-up">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f37320]" />
              India's First Citizen Accountability Platform
            </div>

            <h1
              className="jv-heading-xl text-[#f5f5f5] mb-6 animate-float-up"
              style={{
                animationDelay: '0.1s',
                animationFillMode: 'both',
              }}
            >
              Speak.
              <br />

              <span style={{ color: '#f37320' }}>
                Report.
              </span>

              <br />

              Change.
            </h1>

            <p
              className="text-base sm:text-lg text-[#9f9f9f] max-w-xl mb-10 leading-relaxed animate-float-up"
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              JanVoice empowers citizens to expose civic failures,
              demand accountability, and drive real change through
              transparency and collective action.
            </p>

            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-float-up"
              style={{
                animationDelay: '0.3s',
                animationFillMode: 'both',
              }}
            >
              <Link
                to="/report"
                className="btn-primary px-8 py-4 text-base"
              >
                Report an Issue

                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/explore"
                className="btn-secondary px-8 py-4 text-base"
              >
                Explore Reports
              </Link>
            </div>

            {/* MINI STATS */}
            <div
              className="flex items-center gap-6 mt-14 animate-float-up"
              style={{
                animationDelay: '0.4s',
                animationFillMode: 'both',
              }}
            >
              {[
                { v: '0', l: 'Reports filed' },
                { v: '0%', l: 'Resolved' },
                { v: '0', l: 'Volunteers' },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-semibold text-[#f5f5f5]">
                    {s.v}
                  </p>

                  <p className="text-xs text-[#9f9f9f]">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#9f9f9f] animate-bounce">
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-white/40" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 bg-[#17171a] border-y border-white/5">
        <div className="jv-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="card-elevated p-6"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: stat.color + '15',
                  }}
                >
                  <stat.icon
                    className="w-5 h-5"
                    style={{ color: stat.color }}
                  />
                </div>

                <p className="text-3xl font-semibold text-[#f5f5f5] mb-1">
                  {stat.value}
                </p>

                <p className="text-xs text-[#9f9f9f]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}