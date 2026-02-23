/**
 * Performance Optimization: Data Caching Utilities
 * Provides localStorage and sessionStorage caching with TTL support
 */

interface CacheOptions {
    ttl?: number; // Time to live in milliseconds
    storage?: 'local' | 'session';
}

interface CacheItem<T> {
    data: T;
    timestamp: number;
    ttl?: number;
}

class CacheManager {
    private getStorage(type: 'local' | 'session'): Storage {
        return type === 'local' ? localStorage : sessionStorage;
    }

    /**
     * Set cache item with optional TTL
     */
    set<T>(key: string, data: T, options: CacheOptions = {}): void {
        const { ttl, storage = 'local' } = options;
        const cacheItem: CacheItem<T> = {
            data,
            timestamp: Date.now(),
            ttl,
        };

        try {
            const storageInstance = this.getStorage(storage);
            storageInstance.setItem(key, JSON.stringify(cacheItem));
        } catch (error) {
            console.error('Cache set error:', error);
        }
    }

    /**
     * Get cache item, returns null if expired or not found
     */
    get<T>(key: string, storage: 'local' | 'session' = 'local'): T | null {
        try {
            const storageInstance = this.getStorage(storage);
            const item = storageInstance.getItem(key);

            if (!item) return null;

            const cacheItem: CacheItem<T> = JSON.parse(item);

            // Check if expired
            if (cacheItem.ttl) {
                const age = Date.now() - cacheItem.timestamp;
                if (age > cacheItem.ttl) {
                    this.remove(key, storage);
                    return null;
                }
            }

            return cacheItem.data;
        } catch (error) {
            console.error('Cache get error:', error);
            return null;
        }
    }

    /**
     * Remove cache item
     */
    remove(key: string, storage: 'local' | 'session' = 'local'): void {
        try {
            const storageInstance = this.getStorage(storage);
            storageInstance.removeItem(key);
        } catch (error) {
            console.error('Cache remove error:', error);
        }
    }

    /**
     * Clear all cache items
     */
    clear(storage: 'local' | 'session' = 'local'): void {
        try {
            const storageInstance = this.getStorage(storage);
            storageInstance.clear();
        } catch (error) {
            console.error('Cache clear error:', error);
        }
    }

    /**
     * Get or fetch pattern - check cache first, fetch if not available
     */
    async getOrFetch<T>(
        key: string,
        fetchFn: () => Promise<T>,
        options: CacheOptions = {}
    ): Promise<T> {
        const cached = this.get<T>(key, options.storage);

        if (cached !== null) {
            return cached;
        }

        const data = await fetchFn();
        this.set(key, data, options);
        return data;
    }
}

export const cache = new CacheManager();

// Predefined cache keys and TTL configurations
export const CACHE_KEYS = {
    DOCTORS_LIST: 'doctors_list',
    DOCTOR_PROFILE: (id: string) => `doctor_profile_${id}`,
    APPOINTMENTS: 'appointments',
    APPOINTMENT_HISTORY: 'appointment_history',
    NOTIFICATIONS: 'notifications',
    USER_PROFILE: 'user_profile',
    PRESCRIPTIONS: 'prescriptions',
} as const;

export const CACHE_TTL = {
    SHORT: 5 * 60 * 1000,      // 5 minutes
    MEDIUM: 15 * 60 * 1000,    // 15 minutes
    LONG: 60 * 60 * 1000,      // 1 hour
    VERY_LONG: 24 * 60 * 60 * 1000, // 24 hours
} as const;
