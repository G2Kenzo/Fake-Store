"use client";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {productKeys} from "./useProduct";
import {DeleteProduct} from "@/services/productServices";

export const useProductDelete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => DeleteProduct(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });

  return {
    ProductDelete: mutation.mutateAsync,
    prodyuctDLoading: mutation.isPending,
    productDError: mutation.error?.message ?? null,
  };
};
