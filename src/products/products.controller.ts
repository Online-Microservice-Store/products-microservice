import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common';
import { ProductPaginationDto } from './dto/product-pagination.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({cmd: 'create_product'})
  create(@Payload() createProductDto : CreateProductDto){
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({cmd: 'find_all_products'})
  findAll(@Payload() paginationDto : PaginationDto){
    return this.productsService.findAll(paginationDto);
  }

  @MessagePattern({cmd: 'find_one_product'})
  findOne(@Payload('id') id: string){
    return this.productsService.findOne(id);
  }

  @MessagePattern({cmd: 'find_products_by_name'})
  findProductsByName(@Payload('name') name: string){
    return this.productsService.findProductsByName(name);
  }

  @MessagePattern({cmd: 'find_products_by_catalogId'})
  findProductsByCatalogId(@Payload() productPaginationDto : ProductPaginationDto){
    return this.productsService.findProductsByCatalogId(productPaginationDto);
  }


  @MessagePattern({cmd: 'update_product'})
  update(@Payload() updateProductDto : UpdateProductDto){
    return this.productsService.update(updateProductDto.id, updateProductDto)
  }

  @MessagePattern({ cmd: 'validate_products' })
  validateProduct( @Payload() ids: string[] ) {
    return this.productsService.validateProducts(ids);
  }

}
