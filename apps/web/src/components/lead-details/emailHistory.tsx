interface EmailHistoryProps {
    emails: any[];
    onSave: (emailId: string, content: string) => void;
    onSend: (emailId: string) => void;
}

export default function EmailHistory({
    emails, onSave, onSend
}: EmailHistoryProps) {
    if (!emails.length) {
        return (
            <div className="border rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">
                    Email History
                </h2>
                <p>No generated emails yet...</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">
                Email History
            </h2>
            {emails.map((email: any) => (
                <div key={email.id} className="border rounded-lg p-6">
                    <div className="flex justify-between">
                        <span className="font-semibold">
                            {email.subject}
                        </span>
                        <span className="text-sm">
                            {
                                email.isDraft ? "Draft" : "Sent"
                            }
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                        {new Date(
                            email.createdAt
                        ).toLocaleString()}
                    </p>
                    <textarea defaultValue={email.humanizedOutput}
                        className="border rounded w-full p-3 min-h-[180px]"
                        onChange={(e) => { email.humanizedOutput = e.target.value }}
                    />
                    <div className="border rounded-lg p-6">
                        <button className="border rounded px-4 py-2"
                            onClick={() => onSave(
                                email.id, email.humanizedOutput
                            )}>
                            Save Draft
                        </button>
                        <button className="border rounded px-4 py-2"
                            onClick={() => onSend(
                                email.id
                            )}>
                            Save Email
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
