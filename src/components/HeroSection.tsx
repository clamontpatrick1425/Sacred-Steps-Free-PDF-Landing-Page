import React, { useState } from 'react';
import { 
  Sparkles, ArrowRight, BookOpen, ShieldCheck, Check, Heart, 
  CheckSquare, Square, CheckCircle2, AlertCircle, Loader2, Download 
} from 'lucide-react';
import { useEmailValidation } from '../hooks/useEmailValidation';
import { saveSubscriberToFirestore } from '../lib/firebase';
import {
  PDF_ASSET_PATH,
  PDF_DOWNLOAD_FILENAME,
  downloadOfficialStarterKitPdf,
} from '../lib/pdf';

interface HeroSectionProps {
  onFormSuccess: (name: string, isVip: boolean, formats: string[]) => void;
  onOpenSampleDay1: () => void;
  onOpenLegal?: (docType: 'privacy' | 'terms') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onFormSuccess,
  onOpenSampleDay1,
  onOpenLegal,
}) => {
  const [firstName, setFirstName] = useState('');
  const [isVipWaitlist, setIsVipWaitlist] = useState(true);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([
    'Kindle Edition',
    '6x9 Amazon KDP'
  ]);
  const [nameError, setNameError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Custom real-time email validation hook
  const {
    email,
    handleChange: handleEmailChange,
    handleBlur: handleEmailBlur,
    isValid: isEmailValid,
    isTouched: isEmailTouched,
    error: emailError,
    suggestion: emailSuggestion,
    applySuggestion: applyEmailSuggestion,
    status: emailStatus,
  } = useEmailValidation('');

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    let hasError = false;
    if (!firstName.trim()) {
      setNameError('Please tell us what to call you.');
      hasError = true;
    } else {
      setNameError(null);
    }

    if (!isEmailValid) {
      handleEmailBlur();
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Store in Firebase Firestore
      await saveSubscriberToFirestore({
        name: firstName.trim(),
        email: email.trim().toLowerCase(),
        isVipWaitlist,
        selectedFormats,
        source: 'hero_starter_kit',
      });

      // Also cache in local storage for instant offline resilience
      try {
        localStorage.setItem(
          'sacred_steps_subscriber',
          JSON.stringify({
            firstName,
            email,
            isVipWaitlist,
            selectedFormats,
            date: new Date().toISOString(),
          })
        );
      } catch (err) {}

      setIsSubmitting(false);
      setHasSubmitted(true);
      onFormSuccess(firstName, isVipWaitlist, selectedFormats);
    } catch (err) {
      console.error('Error saving subscriber to Firestore:', err);
      // Graceful fallback: allow user to continue while logging
      setIsSubmitting(false);
      setHasSubmitted(true);
      onFormSuccess(firstName, isVipWaitlist, selectedFormats);
    }
  };

  return (
    <section id="hero" className="relative pt-8 pb-16 md:pt-14 md:pb-24 overflow-hidden">
      {/* Gentle ambient light aura */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#D4AF37]/8 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-80 h-80 bg-[#7A8B7B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Headlines, Empathy Hook & Email Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow Text - Muted Sage, Small Caps */}
            <div className="inline-flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-[#7A8B7B]">
                A SACRED STEPS STARTER KIT
              </span>
              <span className="h-px w-8 bg-[#7A8B7B]/40" />
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold text-[#1C2A39] leading-[1.15] tracking-tight text-balance">
              Stop White-Knuckling Your Recovery. Start Renewing Your Mind.
            </h1>

            {/* Subheadline - Deep Sacred Blue, Inter/Lato */}
            <p className="text-base sm:text-lg text-[#1C2A39]/90 leading-relaxed font-sans max-w-2xl">
              Get your <strong className="font-semibold text-[#1C2A39]">FREE 7-Day Sacred Steps Starter Kit</strong> &amp; join the early access waitlist for the upcoming <em className="italic">365 Biblical Affirmations</em> Book, ePub, and Audiobook.
            </p>

            {/* Empathy Hook - Italicized, Cormorant Garamond */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#D4AF37]/30 shadow-xs relative">
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 bg-[#FAF3E0] text-[#1C2A39] text-[11px] font-semibold tracking-wider uppercase rounded border border-[#D4AF37]/40">
                A Gentle Truth For Today
              </div>
              <p className="font-serif italic text-lg sm:text-xl text-[#1C2A39] leading-relaxed pt-1">
                &ldquo;You don’t have to feel any different on Day 1. You only need to be willing to hear another voice and let it speak longer than the shame has.&rdquo;
              </p>
              <div className="mt-2 text-xs font-sans text-[#7A8B7B] font-medium flex items-center gap-1.5">
                <span>— C. Lamont Patrick,</span>
                <span className="italic">A friend in recovery</span>
              </div>
            </div>

            {/* EMAIL CAPTURE FORM WITH REAL-TIME VALIDATION & FIRESTORE STORAGE */}
            <div id="email-capture" className="pt-2">
              {hasSubmitted ? (
                <div className="p-6 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-sm text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF3E0] text-[#D4AF37] flex items-center justify-center">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#1C2A39]">
                    Grace Has Reached You, {firstName}!
                  </h3>
                  <p className="text-sm text-[#2B2B2B]/80 max-w-md mx-auto">
                    Your 7-Day Starter Kit is unlocked and ready. Your profile has been securely recorded to the VIP Waitlist.
                  </p>
                  {selectedFormats.length > 0 && (
                    <div className="text-xs text-[#7A8B7B]">
                      Preferences saved: {selectedFormats.join(' · ')}
                    </div>
                  )}
                  <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
                    <button
                      onClick={onOpenSampleDay1}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C2A39] text-[#F9F6F0] hover:bg-[#2A3C50] text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                      <span>Open Your 7-Day Guide Now</span>
                    </button>
                    <a
                      href={PDF_ASSET_PATH}
                      download={PDF_DOWNLOAD_FILENAME}
                      onClick={downloadOfficialStarterKitPdf}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] text-xs font-bold tracking-wide transition-colors cursor-pointer shadow-xs"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download 16-Page PDF</span>
                    </a>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-6 sm:p-7 rounded-2xl bg-white/90 border border-[#1C2A39]/10 shadow-lg shadow-[#1C2A39]/5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#7A8B7B]">
                      Instant Digital Access · Free 16-Page PDF
                    </span>
                    <span className="text-xs text-[#D4AF37] font-semibold">
                      40% Early-Bird Launch Pass
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Input Field 1: First Name */}
                    <div>
                      <label htmlFor="first-name" className="block text-xs font-medium text-[#1C2A39] mb-1.5">
                        First Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={(e) => {
                          setFirstName(e.target.value);
                          if (nameError) setNameError(null);
                        }}
                        placeholder="e.g. David, Sarah, Lamont"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#1C2A39] placeholder:text-[#1C2A39]/40 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                          nameError 
                            ? 'border-red-400 focus:ring-red-300 bg-red-50/20' 
                            : 'border-[#1C2A39]/20 bg-[#F9F6F0]/50 focus:ring-[#D4AF37]'
                        }`}
                      />
                      {nameError && (
                        <p className="text-[11px] text-red-700 mt-1 font-medium">{nameError}</p>
                      )}
                    </div>

                    {/* Input Field 2: Email Address with Real-Time Validation Feedback */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="email-address" className="block text-xs font-medium text-[#1C2A39]">
                          Email Address <span className="text-[#D4AF37]">*</span>
                        </label>
                        {/* Real-time status indicator tag */}
                        {emailStatus === 'valid' && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#7A8B7B] font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#7A8B7B]" />
                            <span>Valid Email</span>
                          </span>
                        )}
                      </div>

                      <div className="relative">
                        <input
                          id="email-address"
                          type="email"
                          value={email}
                          onChange={handleEmailChange}
                          onBlur={handleEmailBlur}
                          placeholder="you@domain.com"
                          aria-invalid={!isEmailValid && isEmailTouched}
                          className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm text-[#1C2A39] placeholder:text-[#1C2A39]/40 focus:outline-hidden focus:ring-2 focus:bg-white transition-all ${
                            emailStatus === 'valid'
                              ? 'border-[#7A8B7B] focus:ring-[#7A8B7B] bg-[#7A8B7B]/5'
                              : isEmailTouched && !isEmailValid
                              ? 'border-red-400 focus:ring-red-300 bg-red-50/20'
                              : 'border-[#1C2A39]/20 bg-[#F9F6F0]/50 focus:ring-[#D4AF37]'
                          }`}
                        />

                        {/* Real-time trailing icon */}
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          {emailStatus === 'valid' ? (
                            <CheckCircle2 className="w-4 h-4 text-[#7A8B7B]" />
                          ) : isEmailTouched && !isEmailValid ? (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          ) : null}
                        </div>
                      </div>

                      {/* Real-Time Error Feedback */}
                      {isEmailTouched && emailError && (
                        <p className="text-[11px] text-red-700 mt-1 font-medium flex items-center gap-1">
                          <span>{emailError}</span>
                        </p>
                      )}

                      {/* Domain Typo Correction Suggestion Pill */}
                      {emailSuggestion && (
                        <div className="mt-1.5 p-1.5 px-2.5 rounded-lg bg-[#FAF3E0] border border-[#D4AF37]/40 flex items-center justify-between text-xs">
                          <span className="text-[#1C2A39] text-[11px]">
                            Did you mean <strong>{emailSuggestion}</strong>?
                          </span>
                          <button
                            type="button"
                            onClick={applyEmailSuggestion}
                            className="text-[11px] text-[#D4AF37] hover:text-[#1C2A39] font-bold underline ml-2 cursor-pointer"
                          >
                            Apply Fix
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Checkbox - Muted Sage */}
                  <div className="space-y-2 pt-1">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isVipWaitlist}
                        onChange={(e) => setIsVipWaitlist(e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-[#7A8B7B] text-[#7A8B7B] focus:ring-[#D4AF37] accent-[#7A8B7B]"
                      />
                      <span className="text-xs sm:text-sm text-[#2B2B2B]/90 font-medium">
                        Yes, add me to the VIP Waitlist for the 365-Day Book, ePub, and Audiobook Launch!
                      </span>
                    </label>

                    {/* Format Preferences Selector */}
                    {isVipWaitlist && (
                      <div className="ml-7 p-3 rounded-xl bg-[#FAF5EA] border border-[#D4AF37]/30 space-y-2 text-xs">
                        <span className="font-semibold text-[#1C2A39] block text-[11px] uppercase tracking-wide">
                          Which format serves your journey best?
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {[
                            { id: '6x9 Amazon KDP', label: '📖 6x9 Amazon KDP Edition' },
                            { id: 'Kindle Edition', label: '📲 Kindle Edition' },
                            { id: 'Downloadable eBook PDF', label: '📱 Downloadable eBook PDF' },
                            { id: 'Spoken Word Audiobook', label: '🎧 Spoken Word Audiobook' }
                          ].map((item) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => toggleFormat(item.id)}
                              className={`flex items-center gap-2 p-1.5 rounded-lg text-left transition-colors cursor-pointer select-none ${
                                selectedFormats.includes(item.id)
                                  ? 'bg-white text-[#1C2A39] font-medium shadow-2xs border border-[#D4AF37]/40'
                                  : 'text-[#1C2A39]/70 hover:text-[#1C2A39]'
                              }`}
                            >
                              {selectedFormats.includes(item.id) ? (
                                <CheckSquare className="w-4 h-4 text-[#D4AF37] shrink-0" />
                              ) : (
                                <Square className="w-4 h-4 text-[#1C2A39]/30 shrink-0" />
                              )}
                              <span>{item.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {submitError && (
                    <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
                      {submitError}
                    </div>
                  )}

                  {/* CTA BUTTON - Dawn Gold Background, Deep Blue Text, Rounded */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] font-bold text-sm sm:text-base tracking-wide transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#1C2A39]" />
                        <span>Securing Your Copy in Firestore...</span>
                      </>
                    ) : (
                      <span>👉 SEND ME MY FREE 7-DAY STARTER KIT</span>
                    )}
                  </button>

                  {/* Trust markers & Notice at Collection */}
                  <div className="pt-1 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-[#2B2B2B]/70 text-center">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#7A8B7B]" />
                      Zero Spam. Never Sold.
                    </span>
                    <span>·</span>
                    <span>Instant 16-Page PDF</span>
                    {onOpenLegal && (
                      <>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() => onOpenLegal('privacy')}
                          className="underline underline-offset-2 hover:text-[#1C2A39] cursor-pointer"
                        >
                          Privacy Policy
                        </button>
                        <span>·</span>
                        <button
                          type="button"
                          onClick={() => onOpenLegal('terms')}
                          className="underline underline-offset-2 hover:text-[#1C2A39] cursor-pointer"
                        >
                          Terms
                        </button>
                      </>
                    )}
                  </div>
                </form>
              )}
            </div>

          </div>

          {/* Right Column: Visual Mockup of Starter Kit & Book (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Elegant Realistic Book/Guide Presentation mirroring Page 1 of the 16-Page Official PDF */}
            <div className="relative w-full max-w-md mx-auto group">
              
              {/* Soft Dawn Shadow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#D4AF37]/25 via-[#7A8B7B]/15 to-[#1C2A39]/15 rounded-3xl blur-xl transition-all duration-500 group-hover:scale-105" />

              {/* Clickable Front Cover Card — Exact Replica of Official PDF Page 1 */}
              <a
                href={PDF_ASSET_PATH}
                download={PDF_DOWNLOAD_FILENAME}
                onClick={downloadOfficialStarterKitPdf}
                title="Click to download the 16-Page Official Sacred Steps Starter Kit PDF"
                aria-label="Download 7 Days to a Renewed Mind 16-Page Official PDF"
                className="relative block rounded-2xl bg-white text-[#1C2A39] p-3 sm:p-4 shadow-2xl border border-[#1C2A39]/10 overflow-hidden transition-transform duration-300 group-hover:-translate-y-1 cursor-pointer"
              >
                {/* Subtle left book spine shading */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-[#1C2A39]/12 via-[#1C2A39]/4 to-transparent pointer-events-none z-10" />

                {/* Hover Download Affordance Badge */}
                <span className="absolute top-5 right-5 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1C2A39]/90 text-[#F9F6F0] text-[10px] font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                  <Download className="w-3 h-3 text-[#D4AF37]" />
                  <span>Download PDF</span>
                </span>

                {/* Outer Gold Frame (matching PDF Page 1) */}
                <div className="rounded-xl border-[1.5px] border-[#D4AF37] p-1">
                  {/* Inner Gold Frame */}
                  <div className="rounded-lg border border-[#D4AF37]/65 px-5 sm:px-7 py-6 sm:py-7 flex flex-col items-center justify-between text-center min-h-[450px] bg-gradient-to-b from-white via-[#FFFDF9] to-white">
                    
                    {/* Top Section: Sacred Path, Cross & Sunrise Emblem */}
                    <div className="w-full flex flex-col items-center space-y-2.5">
                      <div className="w-28 sm:w-32 h-auto">
                        <svg viewBox="0 0 180 120" fill="none" className="w-full h-auto" aria-hidden="true">
                          <defs>
                            <radialGradient id="sacredSunGlow" cx="50%" cy="48%" r="42%">
                              <stop offset="0%" stopColor="#F5D061" stopOpacity="0.55" />
                              <stop offset="55%" stopColor="#E9C46A" stopOpacity="0.22" />
                              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                            </radialGradient>
                          </defs>

                          {/* Soft sun glow */}
                          <circle cx="90" cy="54" r="46" fill="url(#sacredSunGlow)" />

                          {/* Radiating golden sun rays */}
                          <g stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" opacity="0.85">
                            <line x1="90" y1="8" x2="90" y2="20" />
                            <line x1="72" y1="11" x2="76" y2="22" />
                            <line x1="108" y1="11" x2="104" y2="22" />
                            <line x1="55" y1="19" x2="64" y2="28" />
                            <line x1="125" y1="19" x2="116" y2="28" />
                            <line x1="43" y1="32" x2="54" y2="39" />
                            <line x1="137" y1="32" x2="126" y2="39" />
                            <line x1="36" y1="47" x2="48" y2="50" />
                            <line x1="144" y1="47" x2="132" y2="50" />
                          </g>

                          {/* Sun dome arc */}
                          <path
                            d="M 55 58 A 35 35 0 0 1 125 58"
                            stroke="#D4AF37"
                            strokeWidth="1.5"
                            strokeOpacity="0.65"
                            fill="none"
                          />

                          {/* Rolling horizon hills */}
                          <path
                            d="M 24 62 Q 55 52 90 59 Q 125 52 156 62"
                            stroke="#1C2A39"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                          />

                          {/* Cross at the crest of the hill */}
                          <path
                            d="M 86.5 28 H 93.5 V 37 H 102 V 43.5 H 93.5 V 60 H 86.5 V 43.5 H 78 V 37 H 86.5 Z"
                            fill="#FFFFFF"
                            stroke="#1C2A39"
                            strokeWidth="2"
                            strokeLinejoin="round"
                          />

                          {/* Winding Sacred Path leading down from the Cross */}
                          <path
                            d="M 88 60 C 80 68, 66 71, 69 82 C 72 93, 108 93, 104 104 C 101 111, 88 114, 78 117"
                            stroke="#1C2A39"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                          />
                          <path
                            d="M 92 60 C 90 67, 81 71, 84 79 C 87 86, 124 90, 121 104 C 118 112, 106 115, 97 118"
                            stroke="#1C2A39"
                            strokeWidth="2"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </div>

                      <span className="text-[9px] sm:text-[10px] font-sans font-bold tracking-[0.28em] uppercase text-[#1C2A39] block pt-0.5">
                        SACRED STEPS STARTER KIT
                      </span>

                      <h2 className="text-[28px] sm:text-[34px] font-serif font-bold text-[#1C2A39] tracking-tight leading-[1.12]">
                        7 Days to a<br />Renewed Mind
                      </h2>

                      {/* Short Gold Accent Rule */}
                      <div className="w-12 h-0.5 bg-[#D4AF37] mx-auto my-1" />

                      <p className="text-[11px] sm:text-xs font-serif italic text-[#1C2A39]/90 leading-snug max-w-[265px] mx-auto">
                        The first week of Sacred Steps to Redemption &mdash;<br className="hidden sm:inline" /> Scripture, truth, affirmation, and one small step a day.
                      </p>

                      {/* Week 1 Pill Badge */}
                      <div className="pt-1">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-[#D4AF37]/80 text-[9px] sm:text-[9.5px] font-sans font-bold tracking-[0.2em] uppercase text-[#1C2A39]">
                          WEEK 1 &bull; I AM CHOSEN
                        </span>
                      </div>
                    </div>

                    {/* Author & Publisher Footer (matching PDF Page 1) */}
                    <div className="w-full space-y-2.5 pt-5">
                      <div>
                        <span className="text-xs sm:text-[13px] font-serif font-bold tracking-[0.06em] uppercase text-[#1C2A39] block">
                          C. LAMONT PATRICK
                        </span>
                        <span className="text-[9.5px] sm:text-[10px] font-sans text-[#2B2B2B]/80 block mt-0.5">
                          Author of Sacred Steps to Redemption: 365 Biblical Affirmations
                        </span>
                      </div>

                      <div className="w-36 h-px bg-[#D4AF37]/45 mx-auto" />

                      <div className="space-y-0.5">
                        <p className="text-[11px] sm:text-xs font-serif italic text-[#1C2A39]">
                          A Path to Recovery, A Life in Grace.
                        </p>
                        <p className="text-[8.5px] sm:text-[9px] font-sans text-[#2B2B2B]/65 leading-tight">
                          Kya Daisy Publishing &bull; A free gift for subscribers of Sacred Steps to Redemption Affirmations
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
