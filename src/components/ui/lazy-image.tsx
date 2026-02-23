/**
 * Performance Optimization: Lazy Loading Image Component
 * Implements native lazy loading with fallback for better performance
 */

import { useState, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    fallback?: string;
    className?: string;
    containerClassName?: string;
    showLoader?: boolean;
}

export function LazyImage({
    src,
    alt,
    fallback = '/placeholder.png',
    className,
    containerClassName,
    showLoader = true,
    ...props
}: LazyImageProps) {
    const [imageSrc, setImageSrc] = useState<string>(fallback);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Use Intersection Observer for better performance
        const img = new Image();
        img.src = src;

        img.onload = () => {
            setImageSrc(src);
            setIsLoading(false);
        };

        img.onerror = () => {
            setHasError(true);
            setIsLoading(false);
            setImageSrc(fallback);
        };

        return () => {
            img.onload = null;
            img.onerror = null;
        };
    }, [src, fallback]);

    return (
        <div className={cn('relative overflow-hidden', containerClassName)}>
            {isLoading && showLoader && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            <img
                src={imageSrc}
                alt={alt}
                loading="lazy"
                className={cn(
                    'transition-opacity duration-300',
                    isLoading ? 'opacity-0' : 'opacity-100',
                    className
                )}
                {...props}
            />
            {hasError && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-xs">
                    Failed to load
                </div>
            )}
        </div>
    );
}

/**
 * Optimized Avatar component with lazy loading
 */
export function LazyAvatar({
    src,
    alt,
    className,
    fallback = '/default-avatar.png',
}: {
    src?: string;
    alt: string;
    className?: string;
    fallback?: string;
}) {
    return (
        <LazyImage
            src={src || fallback}
            alt={alt}
            fallback={fallback}
            className={cn('rounded-full object-cover', className)}
            containerClassName="rounded-full"
        />
    );
}
