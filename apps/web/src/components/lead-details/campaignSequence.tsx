"use client";

interface CampaignSectionProps {
    campaigns:any[];
    allCampaigns:any[];
    selectedCampaign:string;
    setSelectedCampaign:(value:string)=>void
    onAssign:()=>void;
}

export default function CampaignSection({
    campaigns,
    allCampaigns,
    selectedCampaign,
    setSelectedCampaign,
    onAssign
}:CampaignSectionProps){

    return(
        <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
                Campaigns
            </h2>
            {
                campaigns.length===0?
                (
                    <p>No Campaign Assigned</p>
                )
                :
                campaigns.map((item:any)=>(
                    <div
                        key={item.id}
                        className="border rounded p-3 mb-2" >
                        {item.campaign.name}
                    </div>
                ))
            }
            <div className="flex gap-3 mt-5">
                <select
                value={selectedCampaign}
                onChange={(e)=>
                    setSelectedCampaign(
                        e.target.value
                    )
                }
                className="border rounded p-2 flex-1" >
                    <option value="">
                        Select Campaign
                    </option>
                    {
                        allCampaigns.map(
                            (campaign:any)=>(
                                <option
                                key={campaign.id}
                                value={campaign.id}
                                >
                                    {campaign.name}
                                </option>
                            )
                        )
                    }
                </select>
                <button
                className="border rounded px-4"
                onClick={onAssign}
                >
                    Assign
                </button>
            </div>
        </div>
    );
}