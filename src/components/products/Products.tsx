"use client";
import {useProduct} from "@/hooks/products/useProduct";
import {useProductDelete} from "@/hooks/products/useProductDelete";
import {useUpdateProduct} from "@/hooks/products/useProductEdit";
import Link from "next/link";
import { useState } from "react";
import AddModal from "../modal/AddModal";

const Products = () => {
  const {ProductData, productLoading, productError} = useProduct();
  const {ProductEdit, productELoading, productEError} = useUpdateProduct();
  const {ProductDelete, productDLoading, productDError} = useProductDelete();
  const [addModal, setAddModal] = useState<boolean> (false)

  if (productLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h1 className="text-2xl font-semibold text-slate-400 animate-pulse">
          Loading...
        </h1>
      </div>
    );
  }

  if (productError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <h1 className="text-2xl font-semibold text-rose-500">{productError}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Products Dashboard
          </h2>
          <button onClick={() => setAddModal(true)} className="bg-blue-400/50 border border-gray-600 text-gray-300 hover:text-gray-200 hover:bg-blue-400 transition-all duration-300 w-35 h-8.75 rounded-2xl">
            ADD
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm shadow-xl">
          <table className="w-full text-left border-collapse text-sm text-slate-400">
            <thead className="bg-slate-900 text-xs font-semibold uppercase text-slate-300 tracking-wider border-b border-slate-800">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Product
                </th>
                <th scope="col" className="px-6 py-4">
                  Description
                </th>
                <th scope="col" className="px-6 py-4">
                  Category
                </th>
                <th scope="col" className="px-6 py-4">
                  Price
                </th>
                <th scope="col" className="px-6 py-4 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {ProductData?.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-900/40 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-slate-800 bg-slate-950 p-1.5 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain mix-blend-lighten"
                        />
                      </div>
                      <span
                        className="font-medium text-slate-200 max-w-37.5 truncate"
                        title={item.title}
                      >
                        {item.title.length > 12
                          ? item.title.slice(0, 12) + "..."
                          : item.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-slate-400 max-w-62.5">
                    <p className="truncate" title={item.description}>
                      {item.description?.length > 30
                        ? item.description.slice(0, 20) + "..."
                        : item.description}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-medium text-slate-300 border border-slate-700 capitalize">
                      {item.category}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-emerald-400">
                    ${item.price}
                  </td>

                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all"
                      >
                        View
                      </Link>
                      <button className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all">
                        Edit
                      </button>
                      <button
                        onClick={() => ProductDelete(item.id)}
                        className="rounded-lg bg-rose-950/40 border border-rose-900/50 px-3 py-1.5 text-sm font-medium text-rose-400 hover:bg-rose-900/60 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {addModal && <AddModal onClose={() => setAddModal(false)} />}
    </div>
  );
};

export default Products;
