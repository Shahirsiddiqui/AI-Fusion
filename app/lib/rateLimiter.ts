/**
 * Simple rate limiter implementation
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

class RateLimiter {
  private limits: Map<string, RateLimitEntry> = new Map()
  private readonly defaultLimit: number
  private readonly defaultWindow: number

  constructor(defaultLimit: number = 30, defaultWindow: number = 60000) {
    this.defaultLimit = defaultLimit
    this.defaultWindow = defaultWindow

    // Clean up expired entries every minute
    setInterval(() => this.cleanup(), 60000)
  }

  /**
   * Check if request is allowed
   */
  isAllowed(identifier: string, limit?: number, window?: number): boolean {
    const l = limit || this.defaultLimit
    const w = window || this.defaultWindow
    const now = Date.now()

    const entry = this.limits.get(identifier)

    if (!entry) {
      this.limits.set(identifier, {
        count: 1,
        resetTime: now + w,
      })
      return true
    }

    // Reset if window has passed
    if (now > entry.resetTime) {
      entry.count = 1
      entry.resetTime = now + w
      return true
    }

    // Check limit
    if (entry.count >= l) {
      return false
    }

    entry.count++
    return true
  }

  /**
   * Get remaining requests
   */
  getRemaining(identifier: string, limit?: number): number {
    const l = limit || this.defaultLimit
    const entry = this.limits.get(identifier)

    if (!entry) return l

    return Math.max(0, l - entry.count)
  }

  /**
   * Get reset time in seconds
   */
  getResetTime(identifier: string): number {
    const entry = this.limits.get(identifier)

    if (!entry) return 0

    const secondsUntilReset = Math.max(0, entry.resetTime - Date.now()) / 1000

    return Math.ceil(secondsUntilReset)
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now()

    for (const [key, entry] of this.limits.entries()) {
      if (now > entry.resetTime) {
        this.limits.delete(key)
      }
    }
  }

  /**
   * Reset specific identifier
   */
  reset(identifier: string): void {
    this.limits.delete(identifier)
  }

  /**
   * Clear all limits
   */
  clear(): void {
    this.limits.clear()
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter(
  parseInt(process.env.API_RATE_LIMIT || '30', 10),
  parseInt(process.env.API_RATE_LIMIT_WINDOW || '60000', 10)
)

/**
 * Helper function to get client IP
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') || 'unknown'
}
