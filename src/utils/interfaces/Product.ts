export interface Product {
  id: string;
  categoryId: string;
  title: string;
  productImg: string;
  description: string;
  price: string;
  unit: string;
  likes: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
