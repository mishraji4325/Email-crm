interface LoadingStateProps {
    text?: string;
}

export default function LoadingState({
    text = "Loading...",
}: LoadingStateProps) {

    return (
        <div className="
            flex
            min-h-[240px]
            items-center
            justify-center
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
        ">

            <div className="
                flex
                flex-col
                items-center
                gap-3
            ">

                <div className="
                    h-7
                    w-7
                    animate-spin
                    rounded-full
                    border-2
                    border-white/10
                    border-t-[#f4bb4f]
                " />

                <p className="
                    text-sm
                    text-gray-500
                ">
                    {text}
                </p>

            </div>

        </div>
    );
}