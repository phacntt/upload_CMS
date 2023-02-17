-- CreateTable
CREATE TABLE "AiLeyBotDocumnet" (
    "id" SERIAL NOT NULL,
    "option" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "script" TEXT NOT NULL,

    CONSTRAINT "AiLeyBotDocumnet_pkey" PRIMARY KEY ("id")
);
