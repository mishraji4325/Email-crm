"use client";

import "@/lib/chart";
import { useQuery } from "@tanstack/react-query";
import { getAnalytics } from "@/services/analytics.service";
import SectionHeader from "@/components/common/sectionHeader";
import CampaignChart from "@/components/dashboard/analytics/campaignChart";
import LeadStatusChart from "@/components/dashboard/analytics/leadStatusChart";
import SequenceChart from "@/components/dashboard/analytics/sequenceChart";

export default function AnalyticsPage() {

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{String(error)}</div>;
  }

  return (
    <div className="p-6">

      <SectionHeader
        title="Analytics"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

        <div className="border rounded-xl p-6">
          <p>Total Leads</p>
          <h2 className="text-3xl font-bold">
            {data?.totalLeads}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Total Campaigns</p>
          <h2 className="text-3xl font-bold">
            {data?.totalCampaigns?? 0}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Total Sequences</p>
          <h2 className="text-3xl font-bold">
            {data?.totalSequences}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Emails Sent</p>
          <h2 className="text-3xl font-bold">
            {data?.emailsSent}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Emails Opened</p>
          <h2 className="text-3xl font-bold">
            {data?.emailsOpened}
          </h2>
        </div>

        <div className="border rounded-xl p-6">
          <p>Open Rate</p>
          <h2 className="text-3xl font-bold">
            {data?.openRate}%
          </h2>
        </div>
        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <CampaignChart
            campaigns={data?.campaignStats}
          />

          <LeadStatusChart
            data={data?.leadStatus}
          />

        </div>

        <div className="mt-8">

          <SequenceChart
            sequences={data?.sequenceStats}
          />

        </div>

      </div>

    </div>
  );
}