interface Props{
    sequence:any;
}

export default function SequenceSummary({
    sequence
}:Props){

    return(
        <div className="border rounded-xl p-6 mt-6">
            <h2 className="text-xl font-bold mb-6">
                Sequence Summary
            </h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <p className="text-gray-500">
                        Total Steps
                    </p>

                    <h3 className="text-2xl font-bold">
                        {sequence.steps?.length || 0}
                    </h3>
                </div>

                <div>
                    <p className="text-gray-500">
                        Assigned Leads
                    </p>

                    <h3 className="text-2xl font-bold">
                        {sequence.leads?.length || 0}
                    </h3>
                </div>
            </div>
        </div>
    );
}