import {
    Line
} from "react-chartjs-2";

interface Props {
    sequences: any[];
}

export default function SequenceChart({
    sequences
}: Props) {
    const chartData = {

        labels: sequences.map(
            (s) => s.name
        ),

        datasets: [
            {
                label: "Steps",

                data: sequences.map(
                    (s) => s.steps.length
                ),
            },
        ],
    };

    return (

        <div className="border rounded-xl p-6">

            <h2 className="text-xl font-bold mb-4">

                Sequence Growth

            </h2>

            <Line data={chartData}/>

        </div>

    );

}