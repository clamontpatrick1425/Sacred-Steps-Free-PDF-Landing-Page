import { useState, useEffect, useCallback } from 'react';

const NOTES_STORAGE_KEY = 'sacred_steps_journal_notes_v1';
const CHECKLIST_STORAGE_KEY = 'sacred_steps_checklist_v1';
const COMPLETED_DAYS_STORAGE_KEY = 'sacred_steps_completed_days_v1';
const SYNC_EVENT = 'sacred-steps-progress-sync';

const DEFAULT_CHECKLIST: Record<string, boolean> = {
  daily_read: false,
  daily_speak: false,
  daily_step: false,
  mind_voice: false,
  mind_truth: false,
  mind_journal: false,
  comm_connect: false,
  comm_share: false,
  comm_witness: false,
};

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function safeWriteJson<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  } catch {
    // Ignore storage quota or private browsing restrictions
  }
}

export function useSacredProgress() {
  const [notes, setNotes] = useState<Record<number, string>>(() =>
    typeof window !== 'undefined' ? safeReadJson(NOTES_STORAGE_KEY, {}) : {}
  );
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() =>
    typeof window !== 'undefined'
      ? safeReadJson(CHECKLIST_STORAGE_KEY, DEFAULT_CHECKLIST)
      : DEFAULT_CHECKLIST
  );
  const [completedDays, setCompletedDays] = useState<number[]>(() =>
    typeof window !== 'undefined' ? safeReadJson(COMPLETED_DAYS_STORAGE_KEY, []) : []
  );

  useEffect(() => {
    const handleSync = () => {
      setNotes(safeReadJson(NOTES_STORAGE_KEY, {}));
      setChecklist(safeReadJson(CHECKLIST_STORAGE_KEY, DEFAULT_CHECKLIST));
      setCompletedDays(safeReadJson(COMPLETED_DAYS_STORAGE_KEY, []));
    };
    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const updateNote = useCallback((day: number, text: string) => {
    setNotes((prev) => {
      const next = { ...prev, [day]: text };
      safeWriteJson(NOTES_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleChecklistItem = useCallback((id: string) => {
    setChecklist((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      safeWriteJson(CHECKLIST_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleDayComplete = useCallback((day: number) => {
    setCompletedDays((prev) => {
      const exists = prev.includes(day);
      const next = exists ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b);
      safeWriteJson(COMPLETED_DAYS_STORAGE_KEY, next);
      return next;
    });
  }, []);

  return {
    notes,
    updateNote,
    checklist,
    toggleChecklistItem,
    completedDays,
    toggleDayComplete,
  };
}
