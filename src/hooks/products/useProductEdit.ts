"use client";
import {EditProduct} from "@/services/productServices";
import {newProducts} from "@/types/products";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {productKeys} from "./useProduct";

export const useUpdateProduct = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, product}: {id: number; product: newProducts}) =>
      EditProduct(id, product),

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: productKeys.lists(),
      });
    },
  });

  return {
    ProductEdit: (id: number, product: newProducts) =>
      mutation.mutateAsync({id, product}),
    productELoading: mutation.isPending,
    productEError: mutation.error?.message ?? null,
  };
};
