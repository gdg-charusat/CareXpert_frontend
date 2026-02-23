/**
 * Performance Optimization: Skeleton Loading Components
 * Provides loading states for better perceived performance
 */

import { cn } from "@/lib/utils"

function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-muted", className)}
            {...props}
        />
    )
}

// Doctor Card Skeleton
function DoctorCardSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
            </div>
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
            </div>
            <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
            </div>
        </div>
    );
}

// Appointment Card Skeleton
function AppointmentCardSkeleton() {
    return (
        <div className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
            </div>
            <Skeleton className="h-8 w-24" />
        </div>
    );
}

// Chat Message Skeleton
function ChatMessageSkeleton() {
    return (
        <div className="flex gap-3 p-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
        </div>
    );
}

// Table Row Skeleton
function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
    return (
        <div className="flex gap-4 p-4 border-b">
            {Array.from({ length: columns }).map((_, i) => (
                <Skeleton key={i} className="h-4 flex-1" />
            ))}
        </div>
    );
}

// Dashboard Stats Skeleton
function StatsCardSkeleton() {
    return (
        <div className="border rounded-lg p-6 space-y-3">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-3 w-2/3" />
        </div>
    );
}

// Page Loading Skeleton
function PageSkeleton() {
    return (
        <div className="space-y-6 p-6">
            <div className="space-y-2">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <DoctorCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export {
    Skeleton,
    DoctorCardSkeleton,
    AppointmentCardSkeleton,
    ChatMessageSkeleton,
    TableRowSkeleton,
    StatsCardSkeleton,
    PageSkeleton,
}
