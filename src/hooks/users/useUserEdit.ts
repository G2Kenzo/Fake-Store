"use client";
import {EditUser} from "@/services/userServices";
import {newUser, User} from "@/types/users";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {userKeys} from "./useUser";

export const useUpdateUser = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({id, user}: {id: number; user: newUser}) => EditUser(id, user),

    onSuccess: (updatedUser) => {
      queryclient.setQueryData<User[]>(userKeys.lists(), (current) =>
        current?.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ) ?? [],
      );
    },
  });

  return {
    UserEdit: (id: number, user: newUser) => mutation.mutateAsync({id, user}),
    userELoading: mutation.isPending,
    userEError: mutation.error?.message ?? null,
  };
};
