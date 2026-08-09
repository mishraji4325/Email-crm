interface Props {
    workspace: any;
}

export default function WorkspaceHeader({
    workspace
}: Props) {

    return (

        <div className="border rounded-xl p-6">
            <h1 className="text-3xl font-bold">
                🏢 {workspace.name}
            </h1>

            <p className="text-gray-500 mt-2">
                Created{" "}
                {new Date(
                    workspace.createdAt
                ).toLocaleDateString()}
            </p>
        </div>
    );
}