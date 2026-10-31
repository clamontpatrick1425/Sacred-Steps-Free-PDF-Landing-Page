import { useState, useCallback, useMemo } from 'react';

export interface EmailValidationResult {
  email: string;
  setEmail: (email: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
  handleBlur: () => void;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
  error: string | null;
  suggestion: string | null;
  applySuggestion: () => void;
  reset: () => void;
  status: 'empty' | 'valid' | 'invalid';
}

// Common typo corrections for popular domains
const COMMON_DOMAIN_TYPOS: { [key: string]: string } = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahooo.com': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmaill.com': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'icoud.com': 'icloud.com',
};

// Strict email regex requiring proper local part, @, domain name, and minimum 2-char TLD
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function useEmailValidation(initialValue: string = ''): EmailValidationResult {
  const [email, setEmailState] = useState<string>(initialValue);
  const [isTouched, setIsTouched] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);

  // Validate the email format and provide descriptive real-time feedback
  const { isValid, error, suggestion } = useMemo(() => {
    const trimmed = email.trim();

    if (!trimmed) {
      return {
        isValid: false,
        error: isTouched ? 'Email address is required to receive your Starter Kit.' : null,
        suggestion: null,
      };
    }

    if (/\s/.test(trimmed)) {
      return {
        isValid: false,
        error: 'Email cannot contain spaces.',
        suggestion: null,
      };
    }

    if (!trimmed.includes('@')) {
      return {
        isValid: false,
        error: 'Missing "@" symbol in email address.',
        suggestion: null,
      };
    }

    const parts = trimmed.split('@');
    if (parts.length > 2) {
      return {
        isValid: false,
        error: 'Email can only contain one "@" symbol.',
        suggestion: null,
      };
    }

    const [local, domain] = parts;

    if (!local) {
      return {
        isValid: false,
        error: 'Enter the part before "@" (e.g., name).',
        suggestion: null,
      };
    }

    if (!domain) {
      return {
        isValid: false,
        error: 'Enter a domain after "@" (e.g., gmail.com).',
        suggestion: null,
      };
    }

    if (!domain.includes('.')) {
      return {
        isValid: false,
        error: 'Domain must include an extension (e.g., .com or .org).',
        suggestion: null,
      };
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (tld.length < 2) {
      return {
        isValid: false,
        error: 'Please enter a valid domain suffix (e.g., .com).',
        suggestion: null,
      };
    }

    // Check for common typo suggestions
    const domainLower = domain.toLowerCase();
    let suggestedEmail: string | null = null;
    if (COMMON_DOMAIN_TYPOS[domainLower]) {
      suggestedEmail = `${local}@${COMMON_DOMAIN_TYPOS[domainLower]}`;
    }

    // Full regex validation
    if (!EMAIL_REGEX.test(trimmed)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address format.',
        suggestion: suggestedEmail,
      };
    }

    return {
      isValid: true,
      error: null,
      suggestion: suggestedEmail,
    };
  }, [email, isTouched]);

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    setIsDirty(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === 'string' ? e : e.target.value;
    setEmailState(value);
    setIsDirty(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsTouched(true);
  }, []);

  const applySuggestion = useCallback(() => {
    if (suggestion) {
      setEmailState(suggestion);
      setIsTouched(true);
    }
  }, [suggestion]);

  const reset = useCallback(() => {
    setEmailState('');
    setIsTouched(false);
    setIsDirty(false);
  }, []);

  const status: 'empty' | 'valid' | 'invalid' = useMemo(() => {
    if (!email.trim()) return 'empty';
    return isValid ? 'valid' : 'invalid';
  }, [email, isValid]);

  return {
    email,
    setEmail,
    handleChange,
    handleBlur,
    isValid,
    isDirty,
    isTouched,
    error,
    suggestion,
    applySuggestion,
    reset,
    status,
  };
}
