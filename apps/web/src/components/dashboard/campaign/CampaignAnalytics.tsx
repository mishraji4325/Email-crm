"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Badge from "@/components/ui/badge";

interface CampaignAnalyticsProps {
    campaign: any;
}

export default function CampaignAnalytics({
    campaign,
}: CampaignAnalyticsProps) {

    const totalEmails =
        campaign.emailRecords?.length || 0;

    const openedEmails =
        campaign.emailRecords?.filter(
            (email: any) => email.opened
        ).length || 0;

    const totalLeads =
        campaign.campaignLeads?.length || 0;

    const openRate =
        totalEmails === 0
            ? 0
            : Math.round(
                (openedEmails / totalEmails) * 100
            );


    return (
        <Card className="mt-6">

            <CardHeader>

                <CardTitle>
                    Campaign Performance
                </CardTitle>

            </CardHeader>


            <CardContent>

                {/* ================= STATS ================= */}

                <div className="
                    grid
                    grid-cols-2
                    gap-3
                    md:grid-cols-4
                ">

                    {/* Leads */}

                    <div className="
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        p-4
                    ">

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Leads
                        </p>

                        <p className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-white
                        ">
                            {totalLeads}
                        </p>

                    </div>


                    {/* Emails */}

                    <div className="
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        p-4
                    ">

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Emails
                        </p>

                        <p className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-white
                        ">
                            {totalEmails}
                        </p>

                    </div>


                    {/* Opened */}

                    <div className="
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        p-4
                    ">

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Opened
                        </p>

                        <p className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-emerald-400
                        ">
                            {openedEmails}
                        </p>

                    </div>


                    {/* Open Rate */}

                    <div className="
                        rounded-xl
                        border
                        border-[#f4bb4f]/10
                        bg-[#f4bb4f]/5
                        p-4
                    ">

                        <p className="
                            text-xs
                            text-gray-500
                        ">
                            Open Rate
                        </p>

                        <p className="
                            mt-2
                            text-2xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {openRate}%
                        </p>

                    </div>

                </div>


                {/* ================= PROGRESS ================= */}

                <div className="mt-8">

                    <div className="
                        mb-2
                        flex
                        items-center
                        justify-between
                    ">

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            <span className="
                                text-sm
                                text-gray-300
                            ">
                                Email Open Rate
                            </span>

                            <Badge
                                variant={
                                    openRate >= 50
                                        ? "success"
                                        : "warning"
                                }
                            >
                                {openRate}%
                            </Badge>

                        </div>

                        <span className="
                            text-xs
                            text-gray-500
                        ">
                            {openedEmails} / {totalEmails}
                        </span>

                    </div>


                    <div className="
                        h-3
                        overflow-hidden
                        rounded-full
                        bg-[#111a2b]
                    ">

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-[#f4bb4f]
                                to-[#e99b28]
                                transition-all
                            "
                            style={{
                                width: `${openRate}%`,
                            }}
                        />

                    </div>


                    <p className="
                        mt-2
                        text-xs
                        text-gray-500
                    ">
                        {openedEmails} of{" "}
                        {totalEmails} emails opened
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}