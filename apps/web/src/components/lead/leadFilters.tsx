"use client";

import { Input } from "../ui/input";



interface LeadFiltersProps {
    search: string;
    status: string;
    setSearch: (value: string) => void;
    setStatus: (value: string) => void;
}

export default function LeadFilters({
    search,
    status,
    setSearch,
    setStatus,
}: LeadFiltersProps) {

    return (
        <div className="
            rounded-2xl
            border
            border-white/10
            bg-[#0d1526]
            p-4
        ">
    
            <div className="
                flex
                flex-col
                gap-4
                lg:flex-row
                lg:items-end
            ">
    
                <div className="flex-1">
    
                    <Input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search by name, company or email..."
                        className="h-11 bg-[#111a2b]"
                    />
    
                </div>
    
    
                <div className="
                    w-full
                    lg:w-52
                ">
    
                    <label className="
                        mb-2
                        block
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                    ">
                        Status
                    </label>
    
                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="
                            h-11
                            w-full
                            rounded-xl
                            border
                            border-white/10
                            bg-[#111a2b]
                            px-4
                            text-sm
                            text-gray-300
                            outline-none
                            focus:border-[#f4bb4f]/60
                            focus:ring-1
                            focus:ring-[#f4bb4f]/20
                        "
                    >
    
                        <option value="">
                            All statuses
                        </option>
    
                        <option value="NEW">
                            New
                        </option>
    
                        <option value="CONTACTED">
                            Contacted
                        </option>
    
                        <option value="MEETING_BOOKED">
                            Meeting Booked
                        </option>
    
                        <option value="CLOSED">
                            Closed
                        </option>
    
                        <option value="LOST">
                            Lost
                        </option>
    
                    </select>
    
                </div>
    
    
                {(search || status) && (
    
                    <button
                        type="button"
                        onClick={() => {
                            setSearch("");
                            setStatus("");
                        }}
                        className="
                            h-11
                            rounded-xl
                            border
                            border-white/10
                            px-4
                            text-sm
                            text-gray-400
                            transition
                            hover:bg-white/5
                            hover:text-white
                        "
                    >
                        Clear
                    </button>
    
                )}
    
            </div>
    
        </div>
    );
}