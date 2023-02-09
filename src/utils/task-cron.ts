import cron from 'node-cron'
import { context } from '../types/context.type'
import { Banner, Shop } from '@prisma/client'
import moment from 'moment'
import { deleteArrObjects, listObjects } from './S3'
import { getDifference } from './helper'
import AffiliateAccessTradeService from '../services/affiliateAccessTrade.service'
import fetch from 'node-fetch'
import ShopService from '../services/shop.service'
import ProductService from '../services/product.service'

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

    const createShop = cron.schedule('30 * * * *', async () => {
        const param = ''
        const listShopAT = await shopsAT.getShops(param);
        for (let index = 0; index < listShopAT!.length; index++) {
            await shopsService.createShops(listShopAT![index])
        }
        console.log("SHOP...............")
    })

    const createProduct = cron.schedule('0 0 * * *', async () => {
        let pageNumber = 1;
        while (pageNumber <= 20) {
            const param = {
                merchant: 'shopee',
                page: pageNumber
            }
            shopsAT.getProducts(param).then(result => {
                for (let index = 0; index < result.length; index++) {
                    productsService.createProducts(result[index])
                }
            }).catch(error => console.log(error));
            pageNumber++;
        }
        console.log("PRODUCT...............")
    })

    taskUpdateStatusBanner.start();
    createShop.start();
    createProduct.start();
    // clearImageTrashS3.start();

}
