import { Category, CommissionModelType, CommissionType, Location, Page } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateContentDto {
    @IsNumber()
    pageId: number

    @IsNumber()
    categoryId: number

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