import { DeleteProduct } from "@/services/ProductServices"
import { useState } from "react"

export const useProductDelete = () => {
    const [ProductDLoading, setProductDLoading] = useState<boolean>(false)
    const [ProductDError, setProductDError] = useState<string | null> (null)

    const ProductDelete = async (id:number) => {
        try {
            setProductDLoading(true)
            setProductDError(null)
            const res = await DeleteProduct(id)
            return res 
        } catch(err: any) {
            setProductDError(err.massange)
        } finally {
            setProductDLoading(false)
        }
    }

    return {ProductDelete, ProductDLoading, ProductDError}
}