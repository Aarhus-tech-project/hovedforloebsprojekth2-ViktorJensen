"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Stock } from "../lib/types";

type SortField = "name" | "price";
type SortDirection = "asc" | "desc";

export default function StocksPage() {
    const router = useRouter();
    const [stocks, setStocks] = useState<Stock[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortField, setSortField] = useState<SortField>("name");
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    useEffect(() => {
        const fetchStocks = async () => {
            try {
                const res = await fetch("/api/stocks", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) {
                    setError("Kunne ikke hente stocks");
                    return;
                }

                const data = await res.json();
                setStocks(data.stocks);
            } catch (err) {
                console.error(err);
                setError("Netværksfejl ved hentning af aktier");
            } finally {
                setLoading(false);
            }
        };

        fetchStocks();
    }, []);

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const filteredStocks = stocks
        .filter((stock) =>
            stock.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let comparison = 0;

            if (sortField === "name") {
                comparison = a.name.localeCompare(b.name);
            } else if (sortField === "price") {
                comparison = (a.latestClose ?? 0) - (b.latestClose ?? 0);
            }

            return sortDirection === "asc" ? comparison : -comparison;
        });

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) {
            return <span className="ml-1 text-gray-500">⇅</span>;
        }
        return (
            <span className="ml-1 text-blue-400">
                {sortDirection === "asc" ? "↑" : "↓"}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading stocks...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-black to-gray-900 px-6 pt-24">
            <div className="mx-auto max-w-6xl">
                <h1 className="text-4xl font-bold text-white mb-8">Stocks</h1>

                {error ? (
                    <p className="mt-4 text-red-400">{error}</p>
                ) : (
                    <>
                        {/* Search */}
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Søg efter aktiernavn..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                            />
                        </div>

                        {/* Tabel */}
                        <div className="overflow-x-auto rounded-lg border border-white/10">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10 bg-slate-800/50">
                                        <th
                                            onClick={() => handleSort("name")}
                                            className="px-6 py-4 text-left text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition"
                                        >
                                            Navn
                                            <SortIcon field="name" />
                                        </th>
                                        <th
                                            onClick={() => handleSort("price")}
                                            className="px-6 py-4 text-right text-sm font-semibold text-gray-300 cursor-pointer hover:text-white transition"
                                        >
                                            Pris
                                            <SortIcon field="price" />
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Dato</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredStocks.map((stock) => (
                                        <tr
                                            key={stock.id}
                                            className="border-b border-white/5 transition hover:bg-white/5 cursor-pointer"
                                            onClick={() => router.push(`/stocks/${stock.id}`)}
                                        >
                                            <td className="px-6 py-4 text-white font-medium">{stock.name}</td>
                                            <td className="px-6 py-4 text-right text-white">
                                                {stock.latestClose != null
                                                    ? `$${stock.latestClose.toFixed(2)}`
                                                    : "N/A"}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm text-gray-400">
                                                {stock.latestFetchedAt
                                                    ? new Date(stock.latestFetchedAt).toLocaleDateString()
                                                    : "-"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {filteredStocks.length === 0 && (
                            <p className="mt-4 text-center text-gray-400">Ingen aktier fundet</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}