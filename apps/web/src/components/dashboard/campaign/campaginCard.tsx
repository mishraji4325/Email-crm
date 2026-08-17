"use client";

import Link from "next/link";
import Badge from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CampaignCardProps {
    campaign: any;
}

export default function CampaignCard({
    campaign,
}: CampaignCardProps) {

    const totalEmails =
        campaign.emailRecords?.length || 0;

    const openEmails =
        campaign.emailRecords?.filter(
            (email: any) => email.opened
        ).length || 0;

    const totalLeads =
        campaign.campaignLeads?.length || 0;

    const openRate =
        totalEmails === 0
            ? 0
            : Math.round(
                (openEmails / totalEmails) * 100
            );

    const isActive =
        totalEmails > 0;


    return (
        <Card className="
            transition
            duration-200
            hover:border-white/20
            hover:bg-[#101a2e]
        ">

            <CardContent className="p-6">

                {/* ================= HEADER ================= */}

                <div className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                ">

                    <div className="min-w-0">

                        <div className="
                            mb-3
                        ">

                            <Badge
                                variant={
                                    isActive
                                        ? "success"
                                        : "warning"
                                }
                            >
                                {isActive
                                    ? "● Active"
                                    : "● Draft"
                                }
                            </Badge>

                        </div>


                        <h2 className="
                            truncate
                            text-xl
                            font-semibold
                            text-white
                        ">
                            {campaign.name}
                        </h2>


                        <p className="
                            mt-1
                            text-xs
                            text-gray-500
                        ">
                            Created{" "}
                            {new Date(
                                campaign.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>


                    <Link
                        href={`/dashboard/campaigns/${campaign.id}`}
                    >
                        <Button variant="secondary">
                            Open →
                        </Button>
                    </Link>

                </div>


                {/* ================= STATS ================= */}

                <div className="
                    mt-6
                    grid
                    grid-cols-3
                    divide-x
                    divide-white/10
                    rounded-xl
                    border
                    border-white/5
                    bg-[#111a2b]
                    py-4
                ">

                    {/* Leads */}

                    <div className="px-4">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Leads
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-white
                        ">
                            {totalLeads}
                        </p>

                    </div>


                    {/* Emails */}

                    <div className="px-4">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Emails
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-white
                        ">
                            {totalEmails}
                        </p>

                    </div>


                    {/* Open Rate */}

                    <div className="px-4">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-600
                        ">
                            Open Rate
                        </p>

                        <p className="
                            mt-1
                            text-xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {openRate}%
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}