"use client";

import Link from "next/link";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import EmptyState from "@/components/ui/empty-state";
import {Button} from "@/components/ui/button";

interface Props {
    campaign: any;
}

export default function CampaignLeadList({
    campaign,
}: Props) {

    const leads =
        campaign.campaignLeads || [];


    return (
        <Card>

            <CardHeader>

                <CardTitle>
                    Assigned Leads
                </CardTitle>

                <CardDescription>
                    Leads currently assigned to this campaign.
                </CardDescription>

            </CardHeader>


            <CardContent>

                {leads.length === 0 ? (

                    <EmptyState
                        title="No leads yet"
                        description="Add leads to this campaign to start generating AI emails."
                        action={
                            <Button>
                                Add Leads
                            </Button>
                        }
                    />

                ) : (

                    <div className="space-y-2">

                        {leads.map(
                            (item: any) => (

                                <Link
                                    key={item.id}
                                    href={`/dashboard/leads/${item.lead.id}`}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-[#111a2b]
                                        p-4
                                        transition
                                        hover:border-white/20
                                        hover:bg-[#172238]
                                    "
                                >

                                    <div>

                                        <h3 className="
                                            text-sm
                                            font-medium
                                            text-white
                                        ">
                                            {item.lead.name}
                                        </h3>

                                        <p className="
                                            mt-1
                                            text-xs
                                            text-gray-500
                                        ">
                                            {item.lead.company || "No company"}
                                        </p>

                                    </div>


                                    <span className="
                                        text-gray-500
                                        transition
                                        group-hover:text-[#f4bb4f]
                                    ">
                                        →
                                    </span>

                                </Link>

                            )
                        )}

                    </div>

                )}

            </CardContent>

        </Card>
    );
}