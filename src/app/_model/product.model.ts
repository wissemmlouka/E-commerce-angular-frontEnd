import { FileHandel } from './file.model';

export interface Product {
  productName: string;
  productDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandel[];
}
