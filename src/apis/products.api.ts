import api from "@/libs/api";
import { CriteriaRequest, DynamicFilter } from "@/types/criteria-request.type";
import { Product } from "@/types/product.type";
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
