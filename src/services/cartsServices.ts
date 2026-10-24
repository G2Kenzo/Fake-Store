import {Cart, newCart} from "@/types/carts";

const CARTS_URL = "https://fakestoreapi.com/carts";

export const GetCarts = async (): Promise<Cart[]> => {
  const response = await fetch(CARTS_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  return response.json();
};

export const PostCart = async (cart: newCart): Promise<Cart> => {
  const response = await fetch(CARTS_URL, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error("Failed to add cart");
  }

  return response.json();
};

export const EditCart = async (id: number, cart: newCart): Promise<Cart> => {
  const response = await fetch(`${CARTS_URL}/${id}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error("Failed to update cart");
  }

  return response.json();
};

export const DeleteCart = async (id: number): Promise<void> => {
  const response = await fetch(`${CARTS_URL}/${id}`, {method: "DELETE"});
  if (!response.ok) {
    throw new Error("Failed to delete cart");
  }
};
