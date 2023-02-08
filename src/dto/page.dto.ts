import { IsEmail, IsString } from "class-validator";

export class CreatePageDto {
    @IsString()
    name: string;
}