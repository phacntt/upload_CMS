import cron from 'node-cron'
import { context } from '../types/context.type'
import { Banner, Product, Shop } from '@prisma/client'
import moment from 'moment'
import { deleteArrObjects, listObjects } from './S3'
import { getDifference } from './helper'
import AffiliateAccessTradeService from '../services/affiliateAccessTrade.service'
import ShopService from '../services/shop.service'
import ProductService from '../services/product.service'
import { HttpException } from '../exception/HttpException'
import { CreateShopDto } from '../dto/shop.dto'
import { CreateProductDto } from '../dto/product.dto'
import TransactionShopeeService from '../services/transactionShopee.service'
import { setCache } from './handleRedis'

export const task = () => {
    const client = context
    const shopsAT = new AffiliateAccessTradeService();
    const transactionShopee = new TransactionShopeeService();
    const shopsService = new ShopService();
    const productsService = new ProductService();

    const taskUpdateStatusBanner = cron.schedule('0 0 * * *', async () => {
        const dateNow = moment().add(7, "hours").toDate()
        const banners = await client.prisma.banner.findMany()
        if (banners.length) {
            banners.map(async (banner: Banner) => {

                if (banner.status === 'Inactive' && dateNow >= banner.airTimeCreate && dateNow < banner.airTimeEnd) {
                    // console.log("update inactive")
                    await client.prisma.banner.updateMany({ where: { id: banner.id }, data: { status: "Active" } })
                }

                if (banner.status === 'Active' && (dateNow < banner.airTimeCreate || dateNow > banner.airTimeEnd)) {
                    // console.log("update Active")
                    await client.prisma.banner.updateMany({ where: { id: banner.id }, data: { status: "Inactive" } })
                }

                return []
            })
        }

    })

    const clearImageTrashS3 = cron.schedule('0 0 * * *', async () => {
        // Get all object need delete
        const listObjectsS3 = await listObjects()

        // Get keyObject ~ image in table Banner and Content
        const listImageBanner = await client.prisma.banner.findMany({ select: { image: true } })
        const listImageContent = await client.prisma.content.findMany({ select: { image: true } })

        // Get array Key to compare
        const listObjectsKey = listObjectsS3.Contents?.map((content: any) => content.Key)
        const listkeyCompare = Object.values([...listImageBanner, ...listImageContent].map(value => value.image))

        // Compare 2 array key to get key need delete in S3
        const difference = [
            ...getDifference(listObjectsKey!, listkeyCompare),
            ...getDifference(listkeyCompare, listObjectsKey!)
        ].map(key => {
            return { Key: key.substring(key.lastIndexOf("/") + 1) }
        })

        // Remove key in Object
        await deleteArrObjects(difference)

    })

    const createShop = cron.schedule('0 0 * * *', async () => {
        try {
            const shops: CreateShopDto[] = await shopsAT.getShops()
            setCache("total_shop", shops.length.toString())

            for (let item = 0; item < shops.length; item++) {
                await shopsService.createShops(shops[item])
            }
        } catch (error: any) {
            throw new HttpException(400, error);

        }

    })

    const createProduct = cron.schedule('0 3 * * *', async () => {
        try {
            const products: CreateProductDto[] = await shopsAT.getProducts()
            setCache("total_product", products.length.toString())
            for (let item = 0; item < products.length; item++) {
                await productsService.createProducts(products[item])
            }

        } catch (error: any) {
            throw new HttpException(400, error);

        }
    })

    const getTransactionShopee = cron.schedule('* * * * *', async () => {
        try {
            const transactions = await shopsAT.listTransaction()
            for (let item = 0; item < transactions!.length; item++) {
                if (transactions![item].earningStatus === "COMPLETED") {
                    await client.prisma.$transaction(async () => {
                        await transactionShopee.createTransaction(transactions![item]);
                        await transactionShopee.updateCalculatedOrder(transactions![item].itemId as string)
                    });
                } else {
                    await client.prisma.$transaction(async () => {
                        await transactionShopee.createTransaction(transactions![item])
                    });
                }
            }
        } catch (error: any) {
            throw new HttpException(400, error);

        }
    })

    taskUpdateStatusBanner.start();
    createProduct.start();
    createShop.start();
    getTransactionShopee.start();
    // clearImageTrashS3.start();

}
