import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Product} from "../../products/entities/product.entity";

@Entity()
export class ProductReview {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 255 })
  public comment: string;

  @Column({ type: 'integer' })
  public buyPrice: number;

  @ManyToOne(() => Product, (product) => product.reviews)
  public product: Product;

  @CreateDateColumn()
  public createdAt!: Date;

  @UpdateDateColumn()
  public updatedAt!: Date;

  @DeleteDateColumn()
  public deletedAt!: Date | null;
}
