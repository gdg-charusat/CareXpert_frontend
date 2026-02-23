/**
 * Performance Optimization: Custom Hooks for Optimized Data Fetching
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { cachedRequest } from './api-helper';
import { CACHE_TTL } from './cache';

interface UseFetchOptions<T> {
    url: string;
    cacheKey?: string;
    cacheTtl?: number;
    enabled?: boolean;
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    config?: any;
}

/**
 * Hook for fetching data with caching and loading states
 */
export function useFetch<T>(options: UseFetchOptions<T>) {
    const {
        url,
        cacheKey,
        cacheTtl = CACHE_TTL.MEDIUM,
        enabled = true,
        onSuccess,
        onError,
        config,
    } = options;

    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const fetchData = useCallback(async () => {
        if (!enabled) return;

        setLoading(true);
        setError(null);

        try {
            const response = await cachedRequest<T>({
                url,
                method: 'GET',
                ...config,
                cache: cacheKey ? {
                    key: cacheKey,
                    ttl: cacheTtl,
                } : undefined,
            });

            setData(response.data);
            onSuccess?.(response.data);
        } catch (err) {
            setError(err);
            onError?.(err);
        } finally {
            setLoading(false);
        }
    }, [url, cacheKey, cacheTtl, enabled, config]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const refetch = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch };
}

/**
 * Hook for debounced values (useful for search)
 */
export function useDebounce<T>(value: T, delay: number = 400): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook for intersection observer (lazy loading)
 */
export function useIntersectionObserver(
    options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement>, boolean] {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(([entry]) => {
            setIsIntersecting(entry.isIntersecting);
        }, options);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [options]);

    return [elementRef, isIntersecting];
}

/**
 * Hook for throttled function calls
 */
export function useThrottle<T extends (...args: any[]) => any>(
    callback: T,
    delay: number = 300
): T {
    const lastRan = useRef(Date.now());

    return useCallback(
        ((...args) => {
            const now = Date.now();
            if (now - lastRan.current >= delay) {
                callback(...args);
                lastRan.current = now;
            }
        }) as T,
        [callback, delay]
    );
}

/**
 * Hook for prefetching data on hover
 */
export function usePrefetch() {
    const timeoutRef = useRef<NodeJS.Timeout>();

    const prefetch = useCallback(async (
        url: string,
        cacheKey: string,
        delay: number = 100
    ) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                await cachedRequest({
                    url,
                    method: 'GET',
                    cache: {
                        key: cacheKey,
                        ttl: CACHE_TTL.SHORT,
                    },
                });
            } catch (error) {
                console.error('Prefetch error:', error);
            }
        }, delay);
    }, []);

    const cancel = useCallback(() => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }, []);

    return { prefetch, cancel };
}
