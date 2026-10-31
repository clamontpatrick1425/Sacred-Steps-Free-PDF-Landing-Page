import React, { useState } from 'react';
import { BookOpen, Lightbulb, Heart, Footprints, ChevronRight, CheckCircle2 } from 'lucide-react';
import { starterKitDays } from './StarterKitModal';

interface StepMethodSectionProps {
  onScrollToForm: () => void;
  onOpenDayModal: (dayIndex?: number) => void;
}

export const StepMethodSection: React.FC<StepMethodSectionProps> = ({
  onScrollToForm,
  onOpenDayModal,
}) => {
  const [selectedDay, setSelectedDay] = useState(1);

  const activeDayData = starterKitDays.find((d) => d.day === selectedDay) || starterKitDays[0];

  const pillars = [
    {
      letter: 'S',
      title: 'Scripture',
      subtitle: 'The Anchor',
      icon: BookOpen,
      color: 'bg-[#1C2A39] text-[#D4AF37]',
      border: 'border-[#1C2A39]/20',
      description: 'The unshakeable foundation of what God’s Word actually says.',
      deepDive: 'We do not anchor in fragile positive thinking or self-generated hype. We anchor in the living, eternal Word of God that outlasts every storm, relapse, or accusation.'
    },
    {
      letter: 'T',
      title: 'Truth',
      subtitle: 'Reframe the Lie',
      icon: Lightbulb,
      color: 'bg-[#7A8B7B] text-white',
      border: 'border-[#7A8B7B]/30',
      description: 'Replacing the lies of shame with biblical reality.',
      deepDive: 'Shame whispers that you are damaged goods, beyond redemption, or destined to fail. Truth unmasks that lie and exposes the reality of who God says you are.'
    },
    {
      letter: 'E',
      title: 'Embrace',
      subtitle: 'Affirmation',
      icon: Heart,
      color: 'bg-[#D4AF37] text-[#1C2A39]',
      border: 'border-[#D4AF37]/40',
      description: 'First-person affirmations to declare over your life.',
      deepDive: 'An affirmation without Scripture is just a hopeful guess. A biblical affirmation is agreeing out loud with what the Creator of the universe has already settled.'
    },
    {
      letter: 'P',
      title: 'Practice',
      subtitle: 'One Sacred Step',
      icon: Footprints,
      color: 'bg-[#1C2A39] text-white',
      border: 'border-[#1C2A39]/20',
      description: 'One small, concrete Sacred Step to take today.',
      deepDive: 'Recovery happens in the micro-decisions of the next ten minutes. Not fixing next year—taking one gentle, obedient step of faith today.'
    }
  ];

  return (
    <section id="step-method" className="py-16 md:py-24 bg-[#FCFAF6] border-y border-[#1C2A39]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div id="whats-inside" className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#7A8B7B]">
            WEEK 1: IDENTITY — WHO GOD SAYS I AM
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1C2A39]">
            The Sacred S.T.E.P. Method™
          </h2>
          <p className="text-base sm:text-lg text-[#2B2B2B]/90 font-sans leading-relaxed">
            Recovery doesn’t need to be complicated to be real. When you enter your email above, I’ll instantly send you the official 16-page <strong className="font-semibold text-[#1C2A39]">7 Days to a Renewed Mind PDF</strong> with your first 7 days of affirmations plus the complete <strong className="font-semibold text-[#1C2A39]">Monthly Transformation Checklist</strong>.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {pillars.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.letter}
                className="p-6 rounded-2xl bg-white border border-[#1C2A39]/10 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center font-serif font-bold text-lg shadow-xs`}>
                        {item.letter}
                      </span>
                      <div>
                        <h3 className="font-serif font-bold text-lg text-[#1C2A39] leading-tight">
                          {item.title}
                        </h3>
                        <span className="text-[11px] font-semibold tracking-wider uppercase text-[#7A8B7B]">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>
                    <Icon className="w-5 h-5 text-[#7A8B7B]/70" />
                  </div>

                  <p className="text-sm font-semibold text-[#1C2A39] mb-2 leading-snug">
                    {item.description}
                  </p>
                  <p className="text-xs text-[#2B2B2B]/75 leading-relaxed">
                    {item.deepDive}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#1C2A39]/5 flex items-center gap-1.5 text-[11px] font-medium text-[#7A8B7B]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Included every single day</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* The Golden Tagline */}
        <div className="text-center mt-10">
          <p className="font-serif italic text-xl sm:text-2xl text-[#1C2A39] font-medium">
            &ldquo;One Scripture. One Truth. One Affirmation. One Sacred Step.&rdquo;
          </p>
        </div>

        {/* Interactive 7-Day Journey Explorer */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1C2A39]/10">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                Your 7-Day Transformation Roadmap
              </span>
              <h3 className="text-2xl font-serif font-bold text-[#1C2A39] mt-0.5">
                Explore What You&apos;ll Experience Each Morning
              </h3>
            </div>
            <button
              onClick={() => onOpenDayModal(selectedDay - 1)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] text-xs font-semibold transition-colors self-start md:self-auto shrink-0 cursor-pointer shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Full Day {selectedDay} in Guide</span>
            </button>
          </div>

          {/* Day selection tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 my-6">
            {starterKitDays.map((d) => (
              <button
                key={d.day}
                onClick={() => setSelectedDay(d.day)}
                className={`p-3 rounded-xl text-left transition-all cursor-pointer ${
                  selectedDay === d.day
                    ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-md ring-2 ring-[#D4AF37]'
                    : 'bg-[#F9F6F0] text-[#1C2A39] hover:bg-[#EFE9DC]/60 border border-[#1C2A39]/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    selectedDay === d.day ? 'text-[#D4AF37]' : 'text-[#7A8B7B]'
                  }`}>
                    Day {d.day}
                  </span>
                  {selectedDay === d.day && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                  )}
                </div>
                <div className="font-serif font-semibold text-xs mt-1 truncate">
                  {d.title}
                </div>
              </button>
            ))}
          </div>

          {/* Selected Day Showcase Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#F9F6F0] border border-[#1C2A39]/10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-xs font-semibold text-[#7A8B7B] uppercase tracking-wider">
                  Day {activeDayData.day} Focus · {activeDayData.theme}
                </span>
                <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#1C2A39]">
                  {activeDayData.title}
                </h4>
              </div>
              <span className="text-xs text-[#D4AF37] font-serif italic font-semibold">
                {activeDayData.reference}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-lg bg-white border border-[#1C2A39]/10">
                <strong className="text-[11px] uppercase tracking-wider text-[#1C2A39] block mb-1">
                  📖 Scripture Anchor:
                </strong>
                <p className="font-serif italic text-[#1C2A39]">
                  &ldquo;{activeDayData.scripture}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-[#1C2A39]/10">
                <strong className="text-[11px] uppercase tracking-wider text-[#7A8B7B] block mb-1">
                  💡 Truth Reframed:
                </strong>
                <p className="text-[#2B2B2B]">
                  {activeDayData.truth}
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/30">
                <strong className="text-[11px] uppercase tracking-wider text-[#1C2A39] block mb-1">
                  ❤️ Affirmation to Embrace:
                </strong>
                <p className="font-serif italic text-[#1C2A39] font-medium">
                  &ldquo;{activeDayData.embrace}&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-lg bg-white border border-[#1C2A39]/10">
                <strong className="text-[11px] uppercase tracking-wider text-[#1C2A39] block mb-1">
                  👣 Sacred Step to Practice:
                </strong>
                <p className="text-[#2B2B2B]">
                  {activeDayData.practice}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={onScrollToForm}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1C2A39] hover:text-[#D4AF37] transition-colors underline underline-offset-4 cursor-pointer"
            >
              <span>Ready for all 7 days in your inbox right now? Jump to the Starter Kit form</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
