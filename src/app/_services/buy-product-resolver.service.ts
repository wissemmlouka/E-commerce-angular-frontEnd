import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Product } from '../_model/product.model';
import { Observable, map } from 'rxjs';
import { ProductService } from './product.service';
import { ImageProcessingService } from './image-processing.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  constructor(
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product[]> {
    const productId = Number(route.paramMap.get('productId'));
    const isSingleProductCheckout = Boolean(
      route.paramMap.get('isSingleProductCheckout')
    );

    return this.productService
      .getProductDetails(isSingleProductCheckout, productId)
      .pipe(
        map((x: Product[], i: any) =>
          x.map((product: Product) =>
            this.imageProcessingService.createImages(product)
          )
        )
      );
  }
}
