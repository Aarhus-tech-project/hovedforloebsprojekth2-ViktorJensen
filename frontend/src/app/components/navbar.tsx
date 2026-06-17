"use client"

import Link from "next/link";
import { User } from "../lib/types"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user/dashboard", {
                    credentials: "include",
                });

                if (!res.ok) {
                    setUser(null);
                    return;
                }

                const data = await res.json();
                setUser(data.user ?? null);
            } catch (err) {
                console.error("Failed to fetch auth status", err);
                setUser(null);
            }
        };

        const handleAuthChanged = () => {
            fetchUser();
        };

        fetchUser();
        window.addEventListener("authChanged", handleAuthChanged);

        return () => {
            window.removeEventListener("authChanged", handleAuthChanged);
        };
    }, [])

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setUser(null);
            router.push("/login");
        }
    }

    return (
        <>
        {!user?.userID ? (
            <header className="fixed top-0 left-0 z-50 w-full bg-black">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <Link
                        href="/"
                        className="text-xl font-bold tracking-tight text-white-900 transition-transform duration-200 hover:scale-105"
                    >
                    CrackedTrades
                    </Link>
                    <div className="flex items-center gap-3">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-white-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-105"
                    >
                        Get started
                    </Link>
                    </div>
                </div>
            </header>
        ) : 
            <header className="fixed top-0 left-0 z-50 w-full bg-black">
                    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight text-white-900 transition-transform duration-200 hover:scale-105"
                        >
                        CrackedTrades
                        </Link>
                        <div className="flex items-center gap-3">
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-white-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition-transform duration-200 hover:scale-105"
                        >
                            Log out
                        </button>
                        </div>
                    </div>
                </header>}
        </>
    );
}