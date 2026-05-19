"use client"

import { useDroppable } from "@dnd-kit/core";

export default function Column({ id, children }: any) {
    const {setNodeRef} = useDroppable({id});

    return(
        <div ref = {setNodeRef} className="border p-4 min-h-[400px]">
            {children}
        </div>
    )
};