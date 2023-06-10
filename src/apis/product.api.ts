import api from "@/libs/api";
import { CriteriaRequest, DynamicFilter } from "@/types/criteria-request.type";
import {
  Product,
  ProductFormData,
  ProductOption,
  UpdateProductFormData,
} from "@/types/product.type";
import { QueryFunctionContext } from "@tanstack/react-query";

type ProductsQueryKey = [string, CriteriaRequest | DynamicFilter];

export const getProducts = async ({
  queryKey,
}: QueryFunctionContext<ProductsQueryKey>) => {
  const [, params] = queryKey;
  const { data } = await api.get<Product[]>("/products", {
    params,
  });

  return data;
};

export const getProductDetail = async ({
  queryKey,
}: QueryFunctionContext<string[]>) => {
  const [, productId] = queryKey;
  const { data } = await api.get<Product>(`/products/${productId}`);

  return data;
};

export const deleteProduct = async (productId: string) => {
  const { data } = await api.delete(`/products/${productId}`);

  return data;
};

export const getProductOptions = async ({
  queryKey,
}: QueryFunctionContext<ProductsQueryKey>) => {
  const [, params] = queryKey;
  const { data } = await api.get<ProductOption[]>("/product-options", {
    params,
  });

  return data;
};

export const createProduct = async (productFormData: ProductFormData) => {
  const { data } = await api.post("/products", productFormData);

  return data;
};

export const updateProduct = async (
  updateProductFormData: UpdateProductFormData
) => {
  const { id, ...updateProductPayload } = updateProductFormData;
  const { data } = await api.put(`/products/${id}`, updateProductPayload);

  return data;
};
