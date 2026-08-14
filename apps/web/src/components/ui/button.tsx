import * as React from "react";

import { cn } from "@/lib/utils";


interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {

    variant?:
        | "primary"
        | "secondary"
        | "ghost"
        | "danger"
        | "outline";

    size?:
        | "sm"
        | "default"
        | "lg";
}


const variants = {

    primary: `
        bg-[#f4bb4f]
        text-[#080e1a]
        hover:bg-[#ffd276]
        shadow-sm
        shadow-[#f4bb4f]/10
    `,

    secondary: `
        bg-[#111a2b]
        text-white
        border
        border-white/10
        hover:border-white/20
        hover:bg-[#162238]
    `,

    outline: `
        border
        border-white/10
        bg-transparent
        text-gray-300
        hover:bg-white/5
        hover:text-white
    `,

    ghost: `
        bg-transparent
        text-gray-400
        hover:bg-white/5
        hover:text-white
    `,

    danger: `
        border
        border-red-500/30
        bg-red-500/10
        text-red-400
        hover:bg-red-500/20
        hover:border-red-500/40
    `,

};


const sizes = {

    sm: `
        h-8
        px-3
        text-xs
        rounded-lg
    `,

    default: `
        h-10
        px-4
        text-sm
        rounded-xl
    `,

    lg: `
        h-11
        px-6
        text-sm
        rounded-xl
    `,

};


export const Button = React.forwardRef<
    HTMLButtonElement,
    ButtonProps
>(function Button(
    {
        className,
        variant = "primary",
        size = "default",
        type = "button",
        ...props
    },
    ref
) {

    return (

        <button
            ref={ref}
            type={type}
            className={cn(
                `
                inline-flex
                items-center
                justify-center
                gap-2
                font-medium
                outline-none
                transition-all
                duration-200

                focus-visible:ring-2
                focus-visible:ring-[#f4bb4f]/30

                disabled:pointer-events-none
                disabled:cursor-not-allowed
                disabled:opacity-50
                `,
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />

    );
});


Button.displayName = "Button";