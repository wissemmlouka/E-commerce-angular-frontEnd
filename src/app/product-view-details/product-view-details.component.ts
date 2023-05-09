import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
})
export class ProductViewDetailsComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }
  selectedProductIndex = 0;
  product: Product = {
    productId: null,
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };

  public changeIndex(index: number) {
    this.selectedProductIndex = index;
  }
}
