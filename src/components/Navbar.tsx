import React, { useState } from 'react';
import { Shield, Sparkles, Menu, X, ArrowRight, ArrowLeft, LayoutGrid, MoveHorizontal } from 'lucide-react';

interface NavbarProps {
  currentPanel: number;
  totalPanels: number;
  onNavigateToPanel: (index: number) => void;
  onOpenGrounding: () => void;
  isHorizontalMode: boolean;
  onToggleHorizontalMode: () => void;
}

export const panelLinks = [
  { id: 'home', label: 'Home', index: 0 },
  { id: 'method', label: 'The Method', index: 1 },
  { id: 'about', label: 'About', index: 2 },
  { id: 'library', label: 'The Library', index: 3 },
  { id: 'faq', label: 'FAQ', index: 4 }
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPanel,
  totalPanels,
  onNavigateToPanel,
  onOpenGrounding,
  isHorizontalMode,
  onToggleHorizontalMode
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-[#1C2A39]/92 backdrop-blur-md border-b border-[#D4AF37]/30 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-18">
          
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigateToPanel(0);
              }}
              className="text-base sm:text-lg md:text-xl font-cinzel font-bold text-white tracking-wide whitespace-nowrap"
            >
              Sacred Steps to Redemption
            </a>
          </div>

          {/* Zone 2: 5 Concise Nav Links with Active Indicator */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-white/80">
            {panelLinks.map((link) => {
              const isActive = currentPanel === link.index;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigateToPanel(link.index)}
                  className={`py-1 relative transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    isActive ? 'text-[#D4AF37] font-bold' : 'hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D4AF37] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Layout Toggle + Grounding SOS + Primary CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Horizontal / Vertical Mode Toggle */}
            <button
              onClick={onToggleHorizontalMode}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors text-xs flex items-center gap-1.5"
              title={isHorizontalMode ? 'Switch to Vertical View' : 'Switch to Horizontal Journey'}
            >
              {isHorizontalMode ? (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden md:inline text-[11px]">Vertical Mode</span>
                </>
              ) : (
                <>
                  <MoveHorizontal className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="hidden md:inline text-[11px]">Horizontal Journey</span>
                </>
              )}
            </button>

            {/* 1-Tap Grounding SOS Anchor */}
            <button
              onClick={onOpenGrounding}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#7A8B7B]/25 text-white hover:bg-[#7A8B7B]/40 text-xs font-medium transition-colors whitespace-nowrap shrink-0"
              title="1-Tap Gentle Grounding Space"
            >
              <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
              <span className="hidden sm:inline">Grounding SOS</span>
              <span className="sm:hidden">SOS</span>
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onNavigateToPanel(0)}
              className="hidden sm:inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#BF9C2D] text-[#1C2A39] text-xs font-bold tracking-wide transition-all shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              Free Starter Kit
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Top Subtle Scroll Progress Bar */}
      <div className="w-full h-1 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#7A8B7B] transition-all duration-150"
          style={{ width: `${((currentPanel + 1) / totalPanels) * 100}%` }}
        />
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1C2A39] border-b border-[#D4AF37]/30 px-6 py-4 space-y-3">
          {panelLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigateToPanel(link.index);
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left text-xs uppercase tracking-wider font-semibold text-white/90 py-1.5 hover:text-[#D4AF37]"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              onClick={() => {
                onToggleHorizontalMode();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-[#D4AF37] font-semibold"
            >
              Toggle {isHorizontalMode ? 'Vertical' : 'Horizontal'} Mode
            </button>
            <button
              onClick={() => {
                onNavigateToPanel(0);
                setMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 rounded-lg bg-[#D4AF37] text-[#1C2A39] text-xs font-bold"
            >
              Get Free Kit
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
