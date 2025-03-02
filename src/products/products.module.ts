import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/nats/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    NatsModule
  ]
})
export class ProductsModule {}
