import { Type } from "class-transformer";
import { IsArray, ArrayMinSize, ValidateNested, IsString, IsNumber, IsOptional } from "class-validator";
import { CreateProductDto } from "./create-product.dto";

export class CreateStockDto {
    @IsString()
    name: string;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    //Relations
    @IsOptional()
    @IsString()
    productId: string
}