export function getTemplateVariant(){
    return Math.random() > 0.5
    ? "A"
    : "B";
};

export function buildPrompt(lead:any , variant:String){
    if (variant == "A"){
        return `
        Write a friendly cold email.
        Mention : ${lead.company}
        
        Tone: confident and concise.`;
    }

    return `Write a friendly cold email.
    Mention: ${lead.company}
    
    Tone: warm and casual.`
    ;
}