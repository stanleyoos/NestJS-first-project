import { Injectable } from '@nestjs/common';
import { db, Order } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((order) => order.id === id);
  }

  public deleteOrder(id: Order['id']) {
    const index = db.orders.findIndex((order) => order.id === id);
    db.orders.splice(index, 1);
  }

  public createOrder(orderData: Omit<Order, 'id'>): Order {
    const newOrder = { ...orderData, id: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public editOrder(
    id: Order['id'],
    orderData: Omit<Order, 'id' | 'productId'>,
  ): void {
    db.orders = db.orders.map((order) =>
      order.id === id ? { ...order, ...orderData } : order,
    );
  }
}
