import { useState } from "react";


interface Props {
    open: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

export default function CreateCampaignModel({
    open, onClose, onCreate
}: Props) {

    const [name, setName] = useState("");
    
    if (!open) {
        return null;
    }
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-[450px] overflow:hidden">
                <h2 className="text-2xl font-bold mb-6">
                    Create Campaign
                </h2>
                <input placeholder="Campaign Name" value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border rounded-lg p-3 w-full"
                />
                <div className="flex justify-end gap-3 mt-6">
                    <button className="border px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded" 
                    onClick={()=>{
                        if(!name.trim())return;
                        onCreate(name);
                        setName("");
                        onClose();
                    }}>
                        Create
                    </button>
                </div>
            </div>
        </div>
    )
}