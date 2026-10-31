import React, { useState } from 'react';
import { Youtube, Music, Globe, Shield, Heart, X, BookOpen } from 'lucide-react';

interface FooterProps {
  onOpenGrounding: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGrounding }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#1C2A39] text-[#F9F6F0] pt-16 pb-12 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline & Wordmark */}
        <div className="text-center pb-12 border-b border-white/10 space-y-3">
          <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-wide">
            Sacred Steps to Redemption
          </h3>
          <p className="font-serif italic text-lg sm:text-xl text-[#D4AF37]">
            &ldquo;A Path to Recovery, A Life in Grace.&rdquo;
          </p>
        </div>

        {/* Links & Community Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-b border-white/10 text-center md:text-left">
          
          {/* Column 1: Media Channels */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] block">
              🎧 Listen &amp; Watch
            </span>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="https://www.youtube.com/@sacredstepsaffirmations"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <Youtube className="w-4 h-4 text-[#D4AF37]" />
                  <span>Sacred Steps YouTube Channel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://spotify.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <Music className="w-4 h-4 text-[#D4AF37]" />
                  <span>Spoken Word &amp; Guided Audio on Spotify</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Ministry & Community */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] block">
              🌐 Ministry &amp; Community
            </span>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="#hero"
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-[#D4AF37]" />
                  <span>Official Ministry Website</span>
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenGrounding}
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2 text-left"
                >
                  <Heart className="w-4 h-4 text-[#D4AF37]" />
                  <span>Emergency Grounding Anchor (24/7)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: The Publishing House */}
          <div className="space-y-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#D4AF37] block">
              📖 The Publisher
            </span>
            <p className="text-sm text-white/80 leading-relaxed">
              Published with care by <strong>Kya Daisy Publishing</strong>. Equipping weary travelers with uncompromised biblical truth and tender practical recovery wisdom.
            </p>
          </div>

        </div>

        {/* Safety & Medical Disclaimer (Trauma-Informed & Compassionate) */}
        <div className="py-6 text-xs text-white/60 leading-relaxed border-b border-white/10 max-w-4xl mx-auto text-center">
          <p>
            <strong className="text-white/80">A Note of Love &amp; Safety:</strong> Sacred Steps Daily Grace is an encouraging faith companion and spiritual devotional. It is not medical advice, psychotherapy, clinical addiction treatment, or a substitute for a 12-Step sponsor or licensed healthcare professional. We do not promise guaranteed sobriety; we promise you never have to walk the journey alone. If you are experiencing a medical or mental health emergency, please reach out to local emergency services or dial <strong>988</strong> immediately.
          </p>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            Copyright &copy; 2026 C. Lamont Patrick | Kya Daisy Publishing. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLegalModal('privacy')}
              className="hover:text-[#D4AF37] transition-colors underline underline-offset-2"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setLegalModal('terms')}
              className="hover:text-[#D4AF37] transition-colors underline underline-offset-2"
            >
              Terms of Service
            </button>
          </div>
        </div>

      </div>

      {/* Legal Information Modal */}
      {legalModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <div className="bg-[#F9F6F0] text-[#1C2A39] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/30 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#1C2A39]/10">
              <h4 className="text-xl font-serif font-bold text-[#1C2A39]">
                {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
              </h4>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 rounded text-[#1C2A39]/70 hover:text-[#1C2A39]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed">
              {legalModal === 'privacy' ? (
                <>
                  <p>
                    Your privacy and dignity in recovery are sacred to us. We will never sell, rent, or trade your contact information to any third party.
                  </p>
                  <p>
                    We collect your email address solely to deliver your requested 7-Day Starter Kit and provide waitlist announcements regarding C. Lamont Patrick&apos;s upcoming books.
                  </p>
                  <p>
                    You can unsubscribe with a single click at the bottom of any email we send, no questions asked.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    By accessing Sacred Steps Daily Grace materials, you agree that this devotional content is designed for spiritual encouragement, meditation, and personal development.
                  </p>
                  <p>
                    All content, including the Sacred S.T.E.P. Method™, text, and workbook exercises, is protected under copyright law by C. Lamont Patrick and Kya Daisy Publishing.
                  </p>
                  <p>
                    This resource is provided in good faith to support your walk with God and your recovery journey.
                  </p>
                </>
              )}
            </div>
            <button
              onClick={() => setLegalModal(null)}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#1C2A39] text-[#F9F6F0] text-xs font-semibold hover:bg-[#2A3C50]"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
