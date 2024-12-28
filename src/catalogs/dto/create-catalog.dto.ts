import { Type } from "class-transformer";
import { ArrayMinSize, arrayMinSize, IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from "class-validator";
import { CreateProductDto } from "src/products/dto";

export class CreateCatalogDto {
    @IsString()
    storeId: string

    @IsString()
    name: string
    
    @IsString()
    description: string

    @IsNumber()
    @IsPositive()
    discount: number

    @IsNumber()
    @IsOptional()
    productsAmount: number

  //Relations
    @IsOptional()
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type( () => CreateProductDto)
    products: CreateProductDto[]
}