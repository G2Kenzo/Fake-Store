"use client";

import {useState} from "react";
import Link from "next/link";
import {useUser} from "@/hooks/users/useUser";
import {useAddUser} from "@/hooks/users/useUserPost";
import {useUpdateUser} from "@/hooks/users/useUserEdit";
import {useUserDelete} from "@/hooks/users/useUserDelete";
import {newUser, User as UserType} from "@/types/users";
import UserFormModal from "./UserFormModal";
import { error } from "console";

export default function User() {
  const {UserData, UserLoading, UserError} = useUser();
  const {addUser, userPLoading, userPError} = useAddUser();
  const {UserEdit, userELoading, userEError} = useUpdateUser();
  const {UserDelete, userDLoading, userDError} = useUserDelete();
  const [modalUser, setModalUser] = useState<UserType | null | undefined>(
    undefined,
  );

  const handleSave = async (user: newUser) => {
    try {
      if (modalUser) {
        await UserEdit(modalUser.id, user);
      } else {
        await addUser(user);
      }
      setModalUser(undefined);
    } catch {
    }
  };

  const handleDelete = async (user: UserType) => {
    if (!window.confirm(`Do you want to delete ${user.username}?`)) return;

    try {
      await UserDelete(user.id);
    } catch {
    }
  };

  if (UserLoading) return <StateMessage message="Loading users..." />;
  if (UserError) return <StateMessage message={UserError} error />;

  return (
    <section className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Users</h1>
            <p className="mt-1 text-sm text-slate-400">
              Total: {UserData.length}
            </p>
          </div>
          <button
            onClick={() => setModalUser(null)}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Add user
          </button>
        </div>

        {userDError && <ErrorMessage message={userDError} />}

        {UserData.length === 0 ? (
          <StateMessage message="There are no users yet." />
        ) : (
          <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full min-w-180 text-left text-sm">
              <thead className="border-b border-slate-800 bg-slate-900 text-xs uppercase tracking-wider text-slate-300">
                <tr>
                  <th className="px-5 py-4">User</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">Telefon</th>
                  <th className="px-5 py-4">Address</th>
                  <th className="px-5 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {UserData.map((user) => (
                  <tr
                    key={user.id}
                    className="transition-colors hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-white">
                        {user.name.firstname} {user.name.lastname}
                      </p>
                      <p className="mt-0.5 text-slate-400">@{user.username}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{user.email}</td>
                    <td className="px-5 py-4 text-slate-300">{user.phone}</td>
                    <td className="px-5 py-4 text-slate-400">
                      {user.address.city}, {user.address.street}{" "}
                      {user.address.number}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/users/${user.id}`}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-800"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => setModalUser(user)}
                          className="rounded-lg border border-slate-700 px-3 py-1.5 text-slate-200 hover:bg-slate-800"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => void handleDelete(user)}
                          disabled={userDLoading}
                          className="rounded-lg border border-rose-900/70 bg-rose-950/40 px-3 py-1.5 text-rose-300 hover:bg-rose-900/50 disabled:cursor-not-allowed disabled:opacity-60"
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
        )}
      </div>

      {modalUser !== undefined && (
        <UserFormModal
          key={modalUser?.id ?? "new"}
          user={modalUser ?? undefined}
          isSubmitting={userPLoading || userELoading}
          error={userPError ?? userEError}
          onClose={() => setModalUser(undefined)}
          onSave={handleSave}
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
