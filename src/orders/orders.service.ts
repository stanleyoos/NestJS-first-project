import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
    });
  }

  public deleteOrder(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public createOrder(
    orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.create({
      data: orderData,
    });
  }

  public editOrder(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'productId' | 'createdAt' | 'updatedAt'>,
  ): Promise<Order> {
    return this.prismaService.order.update({
      where: { id },
      data: orderData,
    });
  }
}
