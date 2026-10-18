import { Products, newProducts } from "../type/Products";

export const GetProducts = async (): Promise<Products[]> => {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }
    const ProductsData = await response.json();
    return ProductsData;
}

export const PostProduct = async (Products: newProducts): Promise<Products> => {
    const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Products)
    });
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }

    return response.json()
}

export const EditProduct = async (id: number, Products: newProducts): Promise<Products> => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}` , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(Products)
    })
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }

    return response.json()
}

export const DeleteProduct = async (id: number): Promise<void> => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch products")
    }
}