import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductReviewDto } from './dto/create-product-review.dto';
import { UpdateProductReviewDto } from './dto/update-product-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductReview } from './entities/product-review.entity';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductReviewsService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  constructor(@Inject('PRODUCT_SERVICE') private clientProxy: ClientProxy) {}

  @InjectRepository(ProductReview)
  private readonly productReviewRepository: Repository<ProductReview>;

  async create(
    productId: string,
    createProductReviewDto: CreateProductReviewDto,
  ) {
    const product: Product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const productReview: ProductReview =
      this.productReviewRepository.create({
        ...createProductReviewDto,
        product,
      });

    return this.productReviewRepository.save(productReview);
  }

  async byProduct(productId: string) {
    const product: Product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const productWithReviews: Product = await this.productRepository.findOne({
      relations: ['reviews'],
      where: { id: productId },
    });

    const ratings: number[] = Array.from(
      productWithReviews.reviews,
      (item) => item.rating,
    );

    const averageFunc = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    const rating = averageFunc(ratings).toFixed(2);

    // emit update to product service
    this.clientProxy.emit('product-rating-updated', JSON.stringify({
      productId: productId,
      rating: rating,
    }));

    (productWithReviews as any).avg_rating = rating;

    return productWithReviews;
  }

  async findOne(productId: string, id: string) {
    const product: Product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const productReview: ProductReview =
      await this.productReviewRepository.findOne(id);

    if (!productReview) {
      throw new HttpException('review not found', HttpStatus.NOT_FOUND);
    }

    return productReview;
  }

  async update(
    productId: string,
    updateProductReviewDto: UpdateProductReviewDto,
    id: string,
  ) {
    const product: Product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const productReview: ProductReview =
      await this.productReviewRepository.findOne(id);

    if (!productReview) {
      throw new HttpException('review not found', HttpStatus.NOT_FOUND);
    }

    await this.productReviewRepository.update(id, updateProductReviewDto);

    return await this.productReviewRepository.findOne(id);
  }

  async remove(productId: string, id: string) {
    const product: Product = await this.productRepository.findOne(productId);

    if (!product) {
      throw new HttpException('product not found', HttpStatus.NOT_FOUND);
    }

    const productReview: ProductReview =
      await this.productReviewRepository.findOne(id);

    if (!productReview) {
      throw new HttpException('review not found', HttpStatus.NOT_FOUND);
    }

    return this.productReviewRepository.softDelete(id);
  }
}
