import { PartialType } from "@nestjs/mapped-types";
import { CreateStockDto } from "./create-stock.dto";
import { IsNumber, IsString } from "class-validator";

export class UpdateStockAmountDto {
    @IsString()
    id: string;

    @IsNumber()
    amount: number;
}