import { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { mockIssues, CATEGORIES, STATUS_COLORS, type IssueCategory, type IssueStatus } from '@/data/issues';
import IssueCard from '@/components/IssueCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const STATUSES: IssueStatus[] = ['pending', 'under_verification', 'published', 'escalated', 'authority_responded', 'in_progress', 'resolved'];
const CITIES = ['All Cities', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];

export default function Track() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [sortBy, setSortBy] = useState<'newest' | 'supporters' | 'urgency'>('newest');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = mockIssues.filter((issue) => {
    const matchesSearch = !search ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesCity = cityFilter === 'All Cities' || issue.location.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesCity;
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'supporters') return b.supporters - a.supporters;
    const urgencyOrder = { urgent: 3, high: 2, medium: 1, low: 0 };
    return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
  });

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="jv-caption text-[#f37320] mb-2">TRACK ISSUES</p>
          <h1 className="jv-heading-lg text-[#f5f5f5] mb-2">Public Issue Feed</h1>
          <p className="text-sm text-[#9f9f9f]">Follow civic issues in your community and across India</p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9f9f9f]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, ID, or location..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(statusFilter !== 'all' || categoryFilter !== 'all' || cityFilter !== 'All Cities') && (
                <span className="w-2 h-2 rounded-full bg-[#f37320]" />
              )}
            </button>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="appearance-none px-4 py-2.5 pr-10 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] focus:outline-none focus:border-[#f37320]/50 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="supporters">Most Supported</option>
                <option value="urgency">Highest Urgency</option>
              </select>
              <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-[#9f9f9f] pointer-events-none" />
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="p-4 rounded-xl bg-[#26262b] border border-white/[0.06] space-y-4 animate-fade-in">
              {/* Status */}
              <div>
                <label className="block text-xs text-[#9f9f9f] uppercase tracking-wider mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      statusFilter === 'all' ? 'bg-[#f37320] text-[#17171a] font-medium' : 'bg-[#1e1e22] text-[#9f9f9f] border border-white/10'
                    }`}
                  >
                    All
                  </button>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        statusFilter === s ? 'text-white font-medium' : 'bg-[#1e1e22] text-[#9f9f9f] border border-white/10'
                      }`}
                      style={statusFilter === s ? { backgroundColor: STATUS_COLORS[s] } : {}}
                    >
                      {s.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs text-[#9f9f9f] uppercase tracking-wider mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                      categoryFilter === 'all' ? 'bg-[#f37320] text-[#17171a] font-medium' : 'bg-[#1e1e22] text-[#9f9f9f] border border-white/10'
                    }`}
                  >
                    All
                  </button>
                  {(Object.keys(CATEGORIES) as IssueCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        categoryFilter === cat ? 'text-white font-medium' : 'bg-[#1e1e22] text-[#9f9f9f] border border-white/10'
                      }`}
                      style={categoryFilter === cat ? { backgroundColor: CATEGORIES[cat].color } : {}}
                    >
                      {CATEGORIES[cat].label}
                    </button>
                  ))}
                </div>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs text-[#9f9f9f] uppercase tracking-wider mb-2">City</label>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCityFilter(c)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        cityFilter === c ? 'bg-[#f37320] text-[#17171a] font-medium' : 'bg-[#1e1e22] text-[#9f9f9f] border border-white/10'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#9f9f9f]">
            Showing <span className="text-[#f5f5f5] font-medium">{filtered.length}</span> issues
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((issue, i) => (
            <IssueCard key={issue.id} issue={issue} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-[#333] mx-auto mb-4" />
            <p className="text-[#9f9f9f] mb-2">No issues found matching your criteria</p>
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setCategoryFilter('all'); setCityFilter('All Cities'); }}
              className="text-sm text-[#f37320] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
