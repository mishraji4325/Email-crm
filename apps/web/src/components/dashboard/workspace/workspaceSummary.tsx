import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface Props {
    workspace: any;
}

export default function WorkspaceSummary({
    workspace,
}: Props) {

    const members =
        workspace.users?.length || 0;

    return (

        <Card>

            <CardHeader>

                <CardTitle>
                    Workspace Summary
                </CardTitle>

            </CardHeader>

            <CardContent>

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
                        Members
                    </p>

                    <h3 className="
                        mt-2
                        text-3xl
                        font-semibold
                        text-[#f4bb4f]
                    ">
                        {members}
                    </h3>

                    <p className="
                        mt-1
                        text-xs
                        text-gray-600
                    ">
                        People in this workspace
                    </p>

                </div>

            </CardContent>

        </Card>
    );
}