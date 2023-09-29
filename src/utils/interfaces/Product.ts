export interface Product {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  price: string;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}