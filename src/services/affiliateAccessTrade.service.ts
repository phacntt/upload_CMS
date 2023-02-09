import { fetchAPI } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import { Category, Product } from "@prisma/client";
import { context } from "../types/context.type";

type DataCreateShop = {
    name: string,
    logo: string,
    url: string,
    max_com: string,
    introduction: string,
    action_point: string,
    commission_policy: string,
    cookie_policy: string,
    rejected_reason: string,
    traffic_building_policy: string, 
    other_notice: string,
    campaignId: number,
    categoryId: number
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
    public async getProducts(queryParam: any) {
        try {
            let param = ''
            if (queryParam.merchant) {
                param = `merchant=${queryParam.merchant}&`
            }
            if (queryParam.page) {
                param = param + `page=${queryParam.page}&`
            }
            let productCreate: any[] = await this.getProductFromDataFeed(param)
            
            return productCreate
        } catch (error) {
            throw new HttpException(404, error as any)
        }
    }

    // Get Shops
    public async getShops(queryParam?: any) {
        try {
            if (queryParam.merchant) {
                queryParam = `merchant=${queryParam.merchant}&`
            }

            if (queryParam.page) {
                queryParam = `page=${queryParam.page}&`
            }
            let shopCreate: any[] = []
            const listShops = await fetchAPI(this.linkCampaign, queryParam)
            const shops = listShops.data
            const listCategory = await this.client.prisma.category.findMany({where: {page: {id: 3}}})
            console.log("category: ", listCategory)
            for (let i = 0; i < listCategory.length; i++) {
                for (let j = 0; j < shops.length; j++) {
                    let dataObj: DataCreateShop = {
                        name: shops[j].name,
                        logo: shops[j].logo,
                        url: shops[j].url,
                        max_com: shops[j].max_com,
                        introduction: shops[j].description.introduction,
                        action_point: shops[j].description.action_point,
                        commission_policy: shops[j].description.commission_policy,
                        cookie_policy: shops[j].description.cookie_policy,
                        rejected_reason: shops[j].description.rejected_reason,
                        traffic_building_policy: shops[j].description.traffic_building_policy,
                        other_notice: shops[j].description.other_notice,
                        campaignId: shops[j].id,
                        categoryId: -1
                    }
                    if (shops[j].sub_category.indexOf(listCategory[i].nameVN) != -1 || listCategory[i].nameVN.indexOf(shops[j].sub_category) != -1) {
                        dataObj.categoryId = listCategory[i].id
                        shopCreate.push(dataObj)
                    }
                }
            }
            return shopCreate
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