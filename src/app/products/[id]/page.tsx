import Link from "next/link";
import {notFound} from "next/navigation";
import {GetProduct} from "@/services/productServices";

export const instant = false;

export default async function ViewProduct({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const productId = Number(id);
  if (!Number.isInteger(productId) || productId < 1) notFound();

  const product = await GetProduct(productId);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <Link href="/products" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">
          ← Back to products
        </Link>

        <article className="mt-5 grid gap-8 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:p-8">
          <div className="flex min-h-80 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-6">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-100 w-full object-contain"
            />
          </div>

          <div className="flex flex-col">
            <span className="w-fit rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-medium capitalize text-slate-300">
              {product.category}
            </span>
            <p className="mt-5 text-sm text-indigo-300">Product #{product.id}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white md:text-3xl">
              {product.title}
            </h1>
            <p className="mt-5 leading-7 text-slate-300">{product.description}</p>
            <p className="mt-8 text-3xl font-bold text-emerald-400">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </article>
      </div>
    </main>
  );
}
