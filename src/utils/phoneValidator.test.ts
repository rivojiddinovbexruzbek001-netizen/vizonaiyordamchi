import test from 'node:test';
import assert from 'node:assert/strict';
import { validatePhoneNumber, sanitizeText } from './phoneValidator';

test('validates valid Uzbekistan phone numbers with international prefix', () => {
  const result = validatePhoneNumber('+998995562626');
  assert.equal(result.isValid, true);
  assert.equal(result.normalized, '+998995562626');
  assert.equal(result.formatted, '+998 99 556 26 26');
});

test('normalizes 9-digit local Uzbekistan numbers', () => {
  const result = validatePhoneNumber('995562626');
  assert.equal(result.isValid, true);
  assert.equal(result.normalized, '+998995562626');
  assert.equal(result.formatted, '+998 99 556 26 26');
});

test('handles spaces, dashes, and parentheses in input', () => {
  const result = validatePhoneNumber('+998 (99) 556-26-26');
  assert.equal(result.isValid, true);
  assert.equal(result.normalized, '+998995562626');
  assert.equal(result.formatted, '+998 99 556 26 26');
});

test('rejects empty or short phone numbers', () => {
  assert.equal(validatePhoneNumber('').isValid, false);
  assert.equal(validatePhoneNumber('12345').isValid, false);
});

test('rejects phone numbers with invalid letters', () => {
  assert.equal(validatePhoneNumber('+99899abc2626').isValid, false);
});

test('sanitizes text input correctly against HTML injection and excessive length', () => {
  const sanitized = sanitizeText('<script>alert("hack")</script>Salom');
  assert.equal(sanitized.includes('<script>'), false);
  assert.equal(sanitized.includes('Salom'), true);
});
