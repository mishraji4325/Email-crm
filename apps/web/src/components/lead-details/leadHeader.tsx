"use client";

import Badge from "@/components/ui/badge";

interface LeadHeaderProps {
    lead: any;
}

export default function LeadHeader({
    lead,
}: LeadHeaderProps) {

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
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
        ">

            {/* Main information */}

            <div className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:items-center
                lg:justify-between
            ">

                {/* Name / Company / Role */}

                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-10
                    gap-y-5
                ">

                    {/* Name */}

                    <div>

                        <p className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-gray-600
                        ">
                            Name
                        </p>

                        <h1 className="
                            mt-1
                            text-2xl
                            font-bold
                            text-white
                        ">
                            {lead.name}
                        </h1>

                    </div>


                    {/* Company */}

                    <div>

                        <p className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-gray-600
                        ">
                            Company
                        </p>

                        <p className="
                            mt-1
                            text-base
                            font-medium
                            text-gray-300
                        ">
                            🏢 {lead.company || "-"}
                        </p>

                    </div>


                    {/* Role */}

                    <div>

                        <p className="
                            text-[10px]
                            font-medium
                            uppercase
                            tracking-[0.18em]
                            text-gray-600
                        ">
                            Job / Role
                        </p>

                        <p className="
                            mt-1
                            text-base
                            font-medium
                            text-gray-300
                        ">
                            💼 {lead.role || "-"}
                        </p>

                    </div>

                </div>


                {/* Status */}

                <div className="shrink-0">

                    <Badge
                        variant={getStatusVariant()}
                    >
                        {getStatusLabel()}
                    </Badge>

                </div>

            </div>


            {/* Email */}

            <div className="
                mt-6
                border-t
                border-white/10
                pt-5
            ">

                <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Email
                </p>

                <p className="
                    mt-1
                    text-sm
                    text-gray-300
                ">
                    📧 {lead.emails || "-"}
                </p>

            </div>

        </div>
    );
}