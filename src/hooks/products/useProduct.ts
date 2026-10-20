"use client";
import {GetProducts} from "@/services/productServices";
import {useQuery} from "@tanstack/react-query";

export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
};

export const useProduct = () => {
  const query = useQuery({
    queryKey: productKeys.lists(),
    queryFn: GetProducts,
  });

  return {
    ProductData: query.data ?? [],
    productLoading: query.isPending,
    productError: query.error ? query.error.message : null,
    ...query,
  };
};
