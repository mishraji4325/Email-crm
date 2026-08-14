import * as React from "react";

import { cn } from "@/lib/utils";


function Input({
    className,
    type,
    ...props
}: React.ComponentProps<"input">) {

    return (

        <input
            type={type}
            data-slot="input"
            className={cn(
                `
                h-10
                w-full
                min-w-0
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

                placeholder:text-gray-600

                hover:border-white/15

                focus:border-[#f4bb4f]/50
                focus:ring-2
                focus:ring-[#f4bb4f]/10

                disabled:pointer-events-none
                disabled:cursor-not-allowed
                disabled:opacity-50

                aria-invalid:border-red-500/50
                aria-invalid:ring-2
                aria-invalid:ring-red-500/10

                file:border-0
                file:bg-transparent
                file:text-sm
                file:font-medium
                `,
                className
            )}
            {...props}
        />

    );
}


export { Input };