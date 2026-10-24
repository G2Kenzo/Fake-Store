"use client";
import {DeleteUser} from "@/services/userServices";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";
import {User} from "@/types/users";

export const useUserDelete = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => DeleteUser(id),

    onSuccess: (_result, deletedId) => {
      queryClient.setQueryData<User[]>(userKeys.lists(), (current) =>
        current?.filter((user) => user.id !== deletedId) ?? [],
      );
    },
  });

  return {
    UserDelete: mutation.mutateAsync,
    userDLoading: mutation.isPending,
    userDError: mutation.error?.message ?? null,
  };
};
