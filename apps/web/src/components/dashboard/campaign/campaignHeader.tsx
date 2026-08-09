interface CampaignHeaderProps {
    campaign: any;
    onDelete: () => void;
}

export default function CampaignHeader({
    campaign, onDelete
}: CampaignHeaderProps) {
    const totalEmails = campaign.emailRecords?.length || 0;
    const opened = campaign.emailRecords?.filter(
        (email: any) => email.opened
    ).length || 0;
    const totalLeads = campaign.campaignLeads?.length || 0;

    const openRate = totalEmails === 0 ? 0
        : Math.round(
            (opened / totalEmails) * 100
        );
    return (
        <div className="border rounded-xl p-6 mb-8">
            <h1 className="text-3xl font-bold">
                🚀 {campaign.name}
            </h1>
            <p className="text-gray-500 mt-2">
                Created{" "}
                {
                    new Date(
                        campaign.createdAt
                    ).toLocaleDateString()
                }
            </p>
            <div className="flex gap-4">

                <button
                    onClick={onDelete}
                    className="inline-flex items-center bg-red-400 text-red-700  px-3 py-1 rounded-full text-sm mt-3"
                >
                    Delete Campaign
                </button>

                <span className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mt-3">
                    Active Campaign
                </span>
            </div>

            <div className="grid grid-cols-4 gap-6 mt-8">
                <div>
                    <p className="text-gray-500">
                        Leads
                    </p>
                    <p className="text-2xl font-bold">
                        {totalLeads}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500">
                        Emails
                    </p>
                    <p className="text-2xl font-bold">
                        {totalEmails}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500">
                        Opened
                    </p>
                    <p className="text-2xl font-bold">
                        {opened}
                    </p>
                </div>
                <div>
                    <p className="text-gray-500">
                        Open Rate
                    </p>
                    <p className="text-2xl font-bold">
                        {openRate}%
                    </p>
                </div>
            </div>
        </div>
    );
}