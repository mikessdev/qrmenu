import type { Product } from './Product';

export interface Category {
  id: string;
  title: string;
  menuId: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}

export interface CategoryWithProducts extends Category {
  product: Product[];
}
