import React, { useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import {
  X,
  Lock,
  Download,
  RefreshCw,
  Search,
  Users,
  Sparkles,
  LogOut,
  Trash2,
  Copy,
  Check,
  AlertCircle,
  Loader2,
  BookOpen,
} from 'lucide-react';
import {
  auth,
  ADMIN_EMAIL,
  signInWithGoogle,
  signOutAdmin,
  fetchSubscribersFromFirestore,
  deleteSubscriberFromFirestore,
  type SubscriberDocument,
} from '../lib/firebase';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const KNOWN_FORMATS = [
  '6x9 Amazon KDP',
  'Kindle Edition',
  'Downloadable eBook PDF',
  'Spoken Word Audiobook',
];

function matchesFormat(formats: string[] | undefined, filter: string): boolean {
  if (!Array.isArray(formats)) return false;
  if (filter === '6x9 Amazon KDP') {
    return formats.includes('6x9 Amazon KDP') || formats.includes('7x9 Amazon KDP');
  }
  if (filter === 'Kindle Edition') {
    return formats.includes('Kindle Edition') || formats.includes('Lay-Flat Spiral Bound');
  }
  return formats.includes(filter);
}

function escapeCsvCell(value: string): string {
  const safe = value.replace(/"/g, '""');
  return `"${safe}"`;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [authLoading, setAuthLoading] = useState(true);
  const [subscribers, setSubscribers] = useState<SubscriberDocument[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formatFilter, setFormatFilter] = useState<string>('ALL');
  const [copiedEmails, setCopiedEmails] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAuthorizedAdmin =
    Boolean(user) &&
    user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    Boolean(user?.emailVerified);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loadSubscribers = async () => {
    setIsLoadingData(true);
    setErrorMsg(null);
    try {
      const rows = await fetchSubscribersFromFirestore();
      setSubscribers(rows);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to load subscriber records.';
      if (msg.includes('Quota exceeded')) {
        setErrorMsg(
          'Daily Firestore free-tier read quota exceeded. Quota resets tomorrow, or you can inspect records in Firebase Console.'
        );
      } else {
        setErrorMsg('Unable to retrieve subscribers from Firestore. Please confirm you are signed in with your verified publisher account.');
      }
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (isOpen && isAuthorizedAdmin) {
      loadSubscribers();
    }
  }, [isOpen, isAuthorizedAdmin]);

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (!msg.includes('popup-closed-by-user')) {
        setErrorMsg('Google Sign-In could not be completed. Please allow popups for this site and try again.');
      }
    }
  };

  const handleSignOut = async () => {
    await signOutAdmin();
    setSubscribers([]);
    setErrorMsg(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteSubscriberFromFirestore(id);
      setSubscribers((prev) => prev.filter((item) => item.id !== id));
      setConfirmDeleteId(null);
    } catch {
      setErrorMsg('Could not delete record. Please refresh and try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const filteredSubscribers = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return subscribers.filter((sub) => {
      const matchesSearch =
        !q ||
        sub.name?.toLowerCase().includes(q) ||
        sub.email?.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      if (formatFilter === 'ALL') return true;
      if (formatFilter === 'VIP_ONLY') return Boolean(sub.isVipWaitlist);
      return matchesFormat(sub.selectedFormats, formatFilter);
    });
  }, [subscribers, searchTerm, formatFilter]);

  const stats = useMemo(() => {
    const total = subscribers.length;
    const vipCount = subscribers.filter((s) => s.isVipWaitlist).length;
    const formatCounts: Record<string, number> = {};
    KNOWN_FORMATS.forEach((fmt) => {
      formatCounts[fmt] = subscribers.filter((s) => matchesFormat(s.selectedFormats, fmt)).length;
    });
    return { total, vipCount, formatCounts };
  }, [subscribers]);

  const handleExportCsv = () => {
    const headers = [
      'Name',
      'Email',
      'VIP Waitlist',
      'Preferred Formats',
      'Source',
      'Signed Up At',
    ];
    const rows = filteredSubscribers.map((s) => [
      escapeCsvCell(s.name || ''),
      escapeCsvCell(s.email || ''),
      escapeCsvCell(s.isVipWaitlist ? 'Yes' : 'No'),
      escapeCsvCell(Array.isArray(s.selectedFormats) ? s.selectedFormats.join('; ') : ''),
      escapeCsvCell(s.source || 'hero_starter_kit'),
      escapeCsvCell(s.createdAt || ''),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStamp = new Date().toISOString().slice(0, 10);
    link.href = url;
    link.download = `sacred_steps_subscribers_${dateStamp}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
  };

  const handleCopyEmails = async () => {
    const emailList = filteredSubscribers.map((s) => s.email).filter(Boolean).join(', ');
    if (!emailList) return;
    try {
      await navigator.clipboard.writeText(emailList);
      setCopiedEmails(true);
      window.setTimeout(() => setCopiedEmails(false), 2500);
    } catch {
      setErrorMsg('Clipboard copy was blocked by the browser. Please use Export CSV instead.');
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1C2A39]/75 backdrop-blur-sm"
    >
      <div className="bg-[#F9F6F0] text-[#1C2A39] rounded-2xl max-w-5xl w-full shadow-2xl border border-[#D4AF37]/40 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-[#1C2A39] text-[#F9F6F0] px-5 sm:px-7 py-4 flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#D4AF37] block">
                Kya Daisy Publishing
              </span>
              <h2 id="admin-modal-title" className="text-lg sm:text-xl font-serif font-bold text-white">
                Subscriber &amp; Waitlist Export Portal
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium text-white/90 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close author portal"
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {authLoading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-sm text-[#1C2A39]/70">
              <Loader2 className="w-6 h-6 animate-spin text-[#D4AF37]" />
              <span>Checking authentication...</span>
            </div>
          ) : !user ? (
            <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-md text-center space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-[#1C2A39] text-[#D4AF37] flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-bold text-[#1C2A39]">
                  Publisher Sign-In Required
                </h3>
                <p className="text-sm text-[#2B2B2B]/80 leading-relaxed">
                  Subscriber names, email addresses, and format selections are protected. Sign in with your verified Google account (<strong>{ADMIN_EMAIL}</strong>) to view and export the list.
                </p>
              </div>
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 text-left flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full py-3.5 px-5 rounded-xl bg-[#1C2A39] hover:bg-[#2A3C50] text-[#F9F6F0] font-semibold text-sm transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2.5"
              >
                <span>Sign in with Google</span>
              </button>
            </div>
          ) : !isAuthorizedAdmin ? (
            <div className="max-w-md mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-white border border-red-200 shadow-md text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
              <h3 className="text-lg font-serif font-bold text-[#1C2A39]">
                Unauthorized Account
              </h3>
              <p className="text-sm text-[#2B2B2B]/80">
                You are currently signed in as <strong>{user.email}</strong>. Access to subscriber PII is restricted strictly to <strong>{ADMIN_EMAIL}</strong>.
              </p>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-5 py-2.5 rounded-xl bg-[#1C2A39] text-white text-xs font-semibold hover:bg-[#2A3C50] transition-colors cursor-pointer"
              >
                Switch Google Account
              </button>
            </div>
          ) : (
            <>
              {/* Stats Summary Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                <div className="p-4 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A8B7B] block">
                    Total Subscribers
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#1C2A39] mt-1 block">
                    {stats.total}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#D4AF37]/40 shadow-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                    VIP Waitlist
                  </span>
                  <span className="text-2xl font-serif font-bold text-[#1C2A39] mt-1 block">
                    {stats.vipCount}
                  </span>
                </div>
                {KNOWN_FORMATS.map((fmt) => (
                  <div
                    key={fmt}
                    className="p-4 rounded-xl bg-white border border-[#1C2A39]/10 shadow-xs"
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wide text-[#2B2B2B]/70 block truncate" title={fmt}>
                      {fmt}
                    </span>
                    <span className="text-xl font-serif font-bold text-[#1C2A39] mt-1 block">
                      {stats.formatCounts[fmt] || 0}
                    </span>
                  </div>
                ))}
              </div>

              {/* Toolbar: Search, Filter, Export CSV, Copy Emails, Refresh */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-[#1C2A39]/10 shadow-xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-[#1C2A39]/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search name or email..."
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#1C2A39]/15 bg-[#F9F6F0]/60 text-xs sm:text-sm text-[#1C2A39] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                    />
                  </div>

                  <select
                    value={formatFilter}
                    onChange={(e) => setFormatFilter(e.target.value)}
                    aria-label="Filter by format"
                    className="px-3 py-2 rounded-xl border border-[#1C2A39]/15 bg-[#F9F6F0]/60 text-xs sm:text-sm text-[#1C2A39] focus:outline-hidden focus:ring-2 focus:ring-[#D4AF37]"
                  >
                    <option value="ALL">All Subscribers ({subscribers.length})</option>
                    <option value="VIP_ONLY">VIP Waitlist Only ({stats.vipCount})</option>
                    {KNOWN_FORMATS.map((fmt) => (
                      <option key={fmt} value={fmt}>
                        {fmt} ({stats.formatCounts[fmt] || 0})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={loadSubscribers}
                    disabled={isLoadingData}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1C2A39]/15 bg-white hover:bg-[#F9F6F0] text-xs font-semibold text-[#1C2A39] transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingData ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyEmails}
                    disabled={filteredSubscribers.length === 0}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#1C2A39]/15 bg-white hover:bg-[#F9F6F0] text-xs font-semibold text-[#1C2A39] transition-colors disabled:opacity-40 cursor-pointer"
                  >
                    {copiedEmails ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#7A8B7B]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#7A8B7B]" />
                        <span>Copy Emails</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleExportCsv}
                    disabled={filteredSubscribers.length === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#BF9C2D] text-xs font-bold text-[#1C2A39] transition-colors shadow-xs disabled:opacity-40 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV ({filteredSubscribers.length})</span>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Subscriber Table */}
              <div className="bg-white rounded-2xl border border-[#1C2A39]/10 shadow-xs overflow-hidden">
                {isLoadingData ? (
                  <div className="py-12 flex flex-col items-center justify-center gap-2 text-sm text-[#1C2A39]/70">
                    <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                    <span>Loading subscribers from Firestore...</span>
                  </div>
                ) : filteredSubscribers.length === 0 ? (
                  <div className="py-12 text-center space-y-2 px-4">
                    <BookOpen className="w-8 h-8 text-[#D4AF37]/60 mx-auto" />
                    <p className="text-sm font-semibold text-[#1C2A39]">
                      No subscriber records match this view yet.
                    </p>
                    <p className="text-xs text-[#2B2B2B]/65">
                      Submit the Home form or clear your filter to see all entries.
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-[#1C2A39]/10 bg-[#FAF5EA]/70 text-[11px] font-bold uppercase tracking-wider text-[#1C2A39]/75">
                          <th className="py-3 px-4">First Name</th>
                          <th className="py-3 px-4">Email Address</th>
                          <th className="py-3 px-4">VIP</th>
                          <th className="py-3 px-4">Preferred Formats</th>
                          <th className="py-3 px-4">Date</th>
                          <th className="py-3 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1C2A39]/10 text-xs sm:text-sm">
                        {filteredSubscribers.map((sub) => (
                          <tr key={sub.id} className="hover:bg-[#F9F6F0]/60 transition-colors">
                            <td className="py-3 px-4 font-semibold text-[#1C2A39] whitespace-nowrap">
                              {sub.name}
                            </td>
                            <td className="py-3 px-4 text-[#2B2B2B] font-mono text-xs">
                              {sub.email}
                            </td>
                            <td className="py-3 px-4 whitespace-nowrap">
                              {sub.isVipWaitlist ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF3E0] border border-[#D4AF37]/50 text-[#1C2A39] text-[11px] font-semibold">
                                  <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                                  VIP
                                </span>
                              ) : (
                                <span className="text-xs text-[#2B2B2B]/50">Starter Only</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              {Array.isArray(sub.selectedFormats) && sub.selectedFormats.length > 0 ? (
                                <div className="flex flex-wrap gap-1">
                                  {sub.selectedFormats.map((fmt) => (
                                    <span
                                      key={fmt}
                                      className="inline-block px-2 py-0.5 rounded-md bg-[#7A8B7B]/12 text-[#1C2A39] text-[11px] font-medium"
                                    >
                                      {fmt}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-xs text-[#2B2B2B]/45 italic">None selected</span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs text-[#2B2B2B]/70 whitespace-nowrap">
                              {sub.createdAt
                                ? new Date(sub.createdAt).toLocaleDateString(undefined, {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                  })
                                : '—'}
                            </td>
                            <td className="py-3 px-4 text-right whitespace-nowrap">
                              {confirmDeleteId === sub.id ? (
                                <div className="inline-flex items-center gap-1.5">
                                  <button
                                    type="button"
                                    disabled={deletingId === sub.id}
                                    onClick={() => handleDelete(sub.id)}
                                    className="px-2 py-1 rounded bg-red-600 text-white text-[11px] font-semibold hover:bg-red-700 cursor-pointer"
                                  >
                                    {deletingId === sub.id ? '...' : 'Confirm'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(null)}
                                    className="px-2 py-1 rounded bg-[#1C2A39]/10 text-[#1C2A39] text-[11px] font-medium cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => setConfirmDeleteId(sub.id)}
                                  aria-label={`Delete ${sub.email}`}
                                  title="Delete test entry"
                                  className="p-1.5 rounded-lg text-[#1C2A39]/40 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
