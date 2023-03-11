import { ActionNotification } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateNotificationDto {
    @IsString()
    image?: string

    @IsString()
    title: string

    @IsString()
    message: string

    @IsString()
    reward?: string
    
    @IsString()
    action: ActionNotification
}