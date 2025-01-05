import { Type } from "class-transformer";
import { IsArray, ArrayMinSize, ValidateNested, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateStockDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @IsString()
    color: string;

    //Relations
    @IsOptional()
    @IsString()
    productId: string
}