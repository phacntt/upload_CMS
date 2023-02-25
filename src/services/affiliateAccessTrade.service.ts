import { fetchAPI, fetchAPIShopee } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import { Category, Constant, Product } from "@prisma/client";
import { context } from "../types/context.type";
import fs from 'fs'
import { CreateProductDto } from "../dto/product.dto";
import { CreateShopDto } from "../dto/shop.dto";
import { CreateTransactionShopeeDto } from "../dto/transactionShopee.dto";

type ProductShopee = {
    itemId: string,
    commissionRate: string,
    appExistRate: string,
    appNewRate: string,
    webExistRate: string,
    webNewRate: string,
    commission: string,
    price: string,
    sales: number,
    imageUrl: string,
    productName: string,
    shopName: string,
    productLink: string,
    offerLink: string,
    periodEndTime: string,
    periodStartTime: string,
    categoryId: number,
}

type ShopShopee = {
    commissionRate: string,
    imageUrl: string,
    offerLink: string,
    periodEndTime: string,
    periodStartTime: string,
    shopName: string,
    originalLink: string,
    shopId: number,
    categoryId: number,
}

class AffiliateAccessTradeService {
    //Link AccessTrade
    public linkDataFeed = 'https://api.accesstrade.vn/v1/datafeeds';
    public linkCampaign = 'https://api.accesstrade.vn/v1/campaigns?approval=successful';
    public linkCommissionCampaign = 'https://api.accesstrade.vn/v1/commission_policies';
    public linkProductDetail = 'https://api.accesstrade.vn/v1/product_detail';
    public linkTransaction = 'https://api.accesstrade.vn/v1/transactions';
    public linkCoupon = 'https://api.accesstrade.vn/v1/offers_informations/coupon?limit=100';
    public client = context;

    // AccessTrade
    // Get product
    // public async getProducts(queryParam: any) {
    //     try {
    //         let param = ''
    //         if (queryParam.merchant) {
    //             param = `merchant=${queryParam.merchant}&`
    //         }
    //         if (queryParam.page) {
    //             param = param + `page=${queryParam.page}&`
    //         }
    //         if (queryParam.status_discount) {
    //             param = param + `status_discount=${queryParam.status_discount}&`
    //         }
    //         let productCreate: any[] = await this.getProductFromDataFeed(param)

    //         return productCreate
    //     } catch (error) {
    //         throw new HttpException(404, error as any)
    //     }
    // }


