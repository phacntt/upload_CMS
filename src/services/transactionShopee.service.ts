import { Page } from "@prisma/client";
import { CreatePageDto } from "../dto/page.dto";
import { context } from "../types/context.type";
import { deleteObject } from "../utils/S3";
import { CreateConstantDto } from "../dto/constant.dto";
import { CreateTransactionShopeeDto } from "../dto/transactionShopee.dto";

class TransactionShopeeService {
    public clients = context

    public getTransactions() {
        return this.clients.prisma.transactionShopee.findMany()
    }

    public getConstantById(id: number) {
        return this.clients.prisma.constant.findFirst({ where: { id } })
    }


    public async createTransaction(transactionData: any) {
        return await this.clients.prisma.transactionShopee.upsert({
            where: { itemId: transactionData.itemId },
            create: transactionData,
            update: transactionData
        })
    }
}

export default TransactionShopeeService