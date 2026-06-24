"use client"

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setMessage(null);


    if (!isVisible) return null;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            console.log(error);
            setTimeout(() => {
                setError("")
            }, 2000)
            return;
        }

        if (!username || !email || !password) {
        setMessage("Username, email, and password are required.");
        return;
        }

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
                credentials: "include",
            });

            if (!res.ok) {
                const errorBody = await res.json();
                setMessage("Signup failed");
                console.log(errorBody);
                return;
            }
            
            // Only reached if success
            router.push("/login");
            return;
        } catch (err) {
            setError("Something went wrong");
        }

        setMessage("Account created successfully! Continue to log in, to start investing!");
        setUsername("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-tr from-violet-600 via-rose-600 to-amber-600 px-6">
        <div className="absolute inset-0">
            <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 blur-3xl" />
        </div>
        <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="rounded border border-white/10 p-8 backdrop-blur-xl">
            <div className="mb-8 text-center">
                <div className="mb-3 text-4xl font-bold tracking-tight text-white">
                Create Account
                </div>
                <div className="text-gray-400">Start investing with confidence.</div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                <div className="mb-2 block text-sm text-gray-400">Username</div>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Ben Dover"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                <div className="mb-2 block text-sm text-gray-400">Email</div>
                <input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="bendover@example.com"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                <div className="mb-2 block text-sm text-gray-400">Password</div>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                </div>
                <div>
                <div className="mb-2 block text-sm text-gray-400">Repeat rassword</div>
                <input
                    name="confirmpassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full rounded border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                />
                {error ? (
                <p className="mt-4 text-center text-sm text-white">{error}</p>
                ) : null}
                </div>
                <button
                type="submit"
                onClick={() => setLoading(true)}
                className="flex justify-center w-full rounded bg-white py-3 font-semibold text-black transition-transform duration-200 hover:scale-105 hover:bg-gray-200 hover:cursor-pointer"
                >
                {loading ? "Creating account" : "Create account"}
                </button>
            </form>
            {message ? (
                <p className="mt-4 text-center text-sm text-white">{message}</p>
            ) : null}
            <div className="mt-6 text-center text-sm text-gray-400 flex justify-center">
                <div className="pr-2">Already have an account?</div>
                <Link href="/login" className="font-medium text-white hover:text-gray-300">
                Sign in
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
}