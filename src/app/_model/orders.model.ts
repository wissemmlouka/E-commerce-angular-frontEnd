import { Product } from './product.model';

export interface Order {
  orderid: number;
  orderFullName: String;
  orderFullAddress: String;
  orderContactNumber: String;
  orderAlternateContactNumber: String;
  orderStatus: String;
  orderAmount: number;
  product: Product;
  user: any;
}
