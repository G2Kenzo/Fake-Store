"use client";
import {PostProduct} from "@/services/productServices";
import {newProducts} from "@/types/products";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {productKeys} from "./useProduct";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (Product: newProducts) => PostProduct(Product),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });

  return {
    addProduct: mutation.mutateAsync,
    productPLoading: mutation.isPending,
    productPError: mutation.error?.message ?? null,
  };
};
