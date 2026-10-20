"use client";
import {useProduct} from "@/hooks/products/useProduct";
const empetyForm = {};

const Products = () => {
  const {ProductData, productLoading, productError} = useProduct();

  if (productLoading) {
    return <h1>Loading...</h1>;
  }
  if (productError) {
    return <h1>{productError}</h1>;
  }

  return (
    <div>
      <table>
        <tr className="flex items-center justify-between border">
          <th>image</th>
          <th>discription</th>
          <th>category</th>
          <th>price</th>
          <th>action</th>
        </tr>
        {ProductData.map((item) => (
          <tr
            key={item.id}
            className="flex items-center justify-between border"
          >
            <td className="flex items-center justify-center gap-1">
              <img src={item.image} alt={item.title} className="w-[60px]" />{" "}
              <span className="text-gray-600">{item.title}</span>{" "}
            </td>
            <td className="flex">{item.description}</td>
            <td className="flex">{item.category}</td>
            <td className="flex">{item.price}</td>
            <td className="flex items-center gap-1">
              <button className="bg-green-600 rounded-[14px]">Edit</button>
              <button className="bg-rose-600 rounded-[14px]">Delete</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Products;
