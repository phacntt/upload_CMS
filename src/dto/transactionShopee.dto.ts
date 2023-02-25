import { IsNumber, IsString } from "class-validator"

export class CreateTransactionShopeeDto {
    @IsString()
    transactionId: string;

    @IsString()
    orderStatus?: string;

    @IsString()
    myEarning: string;

    @IsString()
    earningStatus: string;

    @IsString()
    myCommission?: string;

    @IsString()
    productName?: string;

    @IsString()
    price?: string;

    @IsString()
    orderValue?: string;

    @IsString()
    utmContent: string;

    @IsString()
    commission: string;

    @IsString()
    purchaseTime: string;

    @IsString()
    completeTime?: string;

    @IsNumber()
    quantity?: number;

    @IsString()
    imageUrl?: string;

    @IsString()
    itemCommission?: string;

    @IsString()
    itemId?: string;
}
