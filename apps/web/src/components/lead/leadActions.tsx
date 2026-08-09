"use client";

import Link from "next/link";

interface LeadActionsProps{
    lead: any;
    onGenerate?: (id:string)=>void;
    onSend?: (id:string)=>void;
}

export default function LeadActions({
    lead, onGenerate, onSend
}: LeadActionsProps){
    return (
        <div className="felx gap-2 mt-4">
            <Link href={`/dashboard/leads/${lead.id}`} 
                className="border rounded px-3 py-2">
                   View     
            </Link>

            <button className="border rounded px-3 py-2"
                    onClick={()=>onGenerate?.(lead.id)}
            >
                Generative Ai
            </button>

            <button className="border rounded px-3 py-2"
                    onClick={()=>onSend?.(lead.id)}
            >
                Send
            </button>
        </div>
    )
}