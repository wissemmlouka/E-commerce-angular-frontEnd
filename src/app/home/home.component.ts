import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}
  pageNumber: number = 0;
  productDetails: Product[] = [];
  ngOnInit(): void {
    this.getAllProducts();
  }

  public getAllProducts() {
    this.productService
      .getAllProducts(this.pageNumber)
      .pipe(
        map((x: Product[]) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (res: Product[]) => {
          res.forEach((p) => this.productDetails.push(p));
          //this.productDetails = res;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails', { productId: productId }]);
  }

  public loadNextPage() {
    this.pageNumber++;
    this.getAllProducts();
  }

  /*   public loadPreviousPage() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.getAllProducts();
    }
  } */
}
