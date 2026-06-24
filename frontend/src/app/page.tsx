import Link from "next/link";

export default function Landing() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-linear-to-tr from-violet-600 via-rose-600 to-amber-600 pt-20">
            <div className="text-center text-white ">
                <h1 className="mb-6 text-6xl font-bold tracking-wider ">
                Look first / Then leap.
                </h1>
                <p className="mb-8 text-xl text-gray-300">
                Time in the market beats timing the market.
                </p>
                <div className="transition-transform duration-200 hover:scale-105">
                    <Link href="/signup" className="rounded bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200 transition-transform duration-200 hover:scale-105">
                    Get Started
                    </Link>
                </div>
            </div>
        </section>
    );
}
