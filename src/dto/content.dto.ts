import { BannerPage, BannerType } from "@prisma/client";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateContentDto {
    @IsString()
    categorylv1: string

    @IsString()
    categorylv2: string

    @IsString()
    commissionModel: string

    @IsString()
    commissionType: string

    @IsString()
    commissionValue: string

    @IsString()
    image: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    location: string

    @IsString()
    url: string
}