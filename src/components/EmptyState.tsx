import { motion } from "framer-motion";
import { Button } from "./ui/button";

type EmptyStateAction = {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
};

type EmptyStateProps = {
    icon: React.ReactNode;
    title: string;
    description?: string;
    action?: EmptyStateAction;
    className?: string;
};

export default function EmptyState({
    icon,
    title,
    description,
    action,
    className = "",
}: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col items-center justify-center py-16 px-6 text-center ${className}`}
        >
            {/* Icon container */}
            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-5 shrink-0">
                <span className="text-blue-400 [&>svg]:h-10 [&>svg]:w-10">{icon}</span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {title}
            </h3>

            {/* Description */}
            {description && (
                <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-6">
                    {description}
                </p>
            )}

            {/* CTA */}
            {action && (
                <Button
                    onClick={action.onClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                    {action.icon && (
                        <span className="mr-2 [&>svg]:h-4 [&>svg]:w-4">{action.icon}</span>
                    )}
                    {action.label}
                </Button>
            )}
        </motion.div>
    );
}
