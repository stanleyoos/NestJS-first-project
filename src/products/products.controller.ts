import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/db';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}
  @Get('/')
  public getAll(): Product[] {
    return this.productsService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string): Product {
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  public deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Post('/')
  public createProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.createProduct(productData);
  }
}
