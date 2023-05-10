import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  constructor(
    private avtivatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateNumber: '',
    orderProductQuantities: [],
  };
  ngOnInit(): void {
    this.productDetails = this.avtivatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach((product) =>
      this.orderDetails.orderProductQuantities.push({
        productId: product.productId,
        quantity: 1,
      })
    );
    console.log(this.productDetails);
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.orderDetails).subscribe(
      (res) => {
        orderForm.reset();
        this.router.navigate(['/orderConfirm']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getQuantityForProduct(productId: number) {
    const filtredProduct = this.orderDetails.orderProductQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    );
    return filtredProduct[0].quantity;
  }

  public getCalculatedTotal(productId: number, discountedPrice: any) {
    const quantity = this.getQuantityForProduct(productId);
    return quantity * discountedPrice;
  }
  public onQuantityChanged(quantity: any, productId: number) {
    const product = (this.orderDetails.orderProductQuantities.filter(
      (productQuantity) => productQuantity.productId === productId
    )[0].quantity = quantity);
  }
  public getGrandTotal() {
    return this.orderDetails.orderProductQuantities.reduce(
      (total, productQuantity) => {
        const product = this.productDetails.find(
          (p) => p.productId === productQuantity.productId
        );
        const price = product ? product.productDiscountedPrice : 0;
        return total + price * productQuantity.quantity;
      },
      0
    );
  }
}
