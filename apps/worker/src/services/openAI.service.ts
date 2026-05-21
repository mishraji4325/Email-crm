import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function generateEmail(
    lead: any
) {

    try {

        const response =
            await openai.chat.completions.create({

                model: "gpt-4o-mini",

                messages: [
                    {
                        role: "system",

                        content:
                            "You write natural personalized cold outreach emails."
                    },

                    {
                        role: "user",

                        content: `

Write a short personalized cold email.

Name:
${lead.name}

Company:
${lead.company}

Role:
${lead.role}

Keep it conversational and human.

`
                    }
                ],

                temperature: 0.8

            });

        return response.choices[0].message.content;

    } catch (error) {

        console.log(error);

        return `

Hi ${lead.name},

I noticed your work at ${lead.company} and wanted to connect.

Best,
Sonu

`;

    }

}