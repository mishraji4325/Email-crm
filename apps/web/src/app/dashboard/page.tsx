"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "@/services/dashboard.service";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import StatsCard from "@/components/dashboard/statsCard";
import RecentCampaign from "@/components/dashboard/recentCampaign";
import RecentActivity from "@/components/dashboard/recentActivity";
import PipelineCard from "@/components/dashboard/pipelineCard";


export default function DashboardPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: getDashboard
  });

  if (isLoading) {
    return <div>Loading Dashboard...</div>
  }

  if (error) {
    return <div>Failed to load dashboard.</div>
  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">

          Dashboard

        </h1>

        <p className="text-gray-500">

          Welcome back 👋

        </p>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

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

      {/* Bottom Section */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <PipelineCard

          pipeline={data.pipeline}

        />

        <RecentActivity

          activities={data.recentActivities}

        />

      </div>

      <RecentCampaign

        campaigns={data.recentCampaigns}

      />

    </div>

  );

}