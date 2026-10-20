"use client";
import {GetUsers} from "@/services/userServices";
import {useQuery} from "@tanstack/react-query";

export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
};

export const useUser = () => {
  const query = useQuery({
    queryKey: userKeys.lists(),
    queryFn: GetUsers,
  });

  return {
    UserData: query.data ?? [],
    UserLoading: query.isPending,
    UserError: query.error ? query.error.message : null,
    ...query,
  };
};
