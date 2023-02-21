import fetch from "node-fetch"
import { API_KEY_OPENAI } from "../config"
import { HttpException } from "../exception/HttpException";
import { BodySendToOpenAI } from "../controllers/aiLeyBotDocument.controller";

export const interactOpenAI = async(body: BodySendToOpenAI) => {
    try {
        const fetchData = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY_OPENAI}`,
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                model: body.model,
                prompt: body.prompt,
                temperature: 0,
                max_tokens: body.max_tokens
            })
        });
        const data = await fetchData.json();

        if (data.error) {
            throw new HttpException(400, data.error.message)
        }
        if (data) {
            return data.choices[0].text
        }
    } catch (error: any) {
        throw new HttpException(400, "Something went wrong please do it again.....")
    }
}