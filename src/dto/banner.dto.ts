import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateBannerDto {
    @IsString()
    image: string

    @IsString()
    landingPageUrl: string
    
    @IsString()
    bannerPosition: string

    @IsString()
    bannerPage: string

    @IsDate()
    airTimeCreate: Date
 
    @IsDate()
    airTimeEnd: Date

}