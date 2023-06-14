import { ProductDto } from "@/dtos/product.dto";
import api from "@/libs/api";
import { CriteriaRequest, DynamicFilter } from "@/types/criteria-request.type";
import {
  Product,
  ProductOption,
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

export const createProduct = async (productDto: ProductDto) => {
  const { data } = await api.post("/products", productDto);

  return data;
};

export const updateProduct = async (updateProductDto: ProductDto) => {
  const { id, ...updateProductPayload } = updateProductDto;
  const { data } = await api.put<Product>(
    `/products/${id}`,
    updateProductPayload
  );

  return data;
};
