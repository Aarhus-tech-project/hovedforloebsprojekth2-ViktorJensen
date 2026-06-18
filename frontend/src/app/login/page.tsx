"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [ form, setForm] = useState({ username: "", password: ""})
    const [ error, setError ] = useState('')
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("")

    try {
        const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include", //cookies are saved
    });

        if (res.ok) {
            window.dispatchEvent(new CustomEvent("authChanged"));
            router.push("/dashboard"); // redirect after login
        } else {
            const data = await res.json();
            setError(data.message || "Login failed");
        }
    } catch {
        setError("Something went wrong");
    };
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-tr from-violet-600 via-rose-600 to-amber-600 px-6">
        <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="rounded border border-white/10 p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
                <div className="mb-3 text-4xl font-bold tracking-tight text-white">
                Welcome back!
                </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                <div className="mb-2 block text-sm text-gray-400">Username</div>
                <input
                    onChange={handleChange}
                    name="username"
                    type="text"
                    placeholder="Ben Dover"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                </div>
                <div>
                <div className="mb-2 block text-sm text-gray-400">Password</div>
                <input
                    onChange={handleChange}
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                </div>
                <button
                type="submit"
                className="flex justify-center w-full rounded bg-white py-3 font-semibold text-black transition-transform duration-200 hover:scale-105 hover:bg-gray-200 hover:cursor-pointer"
                >
                Log in
                </button>
            </form>
            </div>
        </div>
        </div>
    );
}