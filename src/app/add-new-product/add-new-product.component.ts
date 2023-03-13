import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandel } from '../_model/file.model';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css'],
})
export class AddNewProductComponent implements OnInit {
  product: Product = {
    productName: '',
    productDescription: '',
    productDiscountedPrice: 0,
    productActualPrice: 0,
    productImages: [],
  };
  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {}

  addProduct(AddProductForm: NgForm) {
    this.productService
      .addProduct(this.preparefFormData(this.product))
      .subscribe(
        (res: Product) => {
          AddProductForm.reset();
          this.product.productImages = [];
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  preparefFormData(product: Product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    for (var i = 0; i < product.productImages.length; i++) {
      formData.append(
        'imagesFile',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    return formData;
  }

  public onFileSelected(event: any) {
    if (event.target.files) {
      const files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        const fileHandel: FileHandel = {
          file: files[i],
          url: this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(files[i])
          ),
        };
        this.product.productImages.push(fileHandel);
      }
    }
  }

  /* public onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandel: FileHandel = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        ),
      };
      this.product.productImages.push(fileHandel);
    }
  }*/
  public removeImage(index: number) {
    this.product.productImages.splice(index, 1);
  }

  public fileDropped(fileHandel: FileHandel[]) {
    for (let i = 0; i < fileHandel.length; i++) {
      this.product.productImages.push(fileHandel[i]);
    }
  }
}
