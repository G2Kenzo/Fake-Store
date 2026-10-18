import { PostProduct } from "@/services/ProductServices";
import { newProducts } from "@/type/Products";
import { useState } from "react";

export const useAddProduct = () => {
  const [ProductPLoading, setProductPLoading] = useState<boolean>(false);
  const [ProductPError, setProductPError] = useState<string | null>(null);

  const addProduct = async (Product: newProducts) => {
    try {
        setProductPError(null)
        setProductPLoading(true)
        const res = await PostProduct(Product)
        return res
    } catch (err: any) {
        setProductPError(err.massange)
    } finally {
        setProductPLoading(false)
    }
  }

  return {addProduct, ProductPLoading, ProductPError}
};
