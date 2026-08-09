import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateEmail(
    leadData: any,
    prompt: string
) {
    try {
        const response = await anthropic.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 800,
            system: "You write natural personalized cold outreach emails.",
            messages: [
                {
                    role: "user",
                    content: `
Write a short personalized cold email.
Name: ${leadData.name ?? "Unknown"}
Company: ${leadData.company ?? "Unknown"}
Role: ${leadData.role ?? "Unknown"}
Additional Instructions: ${prompt}
Keep it conversational and human.
`,
                },
            ],
            temperature: 0.8,
        });

        // Claude returns content as an array of blocks (text, tool_use, etc.)
        const textBlock = response.content.find(
            (block) => block.type === "text"
        );

        return textBlock ? textBlock.text : null;
    } catch (error) {
        console.log(error);
        return `
        Hi ${leadData.name},
        I noticed your work at ${leadData.company} and wanted to connect.
        Best,
        Sonu
        `;
    }
}