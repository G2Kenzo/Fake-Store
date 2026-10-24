"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {PostCart} from "@/services/cartsServices";
import {Cart, newCart} from "@/types/carts";
import {cartKeys} from "./useCarts";

export const useAddCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (cart: newCart) => PostCart(cart),
    onSuccess: (createdCart) => {
      queryClient.setQueryData<Cart[]>(cartKeys.lists(), (current) => [
        ...(current ?? []),
        createdCart,
      ]);
    },
  });

  return {
    addCart: mutation.mutateAsync,
    cartPLoading: mutation.isPending,
    cartPError: mutation.error?.message ?? null,
  };
};
