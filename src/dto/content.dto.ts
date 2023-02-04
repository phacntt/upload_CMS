import { BannerPage, BannerType, CommissionModelType, CommissionType, Location } from "@prisma/client";
import { IsDate, IsEmail, IsString } from "class-validator";

export class CreateContentDto {
    @IsString()
    categorylv1: BannerPage

    @IsString()
    categorylv2: string

    @IsString()
    commissionModel: CommissionModelType

    @IsString()
    commissionType: CommissionType

    @IsString()
    commissionValue: string

    @IsString()
    image: string

    @IsString()
    title: string

    @IsString()
    description: string

    @IsString()
    location: Location

    @IsString()
    url: string
}