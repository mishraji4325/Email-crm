
interface ActivityTimelineProps{
    activities:any[];
}

function getIcon(type:string){
    switch(type.toLowerCase()){
        case"email generated":
            return "🟢";
        
        case "email Sent":
            return "📩";
        
        case "meeting booked":
            return "📅";
        
        case "note added":
            return "📝";
           
        default:
            return "📌";    
            
    }
}
export default function ActivityTimeline({
    activities
}: ActivityTimelineProps){
    return (
        <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">
                Activity Timeline
            </h2>
            {
                activities.length === 0?(
                    <p>No activities yet...</p>
                )
                :
                (
                    <div className="space-y-5">
                        {activities.map((activity:any)=>(
                            <div key={activity.id} className="border-1-4 border-blue-500 pl-4">
                                <div className="flex items-center gap-2">
                                    <span>{getIcon(activity.type)}</span>
                                    <h3 className="font-semibold">
                                        {activity.type}
                                    </h3>
                                </div>
                                <p className="text-gray-500 mt-1">{activity.description}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}