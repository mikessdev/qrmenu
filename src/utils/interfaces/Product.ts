export interface Product {
  id: number;
  categoryId: number;
  title: string;
  image: string;
  description: string;
  price: string;
  unit: string;
  likes: number;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
