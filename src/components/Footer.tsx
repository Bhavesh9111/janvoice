import { Link } from 'react-router-dom';
import { Shield, FileText } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Submit Report', path: '/report' },
    { label: 'Explore Issues', path: '/explore' },
    { label: 'Track Progress', path: '/track' },
    { label: 'Transparency Dashboard', path: '/dashboard' },
  ],
  Community: [
    { label: 'Discussion Forums', path: '/community' },
    { label: 'Volunteer Network', path: '/community' },
    { label: 'Legal Resources', path: '/community' },
    { label: 'Awareness Campaigns', path: '/community' },
  ],
  About: [
    { label: 'Our Mission', path: '/' },
    { label: 'How It Works', path: '/' },
    { label: 'Safety Guidelines', path: '/' },
    { label: 'Contact Us', path: '/' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[#17171a] border-t border-white/5 pt-16 pb-8">
      <div className="jv-container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-[#f37320]/10">
                <img src="/cjp-mascot.png" alt="CJP" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <span className="text-xl font-semibold tracking-tight text-[#f5f5f5]">JanVoice</span>
                <p className="text-xs text-[#9f9f9f] -mt-0.5">Speak. Report. Change.</p>
              </div>
            </Link>
            <p className="text-sm text-[#9f9f9f] max-w-sm mb-6 leading-relaxed">
              A citizen-powered civic platform for transparency, accountability, and real public action. Where citizens are heard.
            </p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#26262b] border border-white/10 text-xs text-[#9f9f9f]">
                <Shield className="w-3 h-3 text-[#146c17]" />
                End-to-end encrypted
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#26262b] border border-white/10 text-xs text-[#9f9f9f]">
                <FileText className="w-3 h-3 text-[#06b6d4]" />
                IT Act Compliant
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-medium text-[#9f9f9f] uppercase tracking-widest mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-[#9f9f9f] hover:text-[#f5f5f5] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-[#9f9f9f]">
            <span>Powered by CJP</span>
            <span className="text-white/20">|</span>
            <Link to="/" className="hover:text-[#f5f5f5] transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-[#f5f5f5] transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#9f9f9f]">
            <span>JanVoice Foundation</span>
            <span className="text-white/20">|</span>
            <span>Digital Unity for Real Change</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-8 pointer-events-none select-none hidden lg:block">
        <span className="text-[120px] font-bold text-white/[0.02] leading-none tracking-tighter">
          JV
        </span>
      </div>
    </footer>
  );
}
