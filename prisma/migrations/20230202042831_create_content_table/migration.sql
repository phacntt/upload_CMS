-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "categorylv1" TEXT NOT NULL,
    "categorylv2" TEXT NOT NULL,
    "commissionModel" TEXT NOT NULL,
    "commissionType" TEXT NOT NULL,
    "commissionValue" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
