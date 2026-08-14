import {
    Card,
    CardContent,
} from "@/components/ui/card";

import Badge from "@/components/ui/badge";

interface SequenceHeaderProps {
    sequence: any;
}

export default function SequenceHeader({
    sequence,
}: SequenceHeaderProps) {

    return (
        <Card>

            <CardContent className="p-6">

                <div className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                ">

                    <div>

                        <div className="mb-3">
                            <Badge variant="info">
                                Sequence
                            </Badge>
                        </div>

                        <h1 className="
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {sequence.name}
                        </h1>

                        <p className="
                            mt-2
                            text-sm
                            text-gray-500
                        ">
                            Created{" "}
                            {new Date(
                                sequence.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                    <div className="
                        hidden
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#f4bb4f]/20
                        bg-[#f4bb4f]/10
                        text-xl
                        sm:flex
                    ">
                        ✉
                    </div>

                </div>

            </CardContent>

        </Card>
    );
}