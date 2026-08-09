import SearchBox from "./searchBox";
import StatusFilter from "./statusFilter";

interface LeadFilterProps{
    search:string;
    status:string;
    setSearch: (value:string)=> void;
    setStatus: (value:string)=> void;
}

export default function LeadFilters({
    search, status, setSearch, setStatus
}: LeadFilterProps){
    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
                <SearchBox value={search} onChange={setSearch}></SearchBox>
            </div>
            <StatusFilter value={status} onChange={setStatus}/>
        </div>
    );
}