import React from 'react';
import { Youtube, Music, Users, Heart } from 'lucide-react';
import type { LegalDocType } from './LegalModal';

interface FooterProps {
  onOpenGrounding: () => void;
  onOpenAdmin?: () => void;
  onOpenLegal?: (docType: Exclude<LegalDocType, null>) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGrounding,
  onOpenAdmin,
  onOpenLegal,
}) => {

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
                  <Youtube className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Sacred Steps to Redemption YouTube Channel</span>
                </a>
              </li>
              <li>
                <a
                  href="https://suno.com/playlist/42ef321c-ea05-4310-9465-6efe868510cc"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <Music className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>&ldquo;Sacred Steps to Redemption Melodies&rdquo; on Suno</span>
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
                  href="https://www.facebook.com/groups/sacredstepstoredemption/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>Facebook Group: &ldquo;Sacred Steps to Redemption&rdquo;</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenGrounding}
                  className="hover:text-[#D4AF37] transition-colors inline-flex items-center gap-2 text-left cursor-pointer"
                >
                  <Heart className="w-4 h-4 text-[#D4AF37] shrink-0" />
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
              type="button"
              onClick={() => onOpenLegal?.('privacy')}
              className="hover:text-[#D4AF37] transition-colors underline underline-offset-2 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => onOpenLegal?.('terms')}
              className="hover:text-[#D4AF37] transition-colors underline underline-offset-2 cursor-pointer"
            >
              Terms of Service
            </button>
            {onOpenAdmin && (
              <>
                <span>·</span>
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="hover:text-[#D4AF37] transition-colors underline underline-offset-2 cursor-pointer"
                >
                  Author Portal
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
