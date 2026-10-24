import {newUser, User} from "@/types/users";

export const GetUsers = async (): Promise<User[]> => {
  const response = await fetch("https://fakestoreapi.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch Users");
  }
  const UsersData = await response.json();
  return UsersData;
};

export const GetUser = async (id: number): Promise<User | null> => {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const PostUser = async (User: newUser): Promise<User> => {
  const response = await fetch("https://fakestoreapi.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User),
  });
  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return response.json();
};

export const EditUser = async (id: number, User: newUser): Promise<User> => {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(User),
  });
  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const DeleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
};
