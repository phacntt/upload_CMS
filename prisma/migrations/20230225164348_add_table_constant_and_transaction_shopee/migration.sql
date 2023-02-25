-- CreateTable
CREATE TABLE "TransactionShopee" (
    "id" SERIAL NOT NULL,
    "transactionId" TEXT NOT NULL,
    "purchaseTime" TEXT NOT NULL,
    "orderStatus" TEXT NOT NULL,
    "myEarning" TEXT NOT NULL,
    "earningStatus" TEXT NOT NULL,
    "myCommission" TEXT NOT NULL,
    "productName" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "orderValue" TEXT NOT NULL,
    "utmContent" TEXT NOT NULL,
    "commission" TEXT,
    "itemCommission" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "completeTime" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TransactionShopee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Constant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Constant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionShopee_itemId_key" ON "TransactionShopee"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "Constant_name_key" ON "Constant"("name");
