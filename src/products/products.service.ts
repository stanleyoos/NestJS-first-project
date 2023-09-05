import { Injectable } from '@nestjs/common';
import { db, Product } from 'src/db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public getById(id: Product['id']): Product | null {
    return db.products.find((product) => product.id === id);
  }

  public deleteProduct(id: Product['id']): { success: boolean } {
    const index = db.products.findIndex((product) => product.id === id);

    if (index < 0) return { success: false };

    db.products.splice(index, 1);

    return { success: true };
  }

  public createProduct(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }
}
