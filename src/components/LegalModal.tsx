import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms' | null;

interface LegalModalProps {
  docType: LegalDocType;
  onClose: () => void;
  onSwitchDoc?: (docType: 'privacy' | 'terms') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  docType,
  onClose,
  onSwitchDoc,
}) => {
  useEffect(() => {
    if (!docType) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [docType, onClose]);

  if (!docType) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
    >
      <div className="bg-[#F9F6F0] text-[#1C2A39] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#1C2A39]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center shrink-0">
              {docType === 'privacy' ? (
                <ShieldCheck className="w-5 h-5" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
            </div>
            <div>
              <h4 id="legal-modal-title" className="text-xl font-serif font-bold text-[#1C2A39]">
                {docType === 'privacy' ? 'Privacy Policy & Notice at Collection' : 'Terms of Service & License'}
              </h4>
              <p className="text-[11px] text-[#7A8B7B] font-medium">
                Kya Daisy Publishing &bull; Effective Date: November 15, 2026
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close legal modal"
            className="p-1.5 rounded-lg text-[#1C2A39]/70 hover:text-[#1C2A39] hover:bg-[#1C2A39]/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="py-5 space-y-4 text-xs sm:text-sm text-[#2B2B2B]/90 leading-relaxed overflow-y-auto pr-1">
          {docType === 'privacy' ? (
            <>
              <p className="font-serif italic text-sm text-[#1C2A39] bg-[#FAF3E0] p-3.5 rounded-xl border border-[#D4AF37]/40">
                Your privacy and dignity in recovery are sacred to us. We never sell, rent, or trade your personal information, and we never run third-party behavioral ad trackers.
              </p>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  1. Who We Are &amp; Contact
                </h5>
                <p>
                  This website (<em>Sacred Steps to Redemption</em>) is an online publishing ministry operated by <strong>C. Lamont Patrick</strong> and <strong>Kya Daisy Publishing</strong>. Privacy inquiries, access requests, or deletion requests may be sent to{' '}
                  <a href="mailto:clamontpatrick@gmail.com" className="underline text-[#1C2A39] font-medium">
                    clamontpatrick@gmail.com
                  </a>.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  2. Information We Collect (Notice at Collection)
                </h5>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Subscriber Information You Provide:</strong> First name, email address, VIP Waitlist opt-in choice, and preferred book/journal format selections (e.g., 6x9 Amazon KDP, Kindle Edition, eBook PDF, or Audiobook).
                  </li>
                  <li>
                    <strong>Essential Hosting &amp; Security Data:</strong> Standard browser and connection metadata (such as IP address and request timestamps) processed automatically by our cloud hosting provider and Google Fonts to deliver the site reliably and prevent abuse.
                  </li>
                </ul>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  3. How We Use &amp; Protect Your Data
                </h5>
                <p>
                  We use your information strictly to: (a) deliver your free 16-page <em>7 Days to a Renewed Mind</em> Starter Kit PDF, (b) send launch notifications for <em>Sacred Steps to Redemption: 365 Biblical Affirmations</em> and companion journals when you explicitly opt in, and (c) plan print and digital inventory based on aggregate format preferences.
                </p>
                <p>
                  Records are stored securely in <strong>Google Cloud Firestore</strong> under strict access controls that block public reading or scraping—only the verified publisher account can access subscriber records.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  4. No Sale or Ad Sharing (CCPA/CPRA &amp; GDPR)
                </h5>
                <p>
                  We do <strong>not</strong> sell your personal information, nor do we share it for cross-context behavioral advertising. We only rely on trusted infrastructure providers (such as Google Firebase for database storage and our email delivery platform when you opt into the waitlist) under confidentiality obligations.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  5. Your Rights &amp; 1-Click Unsubscribe (CAN-SPAM, CCPA, GDPR)
                </h5>
                <p>
                  Regardless of where you live, you may at any time: (a) unsubscribe with a single click at the bottom of any email, (b) request a copy of the data we hold about you, (c) correct inaccurate details, or (d) request permanent deletion (&ldquo;Right to be Forgotten&rdquo;) by emailing{' '}
                  <a href="mailto:clamontpatrick@gmail.com" className="underline text-[#1C2A39] font-medium">
                    clamontpatrick@gmail.com
                  </a>. Unsubscribe requests are honored promptly and without fees or login barriers.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  6. Children&apos;s Privacy (COPPA)
                </h5>
                <p>
                  This website and its email waitlist are intended for individuals aged 13 and older (or the applicable age of digital consent in your region). We do not knowingly collect personal data from children under 13.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5 bg-[#FAF3E0] p-3.5 rounded-xl border border-[#D4AF37]/40">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  1. Spiritual Support &amp; Non-Clinical Disclaimer
                </h5>
                <p className="text-[#1C2A39]">
                  All content across <em>Sacred Steps to Redemption</em>, the 7-Day Starter Kit, and the 1-Tap Grounding Anchor is provided strictly for spiritual, educational, and inspirational purposes. It is <strong>not</strong> medical advice, psychotherapy, clinical addiction treatment, or a substitute for a licensed healthcare provider, counselor, or 12-Step sponsor.
                </p>
                <p className="text-[#1C2A39] font-semibold">
                  If you are in crisis, please call or text 988 (U.S. Suicide &amp; Crisis Lifeline) or contact local emergency services immediately.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  2. Copyright &amp; Limited Personal Sharing License
                </h5>
                <p>
                  Copyright &copy; 2026 by <strong>C. Lamont Patrick</strong> | <strong>Kya Daisy Publishing</strong>. All rights reserved. All original text, devotional frameworks (including <strong>The Sacred S.T.E.P. Method&trade;</strong>), reflections, and workbook exercises are protected by U.S. and international copyright law. Scripture quotations are taken from the King James Version (KJV), which is in the public domain in the United States.
                </p>
                <p>
                  <strong>Starter Kit Sharing Permission:</strong> Downloading the free <em>7 Days to a Renewed Mind</em> PDF grants you a personal, non-exclusive, non-transferable license. You may share the starter kit PDF with others for <strong>personal, non-commercial use only</strong>, provided it is shared <strong>in full and unaltered</strong>. No part of this site or PDF may be sold, repackaged, uploaded to commercial platforms, or scraped for commercial AI training without prior written permission.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  3. Acceptable Use &amp; Waitlist Submissions
                </h5>
                <p>
                  By submitting your name and email, you confirm that you are providing accurate information for yourself and are at least 13 years of age. You agree not to submit automated spam, malicious payloads, or third-party email addresses without consent.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  4. Disclaimer of Warranties &amp; Limitation of Liability
                </h5>
                <p>
                  This site and its digital resources are provided on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis. Recovery is an individual journey; we make no guarantees of specific outcomes or sobriety. To the maximum extent permitted by applicable law, C. Lamont Patrick and Kya Daisy Publishing shall not be liable for any indirect, incidental, or consequential damages resulting from your use of these resources.
                </p>
              </div>

              <div className="space-y-1.5">
                <h5 className="font-bold text-[#1C2A39] text-xs uppercase tracking-wider">
                  5. Updates &amp; Contact
                </h5>
                <p>
                  We may update these Terms of Service as new editions and journals launch. Permission requests or legal questions may be sent to{' '}
                  <a href="mailto:clamontpatrick@gmail.com" className="underline text-[#1C2A39] font-medium">
                    clamontpatrick@gmail.com
                  </a>.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#1C2A39]/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          {onSwitchDoc && (
            <button
              type="button"
              onClick={() => onSwitchDoc(docType === 'privacy' ? 'terms' : 'privacy')}
              className="text-xs font-semibold text-[#7A8B7B] hover:text-[#1C2A39] underline underline-offset-2 cursor-pointer"
            >
              {docType === 'privacy' ? 'View Terms of Service →' : 'View Privacy Policy →'}
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#1C2A39] text-[#F9F6F0] text-xs font-semibold hover:bg-[#2A3C50] transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
};
