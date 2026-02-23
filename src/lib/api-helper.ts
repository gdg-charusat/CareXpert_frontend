/**
 * Performance Optimization: API Helper with Caching
 * Wraps axios calls with automatic caching support
 */

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { cache, CACHE_TTL } from './cache';

interface CachedRequestConfig extends AxiosRequestConfig {
    cache?: {
        key: string;
        ttl?: number;
        storage?: 'local' | 'session';
    };
}

/**
 * Enhanced axios instance with caching support
 */
export async function cachedRequest<T = any>(
    config: CachedRequestConfig
): Promise<AxiosResponse<T>> {
    const { cache: cacheConfig, ...axiosConfig } = config;

    // If cache is configured and it's a GET request, try to use cache
    if (cacheConfig && (!axiosConfig.method || axiosConfig.method.toUpperCase() === 'GET')) {
        const cachedData = cache.get<T>(cacheConfig.key, cacheConfig.storage);

        if (cachedData !== null) {
            console.log(`[Cache HIT] ${cacheConfig.key}`);
            // Return cached data in axios response format
            return {
                data: cachedData,
                status: 200,
                statusText: 'OK (Cached)',
                headers: {},
                config: axiosConfig as any,
            } as AxiosResponse<T>;
        }

        console.log(`[Cache MISS] ${cacheConfig.key}`);
    }

    // Make the actual request
    const response = await axios(axiosConfig);

    // Cache the response if cache is configured
    if (cacheConfig && response.status === 200) {
        cache.set(cacheConfig.key, response.data, {
            ttl: cacheConfig.ttl || CACHE_TTL.MEDIUM,
            storage: cacheConfig.storage,
        });
    }

    return response;
}

/**
 * Prefetch data and store in cache
 */
export async function prefetchData<T = any>(
    url: string,
    cacheKey: string,
    options?: {
        ttl?: number;
        storage?: 'local' | 'session';
        config?: AxiosRequestConfig;
    }
): Promise<void> {
    try {
        await cachedRequest<T>({
            url,
            method: 'GET',
            ...options?.config,
            cache: {
                key: cacheKey,
                ttl: options?.ttl,
                storage: options?.storage,
            },
        });
    } catch (error) {
        console.error('Prefetch error:', error);
    }
}

/**
 * Invalidate cache for a specific key pattern
 */
export function invalidateCache(pattern: string): void {
    // Clear localStorage items matching pattern
    const storage = localStorage;
    const keysToRemove: string[] = [];

    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key && key.includes(pattern)) {
            keysToRemove.push(key);
        }
    }

    keysToRemove.forEach(key => cache.remove(key));
}
