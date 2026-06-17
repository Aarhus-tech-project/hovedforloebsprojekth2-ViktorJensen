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
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex justify-center min-h-screen font-sans bg-linear-to-b from-black to-gray-900">
            <div className="w-screen h-screen ml-20 mr-20 mt-20 ">
                {User ? (<div className="font-bold text-3xl">{User.username}</div>) : (null)}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-slate-900 text-white p-4 rounded">
                        <div className="font-semibold">Portfolios</div>
                        <div className="flex">
                            <div className="mr-1 bg-slate-800 p-2 rounded-2xl font-semibold hover:cursor-pointer">New Portfolio</div>
                            <div className="ml-1 bg-blue-600 p-2 rounded-2xl font-semibold hover:cursor-pointer">Add funds</div>
                        </div>
                    </div>
                    <div className="bg-slate-900 text-white p-4 rounded">Value</div>
                    <div className="bg-slate-900 text-white p-4 rounded">My trades</div>
                    <div className="bg-slate-900 text-white p-4 rounded">Biggest movements</div>
                </div>
            </div>
        </div>
    );
}
