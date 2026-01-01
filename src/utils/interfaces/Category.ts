import type { Product } from './Product';

export interface Category {
  id: number;
  title: string;
  menuId: number;
  products: Product[];
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
