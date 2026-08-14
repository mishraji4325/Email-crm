import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    sequence: any;
}

export default function SequenceSummary({
    sequence,
}: Props) {

    const totalSteps =
        sequence.steps?.length || 0;

    const assignedLeads =
        sequence.leads?.length || 0;


    return (
        <Card className="mt-6">

            <CardHeader>

                <CardTitle>
                    Sequence Summary
                </CardTitle>

            </CardHeader>


            <CardContent>

                <div className="
                    grid
                    grid-cols-1
                    gap-4
                    sm:grid-cols-2
                ">

                    {/* Steps */}

                    <div className="
                        rounded-xl
                        border
                        border-white/10
                        bg-[#111a2b]
                        p-5
                    ">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-600
                        ">
                            Total Steps
                        </p>

                        <h3 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {totalSteps}
                        </h3>

                        <p className="
                            mt-1
                            text-xs
                            text-gray-500
                        ">
                            Follow-up steps in this sequence
                        </p>

                    </div>


                    {/* Leads */}

                    <div className="
                        rounded-xl
                        border
                        border-[#f4bb4f]/10
                        bg-[#f4bb4f]/5
                        p-5
                    ">

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-600
                        ">
                            Assigned Leads
                        </p>

                        <h3 className="
                            mt-2
                            text-3xl
                            font-semibold
                            text-[#f4bb4f]
                        ">
                            {assignedLeads}
                        </h3>

                        <p className="
                            mt-1
                            text-xs
                            text-gray-500
                        ">
                            Leads currently in this sequence
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}