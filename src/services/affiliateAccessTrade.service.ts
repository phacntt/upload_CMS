import { fetchAPI, fetchAPIShopee } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import { Category, Product } from "@prisma/client";
import { context } from "../types/context.type";
import fs from 'fs'
import { CreateProductDto } from "../dto/product.dto";
import { CreateShopDto } from "../dto/shop.dto";

type ProductShopee = {
    itemId: number,
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
        const listCategory: Category[] = await this.client.prisma.category.findMany({ where: { page: { name: 'Shop to earn' } } })
        let hasNextPage = true;

        let arrProduct: any[] = [];
        for (let i = 0; i < listCategory.length; i++) {
            for (let j = 0; j < listCategory[i].keywords.length; j++) {
                let page = 1;
                do {
                    await new Promise(resolve => setTimeout(resolve, 3000));

                    const cURL = { "query": "query ($keyword: String!, $page: Int!) {\r\n  productOfferV2(keyword: $keyword, page: $page) {\r\n    nodes {\r\n      commissionRate\r\n      periodStartTime\r\n      periodEndTime\r\n      commission\r\n      price\r\n      sales\r\n      productName\r\n      shopName\r\n      imageUrl\r\n      productLink\r\n      offerLink\r\n      itemId\r\n      appNewRate\r\n      appNewRate\r\n      webExistRate\r\n      webNewRate\r\n      itemId\r\n    }\r\n    pageInfo {\r\n      page\r\n      scrollId\r\n      hasNextPage\r\n    }\r\n  }\r\n}", "variables": { "keyword": `"${listCategory[i].keywords[j]}"`, "page": page } }

                    const callAPIShopee = await fetchAPIShopee(cURL)
                    const productsByCategory: ProductShopee[] = callAPIShopee.data.productOfferV2.nodes
                    productsByCategory.forEach(product => product.categoryId = listCategory[i].id)
                    hasNextPage = callAPIShopee.data.productOfferV2.pageInfo.hasNextPage
                    let arrItems: CreateProductDto[] = [];
                    for (let item of productsByCategory) {
                        let product: CreateProductDto = {
                            appExistRate: item.appExistRate,
                            appNewRate: item.appExistRate,
                            commission: item.commission,
                            commissionRate: item.commissionRate,
                            imageUrl: item.imageUrl,
                            itemId: item.itemId,
                            offerLink: item.offerLink,
                            periodEndTime: item.periodEndTime.toString(),
                            periodStartTime: item.periodStartTime.toString(),
                            price: item.price,
                            productLink: item.productLink,
                            productName: item.productName,
                            sales: item.sales,
                            shopName: item.shopName,
                            webExistRate: item.webExistRate,
                            webNewRate: item.webExistRate,
                            categoryId: listCategory[i].id,
                        }

                        arrItems.push(product)
                    }

                    arrProduct.push(arrItems)
                    page++;
                } while (hasNextPage);
            }
        }
        return arrProduct.flat()
    }

    // Get Shops
    public async getShops() {
        try {
            const listCategory: Category[] = await this.client.prisma.category.findMany({ where: { page: { name: 'Shop to earn' } } })
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
                                commissionRate: item.commissionRate,
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

    public async listTransaction(queryParam: any) {
        try {
            const listTransactionData = await fetchAPI(this.linkTransaction, queryParam)

            const dataSave = {
                transactionId: listTransactionData.transaction_id,
                orderStatus: listTransactionData.status,
                earningStatus: listTransactionData.is_confirmed,
                cancelReason: listTransactionData.reason_rejected,
                productName: listTransactionData.product_name,
                price: listTransactionData.product_price,
                orderValue: listTransactionData.transaction_value,
                commission: listTransactionData.commission
            }

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


}

export default AffiliateAccessTradeService