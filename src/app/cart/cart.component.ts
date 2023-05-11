import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  dataSource: any = [];
  displayedColumns: string[] = [
    'Name',
    'Description',
    'Price',
    'Discounted Price',
    'Action',
  ];
  ngOnInit(): void {
    this.getCartDetails();
  }

  public getCartDetails() {
    this.productService.getCartDetails().subscribe(
      (data: any) => {
        console.log(data);
        this.dataSource = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public checkout() {
    this.router.navigate([
      '/buyProduct',
      {
        isSingleProductCheckout: false,
        productId: 0,
      },
    ]);
  }

  public deleteCardItem(cartId: number) {
    this.productService.deleteCardItem(cartId).subscribe(
      (data: any) => {
        console.log(data);
        this.getCartDetails();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
