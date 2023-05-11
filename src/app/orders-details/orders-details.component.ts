import { Component, OnInit } from '@angular/core';
import { Order } from '../_model/orders.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.css'],
})
export class OrdersDetailsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  orders: Order[] = [];
  displayedColumns = [
    'Num',
    'Name',
    'Address',
    'Contact',
    'Amount',
    'Status',
    'Action',
  ];
  status: String = 'all';
  ngOnInit(): void {
    this.getOrdersDetails();
  }

  public getOrdersDetails() {
    this.productService.getAllOrders(this.status).subscribe(
      (data: Order[]) => {
        console.log(data);
        this.orders = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public delivredOrder(orderId: number) {
    this.productService.delivredOrder(orderId).subscribe(
      (data: Order) => {
        console.log(data);
        this.getOrdersDetails();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
