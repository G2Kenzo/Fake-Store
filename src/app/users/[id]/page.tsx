import Link from "next/link";
import {notFound} from "next/navigation";
import {GetUser} from "@/services/userServices";

export const instant = false;

export default async function ViewUser({
  params,
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const userId = Number(id);
  if (!Number.isInteger(userId) || userId < 1) notFound();

  const user = await GetUser(userId);
  if (!user) notFound();

  return (
    <main className="min-h-screen bg-slate-950 p-6 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <Link href="/users" className="text-sm font-medium text-indigo-300 hover:text-indigo-200">← Back to users</Link>
        <section className="mt-5 rounded-xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800 pb-5">
            <div>
              <p className="text-sm text-indigo-300">User #{user.id}</p>
              <h1 className="mt-1 text-2xl font-bold text-white">{user.name.firstname} {user.name.lastname}</h1>
              <p className="mt-1 text-slate-400">@{user.username}</p>
            </div>
            <span className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">{user.email}</span>
          </div>
          <dl className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm text-slate-500">Phone</dt>
              <dd className="mt-1 text-slate-200">{user.phone}</dd>
            </div>
            <div>
              <dt className="text-sm text-slate-500">Postal code</dt>
              <dd className="mt-1 text-slate-200">{user.address.zipcode}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm text-slate-500">Address</dt>
              <dd className="mt-1 text-slate-200">{user.address.city}, {user.address.street} {user.address.number}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  );
}
