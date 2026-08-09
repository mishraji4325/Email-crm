import { Card, CardContent } from "@/components/ui/card";

interface ActivityProps {
    activities: any[];
}

export default function RecentActivity({
    activities
}: ActivityProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">
                    Recent Activities
                </h2>
                {
                    activities.length === 0 ?
                        <p>No activities found.</p>
                        :
                        activities.map((activity) => (
                            <div key={activity.id} className="border-b py-3">
                                <p className="text-sm text-gray-500">
                                    Lead: {activity.lead?.name}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {new Date(activity.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                }
            </CardContent>
        </Card>
    )
};