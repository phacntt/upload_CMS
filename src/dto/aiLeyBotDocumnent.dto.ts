import { IsNumber, IsString } from "class-validator";
import { IsBoolean } from "class-validator/types/decorator/decorators";

export class CreateAiLeyBotDocumentDto {
    @IsString()
    time: string;

    @IsString()
    location: string;

    @IsString()
    categories: string;

    @IsString()
    skills: string;

    @IsBoolean()
    interestedGame: boolean;
}