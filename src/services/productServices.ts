import {Products, newProducts} from "../types/products";
const API_URL = "https://fakestoreapi.com/products";

export const GetProducts = async (): Promise<Products[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const ProductsData = await response.json();
  return ProductsData;
};

export const GetProduct = async (id: number): Promise<Products | null> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};

export const PostProduct = async (Products: newProducts): Promise<Products> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Products),
  });
  if (!response.ok) {
    throw new Error("Failed to add product");
  }

  return response.json();
};

export const EditProduct = async (
  id: number,
  Products: newProducts,
): Promise<Products> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Products),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const DeleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
};
