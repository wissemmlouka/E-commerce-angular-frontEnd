import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { ImageProcessingService } from '../_services/image-processing.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-product-details',
  templateUrl: './show-product-details.component.html',
  styleUrls: ['./show-product-details.component.css'],
})
export class ShowProductDetailsComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private imageProcessingService: ImageProcessingService,
    private router: Router
  ) {}
  productDetails: Product[] = [];
  displayedColumns: string[] = [
    'Id',
    'Product Name',
    'Description',
    'Product Discounted Price',
    'Product Actual Price',
    'Actions',
  ];

  ngOnInit(): void {
    this.getAllProduct();
  }

  public getAllProduct() {
    this.productService
      .getAllProducts()
      .pipe(
        map((x: Product[], i: any) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      )
      .subscribe(
        (res: Product[]) => {
          //console.log(res);
          this.productDetails = res;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  public deleteProduct(productId: number) {
    this.productService.deleteProduct(productId).subscribe(
      (res) => {
        this.getAllProduct();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public showImages(product: Product) {
    this.dialog.open(ShowProductImagesDialogComponent, {
      data: {
        images: product.productImages,
      },
      height: '500px',
      width: '800px',
    });
  }

  public editProduct(id: number) {
    this.router.navigate(['/addNewProduct', { productId: id }]);
  }
}
