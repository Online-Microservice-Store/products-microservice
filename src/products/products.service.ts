import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto';
import { PaginationDto } from 'src/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
import { ProductPaginationDto } from './dto/product-pagination.dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit{
    private readonly logger = new Logger("Products service");
    
    constructor(
      @Inject(NATS_SERVICE) private readonly client : ClientProxy,
    ){
      super();
    }

    async onModuleInit() {
        await this.$connect();
    }

    create(createProductDto: CreateProductDto) { 
        return this.product.create({
          data: createProductDto,
        });
    }
    
    async findAll(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto;
    
        const totalPages = await this.product.count(
          { where: { available: true } }
        );
        const lastPage = Math.ceil(totalPages / limit);
    
        return {
          data: await this.product.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where: {
              available: true,
            },
          }),
          meta: {
            total: totalPages,
            page: page,
            lastPage: lastPage,
          },
        };
    }
    
    async findOne(id: string) {
        const product = await this.product.findFirst({
          where: { id, available : true },
          include: {
            Stock :{
              select: {
                id: true,
                name: true,
                amount: true,
                description: true,
                color: true,
              }
            },
            Catalog: {
              select: {
                name: true,
                discount: true,
                storeId: true
              }
            }
          },
        });
    
        if (!product) {
          throw new RpcException({
            message: `Product with id #${id} not found`,
            status: HttpStatus.BAD_REQUEST,
          });
        }
    
        return product;
    }
    
    async findProductsByName(name: string){
    
        const totalPages = await this.product.count(
          { where: { 
            available: true, 
            name: {
              startsWith: name,
              mode: 'insensitive',
            },
          } 
        }
        );

        const products = await this.product.findMany({
          where: {
            available: true,
            name: {
              startsWith: name,
              mode: 'insensitive',
            },
          },
          include: {
            Catalog :{
              select: {
                id: true,
                name: true,
                storeId: true,
              }
            }
          },
        });
        const storesId = products.map( (product) => product.Catalog.storeId);
        const stores:any[] = await firstValueFrom(
          this.client.send('validate_stores', storesId)
        );
        const productComplete = products.map( (product) => ({
          ...product,
          store: {
            id: product.Catalog.storeId,
            name: stores.find( store => store.id == product.Catalog.storeId).name,
            coordenates: stores.find( store => store.id == product.Catalog.storeId).ubication,
          }
        }))

        return {
          data: productComplete,
          meta: {
            total: totalPages,
          },
        };
    }

    async findProductsByCatalogId(productPaginationDto : ProductPaginationDto){
      const { page, limit, id} = productPaginationDto;
      const totalPages = await this.product.count({
        where: { catalogId: id}
      });
      const lastPage = Math.ceil(totalPages / limit);

      const products = await this.product.findMany({
        where: { catalogId: id},
        skip: (page - 1) * limit,
        take: limit,
      });
      return {
        data: products,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage,
        },
      };      
    
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const { id: __, ...data } = updateProductDto;
    
        await this.findOne(id);
    
        return this.product.update({
          where: { id },
          data: data,
        });
      }
    
    async remove(id: string) {
        await this.findOne(id);
    
        const product = await this.product.update({
          where: { id },
          data: {
            available: false,
          },
        });
    
        return product;
      }
    
    async validateProducts(ids: string[]) {
        ids = Array.from(new Set(ids));
    
        const products = await this.product.findMany({
          where: {
            id: {
              in: ids
            }
          }
        });
    
        if ( products.length !== ids.length ) {
          throw new RpcException({
            message: 'Some products were not found',
            status: HttpStatus.BAD_REQUEST,
          });
        }
        return products;
    
      }
}
