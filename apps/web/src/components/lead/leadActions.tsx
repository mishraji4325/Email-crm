"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";

interface LeadActionsProps {
    lead: any;
    onGenerate?: (id: string) => void;
    onSend?: (id: string) => void;
}

export default function LeadActions({
    lead,
    onGenerate,
    onSend,
}: LeadActionsProps) {

    return (
        <div className="
            flex
            flex-wrap
            gap-2
        ">

            <Link href={`/dashboard/leads/${lead.id}`}>
                <Button variant="secondary">
                 👁️ View
                </Button>
            </Link>

            <Button
                variant="secondary"
                onClick={() =>
                    onGenerate?.(lead.id)
                }
            >
                ✦ Generate Email
            </Button>

            <Button
                variant="primary"
                onClick={() =>
                    onSend?.(lead.id)
                }
            >
                ✉ Send Email
            </Button>

        </div>
    );
}