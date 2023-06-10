export type Product = {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  price: number;
};

export type ProductOption = {
  id: string;
  createdAt: Date;
  value: string;
  label: string;
};

export type ProductFormData = Omit<Product, 'id' | 'createdAt'>