import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Order } from '../_model/orders.model';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent implements OnInit {
  constructor(private productService: ProductService) {}

  orders: Order[] = [];

  displayedColumns = ['Num', 'Name', 'Address', 'Contact', 'Amount', 'Status'];
  ngOnInit(): void {
    this.getOrdersDetails();
  }

  public getOrdersDetails() {
    this.productService.getMyOrders().subscribe(
      (data: Order[]) => {
        console.log(data);
        this.orders = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
