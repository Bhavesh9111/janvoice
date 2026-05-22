import { useState } from 'react';
import { Search, ChevronDown, Grid3X3, List, MapPin, Filter } from 'lucide-react';
import { mockIssues, CATEGORIES, STATUS_COLORS, STATUS_LABELS, type IssueCategory, type IssueStatus } from '@/data/issues';
import IssueCard from '@/components/IssueCard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const STATUSES: IssueStatus[] = ['pending', 'under_verification', 'published', 'escalated', 'authority_responded', 'in_progress', 'resolved'];
const CITIES = ['All Cities', 'Mumbai', 'Pune', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata'];

export default function Explore() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<IssueStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<IssueCategory | 'all'>('all');
  const [cityFilter, setCityFilter] = useState('All Cities');
  const [sortBy, setSortBy] = useState<'newest' | 'supporters' | 'urgency'>('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filtered = mockIssues.filter((issue) => {
    const matchesSearch = !search ||
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.id.toLowerCase().includes(search.toLowerCase()) ||
      issue.location.city.toLowerCase().includes(search.toLowerCase());
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

  const activeFiltersCount = [statusFilter !== 'all', categoryFilter !== 'all', cityFilter !== 'All Cities'].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        {/* Header */}
        <div className="mb-8">
          <p className="jv-caption text-[#f37320] mb-2">EXPLORE</p>
          <h1 className="jv-heading-lg text-[#f5f5f5] mb-2">Public Issue Feed</h1>
          <p className="text-sm text-[#9f9f9f]">
            {filtered.length} issues found · Follow civic matters in your community and across India
          </p>
        </div>

        {/* Search & Controls */}
        <div className="mb-6 space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#9f9f9f]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title, ID, or city..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#26262b] border text-sm transition-colors ${
                activeFiltersCount > 0 ? 'border-[#f37320]/40 text-[#f37320]' : 'border-white/10 text-[#9f9f9f] hover:text-[#f5f5f5]'
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#f37320] text-[#17171a] text-xs font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
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
            <div className="flex items-center gap-1 p-1 rounded-xl bg-[#26262b] border border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#f37320]/15 text-[#f37320]' : 'text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#f37320]/15 text-[#f37320]' : 'text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="p-5 rounded-xl bg-[#26262b] border border-white/10 animate-fade-in grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-[#9f9f9f] mb-2">Status</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${statusFilter === 'all' ? 'bg-[#f37320]/15 text-[#f37320]' : 'bg-white/5 text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
                  >All</button>
                  {STATUSES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatusFilter(s)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${statusFilter === s ? 'text-white' : 'bg-white/5 text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
                      style={statusFilter === s ? { backgroundColor: STATUS_COLORS[s] } : {}}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#9f9f9f] mb-2">Category</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setCategoryFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${categoryFilter === 'all' ? 'bg-[#f37320]/15 text-[#f37320]' : 'bg-white/5 text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
                  >All</button>
                  {(Object.keys(CATEGORIES) as IssueCategory[]).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategoryFilter(cat)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${categoryFilter === cat ? 'text-white' : 'bg-white/5 text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
                      style={categoryFilter === cat ? { backgroundColor: CATEGORIES[cat].color } : {}}
                    >
                      {CATEGORIES[cat].label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#9f9f9f] mb-2">City</label>
                <div className="flex flex-wrap gap-2">
                  {CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => setCityFilter(city)}
                      className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${cityFilter === city ? 'bg-[#f37320]/15 text-[#f37320]' : 'bg-white/5 text-[#9f9f9f] hover:text-[#f5f5f5]'}`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-12 h-12 text-[#333] mx-auto mb-4" />
            <h3 className="text-lg font-medium text-[#f5f5f5] mb-2">No issues found</h3>
            <p className="text-sm text-[#9f9f9f]">Try adjusting your filters or search terms</p>
            <button
              onClick={() => { setSearch(''); setStatusFilter('all'); setCategoryFilter('all'); setCityFilter('All Cities'); }}
              className="mt-4 text-sm text-[#f37320] hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((issue, i) => (
              <IssueCard key={issue.id} issue={issue} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((issue, i) => {
              const statusColor = STATUS_COLORS[issue.status];
              const cat = CATEGORIES[issue.category];
              return (
                <a
                  key={issue.id}
                  href={`/issue/${issue.id}`}
                  className="card-elevated flex items-center gap-4 p-4 group animate-float-up"
                  style={{ animationDelay: `${i * 0.05}s`, animationFillMode: 'both', opacity: 0 }}
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    {issue.images[0] ? (
                      <img src={issue.images[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: cat.color + '15' }}>
                        <MapPin className="w-5 h-5" style={{ color: cat.color }} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-sm font-semibold text-[#f5f5f5] group-hover:text-[#f37320] transition-colors truncate">{issue.title}</h3>
                      <span className="px-2.5 py-1 rounded text-xs font-medium flex-shrink-0" style={{ backgroundColor: statusColor + '15', color: statusColor }}>
                        {STATUS_LABELS[issue.status]}
                      </span>
                    </div>
                    <p className="text-xs text-[#9f9f9f] truncate mt-0.5">{issue.description}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-xs text-[#9f9f9f]">
                        <MapPin className="w-3 h-3" />{issue.location.city}
                      </span>
                      <span className="text-xs text-[#666]">{issue.supporters} supporters</span>
                      <span className="text-xs text-[#666]">{issue.id}</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
