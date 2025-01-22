import { Controller } from '@nestjs/common';
import { CatalogsService } from './catalogs.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { CreateCatalogDto, UpdateCatalogDto } from './dto';
import { CatalogPaginationDto } from './dto/catalog-pagination.dto';

@Controller('catalogs')
export class CatalogsController {
  constructor(private readonly catalogsService: CatalogsService) {}

  @MessagePattern('create_catalog')
  create(@Payload() createCatalogDto : CreateCatalogDto){
    return this.catalogsService.create(createCatalogDto);
  }

  @MessagePattern('find_all_catalogs')
  findAll(@Payload() paginationDto : PaginationDto){
    return this.catalogsService.findAll(paginationDto);
  }

  @MessagePattern('find_one_catalog')
  findOne(@Payload('id') id: string){
    return this.catalogsService.findOne(id);
  }

  @MessagePattern('update_catalog')
  update(@Payload() updateCatalogDto : UpdateCatalogDto){
    console.log(updateCatalogDto);
    return this.catalogsService.update(updateCatalogDto.id, updateCatalogDto)
  }

  @MessagePattern('get_catalogs_by_StoreId')
  getCatalogsByStoreId(@Payload() catalogPaginationDto : CatalogPaginationDto){
    return this.catalogsService.getCatalogByStoreId(catalogPaginationDto);
  }
}
