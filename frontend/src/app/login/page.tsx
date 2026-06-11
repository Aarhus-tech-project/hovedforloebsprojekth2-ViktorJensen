"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
    const [message, setMessage] = useState<string | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);

    if (!isVisible) return null;

    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-black to-gray-900 px-6">
        <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 w-full max-w-md">
            <div className="rounded-xl border border-white/10 p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
                <div className="mb-3 text-4xl font-bold tracking-tight text-white">
                Welcome back!
                </div>
            </div>
            <form onSubmit={handleLogin} className="space-y-5">
                <div>
                <div className="mb-2 block text-sm text-gray-400">Username</div>
                <input
                    name="username"
                    type="text"
                    placeholder="Ben Dover"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                </div>
                <div>
                <div className="mb-2 block text-sm text-gray-400">Password</div>
                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                </div>
                <Link href={"/dashboard"}>
                <button
                type="submit"
                className="flex justify-center w-full rounded-xl bg-white py-3 font-semibold text-black transition-transform duration-200 hover:scale-105 hover:bg-gray-200 hover:cursor-pointer"
                >
                Log in
                </button>
                </Link>
            </form>
            </div>
        </div>
        </div>
    );
}