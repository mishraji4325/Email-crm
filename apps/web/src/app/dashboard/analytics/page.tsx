"use client";

import "@/lib/chart";

import { useQuery } from "@tanstack/react-query";

import { getAnalytics } from "@/services/analytics.service";

import CampaignChart from "@/components/dashboard/analytics/campaignChart";
import LeadStatusChart from "@/components/dashboard/analytics/leadStatusChart";
import SequenceChart from "@/components/dashboard/analytics/sequenceChart";
import CampaignPerformanceTable from "@/components/dashboard/analytics/campaignPerformanceTable";
import TopSequences from "@/components/dashboard/analytics/topSequences";
import RecentActivity from "@/components/dashboard/recentActivity";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import Badge from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import EmptyState from "@/components/common/emptyState";
import LoadingState from "@/components/ui/loading-state";




export default function AnalyticsPage() {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery({

        queryKey: ["analytics"],

        queryFn: getAnalytics,

    });


    /* ========================================= */
    /* LOADING */
    /* ========================================= */

    if (isLoading) {

        return (
            <LoadingState
                text="Loading analytics..."
            />
        );

    }


    /* ========================================= */
    /* ERROR */
    /* ========================================= */

    if (isError) {

        return (
            <EmptyState

                title="Unable to load analytics"

                description={
                    String(error)
                }

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


            {/* ========================================= */}
            {/* HEADER */}
            {/* ========================================= */}

            <div>

                <div className="
                    mb-2
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.2em]
                    text-[#f4bb4f]
                ">
                    Performance
                </div>

                <div className="
                    flex
                    flex-col
                    gap-2
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
                ">

                    <div>

                        <h1 className="
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            Analytics
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Track your outreach performance
                            and campaign results.
                        </p>

                    </div>


                    <Badge variant="info">
                        Live Data
                    </Badge>

                </div>

            </div>


            {/* ========================================= */}
            {/* KEY METRICS */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-2
                gap-3
                md:grid-cols-3
                xl:grid-cols-6
            ">

                {/* Leads */}

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Total Leads
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {data?.totalLeads ?? 0}
                        </h2>

                    </CardContent>

                </Card>


                {/* Campaigns */}

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Campaigns
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {data?.totalCampaigns ?? 0}
                        </h2>

                    </CardContent>

                </Card>


                {/* Sequences */}

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Sequences
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {data?.totalSequences ?? 0}
                        </h2>

                    </CardContent>

                </Card>


                {/* Sent */}

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Emails Sent
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {data?.emailsSent ?? 0}
                        </h2>

                    </CardContent>

                </Card>


                {/* Opened */}

                <Card>

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Emails Opened
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-emerald-400
                        ">
                            {data?.emailsOpened ?? 0}
                        </h2>

                    </CardContent>

                </Card>


                {/* Open Rate */}

                <Card className="
                    border-[#f4bb4f]/20
                ">

                    <CardContent className="p-5">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        ">
                            Open Rate
                        </p>

                        <h2 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {data?.openRate ?? 0}%
                        </h2>

                    </CardContent>

                </Card>

            </div>


            {/* ========================================= */}
            {/* MAIN CHARTS */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            ">

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Campaign Overview
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <CampaignChart
                            campaigns={
                                data?.campaignStats || []
                            }
                        />

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader>

                        <CardTitle>
                            Lead Status
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <LeadStatusChart
                            data={
                                data?.leadStatus || []
                            }
                        />

                    </CardContent>

                </Card>

            </div>


            {/* ========================================= */}
            {/* SEQUENCE CHART */}
            {/* ========================================= */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Sequence Performance
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <SequenceChart
                        sequences={
                            data?.sequenceStats || []
                        }
                    />

                </CardContent>

            </Card>


            {/* ========================================= */}
            {/* CAMPAIGN PERFORMANCE */}
            {/* ========================================= */}

            <Card>

                <CardHeader>

                    <CardTitle>
                        Campaign Performance
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <CampaignPerformanceTable
                        campaigns={
                            data?.campaignStats || []
                        }
                    />

                </CardContent>

            </Card>


            {/* ========================================= */}
            {/* BOTTOM SECTION */}
            {/* ========================================= */}

            <div className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
            ">

                <Card>

                    <CardHeader>

                        <CardTitle>
                            Top Sequences
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <TopSequences
                            sequences={
                                data?.sequenceStats || []
                            }
                        />

                    </CardContent>

                </Card>


                <Card>

                    <CardHeader>

                        <CardTitle>
                            Recent Activity
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <RecentActivity
                            activities={
                                data?.recentActivities || []
                            }
                        />

                    </CardContent>

                </Card>

            </div>

        </div>
    );
}