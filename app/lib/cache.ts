/**
 * Simple in-memory cache implementation for API responses
 */

interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

class Cache {
  private cache: Map<string, CacheEntry<unknown>> = new Map()

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined

    if (!entry) return null

    // Check if cache has expired
    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  /**
   * Set value in cache
   */
  set<T>(key: string, data: T, ttl: number = 3600000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  /**
   * Check if key exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null
  }

  /**
   * Delete specific key
   */
  delete(key: string): void {
    this.cache.delete(key)
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.cache.clear()
  }

  /**
   * Get cache size
   */
  size(): number {
    return this.cache.size
  }
}

// Export singleton instance
export const appCache = new Cache()

/**
 * Generate cache key from parameters
 */
export function generateCacheKey(
  prefix: string,
  params: Record<string, unknown>
): string {
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${key}=${JSON.stringify(params[key])}`)
    .join('|')

  return `${prefix}:${sortedParams}`
}
