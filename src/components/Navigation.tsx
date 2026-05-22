import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, AlertTriangle, User } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/explore', label: 'Explore' },
  { path: '/report', label: 'Report' },
  { path: '/track', label: 'Track' },
  { path: '/community', label: 'Community' },
  { path: '/dashboard', label: 'Dashboard' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
        scrolled
          ? 'bg-[#17171a]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="jv-container flex items-center justify-between w-full">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center bg-[#f37320]/10">
            <img src="/cjp-mascot.png" alt="CJP" className="w-7 h-7 object-contain" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-semibold tracking-tight text-[#f5f5f5]">JanVoice</span>
            <span className="text-[10px] font-medium text-[#9f9f9f] hidden sm:inline">BETA</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-3.5 py-2 text-sm font-medium transition-colors ${
                isActive(link.path) ? 'text-[#f5f5f5]' : 'text-[#9f9f9f] hover:text-[#f5f5f5]'
              }`}
            >
              {link.label}
              {isActive(link.path) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#f37320] rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/report?emergency=true"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#f37320', color: '#17171a' }}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Emergency
          </Link>
          <button className="w-9 h-9 rounded-full bg-[#26262b] flex items-center justify-center border border-white/10 hover:border-white/20 transition-colors">
            <User className="w-4 h-4 text-[#9f9f9f]" />
          </button>
          <button
            className="lg:hidden w-9 h-9 rounded-lg bg-[#26262b] flex items-center justify-center border border-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-4 h-4 text-[#f5f5f5]" /> : <Menu className="w-4 h-4 text-[#f5f5f5]" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#17171a]/98 backdrop-blur-lg border-b border-white/10 lg:hidden animate-fade-in">
          <div className="jv-container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#f37320]/10 text-[#f37320]'
                    : 'text-[#9f9f9f] hover:bg-white/5 hover:text-[#f5f5f5]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/report?emergency=true"
              className="sm:hidden mt-2 flex items-center justify-center gap-1.5 px-4 py-3 rounded-full text-sm font-semibold"
              style={{ backgroundColor: '#f37320', color: '#17171a' }}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Emergency Report
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
