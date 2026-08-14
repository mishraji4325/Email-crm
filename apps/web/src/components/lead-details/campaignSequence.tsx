"use client";

import { Button } from "../ui/button";

interface CampaignSectionProps {
    campaigns: any[];
    allCampaigns: any[];
    selectedCampaign: string;
    setSelectedCampaign: (value: string) => void;
    onAssign: () => void;
}

export default function CampaignSection({
    campaigns,
    allCampaigns,
    selectedCampaign,
    setSelectedCampaign,
    onAssign,
}: CampaignSectionProps) {

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-6
        ">

            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                gap-3
                mb-5
            ">

                <div>

                    <p className="
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-600
                    ">
                        Lead Assignment
                    </p>

                    <h2 className="
                        mt-1
                        text-xl
                        font-bold
                        text-white
                    ">
                        Campaigns
                    </h2>

                </div>

                <span className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.03]
                    px-3
                    py-1
                    text-xs
                    text-gray-400
                ">
                    {campaigns.length} assigned
                </span>

            </div>


            {/* Assigned campaigns */}

            {campaigns.length === 0 ? (

                <div className="
                    rounded-xl
                    border
                    border-dashed
                    border-white/10
                    bg-white/[0.02]
                    p-5
                    text-center
                ">

                    <p className="text-sm text-gray-500">
                        No campaign assigned
                    </p>

                </div>

            ) : (

                <div className="space-y-2">

                    {campaigns.map((item: any) => (

                        <div
                            key={item.id}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-white/10
                                bg-[#111a2b]
                                px-4
                                py-3
                            "
                        >

                            <div className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-[#f4bb4f]/10
                                text-sm
                            ">
                                ◈
                            </div>

                            <p className="
                                truncate
                                text-sm
                                font-medium
                                text-gray-200
                            ">
                                {item.campaign?.name || "Unknown Campaign"}
                            </p>

                        </div>

                    ))}

                </div>

            )}


            {/* Assign campaign */}

            <div className="
                mt-5
                border-t
                border-white/10
                pt-5
            ">

                <label className="
                    mb-2
                    block
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-gray-600
                ">
                    Assign Campaign
                </label>

                <div className="
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                ">

                    <select
                        value={selectedCampaign}
                        onChange={(e) =>
                            setSelectedCampaign(
                                e.target.value
                            )
                        }
                        className="
                            h-11
                            min-w-0
                            flex-1
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111a2b]
                            px-4
                            text-sm
                            text-gray-300
                            outline-none
                            transition
                            focus:border-[#f4bb4f]/60
                            focus:ring-1
                            focus:ring-[#f4bb4f]/20
                        "
                    >

                        <option
                            value=""
                            className="
                                bg-[#111a2b]
                                text-gray-300
                            "
                        >
                            Select Campaign
                        </option>

                        {allCampaigns.map(
                            (campaign: any) => (

                                <option
                                    key={campaign.id}
                                    value={campaign.id}
                                    className="
                                        bg-[#111a2b]
                                        text-gray-300
                                    "
                                >
                                    {campaign.name}
                                </option>

                            )
                        )}

                    </select>


                    <Button
                        onClick={onAssign}
                        disabled={!selectedCampaign}
                        className="
                            h-11
                            rounded-xl
                            bg-[#f4bb4f]
                            px-5
                            font-medium
                            text-black
                            hover:bg-[#f4bb4f]/90
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >
                        Assign
                    </Button>

                </div>

            </div>

        </div>
    );
}