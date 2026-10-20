"use client";
import {EditUser} from "@/services/userServices";
import {newUser} from "@/types/users";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";
import {newProducts} from "@/types/products";

export const useUpdateUser = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, user}: {id: number; user: newUser}) => EditUser(id, user),

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });

  return {
    UserEdit: (id: number, user: newUser) => mutation.mutateAsync({id, user}),
    userELoading: mutation.isPending,
    userEError: mutation.error?.message ?? null,
  };
};
