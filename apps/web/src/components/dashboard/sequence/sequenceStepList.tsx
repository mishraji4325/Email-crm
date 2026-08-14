import EditableCard from "@/components/common/editableCard";

import EmptyState from "@/components/common/emptyState";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";


interface Props {
    sequence: any;
    onEdit: (step: any) => void;
    onDelete: (id: string) => void;
}


export default function SequenceStepList({
    sequence,
    onEdit,
    onDelete,
}: Props) {

    const steps = [
        ...(sequence.steps || []),
    ].sort(
        (a: any, b: any) =>
            a.dayOffset - b.dayOffset
    );


    if (steps.length === 0) {

        return (

            <Card className="mt-6">

                <CardHeader>

                    <CardTitle>
                        Sequence Steps
                    </CardTitle>

                    <CardDescription>
                        Build the messages that will be sent in this sequence.
                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <EmptyState
                        title="No steps yet"
                        description="
                            Add the first step to start building
                            your sequence.
                        "
                    />

                </CardContent>

            </Card>

        );

    }


    return (

        <Card className="mt-6">

            <CardHeader>

                <CardTitle>
                    Sequence Steps
                </CardTitle>

                <CardDescription>
                    Messages are ordered by their scheduled day.
                </CardDescription>

            </CardHeader>


            <CardContent>

                <div className="space-y-4">

                    {steps.map(
                        (step: any) => (

                            <div
                                key={step.id}
                                className="
                                    relative
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-[#111a2b]
                                    p-1
                                "
                            >

                                <div className="
                                    mb-2
                                    flex
                                    items-center
                                    gap-2
                                    px-3
                                    pt-2
                                ">

                                    <span className="
                                        rounded-full
                                        border
                                        border-[#f4bb4f]/20
                                        bg-[#f4bb4f]/10
                                        px-2.5
                                        py-1
                                        text-[10px]
                                        font-medium
                                        uppercase
                                        tracking-[0.12em]
                                        text-[#f4bb4f]
                                    ">
                                        Day {step.dayOffset}
                                    </span>

                                </div>


                                <EditableCard

                                    title={
                                        step.subject ||
                                        "Untitled Step"
                                    }

                                    subtitle={
                                        `Day ${step.dayOffset}`
                                    }

                                    content={
                                        <div className="
                                            whitespace-pre-wrap
                                            text-sm
                                            leading-6
                                            text-gray-400
                                        ">
                                            {step.body}
                                        </div>
                                    }

                                    onEdit={() =>
                                        onEdit(step)
                                    }

                                    onDelete={() =>
                                        onDelete(
                                            step.id
                                        )
                                    }

                                />

                            </div>

                        )
                    )}

                </div>

            </CardContent>

        </Card>
    );
}