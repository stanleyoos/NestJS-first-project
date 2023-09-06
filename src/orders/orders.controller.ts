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
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  async getAll() {
    return this.orderService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.orderService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.orderService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.orderService.deleteOrder(id);
    return { success: true };
  }

  @Post('/')
  public createOrder(@Body() orderData: CreateOrderDTO) {
    return this.orderService.createOrder(orderData);
  }

  @Put('/:id')
  async editOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.orderService.getById(id))) {
      throw new NotFoundException('Product not found');
    }

    await this.orderService.editOrder(id, orderData);
    return { success: true };
  }
}
