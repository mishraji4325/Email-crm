interface BadgeProps {
    children: React.ReactNode;
    variant?:
        | "default"
        | "success"
        | "warning"
        | "danger"
        | "info";
}

export default function Badge({
    children,
    variant = "default",
}: BadgeProps) {

    const variants = {
        default:
            "bg-white/5 text-gray-300 border-white/10",

        success:
            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",

        warning:
            "bg-[#f4bb4f]/10 text-[#f4bb4f] border-[#f4bb4f]/20",

        danger:
            "bg-red-500/10 text-red-400 border-red-500/20",

        info:
            "bg-blue-500/10 text-blue-400 border-blue-500/20",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                border
                px-2.5
                py-1
                text-xs
                font-medium
                ${variants[variant]}
            `}
        >
            {children}
        </span>
    );
}