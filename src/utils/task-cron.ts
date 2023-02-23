import cron from 'node-cron'
import { context } from '../types/context.type'
import { Banner, Product, Shop } from '@prisma/client'
import moment from 'moment'
import { deleteArrObjects, listObjects } from './S3'
import { getDifference } from './helper'
import AffiliateAccessTradeService from '../services/affiliateAccessTrade.service'
import fetch from 'node-fetch'
import ShopService from '../services/shop.service'
import ProductService from '../services/product.service'
import { HttpException } from '../exception/HttpException'
import { CreateShopDto } from '../dto/shop.dto'
import { CreateProductDto } from '../dto/product.dto'

export const task = () => {
    const client = context
    const shopsAT = new AffiliateAccessTradeService();
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
        const listImageContent = await client.prisma.banner.findMany({ select: { image: true } })

        // Get array Key to compare
        const listObjectsKey = listObjectsS3.Contents?.map((content: any) => content.Key)
        const listkeyCompare = Object.values([...listImageBanner, ...listImageContent].map(value => value.image))

        // Compare 2 array key to get key need delete in S3
        const difference = [
            ...getDifference(listObjectsKey!, listkeyCompare),
            ...getDifference(listkeyCompare, listObjectsKey!)
        ].map(key => {
            return { Key: key }
        })

        // Remove key in Object
        await deleteArrObjects(difference)

    })

    // Lay time theo UTC (Lay time hien tai - 7)
    const createShop = cron.schedule('0 * * * *', async () => {
        try {
            console.time("shop");
            console.log("Bắt đầu: ", new Date().toISOString())

            const shops: CreateShopDto[] = await shopsAT.getShops()
            for (let item = 0; item < shops.length; item++) {
                await shopsService.createShops(shops[item])
            }

            console.log("SHOP WAS CREATED...............")
            console.log("Kết thúc: ", new Date().toISOString())
            console.timeEnd("shop");
        } catch (error: any) {
            throw new HttpException(400, error);

        }

    })

    const createProduct = cron.schedule('0 */2 * * *', async () => {
        try {
            console.time("product");
            console.log("Bắt đầu: ", new Date().toISOString())
            console.log(new Date().toISOString())

            const products: CreateProductDto[] = await shopsAT.getProducts()
            for (let item = 0; item < products.length; item++) {
                await productsService.createProducts(products[item])
            }

            console.log("PRODUCT WAS CREATED ...............")
            console.log("Kết thúc: ", new Date().toISOString())
            console.timeEnd("product");

        } catch (error: any) {
            throw new HttpException(400, error);

        }
    })

    taskUpdateStatusBanner.start();
    createProduct.start();
    createShop.start();
    // clearImageTrashS3.start();

}
