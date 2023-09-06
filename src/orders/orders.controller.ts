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
import { Order } from 'src/db';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  public getAll(): Order[] {
    return this.orderService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id', new ParseUUIDPipe()) id: string): Order | null {
    const order = this.orderService.getById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Delete('/:id')
  public deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!this.orderService.getById(id)) {
      throw new NotFoundException('Product not found');
    }
    this.orderService.deleteOrder(id);
    return { success: true };
  }

  @Post('/')
  public createOrder(@Body() orderData: CreateOrderDTO) {
    return this.orderService.createOrder(orderData);
  }

  @Put('/:id')
  public editOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ): { success: boolean } {
    if (!this.orderService.getById(id)) {
      throw new NotFoundException('Product not found');
    }

    this.orderService.editOrder(id, orderData);
    return { success: true };
  }
}
