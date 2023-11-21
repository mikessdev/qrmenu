import type { Product } from './Product';

export interface Category {
  id: string;
  title: string;
  menuId: string;
  products: Product[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
