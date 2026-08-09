import EditableCard from "@/components/common/editableCard";
import EmptyState from "@/components/common/emptyState";

interface Props{
    sequence:any;
    onEdit:(step:any)=>void;
    onDelete:(id:string)=>void;
}

export default function SequenceStepList({
    sequence, onEdit,onDelete
}:Props){
    if(sequence.steps.length===0){
        return(
            <EmptyState
                title="No Steps Yet"
                description="Add the first step to this sequence."
            />
        );
    }
    return(
        <div className="space-y-4">
            {
                sequence.steps
                .sort(
                    (a:any,b:any)=>
                    a.dayOffset-b.dayOffset
                )
                .map((step:any)=>(

                    <EditableCard
                        key={step.id}
                        title={`Day ${step.dayOffset}`}
                        subtitle={step.subject}
                        content={
                            <div className="whitespace-pre-wrap">
                                {step.body}
                            </div>
                        }
                        onEdit={() => onEdit(step)}
                        onDelete={()=>onDelete(step.id)}
                    />
                ))
            }
        </div>
    );
}