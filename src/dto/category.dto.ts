import { Category, CommissionModelType, CommissionType, Location, Page } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string

    @IsString()
    nameVN: string

    @IsNumber()
    pageId: number
}