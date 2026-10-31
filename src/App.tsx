import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StepMethodSection } from './components/StepMethodSection';
import { AuthorSection } from './components/AuthorSection';
import { EcosystemSection } from './components/EcosystemSection';
import { FaqPanel } from './components/FaqPanel';
import { Footer } from './components/Footer';
import { GroundingDrawer } from './components/GroundingDrawer';
import { StarterKitModal } from './components/StarterKitModal';
import { 
  ChevronLeft, ChevronRight, MoveHorizontal, Compass, 
  Sparkles, Layers, BookOpen, ShieldCheck 
} from 'lucide-react';
import { testFirestoreConnection } from './lib/firebase';

const TOTAL_PANELS = 5;

export default function App() {
  const [currentPanel, setCurrentPanel] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHorizontalMode, setIsHorizontalMode] = useState(true);
  const [isGroundingOpen, setIsGroundingOpen] = useState(false);
  const [isStarterKitModalOpen, setIsStarterKitModalOpen] = useState(false);
  const [subscriberName, setSubscriberName] = useState('Friend');
  const [isVipWaitlist, setIsVipWaitlist] = useState(true);
  const horizontalStripRef = useRef<HTMLDivElement>(null);

  // Validate connection to Firestore on initial boot
  useEffect(() => {
    testFirestoreConnection();
  }, []);

  // Sync window scroll to horizontal transformation
  useEffect(() => {
    if (!isHorizontalMode) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const track = document.getElementById('scroll-track');
          if (!track) return;
          const maxScroll = track.offsetHeight - window.innerHeight;
          if (maxScroll <= 0) return;

          const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
          setScrollProgress(progress);

          const activeIndex = Math.min(
            TOTAL_PANELS - 1,
            Math.max(0, Math.round(progress * (TOTAL_PANELS - 1)))
          );
          setCurrentPanel(activeIndex);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHorizontalMode]);

  // Keyboard navigation for horizontal panels (ArrowLeft / ArrowRight)
  useEffect(() => {
    if (!isHorizontalMode) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) {
        return;
      }
      if (e.key === 'ArrowRight') {
        navigateToPanel(Math.min(TOTAL_PANELS - 1, currentPanel + 1));
      } else if (e.key === 'ArrowLeft') {
        navigateToPanel(Math.max(0, currentPanel - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPanel, isHorizontalMode]);

  const navigateToPanel = (index: number) => {
    if (isHorizontalMode) {
      const track = document.getElementById('scroll-track');
      if (track) {
        const maxScroll = track.offsetHeight - window.innerHeight;
        const targetScroll = (index / (TOTAL_PANELS - 1)) * maxScroll;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        setCurrentPanel(index);
      }
    } else {
      const panelIds = ['home', 'method', 'about', 'library', 'faq'];
      const el = document.getElementById(panelIds[index]);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setCurrentPanel(index);
      }
    }
  };

  const handleFormSuccess = (name: string, isVip: boolean, formats?: string[]) => {
    setSubscriberName(name || 'Friend');
    setIsVipWaitlist(isVip);
    setIsStarterKitModalOpen(true);
  };

  const handleOpenDayModal = (dayIndex?: number) => {
    setIsStarterKitModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F6F0] text-[#1C2A39] font-sans antialiased relative selection:bg-[#D4AF37]/30 selection:text-[#1C2A39]">
      
      {/* Sticky Navigation Bar */}
      <Navbar
        currentPanel={currentPanel}
        totalPanels={TOTAL_PANELS}
        onNavigateToPanel={navigateToPanel}
        onOpenGrounding={() => setIsGroundingOpen(true)}
        isHorizontalMode={isHorizontalMode}
        onToggleHorizontalMode={() => {
          setIsHorizontalMode(!isHorizontalMode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* HORIZONTAL MODE ARCHITECTURE (5 Seamless Panels) */}
      {isHorizontalMode ? (
        <div
          id="scroll-track"
          style={{ height: `${TOTAL_PANELS * 100}vh` }}
          className="relative w-full"
        >
          {/* Sticky 100vh Viewport */}
          <div className="sticky top-0 h-screen w-screen overflow-hidden">
            
            {/* Horizontal Strip */}
            <div
              ref={horizontalStripRef}
              style={{
                transform: `translate3d(-${scrollProgress * (TOTAL_PANELS - 1) * 100}vw, 0px, 0px)`,
                willChange: 'transform',
                width: `${TOTAL_PANELS * 100}vw`,
              }}
              className="flex flex-row h-full transition-transform duration-75 ease-out"
            >
              {/* PANEL 1: HERO / HOMEPAGE & VIP WAITLIST FORM */}
              <section
                id="panel-home"
                aria-label="Panel 1: Sacred Steps Home & Free Starter Kit"
                className="w-screen min-w-[100vw] h-screen overflow-y-auto pt-20 pb-16 flex flex-col justify-start"
              >
                <HeroSection
                  onFormSuccess={handleFormSuccess}
                  onOpenSampleDay1={() => handleOpenDayModal(0)}
                />
              </section>

              {/* PANEL 2: THE SACRED S.T.E.P. METHOD & 7-DAY ROADMAP */}
              <section
                id="panel-method"
                aria-label="Panel 2: The Sacred S.T.E.P. Method"
                className="w-screen min-w-[100vw] h-screen overflow-y-auto pt-20 pb-16 flex flex-col justify-start bg-[#FCFAF6] border-x border-[#1C2A39]/10"
              >
                <StepMethodSection
                  onScrollToForm={() => navigateToPanel(0)}
                  onOpenDayModal={handleOpenDayModal}
                />
              </section>

              {/* PANEL 3: ABOUT / AUTHOR'S LIVED EXPERIENCE */}
              <section
                id="panel-about"
                aria-label="Panel 3: About Author C. Lamont Patrick"
                className="w-screen min-w-[100vw] h-screen overflow-y-auto pt-20 pb-16 flex flex-col justify-start"
              >
                <AuthorSection />
              </section>

              {/* PANEL 4: THE LIBRARY & ECOSYSTEM */}
              <section
                id="panel-library"
                aria-label="Panel 4: The Sacred Steps Recovery Ecosystem"
                className="w-screen min-w-[100vw] h-screen overflow-y-auto pt-20 pb-16 flex flex-col justify-start bg-[#FCFAF6] border-x border-[#1C2A39]/10"
              >
                <EcosystemSection
                  onJoinWaitlist={() => {
                    navigateToPanel(0);
                    setTimeout(() => {
                      const el = document.getElementById('first-name');
                      if (el) el.focus();
                    }, 400);
                  }}
                />
              </section>

              {/* PANEL 5: FAQ & FOOTER */}
              <section
                id="panel-faq"
                aria-label="Panel 5: Frequently Asked Questions & Ministry Information"
                className="w-screen min-w-[100vw] h-screen overflow-y-auto pt-20 flex flex-col justify-between bg-[#FCFAF6]"
              >
                <div className="flex-1 py-4 sm:py-8">
                  <FaqPanel />
                </div>
                <Footer onOpenGrounding={() => setIsGroundingOpen(true)} />
              </section>
            </div>

            {/* Bottom Floating Horizontal Journey Controller */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 hidden sm:flex items-center gap-3 px-4 py-2 rounded-full bg-[#1C2A39]/90 text-white backdrop-blur-md border border-[#D4AF37]/35 shadow-lg select-none">
              <button
                onClick={() => navigateToPanel(Math.max(0, currentPanel - 1))}
                disabled={currentPanel === 0}
                aria-label="Previous horizontal panel"
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-[#D4AF37] font-bold">
                  {String(currentPanel + 1).padStart(2, '0')}
                </span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">
                  {String(TOTAL_PANELS).padStart(2, '0')}
                </span>
                <span className="text-[11px] font-sans text-white/60 ml-1 border-l border-white/20 pl-2 hidden md:inline">
                  {['Home', 'Method', 'About', 'Library', 'FAQ'][currentPanel]}
                </span>
              </div>

              {/* Panel Dots */}
              <div className="flex items-center gap-1.5 ml-1">
                {Array.from({ length: TOTAL_PANELS }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigateToPanel(idx)}
                    aria-label={`Jump to Panel ${idx + 1}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentPanel === idx
                        ? 'w-5 bg-[#D4AF37]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigateToPanel(Math.min(TOTAL_PANELS - 1, currentPanel + 1))}
                disabled={currentPanel === TOTAL_PANELS - 1}
                aria-label="Next horizontal panel"
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      ) : (
        /* VERTICAL FALLBACK MODE */
        <main className="pt-20">
          <div id="home">
            <HeroSection
              onFormSuccess={handleFormSuccess}
              onOpenSampleDay1={() => handleOpenDayModal(0)}
            />
          </div>
          <div id="method">
            <StepMethodSection
              onScrollToForm={() => {
                const el = document.getElementById('email-capture');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenDayModal={handleOpenDayModal}
            />
          </div>
          <div id="about">
            <AuthorSection />
          </div>
          <div id="library">
            <EcosystemSection
              onJoinWaitlist={() => {
                const el = document.getElementById('email-capture');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const input = document.getElementById('first-name');
                    if (input) input.focus();
                  }, 400);
                }
              }}
            />
          </div>
          <div id="faq">
            <FaqPanel />
          </div>
          <Footer onOpenGrounding={() => setIsGroundingOpen(true)} />
        </main>
      )}

      {/* 1-Tap Floating SOS Grounding Anchor (Accessible from ANY panel) */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          onClick={() => setIsGroundingOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#1C2A39] text-[#F9F6F0] shadow-xl border border-[#D4AF37]/40 hover:bg-[#2A3C50] transition-all hover:scale-105 active:scale-95 cursor-pointer"
          title="Open Sacred Grounding Anchor (1-Tap)"
          aria-label="Open 1-Tap Grounding Anchor"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]" />
          </span>
          <span className="text-xs font-semibold tracking-wide font-sans">
            1-Tap Grounding
          </span>
        </button>
      </div>

      {/* Modals */}
      <GroundingDrawer
        isOpen={isGroundingOpen}
        onClose={() => setIsGroundingOpen(false)}
      />

      <StarterKitModal
        isOpen={isStarterKitModalOpen}
        onClose={() => setIsStarterKitModalOpen(false)}
        subscriberName={subscriberName}
        isVipWaitlist={isVipWaitlist}
      />
    </div>
  );
}
