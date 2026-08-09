interface Props {
    workspace: any;
}

export default function WorkspaceSummary({
    workspace
}: Props) {

    return (

        <div className="border rounded-xl p-6">
            <h2 className="text-xl font-bold mb-6">
                Workspace Summary
            </h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-500">
                        Members
                    </p>

                    <h3 className="text-2xl font-bold">
                        {workspace.users.length}
                    </h3>
                </div>
            </div>

        </div>
    );
}