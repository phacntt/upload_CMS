import { IsNumber, IsString } from "class-validator";

export class CreateShopDto {
    @IsString()
    commissionRate: string;

    @IsString()
    imageUrl: string;

    @IsString()
    offerLink: string;

    @IsString()
    originalLink: string;

    @IsNumber()
    shopId: number;

    @IsString()
    shopName: string;

    @IsString()
    periodStartTime: string;

    @IsString()
    periodEndTime: string;

    @IsNumber()
    categoryId: number
}