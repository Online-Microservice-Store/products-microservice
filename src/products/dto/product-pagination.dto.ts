import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common";

export class ProductPaginationDto extends PaginationDto{

    @IsOptional()
    @IsString()
    id?: string;

}