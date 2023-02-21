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


            const payload = req.query;
            let maxTokenByTime = 500;

            const promptCustom = `${payload.act}. ${payload.skill ? `` : ``}`;
            const promptTopic = payload.topic ? `I want to ask about ${payload.topic} but I don't know what should I ask you to get adivces from this field.` : ``;
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

            if (payload.act) {
                const data = await callOpenAIHelper(maxTokenByTime, promptCustom);
                const newScript = convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter(script => script != "");
                res.status(200).json({ data: newScriptRemoveTag.join("</br>"), message: 'OK' });
                return;
            }

            if (payload.promptQuestion) {
                const data = await callOpenAIHelper(maxTokenByTime, promptQuestion as string);
                const newScript = convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter(script => script != "");
                newScriptRemoveTag.shift();
                res.json({ data: newScriptRemoveTag.join("</br>"), message: 'OK' });

                return;
            }

            if (payload.topic) {
                const data = await callOpenAIHelper(maxTokenByTime, promptTopic);
                const newScript = convertScriptOpenAi(payload, data);
                const newScriptRemoveTag = newScript.split(`\n`).filter((text: any) => text != "");
                console.log(newScriptRemoveTag)
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
                        const newScript = convertScriptOpenAi(payload, response)
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