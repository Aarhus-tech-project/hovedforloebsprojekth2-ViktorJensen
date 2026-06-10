export default function Dashboard() {
    return (
        <div className="flex justify-center min-h-screen font-sans bg-slate-1000">
            <div className="w-screen h-screen ml-20 mr-20 mt-20 ">
                <div className="font-bold text-3xl">My economy</div>
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
