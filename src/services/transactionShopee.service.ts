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

    public getTransactionById(id: number) {
        return this.clients.prisma.transactionShopee.findFirst({ where: { id } })
    }


    public async createTransaction(transactionData: any) {
        return await this.clients.prisma.transactionShopee.upsert({
            where: { itemId: transactionData.itemId },
            create: transactionData,
            update: transactionData
        })
    }

    public updateCalculatedOrder(idItem: string) {
        return this.clients.prisma.transactionShopee.update({ where: { itemId: idItem }, data: { calculated: true } })
    }

}

export default TransactionShopeeService