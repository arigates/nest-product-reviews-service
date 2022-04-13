import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;

  getHello(): string {
    return 'Hello World!';
  }

  async createProduct(data) {
    const product: Product = await this.productRepository.create({
      id: data.id,
      name: data.name,
    });

    await this.productRepository.save(product);
  }
}
