import { BannerPage, BannerType } from "@prisma/client";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateBannerDto {
    @IsString()
    image: string

    @IsString()
    landingPageUrl: string
    
    @IsString()
    bannerPosition: number

    @IsString()
    bannerPage: BannerPage

    @IsString()
    bannerType: BannerType

    @IsString()
    airTimeCreate: Date
 
    @IsString()
    airTimeEnd: Date

}