import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-b from-black to-gray-900 px-6">
            <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2  blur-3xl" />
            </div>
            <div className="relative z-10 w-full max-w-md">
                <div className="rounded-xl border border-white/10  p-8 backdrop-blur-xl">
                    <div className="mb-8 text-center">
                        <div className="mb-3 text-4xl font-bold tracking-tight text-white">
                            Create Account
                        </div>
                        <div className="text-gray-400">
                            Start investing with confidence.
                        </div>
                    </div>
                    <form className="space-y-5">
                        <div>
                            <div className="mb-2 block text-sm text-gray-400">
                                Full Name
                            </div>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block text-sm text-gray-400">
                                Email
                            </div>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                            />
                        </div>
                        <div>
                            <div className="mb-2 block text-sm text-gray-400">
                                Password
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition focus:border-white/30 focus:bg-white/10"
                            />
                        </div>
                        <div 
                            className="flex justify-center w-full rounded-xl bg-white py-3 font-semibold text-black transition-transform duration-200 hover:scale-105 hover:bg-gray-200 hover:cursor-pointer"
                        >
                            Create Account
                        </div>
                    </form>
                    <div className="mt-6 text-center text-sm text-gray-400 flex justify-center">
                        <div className="pr-2">
                        Already have an account?
                        </div>
                        <Link
                            href="/login"
                            className="font-medium text-white hover:text-gray-300"
                        >
                            Sign in
                        </Link>
                    </div>
                </div>
                <div className="mt-6 text-center text-xs text-gray-500">
                    Totally free no credit card required
                </div>
            </div>
        </div>
    );
}