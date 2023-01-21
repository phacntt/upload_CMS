import { IsString, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class BasicCredentialDto {
    @IsString()
    @IsNotEmpty()
    public email: string;
  
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    public password: string;
  }