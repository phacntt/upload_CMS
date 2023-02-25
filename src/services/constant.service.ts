import { Page } from "@prisma/client";
import { CreatePageDto } from "../dto/page.dto";
import { context } from "../types/context.type";
import { deleteObject } from "../utils/S3";
import { CreateConstantDto } from "../dto/constant.dto";

export type Filterpage = {
    page?: number;
    limit?: number;
    pagepage?: string
}

class ConstantService {
    public clients = context

    public getConstants() {
        return this.clients.prisma.constant.findMany()
    }

    public getConstantById(id: number) {
        return this.clients.prisma.constant.findFirst({ where: { id } })
    }


    public createConstant(newConstant: CreateConstantDto) {
        return this.clients.prisma.constant.create({ data: newConstant });
    }

    public async updateValueConstant(id: number, dataUpdate: CreateConstantDto) {
        const updateConstant = await this.clients.prisma.constant.update({ where: { id }, data: dataUpdate });
        const constantWasUpdate = await this.getConstantById(updateConstant.id);
        return constantWasUpdate
    }
}

export default ConstantService