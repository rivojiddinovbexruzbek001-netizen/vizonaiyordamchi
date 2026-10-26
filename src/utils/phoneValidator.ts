/**
 * Validates and normalizes phone numbers
 * Accepts Uzbekistan (+998...) and international telephone numbers
 */

export interface PhoneValidationResult {
  isValid: boolean;
  normalized: string;
  formatted: string;
  error?: string;
}

export function validatePhoneNumber(rawPhone: string): PhoneValidationResult {
  if (!rawPhone || typeof rawPhone !== 'string') {
    return {
      isValid: false,
      normalized: '',
      formatted: '',
      error: 'Telefon raqamini kiriting',
    };
  }

  const trimmed = rawPhone.trim();
  // Strip spaces, dashes, brackets
  const cleaned = trimmed.replace(/[\s\-\(\)]/g, '');

  // Must only contain digits and optional leading plus
  if (!/^\+?\d+$/.test(cleaned)) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: trimmed,
      error: 'Raqamda faqat sonlar va + belgisi bo‘lishi mumkin',
    };
  }

  // Count digits
  const digitsOnly = cleaned.replace(/\D/g, '');

  if (digitsOnly.length < 9) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: trimmed,
      error: 'Telefon raqami kamida 9 ta raqamdan iborat bo‘lishi kerak',
    };
  }

  if (digitsOnly.length > 15) {
    return {
      isValid: false,
      normalized: cleaned,
      formatted: trimmed,
      error: 'Telefon raqami juda uzun (maksimal 15 ta raqam)',
    };
  }

  // Specific format for Uzbekistan: 998 + 9 digits = 12 digits total, or 9 digits local
  let normalized = cleaned;
  if (!normalized.startsWith('+')) {
    if (normalized.startsWith('998') && normalized.length === 12) {
      normalized = '+' + normalized;
    } else if (normalized.length === 9) {
      // Local 9-digit UZ number (e.g. 995562626)
      normalized = '+998' + normalized;
    } else {
      normalized = '+' + normalized;
    }
  }

  // Nicely format for display if it's UZ number
  let formatted = normalized;
  if (normalized.startsWith('+998') && normalized.length === 13) {
    // +998 99 556 26 26
    const code = normalized.slice(0, 4);
    const op = normalized.slice(4, 6);
    const p1 = normalized.slice(6, 9);
    const p2 = normalized.slice(9, 11);
    const p3 = normalized.slice(11, 13);
    formatted = `${code} ${op} ${p1} ${p2} ${p3}`;
  }

  return {
    isValid: true,
    normalized,
    formatted,
  };
}

export function sanitizeText(text: string, maxLength: number = 500): string {
  if (!text || typeof text !== 'string') return '';
  return text
    .trim()
    .slice(0, maxLength)
    .replace(/[<>]/g, ''); // Basic XSS mitigation
}
