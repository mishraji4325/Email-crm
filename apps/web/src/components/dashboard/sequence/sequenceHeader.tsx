interface SequenceHeaderProps {
    sequence:any;
}

export default function SequenceHeader({
    sequence
}:SequenceHeaderProps){

    return(
        <div className="border rounded-xl p-6">
            <h1 className="text-3xl font-bold">
                📧 {sequence.name}
            </h1>

            <p className="text-gray-500 mt-2">
                Created {
                    new Date(
                        sequence.createdAt
                    ).toLocaleDateString()
                }
            </p>
        </div>
    );
}