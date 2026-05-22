import { useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mic, MapPin, Camera, Upload, X, AlertTriangle, CheckCircle2, ChevronDown, Eye, EyeOff, Send, Loader2 } from 'lucide-react';
import { CATEGORIES, type IssueCategory } from '@/data/issues';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const URGENCY_LEVELS = [
  { value: 'low', label: 'Low', color: '#22c55e' },
  { value: 'medium', label: 'Medium', color: '#f37320' },
  { value: 'high', label: 'High', color: '#ef4444' },
  { value: 'urgent', label: 'Urgent', color: '#dc2626' },
];

export default function Report() {
  const [searchParams] = useSearchParams();
  const isEmergency = searchParams.get('emergency') === 'true';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<IssueCategory>('infrastructure');
  const [urgency, setUrgency] = useState(isEmergency ? 'urgent' : 'medium');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<{ type: 'image' | 'video'; url: string }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleMediaDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    files.forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const url = URL.createObjectURL(file);
        setMediaFiles((prev) => [...prev, { type: file.type.startsWith('image/') ? 'image' : 'video', url }]);
      }
    });
  };

  const removeMedia = (index: number) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#17171a]">
        <Navigation />
        <div className="jv-container pt-32 pb-20 flex items-center justify-center min-h-[70vh]">
          <div className="text-center max-w-md animate-float-up">
            <div className="w-20 h-20 rounded-full bg-[#146c17]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#146c17]" />
            </div>
            <h2 className="jv-heading-md text-[#f5f5f5] mb-3">Report Submitted!</h2>
            <p className="text-sm text-[#9f9f9f] mb-2">
              Your issue has been logged as <span className="text-[#f37320] font-medium">JVN-2026-0043</span>
            </p>
            <p className="text-sm text-[#9f9f9f] mb-8">
              It will now go through our verification process before being published. You&apos;ll receive updates as the status changes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a href="/track" className="btn-primary px-6 py-3">
                Track Your Report
              </a>
              <a href="/" className="btn-secondary px-6 py-3">
                Back to Home
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#17171a]">
      <Navigation />

      <div className="jv-container pt-28 pb-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#f37320]/10 flex items-center justify-center">
                <Mic className="w-5 h-5 text-[#f37320]" />
              </div>
              <div>
                <h1 className="jv-heading-sm text-[#f5f5f5]">
                  {isEmergency ? 'Emergency Report' : 'Submit a Report'}
                </h1>
                <p className="text-xs text-[#9f9f9f]">
                  {isEmergency ? 'Flag urgent safety issues requiring immediate attention' : 'Document civic issues in your area'}
                </p>
              </div>
            </div>
            {isEmergency && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-[#ef4444]/10 border border-[#ef4444]/20 text-sm text-[#ef4444]">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                Emergency reports are fast-tracked through our verification system.
              </div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-medium text-[#9f9f9f] mb-3">Issue Category</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#26262b] border border-white/10 hover:border-[#f37320]/30 transition-colors text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORIES[category].color }} />
                    <span className="text-sm text-[#f5f5f5]">{CATEGORIES[category].label}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-[#9f9f9f]" />
                </button>
                {showCategoryDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-1 p-1 rounded-xl bg-[#26262b] border border-white/10 shadow-xl z-20">
                    {(Object.keys(CATEGORIES) as IssueCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => { setCategory(cat); setShowCategoryDropdown(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                          category === cat ? 'bg-[#f37320]/10 text-[#f37320]' : 'text-[#f5f5f5] hover:bg-white/5'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORIES[cat].color }} />
                        {CATEGORIES[cat].label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-[#9f9f9f] mb-2">Issue Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Large potholes causing accidents on Main Road"
                className="w-full px-4 py-3 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-[#9f9f9f] mb-2">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail. What happened? Who is affected? How long has this been going on?"
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors resize-none"
                required
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#9f9f9f] mb-2">Address/Location *</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#9f9f9f]" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Street, Landmark"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#9f9f9f] mb-2">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="w-full px-4 py-3 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#9f9f9f] mb-2">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    className="w-full px-4 py-3 rounded-xl bg-[#26262b] border border-white/10 text-sm text-[#f5f5f5] placeholder:text-[#666] focus:outline-none focus:border-[#f37320]/50 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-sm font-medium text-[#9f9f9f] mb-2">Evidence (Photos/Videos)</label>
              <div
                ref={dropRef}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleMediaDrop}
                onClick={() => fileInputRef.current?.click()}
                className="relative border-2 border-dashed border-white/10 rounded-xl p-8 text-center cursor-pointer hover:border-[#f37320]/30 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(Array.from(e.target.files))}
                />
                {mediaFiles.length === 0 ? (
                  <div>
                    <div className="w-12 h-12 rounded-full bg-[#26262b] flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-5 h-5 text-[#9f9f9f]" />
                    </div>
                    <p className="text-sm text-[#9f9f9f]">Drag & drop or click to upload</p>
                    <p className="text-xs text-[#666] mt-1">Images and videos up to 50MB</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {mediaFiles.map((file, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                        {file.type === 'image' ? (
                          <img src={file.url} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <video src={file.url} className="w-full h-full object-cover" />
                        )}
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); removeMedia(i); }}
                          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      </div>
                    ))}
                    <div className="aspect-square rounded-lg border border-dashed border-white/20 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-[#9f9f9f]" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-[#9f9f9f] mb-3">Urgency Level</label>
              <div className="grid grid-cols-4 gap-2">
                {URGENCY_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setUrgency(level.value)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      urgency === level.value
                        ? 'text-white'
                        : 'bg-[#26262b] text-[#9f9f9f] border border-white/10 hover:border-white/20'
                    }`}
                    style={urgency === level.value ? { backgroundColor: level.color } : {}}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Anonymous Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-[#26262b] border border-white/[0.06]">
              <div className="flex items-center gap-3">
                {anonymous ? <EyeOff className="w-4 h-4 text-[#f37320]" /> : <Eye className="w-4 h-4 text-[#9f9f9f]" />}
                <div>
                  <p className="text-sm font-medium text-[#f5f5f5]">Submit Anonymously</p>
                  <p className="text-xs text-[#9f9f9f]">Your identity will be protected</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAnonymous(!anonymous)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  anonymous ? 'bg-[#f37320]' : 'bg-[#444]'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    anonymous ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="w-full btn-primary py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {isEmergency ? 'Submit Emergency Report' : 'Submit Report'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#666]">
              By submitting, you agree to our community guidelines. False reporting is punishable under law.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
