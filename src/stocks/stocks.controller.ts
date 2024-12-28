import { Controller } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStockDto, UpdateStockDto } from './dto';
import { PaginationDto } from 'src/common';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @MessagePattern('create_stock')
  create(@Payload() createStockDto : CreateStockDto){
    return this.stocksService.create(createStockDto);
  }

  @MessagePattern('find_all_stocks')
  findAll(@Payload() paginationDto : PaginationDto){
    return this.stocksService.findAll(paginationDto);
  }

  @MessagePattern('find_one_stock')
  findOne(@Payload('id')  id : string){
    return this.stocksService.findOne(id);
  }

  @MessagePattern('update_stock')
  update(@Payload() updateStockDto : UpdateStockDto){
    return this.stocksService.update(updateStockDto.id , updateStockDto);
  }


}
