import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';

@Controller('products/:productId/reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Post()
  create(
    @Param('productId') productId: string,
    @Body() createProductReviewDto: CreateProductReviewDto,
  ) {
    return this.productReviewsService.create(productId, createProductReviewDto);
  }

  @Get()
  byProduct(@Param('productId') productId: string) {
    return this.productReviewsService.byProduct(productId);
  }

  @Get(':id')
  findOne(@Param('productId') productId: string, @Param('id') id: string) {
    return this.productReviewsService.findOne(productId, id);
  }

  @Patch(':id')
  update(
    @Param('productId') productId: string,
    @Body() updateProductReviewDto: UpdateProductReviewDto,
    @Param('id') id: string,
  ) {
    return this.productReviewsService.update(
      productId,
      updateProductReviewDto,
      id,
    );
  }

  @Delete(':id')
  remove(@Param('productId') productId: string, @Param('id') id: string) {
    return this.productReviewsService.remove(productId, id);
  }
}
