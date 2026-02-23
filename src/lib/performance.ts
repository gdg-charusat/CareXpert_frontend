/**
 * Performance Optimization: Web Vitals Monitoring Hook
 * Tracks and reports Core Web Vitals metrics
 */

import { useEffect } from 'react';

export interface WebVitalsMetrics {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
    navigationType?: string;
}

// Thresholds based on web.dev recommendations
const THRESHOLDS = {
    LCP: { good: 2500, poor: 4000 },         // Largest Contentful Paint
    FID: { good: 100, poor: 300 },           // First Input Delay
    CLS: { good: 0.1, poor: 0.25 },          // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 },         // First Contentful Paint
    TTFB: { good: 800, poor: 1800 },         // Time to First Byte
    INP: { good: 200, poor: 500 },           // Interaction to Next Paint
};

function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
    const threshold = THRESHOLDS[metricName as keyof typeof THRESHOLDS];
    if (!threshold) return 'good';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
}

function reportMetric(metric: WebVitalsMetrics) {
    console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value.toFixed(2),
        rating: metric.rating,
    });

    // Send to analytics (optional)
    // You can send to Google Analytics, custom endpoint, etc.
    if (window.gtag) {
        window.gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_rating: metric.rating,
            metric_value: metric.value,
        });
    }
}

/**
 * Hook to monitor Web Vitals
 */
export function useWebVitals() {
    useEffect(() => {
        // Dynamic import of web-vitals to reduce initial bundle size
        import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
            onCLS((metric) => {
                reportMetric({
                    name: 'CLS',
                    value: metric.value,
                    rating: getRating('CLS', metric.value),
                });
            });

            onFCP((metric) => {
                reportMetric({
                    name: 'FCP',
                    value: metric.value,
                    rating: getRating('FCP', metric.value),
                });
            });

            onLCP((metric) => {
                reportMetric({
                    name: 'LCP',
                    value: metric.value,
                    rating: getRating('LCP', metric.value),
                });
            });

            onTTFB((metric) => {
                reportMetric({
                    name: 'TTFB',
                    value: metric.value,
                    rating: getRating('TTFB', metric.value),
                });
            });

            onINP((metric) => {
                reportMetric({
                    name: 'INP',
                    value: metric.value,
                    rating: getRating('INP', metric.value),
                });
            });
        }).catch((error) => {
            console.error('Failed to load web-vitals:', error);
        });
    }, []);
}

/**
 * Performance observer for custom metrics
 */
export function usePerformanceObserver() {
    useEffect(() => {
        if (!('PerformanceObserver' in window)) return;

        // Observe long tasks (tasks taking > 50ms)
        const longTaskObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn('[Performance] Long task detected:', {
                        duration: entry.duration.toFixed(2),
                        name: entry.name,
                    });
                }
            }
        });

        try {
            longTaskObserver.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // longtask not supported in all browsers
        }

        // Observe resource timing
        const resourceObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                const duration = entry.duration;
                if (duration > 1000) {
                    console.warn('[Performance] Slow resource:', {
                        name: entry.name,
                        duration: duration.toFixed(2),
                    });
                }
            }
        });

        try {
            resourceObserver.observe({ entryTypes: ['resource'] });
        } catch (e) {
            // Handle browser compatibility
        }

        return () => {
            longTaskObserver.disconnect();
            resourceObserver.disconnect();
        };
    }, []);
}

// Add type declaration for gtag
declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
    }
}
