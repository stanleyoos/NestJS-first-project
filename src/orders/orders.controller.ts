import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from 'src/db';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Get('/')
  public getAll(): Order[] {
    return this.orderService.getAll();
  }

  @Get('/:id')
  public getById(@Param('id') id: string): Order {
    return this.orderService.getById(id);
  }
}
