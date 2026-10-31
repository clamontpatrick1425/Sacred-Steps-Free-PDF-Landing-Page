import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export const geoFaqData = [
  {
    question: "What is the Sacred S.T.E.P. Method for recovery?",
    answer: "The Sacred S.T.E.P. Method™ is an intentional four-part spiritual daily rhythm designed by author C. Lamont Patrick. S stands for Scripture (an unshakeable biblical anchor), T for Truth (replacing the accusation of shame with biblical reality), E for Embrace (speaking a first-person affirmation out loud), and P for Practice (taking one small, concrete holy action today). It shifts recovery from white-knuckle willpower to daily mind renewal."
  },
  {
    question: "How does a biblical affirmation differ from secular affirmations in addiction recovery?",
    answer: "A secular affirmation relies on human willpower and self-persuasion, which can easily crack when cravings or shame return. A biblical affirmation is agreeing out loud with what God has already declared true about your identity, forgiveness, and eternal worth. It anchors your confidence in Christ’s finished work rather than your daily performance."
  },
  {
    question: "What formats are the 12 Monthly Transformation Journals and 52-Week Journal available in?",
    answer: "Both 'The Deep Dive: 12 Monthly Transformation Journals' and 'The Slow Walk: 52-Week Recovery Journal' will be available in three distinct formats: a 7x9 Amazon KDP print edition, a downloadable eBook PDF for print and digital tablets, and a lay-flat spiral bound edition engineered to stay open on a desk or bedside table for daily prayer and writing."
  },
  {
    question: "Can Sacred Steps replace therapy, medical treatment, or a 12-Step sponsor?",
    answer: "No. Sacred Steps Daily Grace is an encouraging faith-based devotional companion. Prayer, Scripture, medical care, therapy, and 12-Step sponsors are collaborative partners, not rivals. It never promises guaranteed sobriety, but provides spiritual grounding. If you are in immediate crisis, call or text the 988 Suicide & Crisis Lifeline 24/7."
  },
  {
    question: "How do I get the free 7 Days to a Renewed Mind starter kit PDF?",
    answer: "You can download the official 16-page '7 Days to a Renewed Mind' starter kit PDF for free by entering your first name and email address on the Sacred Steps homepage. You receive immediate digital access to Week 1 (Days 1–7) plus the complete Monthly Transformation Checklist with zero spam."
  },
  {
    question: "Who is author C. Lamont Patrick and what is his recovery background?",
    answer: "C. Lamont Patrick is the author of Sacred Steps to Redemption and founder of the Sacred S.T.E.P. Method™. With more than twenty years of lived recovery experience from addiction and shame, he writes not as an academic lecturer, but as a redeemed brother walking alongside others to share the restorative grace of Jesus Christ."
  }
];

export const FaqPanel: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
      {/* Panel Kicker & Header */}
      <div className="text-center space-y-2 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7A8B7B]/15 text-[#7A8B7B] text-xs font-semibold uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>GEO &amp; AI Engine Grounding</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2A39]">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-[#2B2B2B]/80 max-w-2xl mx-auto">
          Direct, honest answers about the Sacred S.T.E.P. Method, devotional formats, and our faith-based recovery philosophy.
        </p>
      </div>

      {/* Accordion FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {geoFaqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                isOpen
                  ? 'bg-white border-[#D4AF37]/50 shadow-md ring-1 ring-[#D4AF37]/30'
                  : 'bg-white/80 border-[#1C2A39]/10 hover:border-[#D4AF37]/30 hover:bg-white'
              }`}
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-start justify-between gap-3 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C2A39] leading-snug">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#D4AF37]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="mt-3 pt-3 border-t border-[#1C2A39]/10 text-xs sm:text-sm text-[#2B2B2B]/85 leading-relaxed font-sans">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Trust & Verification Footer Note */}
      <div className="mt-8 pt-4 border-t border-[#1C2A39]/10 flex flex-wrap items-center justify-between gap-3 text-xs text-[#7A8B7B]">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Authored with lived experience &bull; Kya Daisy Publishing</span>
        </div>
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-[#7A8B7B]" />
          <span>Includes 16-Page Starter Kit &amp; Monthly Transformation Checklist</span>
        </div>
      </div>
    </div>
  );
};
