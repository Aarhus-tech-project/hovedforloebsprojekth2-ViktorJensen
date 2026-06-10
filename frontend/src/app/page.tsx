import Link from "next/link";

export default function Landing() {
    return (
        <section className="flex min-h-screen items-center justify-center bg-linear-to-b from-black to-gray-900 pt-20">
            <div className="text-center text-white">
                <h1 className="mb-6 text-6xl font-bold tracking-wider ">
                Look first / Then leap.
                </h1>
                <p className="mb-8 text-xl text-gray-300">
                Time in the market beats timing the market.
                </p>
                <Link href="/signup" className="rounded-xl bg-white px-8 py-3 font-semibold text-black hover:bg-gray-200">
                Get Started
                </Link>
                <p className="mb-8 mt-3 text-xs font-light text-gray-300 opacity-60">
                Totally free no credit card required
                </p>
            </div>
        </section>
    );
}
