interface SectionHeaderProps {
    title: string;
    buttonText?: string;
    onClick?: () => void;
}

export default function SectionHeader({
    title,
    buttonText,
    onClick,
}: SectionHeaderProps) {

    return (
        <div className="flex justify-between w-full items-center mb-6">
            <h1 className="text-3xl font-bold">
                {title}
            </h1>

            {
                buttonText && (
                    <button
                        onClick={onClick}
                        className="bg-black text-white rounded-lg px-4 py-2"
                    >
                        {buttonText}
                    </button>
                )
            }
        </div>
    );
}