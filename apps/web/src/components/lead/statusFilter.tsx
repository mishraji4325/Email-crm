interface StatusFilterProps{
    value: string;
    onChange: (value:string)=> void;
}

export default function StatusFilter({
    value, onChange
}: StatusFilterProps){
    return (
        <select value={value} onChange={(e)=>onChange(e.target.value)}
            className="border rounded-md p-2">
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="REPLIED">REPLIED</option>
            <option value="BOOKED">BOOKED</option>
            <option value="CLOSED">CLOSED</option>
        </select>
    )
}