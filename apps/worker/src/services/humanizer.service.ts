export async function humanizeEmail(content:string){
    return content

    .replace(
        "I hope this message finds you well",
        "Thought I'd reach out"
    )

    .replace(
        "I wanted to contact you",
        "Reaching out because"
    );
};