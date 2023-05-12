import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { Order } from '../_model/orders.model';
import { Observable } from 'rxjs';

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

  public getAllProducts(pageNumber: number, searchKey: String = '') {
    return this.httpCient.get<Product[]>(
      'http://localhost:8083/product/getAllProducts?pageNumber=' +
        pageNumber +
        '&searchKey=' +
        searchKey
    );
  }

  public deleteProduct(productId: number) {
    return this.httpCient.delete(
      'http://localhost:8083/product/deleteProduct/' + productId
    );
  }

  public getProductById(productId: number): Observable<Product> {
    return this.httpCient.get<Product>(
      'http://localhost:8083/product/getProductById/' + productId
    );
  }
  public getProductDetails(
    isSingleProductCheckout: boolean,
    productId: number
  ) {
    return this.httpCient.get<Product[]>(
      'http://localhost:8083/product/getProductDetails/' +
        isSingleProductCheckout +
        '/' +
        productId
    );
  }

  public placeOrder(
    orderDetails: OrderDetails,
    isSingleProductCheckout: boolean
  ) {
    console.log('rfrfrfrf', isSingleProductCheckout);

    return this.httpCient.post<OrderDetails>(
      'http://localhost:8083/placeOrder/' + isSingleProductCheckout,
      orderDetails
    );
  }

  public addToCart(productId: number) {
    return this.httpCient.get(
      'http://localhost:8083/cart/addToCart/' + productId
    );
  }

  public getCartDetails(): Observable<any> {
    return this.httpCient.get('http://localhost:8083/cart/getCartDetails');
  }

  public deleteCardItem(cartId: number) {
    return this.httpCient.delete(
      'http://localhost:8083/cart/deleteCartItem/' + cartId
    );
  }

  public getMyOrders(): Observable<Order[]> {
    return this.httpCient.get<Order[]>('http://localhost:8083/getOrderDetails');
  }

  public getAllOrders(status: String): Observable<Order[]> {
    return this.httpCient.get<Order[]>(
      'http://localhost:8083/getAllOrderDetails/' + status
    );
  }

  public delivredOrder(orderId: number): Observable<Order> {
    return this.httpCient.get<Order>(
      'http://localhost:8083/orderDelivered/' + orderId
    );
  }

  public createTransaction(amount: number) {
    return this.httpCient.get(
      'http://localhost:8083/createTransaction/' + amount
    );
  }
}
