import 'dotenv/config';
import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

const openaiApiKey = process.env.OPENAI_API_KEY ?? (() => { throw new Error("OPENAI_API_KEY is not set"); })();
const openaiLlmModel = process.env.OPENAI_LLM_MODEL ?? (() => { throw new Error("OPENAI_LLM_MODEL is not set"); })();
const openaiLlmTemperature = parseFloat(process.env.OPENAI_LLM_TEMPERATURE ?? (() => { throw new Error("OPENAI_LLM_TEMPERATURE is not set"); })());
const openaiLlmTopP = parseFloat(process.env.OPENAI_LLM_TOP_P ?? (() => { throw new Error("OPENAI_LLM_TOP_P is not set"); })());

const model = new ChatOpenAI({
    apiKey: openaiApiKey,
    model: openaiLlmModel,
    temperature: openaiLlmTemperature,
    topP: openaiLlmTopP
});

const systemPrompt = `Given the following block of text, provide a short summary and up to 3 key action items.`;

const responseFormat = z.object({
    summary: z.string().describe("A short summary"),
    actionItems: z.array(z.string()).max(3).describe("A list of up to 3 key action items")
});

const agent = createAgent({
    model: model,
    systemPrompt: systemPrompt,
    responseFormat: responseFormat
});

async function summarize(inputText: string) {
    const messages = [{ role: "user", content: inputText }];
    const result = await agent.invoke({ messages: messages });
    return result.structuredResponse;
}

(async () => {
    const inputText = `In today's meeting, we discussed the upcoming product launch. The marketing team will create a campaign to promote the launch, while the development team will finalize the product features. We also set a deadline for the launch date, which is in three months. Additionally, we identified potential risks and mitigation strategies to ensure a successful launch.`;
    const response = await summarize(inputText);
    console.log(JSON.stringify(response, null, 2));
})();