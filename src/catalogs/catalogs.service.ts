import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateCatalogDto, UpdateCatalogDto } from './dto';
import { RpcException } from '@nestjs/microservices';
import { PaginationDto } from 'src/common';
import { UpdateProductDto } from 'src/products/dto';

@Injectable()
export class CatalogsService extends PrismaClient implements OnModuleInit {
    private readonly logger = new Logger('Orders service');
    async onModuleInit() {
        await this.$connect();
    }

    create(createCatalogDto : CreateCatalogDto){
        return this.catalog.create({
            data: createCatalogDto,
        });
    }

    async findAll(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
    
        const totalPages = await this.catalog.count();
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.catalog.findMany({
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
        const catalog = await this.catalog.findFirst({
          where: { id}
        });
    
        if (!catalog) {
          throw new RpcException({
            message: `Catalog with id #${id} not found`,
            status: HttpStatus.BAD_REQUEST,
          });
        }
    
        return catalog;
      }
    
    async update(id: string, updateCatalogDto: UpdateCatalogDto) {
        const { id: __, ...data } = updateCatalogDto;
        this.logger.log('In catalog service');
    
        // await this.findOne(id);
        console.log(id);
        console.log(data);
    
        return this.catalog.update({
          where: { id },
          data: data,
        });
      }
    
    async remove(id: string) {
        await this.findOne(id);
    
        const catalog = await this.catalog.delete({
          where: { id },
        });
    
        return catalog;
    }

}
