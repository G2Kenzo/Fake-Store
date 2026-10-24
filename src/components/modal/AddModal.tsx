"use client";

import {FormEvent, useId, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {productKeys} from "@/hooks/products/useProduct";
import {useAddProduct} from "@/hooks/products/useProductPost";
import {newProducts, Products} from "@/types/products";

type AddModalProps = {
  onClose: () => void;
};

type ProductFormValues = {
  image: string;
  title: string;
  description: string;
  category: string;
  price: string;
};

const initialFormValues: ProductFormValues = {
  image: "",
  title: "",
  description: "",
  category: "",
  price: "",
};

const AddModal = ({onClose}: AddModalProps) => {
  const queryClient = useQueryClient();
  const {addProduct, productPLoading, productPError} = useAddProduct();
  const [formValues, setFormValues] = useState<ProductFormValues>(initialFormValues);
  const [validationError, setValidationError] = useState<string | null>(null);
  const titleId = useId();

  const cachedProducts = queryClient.getQueryData<Products[]>(productKeys.lists());
  const categories = Array.from(
    new Set(cachedProducts?.map(({category}) => category) ?? []),
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const price = Number(formValues.price);
    if (!Number.isFinite(price) || price <= 0) {
      setValidationError("Price must be greater than 0.");
      return;
    }

    setValidationError(null);

    const product: newProducts = {
      image: formValues.image.trim(),
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      category: formValues.category,
      price,
    };

    try {
      await addProduct(product);
      setFormValues(initialFormValues);
      onClose();
    } catch {
      // The mutation error is displayed through productPError.
    }
  };

  const updateField = (field: keyof ProductFormValues, value: string) => {
    setFormValues((current) => ({...current, [field]: value}));
  };

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !productPLoading) {
          onClose();
        }
      }}
    >
      <form
        className="w-full max-w-lg space-y-4 rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={titleId} className="text-xl font-semibold text-white">
              Add product
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Complete all fields.
            </p>
          </div>
          <button
            type="button"
            aria-label="Close modal"
            className="rounded-md px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed"
            disabled={productPLoading}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <label className="block text-sm font-medium text-slate-200">
          Image URL
          <input
            type="url"
            value={formValues.image}
            onChange={(event) => updateField("image", event.target.value)}
            placeholder="https://example.com/product.jpg"
            required
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Title
          <input
            type="text"
            value={formValues.title}
            onChange={(event) => updateField("title", event.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </label>

        <label className="block text-sm font-medium text-slate-200">
          Description
          <textarea
            value={formValues.description}
            onChange={(event) => updateField("description", event.target.value)}
            rows={3}
            required
            className="mt-1 w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-200">
            Category
            <select
              value={formValues.category}
              onChange={(event) => updateField("category", event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-blue-500"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-medium text-slate-200">
            Price
            <input
              type="number"
              value={formValues.price}
              onChange={(event) => updateField("price", event.target.value)}
              min="0.01"
              step="0.01"
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none placeholder:text-slate-600 focus:border-blue-500"
            />
          </label>
        </div>

        {(validationError || productPError) && (
          <p className="rounded-lg border border-rose-900/70 bg-rose-950/40 px-3 py-2 text-sm text-rose-300" role="alert">
            {validationError ?? productPError}
          </p>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={productPLoading}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={productPLoading}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {productPLoading ? "Adding..." : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddModal;
