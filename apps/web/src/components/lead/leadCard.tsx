"use client";

import LeadActions from "./leadActions";
import Badge from "@/components/ui/badge";

interface LeadCardProps {
    lead: any;
    selected: boolean;
    onToggle: (id: string) => void;
    onGenerate?: (id: string) => void;
    onSend?: (id: string) => void;
}

export default function LeadCard({
    lead,
    selected,
    onToggle,
    onGenerate,
    onSend,
}: LeadCardProps) {

    const emailsSent =
        lead.emailRecords?.filter(
            (email: any) => !email.isDraft
        ).length || 0;

    const opened =
        lead.emailRecords?.some(
            (email: any) => email.opened
        ) || false;


    /*
     * Your Prisma relation is:
     *
     * campaigns
     *   ↓
     * CampaignLead
     *   ↓
     * campaign
     *
     */

    const campaignName =
        lead.campaigns?.length &&
        lead.campaigns[0]?.campaign
            ? lead.campaigns[0].campaign.name
            : "Not Assigned";


    /* Status → Badge */

    const getStatusVariant = () => {

        switch (lead.status) {

            case "CONTACTED":
                return "info" as const;

            case "MEETING_BOOKED":
                return "success" as const;

            case "CLOSED":
                return "success" as const;

            case "LOST":
                return "danger" as const;

            case "NEW":
            default:
                return "warning" as const;
        }
    };

    const getStatusLabel = () => {

        switch (lead.status) {
    
            case "MEETING_BOOKED":
                return "Meeting Booked";
    
            case "CONTACTED":
                return "Contacted";
    
            case "CLOSED":
                return "Closed";
    
            case "LOST":
                return "Lost";
    
            case "NEW":
                return "New";
    
            default:
                return lead.status;
    
        }
    };


    return (

        <div className="
            group
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-5
            transition
            hover:border-white/20
            hover:bg-[#101a2e]
        ">

            {/* ================= TOP ================= */}

            <div className="
                flex
                items-start
                gap-4
            ">

                {/* Checkbox */}

                <div className="pt-1">

                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                            onToggle(lead.id)
                        }
                        className="
                            h-4
                            w-4
                            cursor-pointer
                            rounded
                            border-white/20
                            bg-[#111a2b]
                            accent-[#f4bb4f]
                        "
                    />

                </div>


                {/* Main */}

                <div className="min-w-0 flex-1">

                    {/* NAME + STATUS */}

                    <div className="
                        flex
                        flex-col
                        gap-3
                        sm:flex-row
                        sm:items-start
                        sm:justify-between
                    ">

                        <div>

                            <h2 className="
                                text-lg
                                font-semibold
                                text-white
                            ">
                                {lead.name}
                            </h2>

                            <div className="
                                mt-2
                                flex
                                flex-wrap
                                gap-x-4
                                gap-y-1
                                text-sm
                                text-gray-500
                            ">

                                <span>
                                    🏢 {lead.company || "-"}
                                </span>

                                <span>
                                    💼 {lead.role || "-"}
                                </span>

                            </div>

                        </div>


                        <Badge
                            variant={getStatusVariant()}
                        >
                            {getStatusLabel()}
                        </Badge>

                    </div>


                    {/* EMAIL */}

                    <div className="
                        mt-4
                        rounded-xl
                        border
                        border-white/5
                        bg-[#111a2b]
                        px-4
                        py-3
                    ">

                        <p className="
                            truncate
                            text-sm
                            text-gray-300
                        ">
                            📧 {lead.emails || "-"}
                        </p>

                    </div>


                    {/* METRICS */}

                    <div className="
                        mt-4
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-3
                    ">

                        {/* Campaign */}

                        <div className="
                            rounded-xl
                            border
                            border-white/5
                            bg-white/[0.02]
                            px-3
                            py-3
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-gray-600
                            ">
                                Campaign
                            </p>

                            <p className="
                                mt-1
                                truncate
                                text-sm
                                text-gray-300
                            ">
                                {campaignName}
                            </p>

                        </div>


                        {/* Emails */}

                        <div className="
                            rounded-xl
                            border
                            border-white/5
                            bg-white/[0.02]
                            px-3
                            py-3
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-gray-600
                            ">
                                Emails Sent
                            </p>

                            <p className="
                                mt-1
                                text-sm
                                text-gray-300
                            ">
                                📨 {emailsSent}
                            </p>

                        </div>


                        {/* Opened */}

                        <div className="
                            rounded-xl
                            border
                            border-white/5
                            bg-white/[0.02]
                            px-3
                            py-3
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.15em]
                                text-gray-600
                            ">
                                Opened
                            </p>

                            <p className={`
                                mt-1
                                text-sm
                                ${
                                    opened
                                        ? "text-emerald-400"
                                        : "text-gray-500"
                                }
                            `}>
                                👁 {opened ? "Yes" : "No"}
                            </p>

                        </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="
                        mt-5
                        border-t
                        border-white/10
                        pt-4
                    ">

                        <LeadActions
                            lead={lead}
                            onGenerate={onGenerate}
                            onSend={onSend}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
}