import { BannerType } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateBannerDto {
    @IsString()
    image: string

    @IsString()
    landingPageUrl: string
    
    @IsString()
    bannerPosition: number

    @IsNumber()
    pageId: number

    @IsString()
    bannerType: BannerType

    @IsString()
    airTimeCreate: Date
 
    @IsString()
    airTimeEnd: Date

}