import { IsOptional, IsString } from "class-validator";
import { PaginationDto } from "src/common";

export class StockPaginationDto extends PaginationDto{

    @IsOptional()
    @IsString()
    id?: string;

}