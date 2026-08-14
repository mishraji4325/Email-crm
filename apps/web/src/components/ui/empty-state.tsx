interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: string;
}


export default function EmptyState({
    title,
    description,
    icon = "○",
}: EmptyStateProps) {

    return (

        <div className="
            flex
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-white/10
            bg-[#0d1526]/50
            px-6
            py-14
            text-center
        ">

            {/* Icon */}

            <div className="
                mb-4
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-[#f4bb4f]/10
                text-xl
                text-[#f4bb4f]
            ">
                {icon}
            </div>


            {/* Title */}

            <h3 className="
                text-base
                font-semibold
                text-white
            ">
                {title}
            </h3>


            {/* Description */}

            {description && (

                <p className="
                    mt-2
                    max-w-md
                    text-sm
                    leading-relaxed
                    text-gray-500
                ">
                    {description}
                </p>

            )}

        </div>

    );
}