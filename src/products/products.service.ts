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

  public deleteProduct(id: Product['id']) {
    const index = db.products.findIndex((product) => product.id === id);
    db.products.splice(index, 1);
  }

  public createProduct(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }

  public editProduct(
    id: Product['id'],
    productData: Omit<Product, 'id'>,
  ): void {
    db.products = db.products.map((product) =>
      product.id === id ? { ...product, ...productData } : product,
    );
  }
}
