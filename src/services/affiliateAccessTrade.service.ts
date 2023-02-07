import { fetchAPI } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import { Category, Product } from "@prisma/client";
import { context } from "../types/context.type";

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
    public async getShops(queryParam: any) {
        try {
            let param = ''
            if (queryParam.merchant) {
                param = `merchant=${queryParam.merchant}&`
            }
            if (queryParam.approval) {
                param = `approval=${queryParam.approval}&`
            }
            if (queryParam.page) {
                param = `page=${queryParam.page}&`
            }

            let shopCreate: any[] = []
            const listShops = await fetchAPI(this.linkCampaign, param)
            const listCategory = await this.client.prisma.category.findMany()
            listShops.data.map((shop: any) => {
                let dataObj = {
                    name: shop.name,
                    logo: shop.logo,
                    url: shop.url,
                    max_com: shop.max_com,
                    introduction: shop.description.introduction,
                    action_point: shop.description.action_point,
                    commission_policy: shop.description.commission_policy,
                    cookie_policy: shop.description.cookie_policy,
                    rejected_reason: shop.description.rejected_reason,
                    traffic_building_policy: shop.description.traffic_building_policy,
                    other_notice: shop.description.other_notice,
                    categoryId: -1
                }
                listCategory.map((category: Category) => {
                    const listCategoryVN = category.nameVN.split(",")
                    listCategoryVN.find((cate: string) => {
                        if (shop.sub_category === cate.trim()) {
                            dataObj.categoryId = category.id
                        }
                    })
                    return dataObj
                })

                if (dataObj.categoryId != -1) {
                    shopCreate.push(dataObj)
                }
                
            })
            
            
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
                price: prod.price,
            }
                            
            return dataObj
        })
    }


}

export default AffiliateAccessTradeService