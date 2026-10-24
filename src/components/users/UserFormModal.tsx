"use client";

import {FormEvent, useId, useState} from "react";
import {newUser, User} from "@/types/users";

type UserFormModalProps = {
  user?: User;
  isSubmitting: boolean;
  error: string | null;
  onClose: () => void;
  onSave: (user: newUser) => Promise<void>;
};

const emptyUser: newUser = {
  username: "",
  email: "",
  password: "",
  name: {firstname: "", lastname: ""},
  address: {
    city: "",
    street: "",
    number: 1,
    zipcode: "",
    geolocation: {lat: "0", long: "0"},
  },
  phone: "",
};

export default function UserFormModal({
  user,
  isSubmitting,
  error,
  onClose,
  onSave,
}: UserFormModalProps) {
  const [form, setForm] = useState<newUser>(user ?? emptyUser);
  const headingId = useId();

  const updateField = (field: keyof newUser, value: string) => {
    setForm((current) => ({...current, [field]: value}));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSave({
      ...form,
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      phone: form.phone.trim(),
      name: {
        firstname: form.name.firstname.trim(),
        lastname: form.name.lastname.trim(),
      },
      address: {
        ...form.address,
        city: form.address.city.trim(),
        street: form.address.street.trim(),
        zipcode: form.address.zipcode.trim(),
      },
    });
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
        className="max-h-full w-full max-w-2xl space-y-4 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        onSubmit={handleSubmit}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={headingId} className="text-xl font-semibold text-white">
              {user ? "Edit user" : "Add user"}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Enter account and delivery details.
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
            First name
            <input
              value={form.name.firstname}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: {...current.name, firstname: event.target.value},
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Last name
            <input
              value={form.name.lastname}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  name: {...current.name, lastname: event.target.value},
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Username
            <input
              value={form.username}
              onChange={(event) => updateField("username", event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Parol
            <input
              type="password"
              value={form.password}
              onChange={(event) => updateField("password", event.target.value)}
              minLength={6}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Telefon
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
        </div>

        <fieldset className="grid gap-4 rounded-lg border border-slate-700 p-4 sm:grid-cols-2">
          <legend className="px-1 text-sm font-semibold text-slate-300">
            Address
          </legend>
          <label className="text-sm font-medium text-slate-200">
            City
            <input
              value={form.address.city}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  address: {...current.address, city: event.target.value},
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Street
            <input
              value={form.address.street}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  address: {...current.address, street: event.target.value},
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            House number
            <input
              type="number"
              min="1"
              value={form.address.number}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  address: {
                    ...current.address,
                    number: Number(event.target.value),
                  },
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
          <label className="text-sm font-medium text-slate-200">
            Postal code
            <input
              value={form.address.zipcode}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  address: {...current.address, zipcode: event.target.value},
                }))
              }
              required
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-white outline-none focus:border-indigo-500"
            />
          </label>
        </fieldset>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-rose-900/70 bg-rose-950/40 px-3 py-2 text-sm text-rose-300"
          >
            {error}
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
