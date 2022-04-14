import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductReviewDto {
  @IsString()
  @IsNotEmpty()
  public comment: string;

  @IsNumber()
  @IsNotEmpty()
  public rating: number;
}
