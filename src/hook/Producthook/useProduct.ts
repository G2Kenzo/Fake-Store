import { GetProducts } from "@/services/ProductServices"
import { Products } from "@/type/Products"
import { useEffect, useState } from "react"

export const useProduct = () => {
    const [Product, setProduct] = useState<Products[]> ([])
    const [Productloading, setProductLoading] = useState<boolean> (false)
    const [Producterror, setProductError] = useState<string | null> (null)

    useEffect(() => {
        const loading = async () => {
            try {
                setProductError(null)
                setProductLoading(true)
                const res = await GetProducts();
                setProduct(res)
                return res
            } catch(err: any) {
                setProductError("err")
            } finally {
                setProductLoading(false)
            }
        }

        loading()
    },[])

    return {Product, Productloading, Producterror}
}