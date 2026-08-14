"use client";

interface Props {
    sequences: any[];
}

export default function TopSequences({
    sequences,
}: Props) {

    if (
        !sequences ||
        sequences.length === 0
    ) {

        return (

            <div className="
                rounded-xl
                border
                border-dashed
                border-white/10
                bg-[#111a2b]
                p-8
                text-center
            ">

                <p className="
                    text-sm
                    text-gray-600
                ">
                    No sequence data available.
                </p>

            </div>

        );

    }


    const sortedSequences =
        [...sequences]
            .sort(
                (a, b) =>
                    (
                        b.leads?.length || 0
                    ) -
                    (
                        a.leads?.length || 0
                    )
            )
            .slice(0, 5);


    return (

        <div className="space-y-3">

            {sortedSequences.map(
                (sequence, index) => {

                    const steps =
                        sequence.steps
                            ?.length || 0;

                    const leads =
                        sequence.leads
                            ?.length || 0;


                    return (

                        <div
                            key={sequence.id}
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                                rounded-xl
                                border
                                border-white/10
                                bg-[#111a2b]
                                p-4
                                transition
                                hover:border-white/20
                            "
                        >

                            <div className="
                                flex
                                min-w-0
                                items-center
                                gap-3
                            ">

                                <div className="
                                    flex
                                    h-9
                                    w-9
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-[#f4bb4f]/20
                                    bg-[#f4bb4f]/10
                                    text-sm
                                    font-semibold
                                    text-[#f4bb4f]
                                ">
                                    {index + 1}
                                </div>


                                <div className="min-w-0">

                                    <h3 className="
                                        truncate
                                        font-medium
                                        text-white
                                    ">
                                        {sequence.name}
                                    </h3>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-gray-600
                                    ">
                                        {steps}{" "}
                                        {steps === 1
                                            ? "step"
                                            : "steps"}
                                    </p>

                                </div>

                            </div>


                            <div className="
                                shrink-0
                                text-right
                            ">

                                <p className="
                                    text-xl
                                    font-semibold
                                    text-[#f4bb4f]
                                ">
                                    {leads}
                                </p>

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.1em]
                                    text-gray-600
                                ">
                                    Leads
                                </p>

                            </div>

                        </div>

                    );

                }
            )}

        </div>

    );
}