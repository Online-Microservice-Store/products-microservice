import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { StocksModule } from './stocks/stocks.module';

@Module({
  imports: [ProductsModule, CatalogsModule, StocksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
