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
import { CreateProductDTO } from './dtos/create-product.dto';
import { UpdateProductDTO } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('/')
  async getAll() {
    return this.productsService.getAll();
  }

  @Get('/extended')
  getAllExtended(): any {
    return this.productsService.getAllExtended();
  }

  @Get('/extended/:id')
  async getExtendedById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getExtendedById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.productsService.deleteProduct(id);
    return { success: true };
  }

  @Post('/')
  public createProduct(@Body() productData: CreateProductDTO) {
    return this.productsService.createProduct(productData);
  }

  @Put('/:id')
  async editProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productsService.getById(id))) {
      throw new NotFoundException('Product not found');
    }

    await this.productsService.editProduct(id, productData);
    return { success: true };
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const prod = await this.productsService.getById(id);
    if (!prod) throw new NotFoundException('Product not found');
    return prod;
  }
}
