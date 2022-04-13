import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { TypeOrmConfigService } from './config/typeorm.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Product } from './products/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forFeature([Product]),
    ProductReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
