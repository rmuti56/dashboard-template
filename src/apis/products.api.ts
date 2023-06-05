import api from "@/libs/api";
import { CriteriaRequest } from "@/types/criteria-request.type";
import { Product } from "@/types/product.type";
import { QueryFunctionContext } from "@tanstack/react-query";

type ProductsQueryKey = [string, CriteriaRequest];

export const getProducts = async ({
  queryKey,
}: QueryFunctionContext<ProductsQueryKey>) => {
  const [_, params] = queryKey;
  const { data } = await api.get<Product[]>("/products", {
    params,
  });

  return data;
};