    public async getProducts() {
        try {
            const listCategory: Category[] = await this.client.prisma.category.findMany({ where: { page: { name: 'Shop to earn' } } })
            const CONSTANT_COMISSION_RATE = await this.client.prisma.constant.findFirst({ where: { name: "CONSTANT_COMMISSION_RATE" } }) as Constant
            let hasNextPage = true;

            let arrProduct: any[] = [];
            for (let i = 0; i < listCategory.length; i++) {
                for (let j = 0; j < listCategory[i].keywords.length; j++) {
                    let page = 1;
                    do {
                        await new Promise(resolve => setTimeout(resolve, 2000));

                        const cURL = { "query": "query ($keyword: String!, $page: Int!) {\r\n  productOfferV2(keyword: $keyword, page: $page) {\r\n    nodes {\r\n      commissionRate\r\n      periodStartTime\r\n      periodEndTime\r\n      commission\r\n      price\r\n      sales\r\n      productName\r\n      shopName\r\n      imageUrl\r\n      productLink\r\n      offerLink\r\n      itemId\r\n      appExistRate\r\n      appNewRate\r\n      webExistRate\r\n      webNewRate\r\n      itemId\r\n    }\r\n    pageInfo {\r\n      page\r\n      scrollId\r\n      hasNextPage\r\n    }\r\n  }\r\n}", "variables": { "keyword": `"${listCategory[i].keywords[j]}"`, "page": page } }

                        const callAPIShopee = await fetchAPIShopee(cURL)
                        const productsByCategory: ProductShopee[] = callAPIShopee.data.productOfferV2.nodes
                        productsByCategory.forEach(product => product.categoryId = listCategory[i].id)
                        hasNextPage = callAPIShopee.data.productOfferV2.pageInfo.hasNextPage
                        let arrItems: CreateProductDto[] = [];
                        for (let item of productsByCategory) {
                            let product: CreateProductDto = {
                                appExistRate: (Number(item.appExistRate) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                appNewRate: (Number(item.appNewRate) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                webExistRate: (Number(item.webExistRate) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                webNewRate: (Number(item.webNewRate) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                commission: (Number(item.commission) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                commissionRate: (Number(item.commissionRate) * (CONSTANT_COMISSION_RATE.value) / 100).toString(),
                                imageUrl: item.imageUrl,
                                itemId: item.itemId.toString(),
                                offerLink: item.offerLink,
                                periodEndTime: item.periodEndTime.toString(),
                                periodStartTime: item.periodStartTime.toString(),
                                price: item.price.toString(),
                                productLink: item.productLink,
                                productName: item.productName,
                                sales: item.sales,
                                shopName: item.shopName,
                                categoryId: item.categoryId,
                            }

                            arrItems.push(product)
                        }

                        arrProduct.push(arrItems)
                        page++;
                    } while (hasNextPage);
                }
            }
            return arrProduct.flat()

        } catch (error: any) {
            throw new HttpException(404, error as any)
        }
    }

    // Get Shops
    public async getShops() {
        try {
            const listCategory: Category[] = await this.client.prisma.category.findMany({ where: { page: { name: 'Shop to earn' } } })
            const CONSTANT_COMISSION_RATE = await this.client.prisma.constant.findFirst({ where: { name: "CONSTANT_COMMISSION_RATE" } }) as Constant

            let hasNextPage = true;
            let arrShops: any = [];

            for (let i = 0; i < listCategory.length; i++) {
                for (let j = 0; j < listCategory[i].keywords.length; j++) {
                    let page = 1;
                    do {
                        const cURL = { "query": "query ($keyword: String!, $page: Int!) {\r\n  shopOfferV2(keyword: $keyword, page: $page) {\r\n    nodes {\r\n      commissionRate\r\n      imageUrl\r\n      offerLink\r\n      periodStartTime\r\n      periodEndTime\r\n      offerLink\r\n      originalLink\r\n      shopId\r\n      shopName\r\n    }\r\n    pageInfo {\r\n      page\r\n      scrollId\r\n      hasNextPage\r\n    }\r\n  }\r\n}", "variables": { "keyword": `"${listCategory[i].keywords[j]}"`, "page": page } }

                        await new Promise(resolve => setTimeout(resolve, 3000));
                        const callAPIShopee = await fetchAPIShopee(cURL);
                        const shopsByCategory: ShopShopee[] = callAPIShopee.data.shopOfferV2.nodes;
                        shopsByCategory.forEach(shop => shop.categoryId = listCategory[i].id);
                        hasNextPage = callAPIShopee.data.shopOfferV2.pageInfo.hasNextPage;

                        let arrItems: CreateShopDto[] = []
                        for (let item of shopsByCategory) {
                            let shop: CreateShopDto = {
                                commissionRate: (Number(item.commissionRate) * (CONSTANT_COMISSION_RATE.value / 100)).toString(),
                                imageUrl: item.imageUrl,
                                offerLink: item.offerLink,
                                periodEndTime: item.periodEndTime.toString(),
                                periodStartTime: item.periodStartTime.toString(),
                                shopName: item.shopName,
                                originalLink: item.originalLink,
                                shopId: item.shopId,
                                categoryId: listCategory[i].id,
                            }
                            arrItems.push(shop)
                        }

                        arrShops.push(arrItems);
                        page++;
                    } while (hasNextPage);
                }
            }

            return arrShops.flat();
        } catch (error) {
            throw new HttpException(404, error as any)
        }

    }

    public async listTransaction() {
        try {
            const CONSTANT_COMISSION_RATE = await this.client.prisma.constant.findFirst({ where: { name: "CONSTANT_COMMISSION_RATE" } }) as Constant
            let hasNextPage = true;

            let arrTransaction: any[] = [];

            const cURL = { "query": "query ($scrollId: String!) {\r\n  conversionReport(scrollId: $scrollId) {\r\n    nodes {\r\n      purchaseTime\r\n      conversionId\r\n      conversionStatus\r\n      totalCommission\r\n      utmContent\r\n      orders {\r\n        items {\r\n          itemId\r\n          completeTime\r\n          itemName\r\n          itemPrice\r\n          displayItemStatus\r\n          actualAmount\r\n          qty\r\n          imageUrl\r\n          itemTotalCommission\r\n        },\r\n      }\r\n    }\r\n    pageInfo {\r\n      page\r\n      scrollId\r\n      hasNextPage\r\n    }\r\n  }\r\n}", "variables": { "scrollId": "" } }

            // await new Promise(resolve => setTimeout(resolve, 60000));
            const callAPIShopee = await fetchAPIShopee(cURL);
            const listTransactions = callAPIShopee.data.conversionReport.nodes;
            for (let transaction of listTransactions) {

                for (let order of transaction.orders) {
                    for (let item of order.items) {
                        const dataSave: CreateTransactionShopeeDto = {
                            commission: (Number(transaction.totalCommission) * (CONSTANT_COMISSION_RATE.value / 100)).toString(),
                            earningStatus: transaction.conversionStatus,
                            myEarning: '',
                            purchaseTime: transaction.purchaseTime.toString(),
                            transactionId: transaction.conversionId.toString(),
                            utmContent: transaction.utmContent,
                        }
                        dataSave.completeTime = item.completeTime.toString();
                        dataSave.itemCommission = (Number(item.itemTotalCommission) * (CONSTANT_COMISSION_RATE!.value / 100)).toString();
                        dataSave.orderStatus = item.displayItemStatus;
                        dataSave.orderValue = item.actualAmount;
                        dataSave.price = item.itemPrice;
                        dataSave.productName = item.itemName;
                        dataSave.quantity = item.qty;
                        dataSave.imageUrl = item.imageUrl;
                        dataSave.myCommission = '';
                        dataSave.itemId = item.itemId.toString();
                        arrTransaction.push(dataSave)
                    }
                }

            }
            return arrTransaction

        } catch (error) {

        }
    }

    public async getProductFromDataFeed(param: string) {
        const getDataFeed = await fetchAPI(this.linkDataFeed, param) as any
        return getDataFeed.data.map((prod: any) => {
            let dataObj = {
                linkAffilitate: prod.aff_link,
                // product_id: prod.product_id.substring(prod.product_id.indexOf('_') + 1),
                discountRate: prod.discount_rate,
                merchant: prod.merchant,
                discountAmount: prod.discount_amount,
                image: prod.image,
                description: prod.desc,
                linkProduct: prod.url,
                discount: prod.discount,
                name: prod.name,
                productId: prod.product_id,
                price: prod.price,
            }

            return dataObj
        })
    }

    public async convertLinkShortShopee(originUrl: string, subIds: string[]) {
        try {
            const cURL = { "query": "mutation ($originUrl: String!, $subIds: [String!]) {\r\n  generateShortLink(input:{originUrl: $originUrl, subIds: $subIds}) {\r\n    shortLink\r\n  }\r\n}", "variables": { "originUrl": originUrl, "subIds": subIds } }

            const shortLink = await fetchAPIShopee(cURL);

            return shortLink;
        } catch (error: any) {
            throw new HttpException(400, error)
        }
    }


}

export default AffiliateAccessTradeService