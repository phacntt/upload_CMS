import { Request, Response, NextFunction } from "express";
import { callOpenAIHelper, convertScriptOpenAi } from "../utils/helper";

export type BodySendToOpenAI = {
    model: string,
    prompt: string,
    max_tokens: number
}

class AiLeyBotDocumentController {

    public aiLeyBotResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const headers = {
                'Content-Type': 'text/event-stream',
                'Connection': 'keep-alive',
                'Cache-Control': 'no-cache',
                'Access-Control-Allow-Origin': '*'
            };

            res.writeHead(200, headers);
            const payload = req.query;
            let maxTokenByTime = 500;

            const promptCustom = `${payload.act}. ${payload.skill ? ` My skill is ${payload.skill}`: ``}`;
            const promptTopic = payload.topic ? `I want to ask about ${(payload.topic as string).replace("-", " ") as string} but I don't know what should I ask you to get adivces from this field.` : ``;
            const promptQuestion = payload.promptQuestion;
            const promptArrayTopicLv2 = payload.topicLv2 ?
                [
                    {
                        title: "Research",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${payload.topicLv2}. How should I research`
                    },
                    {
                        title: "Plan",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${payload.topicLv2}. How should I create a strategic plan`
                    },
                    {
                        title: "Execute",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${payload.topicLv2}. How should I execute`
                    },
                    {
                        title: "Self-evalute",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${payload.topicLv2}. How should I track and self-evaluate`
                    }
                ] : [];

            if (payload.act && payload.skill) {
                const data = await callOpenAIHelper(maxTokenByTime, promptCustom);
                const newScript = await convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter(script => script != "");
                res.write(`data: ${JSON.stringify(newScriptRemoveTag)}\n\n`);
                return;
            }

            if (payload.promptQuestion) {
                const data = await callOpenAIHelper(maxTokenByTime, promptQuestion as string);
                const newScript = await convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter(script => script != "");
                newScriptRemoveTag.shift();
                res.write(`data: ${JSON.stringify(newScriptRemoveTag)}\n\n`);
                return;
            }

            if (payload.topic) {
                const data = await callOpenAIHelper(maxTokenByTime, promptTopic);
                const newScript = await convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter(text => text != "");
                newScriptRemoveTag.shift();
                res.write(`data: ${JSON.stringify(newScriptRemoveTag)}\n\n`);
                return;
            }

            if (payload.topicLv2) {
                const callOpenAI = async () => {
                    for (let index = 0; index < promptArrayTopicLv2.length; index++) {
                        const response = await callOpenAIHelper(maxTokenByTime, promptArrayTopicLv2[index].prompt)
                        const newScript = await convertScriptOpenAi(payload, response);
                        const data = newScript.split(`\n`).filter(text => text != "")
                        data.shift();
                        res.write(`data: ${JSON.stringify(data)}\n\n`);
                    }
                };
                callOpenAI();
                return;
            }
        } catch (error) {
            next(error);
        }
    };
}

export default AiLeyBotDocumentController