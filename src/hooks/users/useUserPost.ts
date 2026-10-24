"use client";
import {PostUser} from "@/services/userServices";
import {newUser, User} from "@/types/users";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";

export const useAddUser = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (user: newUser) => PostUser(user),

    onSuccess: (createdUser) => {
      queryclient.setQueryData<User[]>(userKeys.lists(), (current) => [
        ...(current ?? []),
        createdUser,
      ]);
    },
  });

  return {
    addUser: mutation.mutateAsync,
    userPLoading: mutation.isPending,
    userPError: mutation.error?.message ?? null,
  };
};
