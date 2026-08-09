"use client";

import Link from "next/link";

interface CampaignCardProps{
    campaign:any[]
}

export default function CampaignCard({
    campaign,
}:CampaignCardProps){
    const totalEmails =  campaign.emailRecords?.length || 0;
    const openEmails = campaign.emailRecords?.filter((email:any)=> email.opened).length || 0;
    const totalLeads = campaign.campaignLeads?.length || 0;
    const openRate = totalEmails === 0 ?0:Math.round((openEmails / totalEmails)*100);

    return(
        <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
                <div className="mb-3">
                    <span className={`px-3 rounded-full text-sm ${campaign.emailRecords.length > 0 ? 
                        "bg-green-100 text-green-700" : "bg-yellow-100 text-grey-700"}`}>
                            {
                                campaign.emailRecords.length > 0 ? "🟢 Active" : "🟡 Draft"
                            }
                    </span>
                </div>
                <div>
                    <h2 className="text-xl font-bold">
                        🚀 {campaign.name}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Created{" "}{new Date(
                            campaign.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
                <Link href={`/dashboard/campaigns/${campaign.id}`} className="border rounded px-4 py-2 text-sm">
                    Open
                </Link>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                    <p className="text-sm text-gray-500">leads</p>
                    <p className="text-xl font-bold">{totalLeads}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Emails</p>
                    <p className="text-xl font-bold">{totalEmails}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Open Rate</p>
                    <p className="text-xl font-bold">{openRate}%</p>
                </div>
            </div>
        </div>
    )
}