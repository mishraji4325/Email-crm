import { Card, CardContent } from "@/components/ui/card";

interface PipelineProps {
    pipeline:{
        NEW: number,
        CONTACTED: number,
        REPLIED: number,
        BOOKED: number,
        CLOSED: number,
    }
}

export default function PipelineCard({
    pipeline,
}: PipelineProps){
    return (
        <Card>
            <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">
                    Pipeline
                </h2>
                <div className="space-y-4">
                    <div className="flex-justify-between">
                        <span>NEW - </span>
                        <span>{pipeline.NEW}</span>
                    </div>
                    <div className="flex-justify-between">
                        <span>CONTACTED - </span>
                        <span>{pipeline.CONTACTED}</span>
                    </div>
                    <div className="flex-justify-between">
                        <span>REPLIED - </span>
                        <span>{pipeline.REPLIED}</span>
                    </div>
                    <div className="flex-justify-between">
                        <span>BOOKED - </span>
                        <span>{pipeline.BOOKED}</span>
                    </div>
                    <div className="flex-justify-between">
                        <span>CLOSED - </span>
                        <span>{pipeline.CLOSED}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
};