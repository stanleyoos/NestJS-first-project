import { IsNotEmpty, IsString, IsUUID, Length } from 'class-validator';

export class UpdateOrderDTO {
  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  client: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 30)
  address: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  productId: string;
}
