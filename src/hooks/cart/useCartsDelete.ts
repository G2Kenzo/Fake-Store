"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DeleteCart} from "@/services/cartsServices";
import {Cart} from "@/types/carts";
import {cartKeys} from "./useCarts";

export const useCartDelete = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number) => DeleteCart(id),
    onSuccess: (_result, deletedId) => {
      queryClient.setQueryData<Cart[]>(cartKeys.lists(), (current) =>
        current?.filter((cart) => cart.id !== deletedId) ?? [],
      );
    },
  });

  return {
    deleteCart: mutation.mutateAsync,
    cartDLoading: mutation.isPending,
    cartDError: mutation.error?.message ?? null,
  };
};
