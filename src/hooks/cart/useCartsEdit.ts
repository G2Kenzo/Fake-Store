"use client";

import {useMutation, useQueryClient} from "@tanstack/react-query";
import {EditCart} from "@/services/cartsServices";
import {Cart, newCart} from "@/types/carts";
import {cartKeys} from "./useCarts";

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({id, cart}: {id: number; cart: newCart}) => EditCart(id, cart),
    onSuccess: (updatedCart) => {
      queryClient.setQueryData<Cart[]>(cartKeys.lists(), (current) =>
        current?.map((cart) =>
          cart.id === updatedCart.id ? updatedCart : cart,
        ) ?? [],
      );
    },
  });

  return {
    updateCart: (id: number, cart: newCart) => mutation.mutateAsync({id, cart}),
    cartELoading: mutation.isPending,
    cartEError: mutation.error?.message ?? null,
  };
};
