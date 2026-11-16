import React from 'react';
import { Quote, Sparkles, BookMarked, HeartHandshake } from 'lucide-react';

export const AuthorSection: React.FC = () => {
  return (
    <section id="author-story" className="py-16 md:py-24 relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#7A8B7B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Author Card / Visual Presentation (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm">
              
              {/* Outer Golden Aura */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#D4AF37]/25 to-[#7A8B7B]/20 rounded-3xl blur-lg" />

              {/* Author Card Container */}
              <div className="relative rounded-2xl bg-white border border-[#D4AF37]/40 p-6 sm:p-7 shadow-xl space-y-5 text-center">
                
                {/* Author Portrait framed to match the arched silhouette */}
                <div className="relative w-44 sm:w-48 aspect-[3/4] mx-auto rounded-t-full rounded-b-2xl p-1 bg-gradient-to-b from-[#D4AF37] to-[#1C2A39]/85 shadow-md">
                  <div className="w-full h-full rounded-t-full rounded-b-[13px] overflow-hidden bg-[#F9F6F0]">
                    <img
                      src="/assets/aistudio/image_c95377dc.png"
                      alt="Portrait of author C. Lamont Patrick"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-serif font-bold text-[#1C2A39]">
                    C. Lamont Patrick
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                    Author, USAF Vet &amp; Redeemed Friend
                  </p>
                  <p className="text-xs text-[#2B2B2B]/70 italic font-serif">
                    Sacred Steps to Redemption · Kya Daisy Publishing
                  </p>
                </div>

                {/* Grounded Author Milestones */}
                <div className="pt-4 border-t border-[#1C2A39]/10 grid grid-cols-2 gap-3 text-left">
                  <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#1C2A39]/5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A8B7B] block">
                      Lived Experience
                    </span>
                    <span className="text-xs font-bold text-[#1C2A39]">
                      20+ Years in Recovery
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#F9F6F0] border border-[#1C2A39]/5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#7A8B7B] block">
                      Core Framework
                    </span>
                    <span className="text-xs font-bold text-[#1C2A39]">
                      Biblical Renewal
                    </span>
                  </div>
                </div>

                {/* Compassion commitment badge */}
                <div className="text-[11px] text-[#2B2B2B]/75 italic pt-1 flex items-center justify-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>&ldquo;Walking beside you, not above you.&rdquo;</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: The Author Connection Narrative (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#7A8B7B]">
                THE HEART BEHIND THE STEPS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#1C2A39] leading-tight">
                I Don&apos;t Speak About Recovery Because I Studied It. I Lived It.
              </h2>
            </div>

            {/* Exact blueprint paragraphs */}
            <div className="space-y-4 text-base sm:text-lg text-[#2B2B2B]/90 font-sans leading-relaxed">
              <p>
                For more than twenty years, addiction and shame had the final word in my story. I know what it feels like to wake up exhausted. I know the specific weight of promising yourself &ldquo;never again&rdquo; and breaking that promise before the sun goes down.
              </p>

              {/* Callout Quote */}
              <div className="my-6 p-5 sm:p-6 rounded-2xl bg-[#FAF3E0] border-y border-[#D4AF37]/50 relative">
                <Quote className="w-8 h-8 text-[#D4AF37]/40 absolute top-4 right-4" />
                <p className="font-serif italic text-lg sm:text-xl text-[#1C2A39] leading-relaxed relative z-10">
                  &ldquo;Nothing changed until I stopped trying to manage my wreckage and started surrendering it. I learned that an affirmation without Scripture is just a hopeful guess. But a <span className="underline decoration-[#D4AF37] decoration-2 underline-offset-4">biblical affirmation</span>? That is you agreeing with what God has already said is true.&rdquo;
                </p>
              </div>

              <p>
                These 7 days are just the foundation. Your past is part of your story, but it does not define who God created you to become. Let’s take the next step together.
              </p>
            </div>

            {/* Author Signature Line */}
            <div className="pt-4 border-t border-[#1C2A39]/15 flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-xl text-[#1C2A39]">
                  — C. Lamont Patrick
                </p>
                <p className="text-xs font-serif italic text-[#7A8B7B] tracking-wide mt-0.5">
                  Author, Sacred Steps to Redemption
                </p>
              </div>
              <div className="font-script text-2xl sm:text-3xl text-[#1C2A39]/70 select-none">
                C. Lamont Patrick
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
