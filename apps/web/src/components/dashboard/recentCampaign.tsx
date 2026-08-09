import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface CampaignsProps {
    campaigns: any[];
}

export default function RecentCampaign({
    campaigns
}: CampaignsProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">
                    Recent Campaigns
                </h2>
                {
                    campaigns.length === 0 ?
                        <p>No Campaigns</p>
                        :
                        campaigns.map((campaign) => (
                            <div key={campaign.id} className="border-b py-3">
                                <p className="font-semibold">
                                    {campaign.name}
                                </p>
                                <p className="text-sm">
                                    Leads:{campaign.campaignLeads.length}
                                </p>
                                <p className="text-xs text-gray-500">
                                    Created:{" "}
                                    {new Date(
                                        campaign.createdAt
                                    ).toLocaleDateString()}
                                </p>
                                <Link href={`/dashboard/campaigns/${campaign.id}`} 
                                    className="text-blue-500">View Campaign
                                </Link>
                            </div>
                        ))
                }
            </CardContent>
        </Card>
    )
};