import * as React from "react";

import { cn } from "@/lib/utils";


interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {}


function Select({
    className,
    children,
    ...props
}: SelectProps) {

    return (

        <select
            className={cn(
                `
                h-10
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#111a2b]
                px-3
                py-2
                text-sm
                text-white
                outline-none
                transition-all

                hover:border-white/15

                focus:border-[#f4bb4f]/50
                focus:ring-2
                focus:ring-[#f4bb4f]/10

                disabled:cursor-not-allowed
                disabled:opacity-50

                [&>option]:bg-[#111a2b]
                [&>option]:text-white
                `,
                className
            )}
            {...props}
        >
            {children}
        </select>

    );
}


export { Select };