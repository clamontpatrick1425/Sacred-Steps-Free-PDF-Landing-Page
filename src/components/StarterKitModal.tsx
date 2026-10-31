import React, { useState } from 'react';
import { 
  X, CheckCircle2, Download, BookOpen, ChevronRight, ChevronLeft, 
  ExternalLink, CheckSquare, Square, PenTool, ShieldAlert, Sparkles, Heart
} from 'lucide-react';

interface StarterKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscriberName?: string;
  isVipWaitlist?: boolean;
}

export const PDF_ASSET_PATH = "/assets/aistudio/7_Days_to_a_Renewed_Mind_Sacred_Steps_Affirmations_Starter_Kit_13153c8b.pdf";

export const starterKitDays = [
  {
    day: 1,
    title: "The Foundation of Being Chosen",
    theme: "Identity — Who God Says I Am",
    scripture: "“But ye are a chosen generation, a royal priesthood, an holy nation, a peculiar people; that ye should shew forth the praises of him who hath called you out of darkness into his marvellous light.”",
    reference: "1 Peter 2:9 (KJV)",
    truth: "Being chosen was never about earning it — it was about God’s initiative, not your performance.",
    embrace: "I am chosen by God, not because of what I have done, but because of who He is. My past does not disqualify me from His calling on my life.",
    practice: "Write down one lie you’ve believed about being “not chosen,” and cross it out today.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 2,
    title: "Pursued Before I Pursued Him",
    theme: "Identity — Who God Says I Am",
    scripture: "“Ye have not chosen me, but I have chosen you, and ordained you, that ye should go and bring forth fruit.”",
    reference: "John 15:16 (KJV)",
    truth: "I didn’t find God first. He pursued me long before I turned around.",
    embrace: "I am not chasing after worth I have to prove. God chose me before I ever chose Him, and that settles the question of my value.",
    practice: "Say out loud, “God chose me,” before you leave the house today.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 3,
    title: "Decided Before the World Began",
    theme: "Identity — Who God Says I Am",
    scripture: "“According as he hath chosen us in him before the foundation of the world, that we should be holy and without blame before him in love.”",
    reference: "Ephesians 1:4 (KJV)",
    truth: "My identity was decided before my worst season ever started.",
    embrace: "I am chosen from before the foundation of the world — my hardest year does not override a decision God made before I existed.",
    practice: "Read Ephesians 1 slowly and underline every phrase that describes who you are in Christ.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 4,
    title: "Called by Name, Not by Record",
    theme: "Identity — Who God Says I Am",
    scripture: "“But now thus saith the LORD that created thee… Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine.”",
    reference: "Isaiah 43:1 (KJV)",
    truth: "God knows my name — not just my record.",
    embrace: "I am called by name, not by my mistakes. I belong to God, and nothing in my past changes whose I am.",
    practice: "Write your own name in the margin of your Bible or journal next to this verse today.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 5,
    title: "Clothed in Mercy",
    theme: "Identity — Who God Says I Am",
    scripture: "“Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering.”",
    reference: "Colossians 3:12 (KJV)",
    truth: "Being chosen changes how I’m allowed to treat myself, not just how I treat others.",
    embrace: "I am God’s elect, clothed in mercy and kindness — including mercy toward myself on the days I fall short.",
    practice: "Extend yourself one act of kindness today that you’d normally withhold.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 6,
    title: "Set Apart Today",
    theme: "Identity — Who God Says I Am",
    scripture: "“For thou art an holy people unto the LORD thy God: the LORD thy God hath chosen thee to be a special people unto himself.”",
    reference: "Deuteronomy 7:6 (KJV)",
    truth: "Being chosen isn’t a one-time event from the past. It’s a present reality.",
    embrace: "I am set apart for God’s purposes today, not because I am flawless, but because He has claimed me as His own.",
    practice: "Name one habit that doesn’t match “set apart,” and choose differently just once today.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  },
  {
    day: 7,
    title: "The Peace of Knowing",
    theme: "Identity — Who God Says I Am",
    scripture: "“Knowing, brethren beloved, your election of God.”",
    reference: "1 Thessalonians 1:4 (KJV)",
    truth: "Knowing I am chosen isn’t pride. It’s the peace that ends the arguing.",
    embrace: "I know, beloved, that I am chosen of God. That knowledge is the ground I stand on when doubt tries to pull me under.",
    practice: "Thank God specifically, out loud, for choosing you before you go to sleep tonight.",
    reflectionPrompt: "In my own words: Write what God is showing you today."
  }
];

export const StarterKitModal: React.FC<StarterKitModalProps> = ({
  isOpen,
  onClose,
  subscriberName = "Friend",
  isVipWaitlist = true,
}) => {
  const [activeTab, setActiveTab] = useState<'reader' | 'checklist' | 'pdf'>('reader');
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [userJournalNotes, setUserJournalNotes] = useState<{ [day: number]: string }>({});
  const [checklistItems, setChecklistItems] = useState<{ [key: string]: boolean }>({
    daily_read: false,
    daily_speak: false,
    daily_step: false,
    mind_voice: false,
    mind_truth: false,
    mind_journal: false,
    comm_connect: false,
    comm_share: false,
    comm_witness: false,
  });

  if (!isOpen) return null;

  const current = starterKitDays[activeDayIndex];

  const toggleCheck = (id: string) => {
    setChecklistItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="kit-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#1C2A39]/75 backdrop-blur-md overflow-y-auto"
    >
      <div className="relative w-full max-w-4xl bg-[#F9F6F0] rounded-2xl shadow-2xl border border-[#D4AF37]/40 overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Top Header Banner matching PDF Cover Aesthetic */}
        <div className="bg-[#1C2A39] text-[#F9F6F0] px-5 sm:px-7 py-4 sm:py-5 flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            {/* Sunrise line icon matching PDF cover */}
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <svg viewBox="0 0 40 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-5">
                <path d="M6 22 A14 14 0 0 1 34 22" stroke="#D4AF37" strokeWidth="2.2" />
                <line x1="20" y1="2" x2="20" y2="6" stroke="#D4AF37" strokeWidth="2" />
                <line x1="10" y1="5" x2="13" y2="8.5" stroke="#D4AF37" strokeWidth="2" />
                <line x1="30" y1="5" x2="27" y2="8.5" stroke="#D4AF37" strokeWidth="2" />
                <line x1="4" y1="12" x2="8" y2="13.5" stroke="#D4AF37" strokeWidth="2" />
                <line x1="36" y1="12" x2="32" y2="13.5" stroke="#D4AF37" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37]">
                  SACRED STEPS STARTER KIT
                </span>
                {isVipWaitlist && (
                  <span className="text-[10px] bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded-full font-medium">
                    VIP Waitlist Active
                  </span>
                )}
              </div>
              <h2 id="kit-modal-title" className="text-lg sm:text-2xl font-serif font-bold text-white tracking-wide">
                7 Days to a Renewed Mind
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Official PDF Download Button */}
            <a
              href={PDF_ASSET_PATH}
              download="7_Days_to_a_Renewed_Mind_Sacred_Steps_Starter_Kit.pdf"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] font-bold text-xs transition-colors shadow-xs"
              title="Download the official PDF book"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official PDF</span>
            </a>

            <button
              onClick={onClose}
              aria-label="Close starter kit modal"
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Interactive Reader vs. Monthly Checklist vs. Original PDF View */}
        <div className="px-5 sm:px-7 pt-3 bg-white/70 border-b border-[#1C2A39]/10 flex items-center justify-between flex-wrap gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('reader')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'reader'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/60 hover:text-[#1C2A39]'
              }`}
            >
              📖 Interactive 7-Day Guide
            </button>
            <button
              onClick={() => setActiveTab('checklist')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'checklist'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/60 hover:text-[#1C2A39]'
              }`}
            >
              📋 Monthly Transformation Checklist
            </button>
            <button
              onClick={() => setActiveTab('pdf')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-all cursor-pointer ${
                activeTab === 'pdf'
                  ? 'border-[#1C2A39] text-[#1C2A39] font-bold'
                  : 'border-transparent text-[#1C2A39]/60 hover:text-[#1C2A39]'
              }`}
            >
              📑 View Full PDF Document
            </button>
          </div>

          <div className="text-xs text-[#7A8B7B] font-serif italic pb-2">
            Week 1: Identity — Who God Says I Am
          </div>
        </div>

        {/* TAB 1: INTERACTIVE 7-DAY GUIDE */}
        {activeTab === 'reader' && (
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Week Theme Kicker from Page 5 of PDF */}
            <div className="px-5 sm:px-7 py-3 bg-[#FAF3E0] border-b border-[#D4AF37]/30 text-xs sm:text-sm text-[#1C2A39] flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
              <p className="font-serif italic">
                &ldquo;Being chosen was never about your performance. It was God’s decision, made before your first mistake.&rdquo;
              </p>
              <span className="text-[11px] font-semibold text-[#7A8B7B] uppercase tracking-wider shrink-0">
                Seven days. Seven small steps. Go slowly.
              </span>
            </div>

            {/* Day Selector Navigation */}
            <div className="px-5 sm:px-7 pt-4 pb-2 bg-white/40 border-b border-[#1C2A39]/10 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
                {starterKitDays.map((d, index) => (
                  <button
                    key={d.day}
                    onClick={() => setActiveDayIndex(index)}
                    className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer ${
                      activeDayIndex === index
                        ? 'bg-[#1C2A39] text-[#F9F6F0] shadow-sm font-semibold'
                        : 'bg-white text-[#1C2A39]/80 hover:bg-[#FAF5EA] border border-[#1C2A39]/10'
                    }`}
                  >
                    Day {d.day}: {d.title.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Daily Content (Matches Page 6-13 of PDF exactly) */}
            <div className="p-5 sm:p-8 space-y-6 flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#7A8B7B]">
                  <span>DAY {current.day}</span>
                  <span>·</span>
                  <span>Week 1: {current.theme}</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2A39] mt-1">
                  {current.title}
                </h3>
              </div>

              {/* S.T.E.P. Pillars with Exact PDF Styling */}
              <div className="space-y-4">
                {/* S — SCRIPTURE */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#D4AF37]/40 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center text-xs font-bold font-serif">
                      S
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      SCRIPTURE
                    </span>
                  </div>
                  <blockquote className="font-serif italic text-base sm:text-lg text-[#1C2A39] leading-relaxed">
                    {current.scripture}
                  </blockquote>
                  <span className="text-xs font-semibold text-[#7A8B7B] mt-2 block tracking-wide">
                    — {current.reference}
                  </span>
                </div>

                {/* T — TRUTH */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#7A8B7B]/30 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#7A8B7B] text-white flex items-center justify-center text-xs font-bold font-serif">
                      T
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      TRUTH
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#2B2B2B] leading-relaxed font-sans">
                    {current.truth}
                  </p>
                </div>

                {/* E — EMBRACE (say it out loud) */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/50 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#D4AF37] text-[#1C2A39] flex items-center justify-center text-xs font-bold font-serif">
                      E
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      EMBRACE (say it out loud)
                    </span>
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#1C2A39] leading-relaxed font-bold">
                    &ldquo;{current.embrace}&rdquo;
                  </p>
                </div>

                {/* P — PRACTICE */}
                <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#1C2A39]/20 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded bg-[#1C2A39] text-white flex items-center justify-center text-xs font-bold font-serif">
                      P
                    </span>
                    <span className="text-xs font-bold tracking-wider uppercase text-[#1C2A39]">
                      PRACTICE
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-[#2B2B2B] leading-relaxed font-sans">
                    {current.practice}
                  </p>
                </div>

                {/* In My Own Words: Interactive Journaling Space (From PDF) */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#FCFAF6] border border-[#1C2A39]/15">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <PenTool className="w-4 h-4 text-[#7A8B7B]" />
                      <span className="font-serif italic text-sm text-[#1C2A39] font-semibold">
                        In my own words: Write what God is showing you today.
                      </span>
                    </div>
                    <span className="text-[11px] text-[#7A8B7B] italic">
                      Tip: Write badly if you need to. Honest beats polished.
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={userJournalNotes[current.day] || ''}
                    onChange={(e) =>
                      setUserJournalNotes((prev) => ({ ...prev, [current.day]: e.target.value }))
                    }
                    placeholder="Take a deep breath and write freely..."
                    className="w-full p-3 rounded-lg border border-[#1C2A39]/15 bg-white text-sm text-[#1C2A39] placeholder:text-[#1C2A39]/40 focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  />
                  {userJournalNotes[current.day] && (
                    <span className="text-[11px] text-[#7A8B7B] mt-1 block">
                      Saved locally in your heart space.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Day Pagination Controls */}
            <div className="px-5 sm:px-7 py-3.5 bg-white/90 border-t border-[#1C2A39]/10 flex items-center justify-between shrink-0">
              <button
                onClick={() => setActiveDayIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeDayIndex === 0}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#1C2A39]/15 text-xs font-medium text-[#1C2A39] hover:bg-[#1C2A39]/5 disabled:opacity-30 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Day {Math.max(1, current.day - 1)}</span>
              </button>

              <span className="text-xs text-[#7A8B7B] font-medium">
                Day {current.day} of 7
              </span>

              {activeDayIndex < starterKitDays.length - 1 ? (
                <button
                  onClick={() => setActiveDayIndex((prev) => Math.min(starterKitDays.length - 1, prev + 1))}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#2A3C50] text-xs font-medium transition-colors shadow-sm cursor-pointer"
                >
                  <span>Day {current.day + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('checklist')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D4AF37] text-[#1C2A39] hover:bg-[#BF9C2D] text-xs font-bold transition-colors shadow-sm cursor-pointer"
                >
                  <span>Open Monthly Checklist</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: MONTHLY TRANSFORMATION CHECKLIST (Pages 14-15 of PDF) */}
        {activeTab === 'checklist' && (
          <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7A8B7B]">
                KEEP WALKING · PAGES 14–15 OF STARTER KIT
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C2A39]">
                The Monthly Transformation Checklist
              </h3>
              <p className="text-sm text-[#2B2B2B]/85 font-sans leading-relaxed">
                Recovery isn’t a sprint; it’s a sustained walk. Use this checklist at the end of every month (or whenever you need to reset) to make sure you aren’t just reading the words, but letting them renew your mind.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* DAILY RHYTHM */}
              <div className="p-5 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  DAILY RHYTHM
                </h4>
                <div className="space-y-3">
                  <div
                    onClick={() => toggleCheck('daily_read')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.daily_read ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Read Slowly:</strong> Did I sit with today’s Scripture longer than it took to just read it?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('daily_speak')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.daily_speak ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Speak It Out:</strong> Did I say my Affirmation out loud at least once today?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('daily_step')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.daily_step ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Take the Step:</strong> Did I complete my one small, concrete Sacred Step?
                    </div>
                  </div>
                </div>
              </div>

              {/* MINDSET & RENEWAL */}
              <div className="p-5 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#7A8B7B]">
                  MINDSET &amp; RENEWAL
                </h4>
                <div className="space-y-3">
                  <div
                    onClick={() => toggleCheck('mind_voice')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.mind_voice ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Name the Voice:</strong> When the shame-voice spoke this week, did I pause and name it for what it is?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('mind_truth')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.mind_truth ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Answer with Truth:</strong> Did I answer the shame-voice with my monthly Theme Scripture?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('mind_journal')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.mind_journal ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Honest Journaling:</strong> Did I write down my honest struggles on the page without filtering them?
                    </div>
                  </div>
                </div>
              </div>

              {/* COMMUNITY & SUPPORT */}
              <div className="p-5 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C2A39]">
                  COMMUNITY &amp; SUPPORT
                </h4>
                <div className="space-y-3">
                  <div
                    onClick={() => toggleCheck('comm_connect')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.comm_connect ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Stay Connected:</strong> Did I attend a meeting, talk to my sponsor, or connect with my recovery group this week?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('comm_share')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.comm_share ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Share the Burden:</strong> Did I tell one safe person what I am actually struggling with?
                    </div>
                  </div>

                  <div
                    onClick={() => toggleCheck('comm_witness')}
                    className="flex items-start gap-3 cursor-pointer group select-none"
                  >
                    {checklistItems.comm_witness ? (
                      <CheckSquare className="w-5 h-5 text-[#7A8B7B] shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-5 h-5 text-[#1C2A39]/30 group-hover:text-[#1C2A39] shrink-0 mt-0.5" />
                    )}
                    <div className="text-xs sm:text-sm text-[#1C2A39]">
                      <strong>Be a Witness:</strong> Did I share one small piece of my testimony or encouragement with someone else?
                    </div>
                  </div>
                </div>
              </div>

              {/* END OF MONTH REVIEW */}
              <div className="p-5 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                  END OF MONTH REVIEW
                </h4>
                <div className="space-y-2 text-xs sm:text-sm text-[#1C2A39]">
                  <p><strong>Look Back:</strong> What is one specific way my mindset has shifted since Day 1 of this month?</p>
                  <p><strong>Release a Lie:</strong> What is one false label I am ready to leave behind this month?</p>
                  <p><strong>Celebrate the Step:</strong> What is one “small thing” I did this month that I shouldn’t minimize?</p>
                  <p><strong>Prepare for Next:</strong> What is the theme for next month, and what do I need to surrender to walk into it?</p>
                </div>
              </div>
            </div>

            {/* IF IT GETS HEAVY Notice (Exact from Page 15) */}
            <div className="p-4 rounded-xl bg-[#FAF3E0] border border-[#D4AF37]/50 text-xs sm:text-sm text-[#1C2A39] flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold mb-0.5">! — IF IT GETS HEAVY</strong>
                <p className="text-[#2B2B2B]">
                  If something on these pages stirs up more than you can hold alone, pause. Close the book and call your sponsor, your counselor, or someone safe. The 988 Suicide &amp; Crisis Lifeline is available 24/7. Taking a break is not quitting. It’s wisdom.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: FULL PDF EMBED / VIEWER */}
        {activeTab === 'pdf' && (
          <div className="flex-1 overflow-hidden flex flex-col p-4 sm:p-6 bg-[#EFE9DC]/30">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs text-[#1C2A39]/80 font-medium">
                Official PDF Document (16 Pages)
              </span>
              <a
                href={PDF_ASSET_PATH}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#1C2A39] hover:text-[#D4AF37] font-semibold underline underline-offset-2"
              >
                <span>Open in Full Browser Tab</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="flex-1 w-full rounded-xl overflow-hidden border border-[#1C2A39]/15 shadow-inner bg-white">
              <iframe
                src={`${PDF_ASSET_PATH}#view=FitH`}
                title="7 Days to a Renewed Mind Official PDF"
                className="w-full h-full min-h-[500px]"
              />
            </div>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="px-5 sm:px-7 py-3 bg-[#1C2A39] text-white/80 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 border-t border-white/10">
          <span>&ldquo;God is not finished writing your story.&rdquo; — C. Lamont Patrick</span>
          <a
            href={PDF_ASSET_PATH}
            download="7_Days_to_a_Renewed_Mind_Sacred_Steps_Starter_Kit.pdf"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] hover:underline font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download 16-Page Starter Kit PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
