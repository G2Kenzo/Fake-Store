"use client";
import {PostProduct} from "@/services/productServices";
import {newProducts, Products} from "@/types/products";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {productKeys} from "./useProduct";

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (Product: newProducts) => PostProduct(Product),

    onSuccess: (createdProduct) => {
      queryClient.setQueryData<Products[]>(productKeys.lists(), (current) => [
        ...(current ?? []),
        createdProduct,
      ]);
    },
  });

  return {
    addProduct: mutation.mutateAsync,
    productPLoading: mutation.isPending,
    productPError: mutation.error?.message ?? null,
  };
};
