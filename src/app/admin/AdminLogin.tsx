// app/admin/AdminLogin.tsx
"use client";
import { useState } from "react";
export default function AdminLogin(){
  const [p,setP]=useState(""); const [err,setErr]=useState("");
  async function submit(e: any){
    e.preventDefault(); setErr("");
    const res = await fetch("/api/admin/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:p})});
    if (res.ok) location.reload(); else setErr("Invalid");
  }
  return (
    <form onSubmit={submit} className="max-w-sm mx-auto p-6 bg-white rounded shadow">
      <h2 className="mb-3 font-semibold">Admin login</h2>
      <input type="password" value={p} onChange={e=>setP(e.target.value)} placeholder="password" className="w-full mb-3 p-2 border rounded" />
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <button className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
  );
}
