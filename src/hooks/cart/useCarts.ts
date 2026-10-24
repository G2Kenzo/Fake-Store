"use client";

import {useQuery} from "@tanstack/react-query";
import {GetCarts} from "@/services/cartsServices";

export const cartKeys = {
  all: ["carts"] as const,
  lists: () => [...cartKeys.all, "list"] as const,
};

export const useCarts = () => {
  const query = useQuery({
    queryKey: cartKeys.lists(),
    queryFn: GetCarts,
  });

  return {
    cartData: query.data ?? [],
    cartLoading: query.isPending,
    cartError: query.error?.message ?? null,
    ...query,
  };
};
