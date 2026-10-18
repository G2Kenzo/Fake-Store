import { newUser, User } from "@/type/Users";

export const GetUsers = async (): Promise<User[]> => {
    const response = await fetch("https://fakestoreapi.com/users")
    if (!response.ok) {
        throw new Error("Failed to fetch Users")
    }
    const UsersData = await response.json()
    return UsersData
}

export const PostUser = async (User: newUser): Promise<User> => {
    const response = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Users")
    }

    return response.json()
}

export const UpdateUser = async (id: number, User: newUser): Promise<User> => {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch Users")
    }

    return response.json()
}

export const Delete = async (id: number): Promise<void> => {
    const response = await fetch(`https://fakestoreapi.com/users/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch Users")
    }
}