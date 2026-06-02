-- CreateTable
CREATE TABLE "UserData" (
    "userID" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "pwdHash" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "PortfolioData" (
    "portfolioID" UUID NOT NULL,
    "userID" UUID NOT NULL,
    "cashBalance" DECIMAL(65,30) NOT NULL,
    "totalValue" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PortfolioData_pkey" PRIMARY KEY ("portfolioID")
);

-- CreateTable
CREATE TABLE "Stock" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StockData" (
    "id" UUID NOT NULL,
    "stockId" UUID NOT NULL,
    "open" DOUBLE PRECISION NOT NULL,
    "close" DOUBLE PRECISION NOT NULL,
    "volume" BIGINT NOT NULL,
    "fetchedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StockData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "tradeID" UUID NOT NULL,
    "buyerID" UUID NOT NULL,
    "sellerID" UUID NOT NULL,
    "stockID" UUID NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "shareAmount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("tradeID")
);

-- CreateTable
CREATE TABLE "Holdings" (
    "portfolioID" UUID NOT NULL,
    "stockID" UUID NOT NULL,
    "tradeID" UUID NOT NULL,

    CONSTRAINT "Holdings_pkey" PRIMARY KEY ("portfolioID","stockID","tradeID")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_email_key" ON "UserData"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserData_username_key" ON "UserData"("username");

-- CreateIndex
CREATE INDEX "PortfolioData_userID_idx" ON "PortfolioData"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_name_key" ON "Stock"("name");

-- CreateIndex
CREATE INDEX "StockData_stockId_fetchedAt_idx" ON "StockData"("stockId", "fetchedAt");

-- CreateIndex
CREATE UNIQUE INDEX "StockData_stockId_fetchedAt_key" ON "StockData"("stockId", "fetchedAt");

-- AddForeignKey
ALTER TABLE "PortfolioData" ADD CONSTRAINT "PortfolioData_userID_fkey" FOREIGN KEY ("userID") REFERENCES "UserData"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StockData" ADD CONSTRAINT "StockData_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_stockID_fkey" FOREIGN KEY ("stockID") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_buyerID_fkey" FOREIGN KEY ("buyerID") REFERENCES "UserData"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_sellerID_fkey" FOREIGN KEY ("sellerID") REFERENCES "UserData"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holdings" ADD CONSTRAINT "Holdings_portfolioID_fkey" FOREIGN KEY ("portfolioID") REFERENCES "PortfolioData"("portfolioID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holdings" ADD CONSTRAINT "Holdings_stockID_fkey" FOREIGN KEY ("stockID") REFERENCES "Stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holdings" ADD CONSTRAINT "Holdings_tradeID_fkey" FOREIGN KEY ("tradeID") REFERENCES "Trade"("tradeID") ON DELETE RESTRICT ON UPDATE CASCADE;
