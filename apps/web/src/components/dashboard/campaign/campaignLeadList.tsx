import Link from "next/link";

interface Props {
    campaign: any;
}

export default function CampaignLeadList({ campaign }: Props) {
    return (
        <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
                Assigned Leads
            </h2>

            {campaign.campaignLeads.length === 0 ? (
                <div className="border-2 border-dashed rounded-xl p-10 text-center">
                    <h3 className="text-xl font-semibold">
                        No Leads Yet
                    </h3>
                    <p className="text-gray-500 mt-2">
                        Add leads to this campaign to start generating AI emails.
                    </p>
                </div>
            ) : (
                campaign.campaignLeads.map((item: any) => (
                    <Link
                        key={item.id}
                        href={`/dashboard/leads/${item.lead.id}`}
                        className="block border rounded-lg p-4 mb-3 hover:bg-gray-50"
                    >
                        <h3>{item.lead.name}</h3>
                        <p>{item.lead.company}</p>
                    </Link>
                ))
            )}
        </div>
    );
}