import { FileHandle } from './file.model';

export interface Product {
  productId: any;
  productName: string;
  productDescription: string;
  productDiscountedPrice: number;
  productActualPrice: number;
  productImages: FileHandle[];
}
