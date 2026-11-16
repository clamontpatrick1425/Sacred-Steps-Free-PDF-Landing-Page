import React from 'react';
import {
  BookMarked,
  BookOpen,
  Clock,
  Bell,
  CheckCircle2,
  Layers,
  Download,
  Eye,
} from 'lucide-react';
import {
  CORE_PREVIEW_PDF_PATH,
  CORE_PREVIEW_PDF_FILENAME,
  downloadCorePreviewPdf,
} from '../lib/pdf';
import { CoreBookCoverReplica } from './CoreSampleModal';

interface EcosystemSectionProps {
  onJoinWaitlist: () => void;
  onOpenCorePreview?: () => void;
}

export const EcosystemSection: React.FC<EcosystemSectionProps> = ({
  onJoinWaitlist,
  onOpenCorePreview,
}) => {
  const ecosystemItems = [
    {
      badge: 'The Core Devotional',
      icon: BookMarked,
      title: 'The Core: 365 Biblical Affirmations',
      formatTag: 'Amazon KDP · ePub · Audiobook',
      description:
        'The complete 12-month guided devotional. Walk through Identity, Grace, Faith, Freedom, Healing, Discipline, Courage, Forgiveness, Peace, Purpose, Gratitude, and Redemption.',
      formats: [
        'Amazon KDP (Paperback & Hardcover)',
        'Downloadable ePub / Kindle',
        'Narrated Audiobook',
      ],
      hasSamplePreview: true,
      highlight: 'Free 30-page KDP sample available above · Full edition coming soon',
      badgeColor: 'bg-[#D4AF37] text-[#1C2A39]',
      tags: ['12 Thematic Months', 'Daily S.T.E.P.', 'Audiobook Ready'],
    },
    {
      badge: 'The Deep Dive',
      icon: BookOpen,
      title: 'The Deep Dive: 12 Monthly Transformation Journals',
      formatTag: '6x9 KDP · Downloadable eBook PDF · Kindle Edition',
      description:
        'Need more room to wrestle, write, and pray? Each 30-day guided journal companion is built for the specific theme you are walking through right now.',
      formats: [
        '6x9 Amazon KDP Edition',
        'Downloadable eBook PDF',
        'Kindle Edition',
      ],
      hasSamplePreview: false,
      highlight: 'Available soon in 6x9 Amazon KDP, downloadable eBook PDF, and Kindle Edition',
      badgeColor: 'bg-[#7A8B7B]/15 text-[#1C2A39]',
      tags: ['6x9 Size', 'Kindle Edition', 'Printable PDF', 'Monthly Themes'],
    },
    {
      badge: 'The Slow Walk',
      icon: Clock,
      title: 'The Slow Walk: 52-Week Recovery Journal',
      formatTag: '6x9 KDP · Downloadable eBook PDF · Kindle Edition',
      description:
        'If a daily devotional feels like too much right now, the 52-Week Journal gives you a slower, sustainable pace to process one profound quote and theme per week.',
      formats: [
        '6x9 Amazon KDP Edition',
        'Downloadable eBook PDF',
        'Kindle Edition',
      ],
      hasSamplePreview: false,
      highlight: 'Available soon in 6x9 Amazon KDP, downloadable eBook PDF, and Kindle Edition',
      badgeColor: 'bg-[#FAF3E0] text-[#1C2A39]',
      tags: ['6x9 Size', 'Kindle Edition', 'Downloadable PDF', '52 Weekly Steps'],
    },
  ];

  return (
    <section id="ecosystem" className="py-16 md:py-24 bg-[#FCFAF6] border-t border-[#1C2A39]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#7A8B7B]">
            THE COMPLETE SACRED STEPS ECOSYSTEM
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C2A39]">
            The Full Journey is Coming Soon.
          </h2>
          <p className="text-base sm:text-lg text-[#2B2B2B]/90 font-sans leading-relaxed">
            These 7 days are just the beginning. Imagine what 365 days of this renewal can do for your mind, your faith, and your freedom.
          </p>
          <div className="p-3.5 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/35 inline-block text-xs sm:text-sm text-[#1C2A39]">
            By joining the waitlist today, you’ll be the first to know when the complete library drops, and you’ll receive an <strong className="font-bold underline decoration-[#D4AF37]">exclusive early-bird discount</strong>.
          </div>
        </div>

        {/* 3 Product Cards with Exact Formats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 items-stretch">
          {ecosystemItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative rounded-2xl bg-white border border-[#1C2A39]/15 shadow-sm hover:shadow-lg transition-all duration-300 p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <Icon className="w-5 h-5 text-[#7A8B7B] group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1C2A39] leading-snug mb-3">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-[#2B2B2B]/85 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Downloadable Sample Preview Block for The Core: 365 Biblical Affirmations */}
                  {item.hasSamplePreview && (
                    <div className="p-3.5 rounded-xl bg-[#FAF3E0]/75 border border-[#D4AF37]/45 mb-4 space-y-3">
                      <div className="flex items-center gap-3.5">
                        <CoreBookCoverReplica
                          size="mini"
                          onClick={(e) => downloadCorePreviewPdf(e)}
                        />
                        <div className="min-w-0 space-y-1">
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#1C2A39]">
                            30-Page Preview Sample
                          </div>
                          <p className="text-xs text-[#2B2B2B]/85 leading-snug">
                            Read the Front Matter, 12-Month Contents, and all 5 weeks of January free.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <a
                          href={CORE_PREVIEW_PDF_PATH}
                          download={CORE_PREVIEW_PDF_FILENAME}
                          onClick={downloadCorePreviewPdf}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#1C2A39] hover:bg-[#2A3C50] text-[#D4AF37] font-bold text-xs transition-colors shadow-xs cursor-pointer whitespace-nowrap"
                        >
                          <Download className="w-3.5 h-3.5 shrink-0" />
                          <span>Download Sample PDF</span>
                        </a>

                        {onOpenCorePreview && (
                          <button
                            type="button"
                            onClick={onOpenCorePreview}
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-[#F9F6F0] text-[#1C2A39] border border-[#1C2A39]/20 font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#7A8B7B] shrink-0" />
                            <span>Look Inside</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Available Formats Callout Box */}
                  <div className="p-3.5 rounded-xl bg-[#F9F6F0] border border-[#1C2A39]/10 space-y-2 mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A8B7B] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Available Formats:</span>
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#1C2A39]/90">
                      {item.formats.map((fmt) => (
                        <li key={fmt} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                          <span className="font-medium">{fmt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metadata */}
                  <div className="text-[11px] font-medium text-[#7A8B7B] mb-2">
                    {item.tags.join(' · ')}
                  </div>
                </div>

                {/* Bottom Highlight Notice */}
                <div className="pt-4 mt-2 border-t border-[#1C2A39]/10">
                  <p className="text-xs font-serif italic text-[#1C2A39] font-medium">
                    {item.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* SECONDARY CTA BUTTON - Deep Sacred Blue Background, Dawn Gold Text */}
        <div className="mt-14 text-center">
          <div className="inline-block p-1 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/30">
            <button
              onClick={onJoinWaitlist}
              className="py-4 px-8 rounded-xl bg-[#1C2A39] hover:bg-[#2A3C50] text-[#D4AF37] hover:text-[#FAF3E0] font-bold text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Bell className="w-5 h-5 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span>JOIN THE VIP LAUNCH WAITLIST</span>
            </button>
          </div>
          <p className="text-xs text-[#2B2B2B]/75 mt-3">
            Instant 40% launch discount code reserved · Priority access to 6x9 KDP &amp; Kindle formats
          </p>
        </div>

      </div>
    </section>
  );
};
