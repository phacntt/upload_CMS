import { Request, Response, NextFunction } from "express";
import { callOpenAIHelper, convertScriptOpenAi, promptAddByTopicLv2 } from "../utils/helper";

export type BodySendToOpenAI = {
    model: string,
    prompt: string,
    max_tokens: number
}

class AiLeyBotDocumentController {

    public aiLeyBotResponse = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const payload = req.query;
            let maxTokenByTime = 500;

            const promptCustom = `${decodeURIComponent(payload.act as string)}. ${payload.skill ? decodeURIComponent(payload.skill as string) : ``}`;
            const promptTopic = decodeURIComponent(payload.topic as string) ? `I want to ask about ${decodeURIComponent(payload.topic as string)} but I don't know what should I ask you to get adivces from this field.` : ``;
            const promptQuestion = decodeURIComponent(payload.promptQuestion as string);
            const promptArrayTopicLv2 = payload.topicLv2 ?
                [
                    {
                        title: "Research",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${decodeURIComponent(payload.topicLv2 as string)}. How should I research?`
                    },
                    {
                        title: "Plan",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${decodeURIComponent(payload.topicLv2 as string)}. How should I create a strategic plan?`
                    },
                    {
                        title: "Execute",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${decodeURIComponent(payload.topicLv2 as string)}. How should I execute?`
                    },
                    {
                        title: "Self-evalute",
                        prompt: `I want you design a journey that help me increase my extra income in terms of ${decodeURIComponent(payload.topicLv2 as string)}. How should I track and self-evaluate?`
                    }
                ] : [];
                
            payload.topicLv2 ? promptArrayTopicLv2.push(promptAddByTopicLv2(decodeURIComponent(payload.topicLv2 as string)) as any): []

        
            if (payload.act) {
                const response = await callOpenAIHelper(maxTokenByTime, promptCustom);
                const newScript = convertScriptOpenAi(payload, response);
                const newScriptRemoveTag = newScript.split(`\n`).filter(script => script != "");
                res.status(200).json({ data: newScriptRemoveTag.join("</br>"), message: 'OK' });
                return;
            }

            if (payload.promptQuestion) {
                const response = await callOpenAIHelper(maxTokenByTime, promptQuestion as string);
                const newScriptRemoveTag = response.split(`\n`).filter(script => script != "");
                newScriptRemoveTag.shift();
                res.json({ data: newScriptRemoveTag.join("</br>"), message: 'OK' });

                return;
            }

            if (payload.topic) {
                const response = await callOpenAIHelper(maxTokenByTime, promptTopic);
                const newScriptRemoveTag = response.split(`\n`).filter((text: any) => text != "").map((text: any) => text.substring(text.indexOf(' ') + 1));
                newScriptRemoveTag.shift();
                
                res.status(200).json({ data: newScriptRemoveTag, message: 'OK' });

                return;
            }

            if (payload.topicLv2) {
                const headers = {
                    'Content-Type': 'text/event-stream',
                    'Connection': 'keep-alive',
                    'Cache-Control': 'no-cache',
                    'Access-Control-Allow-Origin': '*'
                };

                res.writeHead(200, headers);

                const callOpenAI = async () => {
                    for (let index = 0; index < promptArrayTopicLv2.length; index++) {
                        const response = await callOpenAIHelper(maxTokenByTime, promptArrayTopicLv2[index].prompt)
                        const data = response.split(`\n`).filter(text => text != "")
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