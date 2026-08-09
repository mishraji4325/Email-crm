import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
    title: string,
    value: number | string;
};

export default function StatsCard({
    title, value
}: StatsCardProps){
    return(
        <Card>
            <CardContent className="p-6">
                <h2 className="text-gray-500 text-sm">
                    {title}
                </h2>
                <p className="text-3xl font-bold mt-2">
                    {value}
                </p>
            </CardContent>
        </Card>
    )
};