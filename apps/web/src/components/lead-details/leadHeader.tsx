interface LeadHeaderProps{
    lead:any;
}

export default function LeadHeader({
    lead
}: LeadHeaderProps){
    return (
        <div className="border rounded-lg p-6">
            <h1 className="text-3xl font-bold">
                {lead.name}
            </h1>
            <p>{lead.company}</p>
            <p>{lead.role}</p>
            <p>{lead.emails}</p>
            <span className="border rounded px-2 py-1">
                {lead.status}
            </span>
        </div>
    );
}