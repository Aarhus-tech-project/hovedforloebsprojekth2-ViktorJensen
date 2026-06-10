import Link from "next/link";

export default function LandingNavbar() {
    return (
        <header className="fixed top-0 left-0 z-50 w-full bg-black">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight text-white-900"
                >
                CrackedTrades
                </Link>
                <div className="flex items-center gap-3">
                <Link
                    href="/login"
                    className="text-sm font-medium text-white-700 hover:bg-gray-500 px-4 py-2 rounded-lg"
                >
                    Log in
                </Link>
                <Link
                    href="/signup"
                    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    Get started
                </Link>
                </div>
            </div>
        </header>
    );
}