// import "dotenv/config";
// import { Pool } from "pg";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma/client";
// import fs from "fs";

// const connectionString = `${process.env.DATABASE_URL}`
// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })
// const bcrypt = require('bcrypt')
// const saltRounds = 12
// const pwd = process.env.PWD_HASH

// async function new_user() {
//     const hashPwd = await bcrypt.hash(pwd, saltRounds)
//     const viktor = await prisma.userData.upsert({
//         where: {email: "goat@gmail.com" },
//         update: {},
//         create: {
//             email: "goat@gmail.com",
//             username: "Goat",
//             pwdHash: hashPwd
//         }
//     })
//     console.log(viktor)
// }

// new_user()
//     .then(async () => {
//         await prisma.$disconnect();
//         await pool.end();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         await pool.end();
//         process.exit(1);
//     });
// import path from "path";

// const connectionString = `${process.env.DATABASE_URL}`
// const pool = new Pool({ connectionString })
// const adapter = new PrismaPg(pool)
// const prisma = new PrismaClient({ adapter })
// const filePath = path.join(__dirname, "seed.json");

// async function main() {
// const raw = fs.readFileSync(filePath, "utf8");
// const data = JSON.parse(raw);

// const fetchedAt = new Date(
//     data.fetch_time.split("/").reverse().join("-")
// );

// for (const stock of data.stocks) {
//     const dbStock = await prisma.stock.upsert({
//     where: {
//         name: stock.name,
//     },
//     update: {},
//     create: {
//         name: stock.name,
//     },
//     });

//     await prisma.stockData.create({
//     data: {
//         stockId: dbStock.id,
//         open: stock.open,
//         close: stock.close,
//         volume: BigInt(stock.volume),
//         fetchedAt,
//     },
//     });
// }
// }

// main()
// .catch(console.error)
// .finally(() => prisma.$disconnect());