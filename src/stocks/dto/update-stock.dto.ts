import { PartialType } from "@nestjs/mapped-types";
import { CreateStockDto } from "./create-stock.dto";
import { IsString } from "class-validator";

export class UpdateStockDto extends PartialType(CreateStockDto){
    @IsString()
    id: string;
}