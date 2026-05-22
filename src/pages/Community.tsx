import { useState } from 'react';
import { MessageSquare, Users, Megaphone, Heart, ThumbsUp, ArrowRight, Flame, Clock, Pin, ChevronRight, BookOpen, Scale, Phone } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const FORUM_CATEGORIES = [
  { id: 'general', label: 'General Discussion', icon: MessageSquare, count: 234, color: '#06b6d4' },
  { id: 'legal', label: 'Legal Rights & RTI', icon: Scale, count: 87, color: '#8b5cf6' },
  { id: 'campaigns', label: 'Active Campaigns', icon: Megaphone, count: 45, color: '#f37320' },
  { id: 'volunteer', label: 'Volunteer Network', icon: Users, count: 192, color: '#146c17' },
];

const FORUM_POSTS = [
  {
    id: 1,
    title: 'How to file an effective RTI for road repair status?',
    author: 'Priya Sharma',
    category: 'Legal Rights & RTI',
    replies: 23,
    likes: 156,
    timeAgo: '2h ago',
    pinned: true,
    hot: false,
    excerpt: 'I\'ve been trying to get information about the road repair budget in our ward. Looking for guidance on the right RTI format...',
  },
  {
    id: 2,
    title: 'Successful water pipeline fix in Baner — how we did it',
    author: 'Amit Patil',
    category: 'Active Campaigns',
    replies: 47,
    likes: 312,
    timeAgo: '5h ago',
    pinned: false,
    hot: true,
    excerpt: 'After 3 months of consistent reporting and community pressure, the water department finally fixed the broken pipeline...',
  },
  {
    id: 3,
    title: 'Volunteer training session — Mumbai East, this Saturday',
    author: 'CJP Coordinator',
    category: 'Volunteer Network',
    replies: 18,
    likes: 89,
    timeAgo: '1d ago',
    pinned: true,
    hot: false,
    excerpt: 'We\'re organizing an in-person training session for new field volunteers in Mumbai East. Learn how to document and verify civic issues...',
  },
  {
    id: 4,
    title: 'Bribery at MSEB office — sharing my experience and RTI outcome',
    author: 'Anonymous',
    category: 'Legal Rights & RTI',
    replies: 64,
    likes: 445,
    timeAgo: '2d ago',
    pinned: false,
    hot: true,
    excerpt: 'Filed an RTI after being asked for a bribe at the electricity office. Here\'s what happened next and how you can do the same...',
  },
  {
    id: 5,
    title: 'Street vendor harassment by municipal officers — need legal help',
    author: 'Ramesh Kumar',
    category: 'General Discussion',
    replies: 31,
    likes: 127,
    timeAgo: '3d ago',
    pinned: false,
    hot: false,
    excerpt: 'My family has been running a fruit stall for 15 years. Recently facing illegal harassment by BMC officers demanding money...',
  },
];

const CAMPAIGNS = [
  {
    title: 'Fix Maharashtra Roads 2026',
    org: 'CJP Foundation',
    supporters: 12840,
    target: 20000,
    image: '/issue-pothole.jpg',
    status: 'Active',
    daysLeft: 14,
    description: 'Demanding immediate repair of 500+ reported potholes across Maharashtra before monsoon season.',
  },
  {
    title: 'Safe Streets for Women',
    org: 'Citizens United',
    supporters: 8234,
    target: 10000,
    image: '/issue-streetlight.jpg',
    status: 'Active',
    daysLeft: 7,
    description: 'Petition for 100% functional streetlights across all residential areas by end of 2026.',
  },
  {
    title: 'Zero Tolerance for Open Dumping',
    org: 'Green Maharashtra',
    supporters: 5612,
    target: 15000,
    image: '/issue-garbage.jpg',
    status: 'Active',
    daysLeft: 21,
    description: 'Demanding strict enforcement of garbage disposal laws and action against illegal dumping sites.',
  },
];

const RESOURCES = [
  {
    title: 'How to File an RTI',
    desc: 'Step-by-step guide to the Right to Information process',
    icon: BookOpen,
    color: '#8b5cf6',
  },
  {
    title: 'Know Your Civic Rights',
    desc: 'Constitutional and statutory rights every citizen should know',
    icon: Scale,
    color: '#f37320',
  },
  {
    title: 'Helpline Directory',
    desc: 'Direct numbers for municipal, police, and utility departments',
    icon: Phone,
    color: '#146c17',
  },
  {
    title: 'Volunteer Handbook',
    desc: 'Training materials for field verification volunteers',
    icon: Users,
    color: '#06b6d4',
  },
];

