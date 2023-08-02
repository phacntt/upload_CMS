import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    itemId: string
    
    @IsString()
    commissionRate: string
    
    // @IsString()
    // appExistRate: string
    
    // @IsString()
    // appNewRate: string
    
    // @IsString()
    // webExistRate: string
    
    // @IsString()
    // webNewRate: string
    
    @IsString()
    commission: string
    
    @IsString()
    price: string
    
    // @IsNumber()
    // sales: number
    
    @IsString()
    imageUrl: string
    
    @IsString()
    productName: string
    
    // @IsString()
    // shopName: string
    
    // @IsString()
    // productLink: string
    
    @IsString()
    offerLink: string
    
    // @IsString()
    // periodEndTime: string
    
    // @IsString()
    // periodStartTime: string
    
    @IsNumber()
    categoryId: number
}