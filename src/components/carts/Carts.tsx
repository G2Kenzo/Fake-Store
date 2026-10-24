"use client";

import {useState} from "react";
import CartsModal from "@/components/modal/CartsModal";
import {useCarts} from "@/hooks/cart/useCarts";
import {useAddCart} from "@/hooks/cart/useCartsPost";
import {useUpdateCart} from "@/hooks/cart/useCartsEdit";
import {useCartDelete} from "@/hooks/cart/useCartsDelete";
import {Cart, newCart} from "@/types/carts";

export default function Carts() {
  const {cartData, cartLoading, cartError} = useCarts();
  const {addCart, cartPLoading, cartPError} = useAddCart();
  const {updateCart, cartELoading, cartEError} = useUpdateCart();
  const {deleteCart, cartDLoading, cartDError} = useCartDelete();
  const [modalCart, setModalCart] = useState<Cart | null | undefined>(
    undefined,
  );

  const saveCart = async (cart: newCart) => {
    try {
      if (modalCart) {
        await updateCart(modalCart.id, cart);
      } else {
        await addCart(cart);
      }
      setModalCart(undefined);
    } catch {
      // The mutation error is displayed in the modal.
    }
  };

  const removeCart = async (cart: Cart) => {
    if (!window.confirm(`Do you want to delete cart #${cart.id}?`)) return;
    try {
      await deleteCart(cart.id);
    } catch {
      // The mutation error is displayed below.
    }
  };

  if (cartLoading) return <StateMessage message="Loading carts..." />;
  if (cartError) return <StateMessage message={cartError} error />;

  return (
    <section className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Carts</h1>
            <p className="mt-1 text-sm text-slate-400">
              Total: {cartData.length}
            </p>
          </div>
          <button
            onClick={() => setModalCart(null)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Add cart
          </button>
        </div>

        {cartDError && <ErrorMessage message={cartDError} />}

        {cartData.length === 0 ? (
          <StateMessage message="There are no carts yet." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {cartData.map((cart) => (
              <article
                key={cart.id}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-indigo-300">
                      Cart #{cart.id}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold text-white">
                      User #{cart.userId}
                    </h2>
                  </div>
                </div>
                <ul className="mt-4 divide-y divide-slate-800 rounded-lg border border-slate-800">
                  {cart.products.map((product) => (
                    <li
                      key={product.productId}
                      className="flex items-center justify-between px-3 py-2 text-sm"
                    >
                      <span className="text-slate-300">
                        Product #{product.productId}
                      </span>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 font-medium text-slate-200">
                        Qty: {product.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setModalCart(cart)}
                    className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-200 hover:bg-slate-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => void removeCart(cart)}
                    disabled={cartDLoading}
                    className="rounded-lg border border-rose-900/70 bg-rose-950/40 px-3 py-1.5 text-sm text-rose-300 hover:bg-rose-900/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {modalCart !== undefined && (
        <CartsModal
          key={modalCart?.id ?? "new"}
          cart={modalCart ?? undefined}
          isSubmitting={cartPLoading || cartELoading}
          error={cartPError ?? cartEError}
          onClose={() => setModalCart(undefined)}
          onSave={saveCart}
        />
      )}
    </section>
  );
}

function StateMessage({
  message,
  error = false,
}: {
  message: string;
  error?: boolean;
}) {
  return (
    <div
      className={`flex min-h-screen items-center justify-center text-lg ${error ? "text-rose-400" : "text-slate-400"}`}
    >
      {message}
    </div>
  );
}

function ErrorMessage({message}: {message: string}) {
  return (
    <p
      role="alert"
      className="mb-4 rounded-lg border border-rose-900/70 bg-rose-950/40 px-4 py-3 text-sm text-rose-300"
    >
      {message}
    </p>
  );
}
