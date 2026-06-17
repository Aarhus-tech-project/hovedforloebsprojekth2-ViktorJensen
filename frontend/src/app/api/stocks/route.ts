import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

export async function GET() {
    const stocks = await prisma.stock.findMany({
        select: {
            id: true,
            name: true,
            data: {
                take: 1,
                orderBy: { fetchedAt: "desc" },
                select: {
                    close: true,
                    fetchedAt: true,
                },
            },
        },
    });

    console.log("Raw stocks from Prisma:", stocks);

    const payload = stocks.map((stock) => ({
        id: stock.id,
        name: stock.name,
        latestClose: stock.data[0]?.close ?? null,
        latestFetchedAt: stock.data[0]?.fetchedAt ?? null,
    }));

    console.log("Payload being returned:", payload);

    return NextResponse.json({ stocks: payload });
}