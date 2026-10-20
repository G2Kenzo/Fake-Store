"use client";
import {PostUser} from "@/services/userServices";
import {newUser} from "@/types/users";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";

export const useAddUser = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: newUser) => PostUser(user),

    onSuccess: () => {
      queryclient.invalidateQueries({
        queryKey: userKeys.lists(),
      });
    },
  });

  return {
    addUser: mutation.mutateAsync,
    userPLoading: mutation.isPending,
    userPError: mutation.error?.message ?? null,
  };
};
