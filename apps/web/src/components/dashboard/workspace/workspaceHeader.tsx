import {
    Card,
    CardContent,
} from "@/components/ui/card";

interface Props {
    workspace: any;
}

export default function WorkspaceHeader({
    workspace,
}: Props) {

    return (
        <Card>

            <CardContent className="p-6">

                <div className="
                    flex
                    items-center
                    gap-4
                ">

                    <div className="
                        flex
                        h-14
                        w-14
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-[#f4bb4f]/20
                        bg-[#f4bb4f]/10
                        text-2xl
                    ">
                        🏢
                    </div>

                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-[#f4bb4f]
                        ">
                            Workspace
                        </p>

                        <h1 className="
                            mt-1
                            text-3xl
                            font-semibold
                            text-white
                        ">
                            {workspace.name}
                        </h1>

                        <p className="
                            mt-1
                            text-sm
                            text-gray-500
                        ">
                            Created{" "}
                            {new Date(
                                workspace.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

            </CardContent>

        </Card>
    );
}