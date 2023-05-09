import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpCient: HttpClient) {}

  public addProduct(product: FormData) {
    return this.httpCient.post<Product>(
      'http://localhost:8083/product/addNewProduct',
      product
    );
  }

  public getAllProducts() {
    return this.httpCient.get<Product[]>(
      'http://localhost:8083/product/getAllProducts'
    );
  }

  public deleteProduct(productId: number) {
    return this.httpCient.delete(
      'http://localhost:8083/product/deleteProduct/' + productId
    );
  }

  public getProductById(productId: number) {
    return this.httpCient.get<Product>(
      'http://localhost:8083/product/getProductById/' + productId
    );
  }
}
