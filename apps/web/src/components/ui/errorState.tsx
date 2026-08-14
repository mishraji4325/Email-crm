interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}


export default function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load this data. Please try again.",
    onRetry,
}: ErrorStateProps) {

    return (

        <div className="
            flex
            min-h-[240px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-red-500/20
            bg-red-500/[0.03]
            px-6
            py-10
            text-center
        ">

            <div className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-red-500/10
                text-lg
                text-red-400
            ">
                !
            </div>


            <h3 className="
                mt-4
                text-base
                font-semibold
                text-white
            ">
                {title}
            </h3>


            <p className="
                mt-2
                max-w-md
                text-sm
                text-gray-500
            ">
                {description}
            </p>


            {onRetry && (

                <button
                    onClick={onRetry}
                    className="
                        mt-5
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-gray-300
                        transition
                        hover:border-white/20
                        hover:text-white
                    "
                >
                    Try Again
                </button>

            )}

        </div>

    );
}