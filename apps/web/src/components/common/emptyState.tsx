interface EmptyStateProps {
    title: string;
    description: string;
    action?: React.ReactNode;
}

export default function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {

    return (
        <div className="border-2 border-dashed rounded-xl p-12 text-center">
            <h2 className="text-2xl font-bold">
                {title}
            </h2>

            <p className="text-gray-500 mt-2">
                {description}
            </p>

            {action && (
                <div className="mt-4">
                    {action}
                </div>
            )}
        </div>
    );  
}