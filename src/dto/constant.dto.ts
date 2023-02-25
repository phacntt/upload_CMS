import { Category, CommissionModelType, CommissionType, Location, Page } from "@prisma/client";
import { IsNumber, IsString } from "class-validator";

export class CreateConstantDto {
    @IsString()
    name: string

    @IsNumber()
    value: number
}