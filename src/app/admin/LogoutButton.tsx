// app/admin/LogoutButton.tsx
"use client";
export default function LogoutButton(){
  return <button onClick={async()=>{await fetch('/api/admin/logout',{method:'POST'}); location.reload();}} className="px-3 py-1 border rounded">Logout</button>;
}
