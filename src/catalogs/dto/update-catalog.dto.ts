import { PartialType } from "@nestjs/mapped-types";
import { CreateCatalogDto } from "./create-catalog.dto";
import { IsString } from "class-validator";

export class UpdateCatalogDto extends PartialType(CreateCatalogDto){
    @IsString()
    id: string
}