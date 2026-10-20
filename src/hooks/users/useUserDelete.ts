"use client";
import {DeleteUser} from "@/services/userServices";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";

export const useUserDelete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => DeleteUser(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });

  return {
    UserDelete: mutation.mutateAsync,
    userDLoading: mutation.isPending,
    userDError: mutation.error?.message ?? null,
  };
};
