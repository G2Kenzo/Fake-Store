import { EditProduct } from "@/services/ProductServices";
import { useState } from "react";

export const useUpdateProduct = () => {
  const [ProductELoading, setProductELoading] = useState<boolean>(false);
  const [ProductEError, setProductEError] = useState<string | null>(null);

  const updateProduct = async (id:number, product:any) => {
    try {
        setProductEError(null)
        setProductELoading(true)
        const res = await EditProduct(id, product)
        return res 
    } catch (err: any) {
        setProductEError(err.massange)
    } finally {
        setProductELoading(false)
    }
  }

  return {updateProduct, ProductELoading, ProductEError}
};
