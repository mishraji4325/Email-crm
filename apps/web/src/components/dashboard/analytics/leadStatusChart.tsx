import {
    Pie
} from "react-chartjs-2";

interface Props {
    data: any[];
}

export default function LeadStatusChart({
    data
}: Props) {
    const chartData = {

        labels: data.map(
            (item) => item.status
        ),

        datasets: [
            {
                data: data.map(
                    (item) => item._count.status
                ),
            },
        ],
    };

    return (

        <div className="border rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">

                Lead Status

            </h2>

            <Pie data={chartData}/>

        </div>

    );

}