import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { StocksModule } from './stocks/stocks.module';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [ProductsModule, NatsModule, CatalogsModule, StocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
