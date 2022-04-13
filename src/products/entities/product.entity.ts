import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductReview } from '../../product-reviews/entities/product-review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @OneToMany(() => ProductReview, (productReview) => productReview.product)
  public reviews: ProductReview[];
}
