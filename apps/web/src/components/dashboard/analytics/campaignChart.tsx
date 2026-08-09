import {
    Bar
} from "react-chartjs-2";

interface Props {
    campaigns: any[];
}

export default function CampaignChart({
    campaigns
}: Props) {
    
    const chartData = {
        labels: campaigns.map((c) => c.name),

        datasets: [
            {
                label: "Leads",
                data: campaigns.map(
                    (c) => c.campaignLeads.length
                ),
            },
        ],
    };


    return (

        <div className="border rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">

                Campaign Performance

            </h2>

            <Bar data={chartData} />

        </div>

    );

}