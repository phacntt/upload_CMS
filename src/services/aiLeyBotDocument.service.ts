import { context } from "../types/context.type";
import { CreateAiLeyBotDocumentDto } from "../dto/aiLeyBotDocumnent.dto";
import { interactOpenAI } from "../utils/interactOpenAI";

export type BodySendToOpenAI = {
    model: string,
    prompt: string,
    max_tokens: number
}

class AiLeyBotDocumentService {
    public clients = context;

    public async createAiLeyBotDocument(dataCreate: CreateAiLeyBotDocumentDto) {
        // const createDocument = await this.clients.prisma.user.upsert()
    }
}

export default AiLeyBotDocumentService;
