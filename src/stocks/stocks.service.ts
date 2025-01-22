import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateStockDto, UpdateStockDto } from './dto';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';
import { UpdateStockAmountDto } from './dto/update-stockAmount';
import { StockPaginationDto } from './dto/stock-pagination.dto';

@Injectable()
export class StocksService extends PrismaClient implements OnModuleInit{
    private readonly logger = new Logger('Stock service');
    async onModuleInit() {
        await this.$connect();
    }

    create(createStockDto: CreateStockDto){
        return this.stock.create({
            data: createStockDto,
        });
    }

    async findAll(paginationDto: PaginationDto){
        const { page, limit } = paginationDto;
    
        const totalPages = await this.stock.count();
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.stock.findMany({
            skip: (page - 1) * limit,
            take: limit,
          }),
          meta: {
            total: totalPages,
            page: page,
            lastPage: lastPage,
          },
        };
    }

    async findOne(id: string) {
        const stock = await this.stock.findFirst({
          where: { id}
        });
    
        if (!stock) {
          throw new RpcException({
            message: `Stock with id #${id} not found`,
            status: HttpStatus.BAD_REQUEST,
          });
        }
    
        return stock;
      }
    async updateStockAmount(updateStockAmount: UpdateStockAmountDto){
      const {id, amount} = updateStockAmount;
      const stockFounded = await this.findOne(id);
      console.log(updateStockAmount);
      return this.stock.update({
        where: { id },
        data: {
          amount: stockFounded.amount - amount,
        },
      });
    }
    async update(id: string, updateStockDto: UpdateStockDto) {
        const { id: __, ...data } = updateStockDto;
        await this.findOne(id);
          
        return this.stock.update({
            where: { id },
            data: data,
        });
    }

    async findStocksByProductId(stockPaginationDto: StockPaginationDto){
      const { page, limit, id} = stockPaginationDto;
      const totalPages = await this.stock.count({
        where: { productId: id}
      });
      const lastPage = Math.ceil(totalPages / limit);

      const stocks = await this.stock.findMany({
        where: { productId: id},
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        data: stocks,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage,
        },
      };  
    }

    async remove(id: string) {
        await this.findOne(id);
    
        const stock = await this.stock.delete({
          where: { id },
        });
    
        return stock;
    }
}

