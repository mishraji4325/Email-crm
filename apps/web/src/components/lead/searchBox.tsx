interface SearchBoxProps {
    value: string;
    onChange: (value:string)=> void;
}

export default function SearchBox({
    value, onChange
}: SearchBoxProps){
    return (
        <input type="text" placeholder="Search by name, company, email..."
            value={value} onChange={(e)=>onChange(e.target.value)} 
            className="border rounded-md p-2 w-full"
        />
    );
}