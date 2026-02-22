import { Loader2 } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-zinc-900">
      <div className="relative">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        <div className="absolute inset-0 blur-xl bg-blue-400/20 rounded-full animate-pulse" />
      </div>
      <p className="mt-4 text-slate-600 dark:text-slate-400 font-medium animate-pulse">
        Securing your session...
      </p>
    </div>
  );
}