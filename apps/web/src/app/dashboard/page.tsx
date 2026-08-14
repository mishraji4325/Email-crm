"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboard.service";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import {Button} from "@/components/ui/button";
import PageHeader from "@/components/ui/page-header";
import LoadingState from "@/components/ui/loading-state";
import EmptyState from "@/components/ui/empty-state";

import StatsCard from "@/components/dashboard/statsCard";
import RecentCampaign from "@/components/dashboard/recentCampaign";
import RecentActivity from "@/components/dashboard/recentActivity";
import PipelineCard from "@/components/dashboard/pipelineCard";

export default function DashboardPage() {

    const {
        data,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard,
    });


    /* ================= LOADING ================= */

    if (isLoading) {
        return (
            <LoadingState
                text="Loading your dashboard..."
            />
        );
    }


    /* ================= ERROR ================= */

    if (error || !data) {
        return (
            <EmptyState
                title="Unable to load dashboard"
                description="Something went wrong while fetching your CRM data. Please try again."
                action={
                    <Button
                        onClick={() =>
                            window.location.reload()
                        }
                    >
                        Try Again
                    </Button>
                }
            />
        );
    }


    return (
        <div className="space-y-8">

            {/* ================================================= */}
            {/* PAGE HEADER */}
            {/* ================================================= */}

            <PageHeader
                title="Dashboard"
                description="Here's what's happening with your outreach today."
                action={
                    <Button
                        onClick={() =>
                            window.location.href =
                                "/dashboard/leads"
                        }
                    >
                        + Add Lead
                    </Button>
                }
            />


            {/* ================================================= */}
            {/* STATS */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-3
            ">

                <StatsCard
                    title="Total Leads"
                    value={data.totalLeads}
                />

                <StatsCard
                    title="Campaigns"
                    value={data.totalCampaigns}
                />

                <StatsCard
                    title="Emails Sent"
                    value={data.emailsSent}
                />

                <StatsCard
                    title="Emails Opened"
                    value={data.emailsOpened}
                />

                <StatsCard
                    title="Open Rate"
                    value={`${data.openRate}%`}
                />

                <StatsCard
                    title="Meetings Booked"
                    value={data.meetingsBooked}
                />

            </div>


            {/* ================================================= */}
            {/* MAIN OVERVIEW */}
            {/* ================================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-[1.4fr_1fr]
            ">

                {/* PIPELINE */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Pipeline Overview
                        </CardTitle>

                        <CardDescription>
                            Track how your leads are moving
                            through the sales process.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <PipelineCard
                            pipeline={data.pipeline}
                        />

                    </CardContent>

                </Card>


                {/* RECENT ACTIVITY */}

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Recent Activity
                        </CardTitle>

                        <CardDescription>
                            Latest activity across your CRM.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        {data.recentActivities?.length ? (

                            <RecentActivity
                                activities={
                                    data.recentActivities
                                }
                            />

                        ) : (

                            <EmptyState
                                title="No recent activity"
                                description="Activity will appear here as you work with your leads."
                            />

                        )}

                    </CardContent>

                </Card>

            </div>


            {/* ================================================= */}
            {/* RECENT CAMPAIGNS */}
            {/* ================================================= */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Recent Campaigns
                    </CardTitle>

                    <CardDescription>
                        Your latest outreach campaigns.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    {data.recentCampaigns?.length ? (

                        <RecentCampaign
                            campaigns={
                                data.recentCampaigns
                            }
                        />

                    ) : (

                        <EmptyState
                            title="No campaigns yet"
                            description="Create your first campaign to start reaching out to leads."
                            action={
                                <Button
                                    onClick={() =>
                                        window.location.href =
                                            "/dashboard/campaigns"
                                    }
                                >
                                    Create Campaign
                                </Button>
                            }
                        />

                    )}

                </CardContent>

            </Card>

        </div>
    );
}