export default function Community() {
  const [activeTab, setActiveTab] = useState<'forum' | 'campaigns' | 'resources'>('forum');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="jv-caption text-[#f37320] mb-2">COMMUNITY</p>
          <h1 className="jv-heading-lg text-[#f5f5f5] mb-2">The People's Forum</h1>
          <p className="text-sm text-[#9f9f9f]">Join discussions, support campaigns, and access legal resources</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Community Members', value: '48,291', icon: Users },
            { label: 'Active Discussions', value: '558', icon: MessageSquare },
            { label: 'Campaigns Running', value: '23', icon: Megaphone },
            { label: 'Legal Wins This Year', value: '142', icon: Scale },
          ].map((s) => (
            <div key={s.label} className="card-elevated p-4 text-center">
              <p className="text-xl font-semibold text-[#f5f5f5]">{s.value}</p>
              <p className="text-xs text-[#9f9f9f] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#26262b] border border-white/10 mb-8 w-fit">
          {[
            { id: 'forum', label: 'Forum', icon: MessageSquare },
            { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
            { id: 'resources', label: 'Resources', icon: BookOpen },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#f37320] text-[#17171a]'
                  : 'text-[#9f9f9f] hover:text-[#f5f5f5]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Forum Tab */}
        {activeTab === 'forum' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Categories */}
            <div className="lg:col-span-1">
              <div className="card-elevated p-4 sticky top-24">
                <h3 className="text-xs font-medium text-[#9f9f9f] uppercase tracking-wider mb-3">Categories</h3>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${selectedCategory === 'all' ? 'bg-[#f37320]/10 text-[#f37320]' : 'text-[#9f9f9f] hover:bg-white/5 hover:text-[#f5f5f5]'}`}
                  >
                    <span>All Topics</span>
                    <span className="text-xs">558</span>
                  </button>
                  {FORUM_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${selectedCategory === cat.id ? 'text-white' : 'text-[#9f9f9f] hover:bg-white/5 hover:text-[#f5f5f5]'}`}
                      style={selectedCategory === cat.id ? { backgroundColor: cat.color + '20', color: cat.color } : {}}
                    >
                      <div className="flex items-center gap-2">
                        <cat.icon className="w-3.5 h-3.5" />
                        {cat.label}
                      </div>
                      <span className="text-xs">{cat.count}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-white/5">
                  <button className="w-full btn-primary py-2.5 text-sm">
                    Start Discussion
                  </button>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="lg:col-span-3 space-y-3">
              {FORUM_POSTS.map((post, i) => (
                <div
                  key={post.id}
                  className="card-elevated p-5 cursor-pointer group animate-float-up"
                  style={{ animationDelay: `${i * 0.08}s`, animationFillMode: 'both', opacity: 0 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#f37320]/30 to-[#f37320]/10 flex items-center justify-center flex-shrink-0 text-sm font-semibold text-[#f37320]">
                      {post.author[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        {post.pinned && (
                          <span className="flex items-center gap-1 text-[10px] text-[#06b6d4] bg-[#06b6d4]/10 px-2 py-0.5 rounded-full">
                            <Pin className="w-2.5 h-2.5" /> Pinned
                          </span>
                        )}
                        {post.hot && (
                          <span className="flex items-center gap-1 text-[10px] text-[#ef4444] bg-[#ef4444]/10 px-2 py-0.5 rounded-full">
                            <Flame className="w-2.5 h-2.5" /> Hot
                          </span>
                        )}
                        <span className="text-[10px] text-[#9f9f9f] bg-white/5 px-2 py-0.5 rounded-full">{post.category}</span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1 group-hover:text-[#f37320] transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-xs text-[#9f9f9f] line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[#666]">by {post.author}</span>
                        <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
                          <Clock className="w-3 h-3" />{post.timeAgo}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
                          <MessageSquare className="w-3 h-3" />{post.replies}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
                          <ThumbsUp className="w-3 h-3" />{post.likes}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Campaigns Tab */}
        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-medium text-[#9f9f9f]">23 active campaigns across India</h2>
              <button className="btn-primary px-4 py-2 text-sm">
                <Megaphone className="w-4 h-4" />
                Start Campaign
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CAMPAIGNS.map((c, i) => {
                const pct = Math.round((c.supporters / c.target) * 100);
                return (
                  <div key={c.title} className="card-elevated overflow-hidden group cursor-pointer animate-float-up" style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both', opacity: 0 }}>
                    <div className="relative h-44 overflow-hidden">
                      <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#26262b] to-transparent" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-[#146c17]/20 text-[#146c17]">
                        {c.status}
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#9f9f9f] mb-1">by {c.org}</p>
                      <h3 className="text-sm font-semibold text-[#f5f5f5] mb-2 group-hover:text-[#f37320] transition-colors">{c.title}</h3>
                      <p className="text-xs text-[#9f9f9f] mb-4 line-clamp-2">{c.description}</p>
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-[#9f9f9f] mb-1.5">
                          <span>{c.supporters.toLocaleString()} / {c.target.toLocaleString()}</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-[#f37320]" style={{ width: `${Math.min(pct, 100)}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#9f9f9f]">{c.daysLeft} days left</span>
                        <button className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#f37320]/10 text-[#f37320] text-xs font-medium hover:bg-[#f37320]/20 transition-colors">
                          <Heart className="w-3 h-3" /> Support
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOURCES.map((r, i) => (
              <div
                key={r.title}
                className="card-elevated p-6 cursor-pointer group animate-float-up"
                style={{ animationDelay: `${i * 0.1}s`, animationFillMode: 'both', opacity: 0 }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.color + '15' }}>
                    <r.icon className="w-6 h-6" style={{ color: r.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[#f5f5f5] mb-1 group-hover:text-[#f37320] transition-colors">{r.title}</h3>
                    <p className="text-xs text-[#9f9f9f] mb-4">{r.desc}</p>
                    <button className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all" style={{ color: r.color }}>
                      Access Resource <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* CJP Legal Helpline */}
            <div className="md:col-span-2 card-elevated p-6" style={{ background: 'linear-gradient(135deg, rgba(243,115,32,0.08) 0%, rgba(26,26,26,0) 100%)' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-4 h-4 text-[#f37320]" />
                    <h3 className="text-sm font-semibold text-[#f5f5f5]">CJP Free Legal Helpline</h3>
                  </div>
                  <p className="text-xs text-[#9f9f9f]">Connect with our partner lawyers for free guidance on civic rights, RTI, and harassment cases.</p>
                </div>
                <button className="btn-primary px-6 py-2.5 flex-shrink-0">
                  Contact Now <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
