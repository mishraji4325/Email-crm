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
    <div className="border rounded-xl p-6 mt-6">

      <h2 className="text-xl font-bold mb-6">

        Campaign Performance

      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">

            Leads

          </p>

          <h3 className="text-2xl font-bold">

            {totalLeads}

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">

            Emails

          </p>

          <h3 className="text-2xl font-bold">

            {totalEmails}

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">

            Opened

          </p>

          <h3 className="text-2xl font-bold">

            {openedEmails}

          </h3>

        </div>

        <div className="border rounded-lg p-4">

          <p className="text-gray-500">

            Open Rate

          </p>

          <h3 className="text-2xl font-bold">

            {openRate}%

          </h3>

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span>Open Rate</span>

          <span>{openRate}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-green-500 h-3 rounded-full"
            style={{
              width: `${openRate}%`,
            }}
          />

        </div>

        <p className="text-sm text-gray-500 mt-2">

          {openedEmails} of {totalEmails} emails opened

        </p>

      </div>

    </div>
  );
}