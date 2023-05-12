import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
declare var Razorpay: any;
@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private injector: Injector
  ) {}
  productDetails: Product[] = [];
  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateNumber: '',
    orderProductQuantities: [],
  };

  isSingleProductCheckout: any = null;
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data['productDetails'];
    this.productDetails.forEach((product) =>
      this.orderDetails.orderProductQuantities.push({
        productId: product.productId,
        quantity: 1,
      })
    );
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get(
      'isSingleProductCheckout'
    );
  }

  public placeOrder(orderForm: NgForm) {
    this.productService
      .placeOrder(this.orderDetails, this.isSingleProductCheckout)
      .subscribe(
        (res) => {
          orderForm.reset();
          const ngZone = this.injector.get(NgZone);
          ngZone.run(() => {
            this.router.navigate(['/orderConfirm']);
          });
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

  public createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getGrandTotal();
    this.productService.createTransaction(amount).subscribe(
      (res: any) => {
        console.log(res);

        this.openTransactionModel(res, orderForm);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public openTransactionModel(res: any, orderForm: NgForm) {
    var options = {
      orderId: res.orderId,
      Key: res.key_id,
      amount: res.amount,
      currency: res.currency,
      name: 'wissem',
      description: 'Payment',
      image: 'https://www.wissem.com/assets/images/logo.png',
      handler: (res: any) => {
        this.processResponse(res, orderForm);
      },
      prefill: {
        name: 'wiss',
        email: 'tzirw@example.com',
        contact: '0123456789',
      },
      notes: {
        address: 'eljem',
      },
      theme: {
        color: '#F37254',
      },
    };
    var razorpayObject = new Razorpay(options);
    razorpayObject.open();
  }
  processResponse(res: any, orderForm: NgForm) {
    this.placeOrder(orderForm);
  }
}
