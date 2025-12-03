/**
 * Rate Limiter for Login Attempts
 *
 * Prevents brute-force attacks by limiting login attempts
 * - Max 5 attempts per 15 minutes
 * - Temporary account lockout after exceeding limit
 * - Stores attempts in localStorage (client-side protection)
 *
 * Note: This is client-side only. For production, implement server-side rate limiting.
 */

interface LoginAttempt {
  email: string;
  timestamp: number;
}

const RATE_LIMIT_KEY = 'login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export const checkRateLimit = (email: string): { allowed: boolean; remainingTime?: number } => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];

    // Clean up old attempts (older than lockout duration)
    const cutoffTime = Date.now() - LOCKOUT_DURATION;
    const recentAttempts = attempts.filter(attempt => attempt.timestamp > cutoffTime);

    // Count attempts for this email
    const emailAttempts = recentAttempts.filter(attempt => attempt.email === email);

    if (emailAttempts.length >= MAX_ATTEMPTS) {
      // Calculate remaining lockout time
      const oldestAttempt = emailAttempts[0];
      const remainingTime = LOCKOUT_DURATION - (Date.now() - oldestAttempt.timestamp);

      return {
        allowed: false,
        remainingTime: Math.ceil(remainingTime / 1000 / 60), // Convert to minutes
      };
    }

    return { allowed: true };
  } catch (e) {
    // If there's an error reading localStorage, allow the attempt
    console.error('Rate limiter error:', e);
    return { allowed: true };
  }
};

export const recordLoginAttempt = (email: string): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];

    // Add new attempt
    attempts.push({
      email,
      timestamp: Date.now(),
    });

    // Clean up old attempts
    const cutoffTime = Date.now() - LOCKOUT_DURATION;
    const recentAttempts = attempts.filter(attempt => attempt.timestamp > cutoffTime);

    // Store updated attempts
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recentAttempts));
  } catch (e) {
    console.error('Failed to record login attempt:', e);
  }
};

export const clearLoginAttempts = (email: string): void => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];

    // Remove all attempts for this email
    const filtered = attempts.filter(attempt => attempt.email !== email);

    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Failed to clear login attempts:', e);
  }
};

export const getRemainingAttempts = (email: string): number => {
  try {
    const stored = localStorage.getItem(RATE_LIMIT_KEY);
    const attempts: LoginAttempt[] = stored ? JSON.parse(stored) : [];

    const cutoffTime = Date.now() - LOCKOUT_DURATION;
    const recentAttempts = attempts.filter(
      attempt => attempt.email === email && attempt.timestamp > cutoffTime
    );

    return Math.max(0, MAX_ATTEMPTS - recentAttempts.length);
  } catch (e) {
    return MAX_ATTEMPTS;
  }
};
