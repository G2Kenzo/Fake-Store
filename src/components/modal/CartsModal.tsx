"use client";

import {FormEvent, useId, useState} from "react";
import {Cart, newCart} from "@/types/carts";

type CartProductInput = {
  productId: string;
  quantity: string;
};

type CartsModalProps = {
  cart?: Cart;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (cart: newCart) => Promise<void>;
};

const cartToForm = (cart?: Cart) => ({
  userId: cart?.userId.toString() ?? "",
  date: cart?.date.slice(0, 10) ?? new Date().toISOString().slice(0, 10),
  products: cart?.products.map((product) => ({
    productId: product.productId.toString(),
    quantity: product.quantity.toString(),
  })) ?? [{productId: "", quantity: "1"}],
});

export default function CartsModal({
  cart,
  isSubmitting,
  error,
  onClose,
  onSave,
}: CartsModalProps) {
  const [form, setForm] = useState(() => cartToForm(cart));
  const [validationError, setValidationError] = useState<string | null>(null);
  const headingId = useId();

  const updateProduct = (
    index: number,
    field: keyof CartProductInput,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      products: current.products.map((product, productIndex) =>
        productIndex === index ? {...product, [field]: value} : product,
      ),
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userId = Number(form.userId);
    const products = form.products.map((product) => ({
      productId: Number(product.productId),
      quantity: Number(product.quantity),
    }));

    if (
      !Number.isInteger(userId) ||
      userId < 1 ||
      products.some(
        (product) =>
          !Number.isInteger(product.productId) ||
          product.productId < 1 ||
          !Number.isInteger(product.quantity) ||
          product.quantity < 1,
      )
    ) {
      setValidationError(
        "User ID, product ID, and quantity must be positive whole numbers.",
      );
      return;
    }

    setValidationError(null);
    await onSave({userId, date: form.date, products});
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSubmitting) onClose();
      }}
    >
      <form
        className="w-full max-w-2xl space-y-5 rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={headingId} className="text-xl font-semibold text-white">
              {cart ? "Edit cart" : "Add cart"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter a product ID and quantity for each row.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            disabled={isSubmitting}
            onClick={onClose}
            className="rounded-md px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed"
          >
            ×
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-slate-200">
            User ID
            <input
              type="number"
              min="1"
              value={form.userId}
              onChange={(event) =>
                setForm((current) => ({...current, userId: event.target.value}))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Sana
            <input
              type="date"
              value={form.date}
              onChange={(event) =>
                setForm((current) => ({...current, date: event.target.value}))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <fieldset className="space-y-3 rounded-lg border border-slate-700 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-300">
            Products
          </legend>
          {form.products.map((product, index) => (
            <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-3">
              <label className="sr-only" htmlFor={`product-id-${index}`}>
                Product ID
              </label>
              <input
                id={`product-id-${index}`}
                type="number"
                min="1"
                value={product.productId}
                onChange={(event) =>
                  updateProduct(index, "productId", event.target.value)
                }
                required
                placeholder="Product ID"
                className="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
              <label className="sr-only" htmlFor={`quantity-${index}`}>
                Quantity
              </label>
              <input
                id={`quantity-${index}`}
                type="number"
                min="1"
                value={product.quantity}
                onChange={(event) =>
                  updateProduct(index, "quantity", event.target.value)
                }
                required
                placeholder="Quantity"
                className="min-w-0 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-indigo-500"
              />
              <button
                type="button"
                aria-label="Remove product row"
                disabled={isSubmitting || form.products.length === 1}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    products: current.products.filter(
                      (_, productIndex) => productIndex !== index,
                    ),
                  }))
                }
                className="rounded-lg border border-rose-900/70 px-3 text-rose-300 hover:bg-rose-950/50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              setForm((current) => ({
                ...current,
                products: [...current.products, {productId: "", quantity: "1"}],
              }))
            }
            className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-60"
          >
            + Add product row
          </button>
        </fieldset>

        {(validationError || error) && (
          <p
            role="alert"
            className="rounded-lg border border-rose-900/70 bg-rose-950/40 px-3 py-2 text-sm text-rose-300"
          >
            {validationError ?? error}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
