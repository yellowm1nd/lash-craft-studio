/**
 * Password Validation Utility
 *
 * Provides secure password validation with strength checking
 * Requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */

export interface PasswordStrength {
  score: number; // 0-4
  level: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
  feedback: string[];
  isValid: boolean;
}

export const PASSWORD_REQUIREMENTS = {
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
};

export const validatePassword = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  // Check length
  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    feedback.push(`Mindestens ${PASSWORD_REQUIREMENTS.minLength} Zeichen erforderlich`);
  } else if (password.length >= 12) {
    score++;
  }

  if (password.length >= 16) {
    score++;
  }

  // Check uppercase
  if (PASSWORD_REQUIREMENTS.requireUppercase && !/[A-Z]/.test(password)) {
    feedback.push('Mindestens ein Großbuchstabe erforderlich');
  } else {
    score++;
  }

  // Check lowercase
  if (PASSWORD_REQUIREMENTS.requireLowercase && !/[a-z]/.test(password)) {
    feedback.push('Mindestens ein Kleinbuchstabe erforderlich');
  } else {
    score++;
  }

  // Check numbers
  if (PASSWORD_REQUIREMENTS.requireNumbers && !/\d/.test(password)) {
    feedback.push('Mindestens eine Zahl erforderlich');
  } else {
    score++;
  }

  // Check special characters
  if (PASSWORD_REQUIREMENTS.requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    feedback.push('Mindestens ein Sonderzeichen erforderlich (!@#$%^&* etc.)');
  } else {
    score++;
  }

  // Common patterns check (reduces score)
  const commonPatterns = [
    /^[0-9]+$/, // Only numbers
    /^[a-zA-Z]+$/, // Only letters
    /(.)\1{2,}/, // Repeated characters
    /^(?:123|abc|qwerty)/i, // Common sequences
  ];

  const hasCommonPattern = commonPatterns.some(pattern => pattern.test(password));
  if (hasCommonPattern) {
    score = Math.max(0, score - 1);
    feedback.push('Vermeiden Sie einfache Muster');
  }

  // Determine strength level
  let level: PasswordStrength['level'];
  if (score <= 1) level = 'very-weak';
  else if (score === 2) level = 'weak';
  else if (score === 3) level = 'medium';
  else if (score === 4) level = 'strong';
  else level = 'very-strong';

  const isValid = feedback.length === 0 && password.length >= PASSWORD_REQUIREMENTS.minLength;

  return {
    score,
    level,
    feedback,
    isValid,
  };
};

export const getPasswordStrengthColor = (level: PasswordStrength['level']): string => {
  switch (level) {
    case 'very-weak':
      return 'bg-red-500';
    case 'weak':
      return 'bg-orange-500';
    case 'medium':
      return 'bg-yellow-500';
    case 'strong':
      return 'bg-green-500';
    case 'very-strong':
      return 'bg-emerald-500';
    default:
      return 'bg-gray-300';
  }
};

export const getPasswordStrengthText = (level: PasswordStrength['level']): string => {
  switch (level) {
    case 'very-weak':
      return 'Sehr schwach';
    case 'weak':
      return 'Schwach';
    case 'medium':
      return 'Mittel';
    case 'strong':
      return 'Stark';
    case 'very-strong':
      return 'Sehr stark';
    default:
      return '';
  }
};
