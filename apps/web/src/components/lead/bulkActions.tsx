"use client";

import { Button } from "@/components/ui/button";

interface BulkActionsProps {
    selectedLeads: string[];
    onGenerate: () => void;
    onSend: () => void;
    onCampaign: () => void;
    onSequence: () => void;
}

export default function BulkActions({
    selectedLeads,
    onGenerate,
    onSend,
    onCampaign,
    onSequence,
}: BulkActionsProps) {

    const disabled =
        selectedLeads.length === 0;

    return (
        <div className="
            flex
            flex-wrap
            items-center
            gap-3
            rounded-xl
            border
            border-white/10
            bg-[#0d1526]
            p-4
        ">

            <div className="mr-2">

                <p className="
                    text-xs
                    uppercase
                    tracking-[0.15em]
                    text-gray-600
                ">
                    Selected
                </p>

                <p className="
                    text-sm
                    font-semibold
                    text-white
                ">
                    {selectedLeads.length} leads
                </p>

            </div>


            <div className="
                h-8
                w-px
                bg-white/10
            " />


            <Button
                disabled={disabled}
                onClick={onGenerate}
            >
                ✦ Generate
            </Button>


            <Button
                variant="secondary"
                disabled={disabled}
                onClick={onSend}
            >
                ✉ Send
            </Button>


            <Button
                variant="secondary"
                disabled={disabled}
                onClick={onCampaign}
            >
                ◈ Campaign
            </Button>


            <Button
                variant="secondary"
                disabled={disabled}
                onClick={onSequence}
            >
                ≡ Sequence
            </Button>

        </div>
    );
}