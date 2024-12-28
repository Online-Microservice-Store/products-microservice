import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common';

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

  @MessagePattern({cmd: 'update_product'})
  update(@Payload() updateProductDto : UpdateProductDto){
    return this.productsService.update(updateProductDto.id, updateProductDto)
  }

}
