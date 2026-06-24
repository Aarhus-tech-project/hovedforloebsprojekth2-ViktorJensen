"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { User } from "../lib/types"

export default function Dashboard() {
    const router = useRouter();
    const [ User, setUser ] = useState<User | null>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await fetch("/api/user/dashboard", {
                    method: "GET",
                    credentials: "include",
                })

                if (res.ok) {
                    const data = await res.json();
                    setUser(data.user);
                    console.log(data);
                    
                } else {
                    router.push("/login"); // unautherized, redirect
                }
            } catch (err) {
                console.error("Dashboard fetch failed", err)
                router.push("/login");
            } finally {
                setLoading(false)
            }
        };
        fetchDashboard();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
                <p className="">Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex justify-center min-h-screen font-sans bg-linear-to-tr from-violet-600 via-rose-600 to-amber-600">
            <div className="w-screen h-screen ml-20 mr-20 mt-20 ">
                {User ? (<div className="font-bold text-3xl">{User.username}</div>) : (null)}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white p-4 rounded">
                        <div className="font-semibold">Portfolios</div>
                        <div className="flex">
                            <div className="mr-1 bg-slate-800 p-2 rounded font-semibold hover:cursor-pointer transition-transform duration-200 hover:scale-105">New Portfolio</div>
                            <div className="ml-1 bg-emerald-600 p-2 rounded font-semibold hover:cursor-pointer transition-transform duration-200 hover:scale-105">Add funds</div>
                        </div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white p-4 rounded">Value</div>
                    <div className="bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white p-4 rounded">My trades</div>
                    <div className="bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] text-white p-4 rounded">Biggest movements</div>
                </div>
            </div>
        </div>
    );
}
