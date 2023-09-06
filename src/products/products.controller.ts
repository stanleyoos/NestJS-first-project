import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  public getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string): Product | null {
    const prod = this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Delete('/:id')
  public deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException('Product not found');
    }
    this.productsService.deleteProduct(id);
    return { success: true };
  }

  @Post('/')
  public createProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.createProduct(productData);
  }

  @Put('/:id')
  public editProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ): { success: boolean } {
    if (!this.productsService.getById(id)) {
      throw new NotFoundException('Product not found');
    }

    this.productsService.editProduct(id, productData);
    return { success: true };
  }
}
