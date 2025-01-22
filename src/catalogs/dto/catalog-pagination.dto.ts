import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common";

export class CatalogPaginationDto extends PaginationDto{

    @IsOptional()
    @IsString()
    id?: string;

}