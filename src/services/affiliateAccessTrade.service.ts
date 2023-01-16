import { fetchAPI } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import fs from 'fs'
import { Category, Product } from "@prisma/client";
import { context } from "../types/context.type";


export type ProductType = {
    image?: string;
    linkAffiliate?: string;
    linkMerchant?: string;
    discountRate?: number;
    name?: string;
    description?: string;
    price?: number;
    commisionPrice?: number;

  };

class AffiliateAccessTradeService {
    //Link AccessTrade
    public linkDataFeed = 'https://api.accesstrade.vn/v1/datafeeds';
    public linkCampaign = 'https://api.accesstrade.vn/v1/campaigns?approval=successful';
    public linkCommissionCampaign = 'https://api.accesstrade.vn/v1/commission_policies';
    public linkProductDetail = 'https://api.accesstrade.vn/v1/product_detail';
    public linkCoupon = 'https://api.accesstrade.vn/v1/offers_informations/coupon?limit=100'
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
            console.log(param)
            let productCreate: any[] = []
            const getDataFeed = await fetchAPI(this.linkDataFeed, param) as any
            console.log(getDataFeed)
            getDataFeed.data.map((prod: any) => {
                // image String
                // linkAffilitate String
                // linkProduct String
                // merchant String
                // discountRate Int
                // name String
                // description String
                // price Int
                // discountAmount Int
                let dataObj = {
                    aff_link: prod.aff_link,
                    product_id: prod.product_id.substring(prod.product_id.indexOf('_') + 1),
                    discount_rate: prod.discount_rate,
                    merchant: prod.merchant,
                    discount_amount: prod.discount_amount,
                }
                
                
                productCreate.push(dataObj)
                return productCreate
            })
            // console.log(productCreate)
            const listInfoProduct = Promise.all(productCreate.map(async (data: any) => {
                const prodDetail = await fetchAPI(this.linkProductDetail, `merchant=${queryParam.merchant}&product_id=${data.product_id}`)
                data.image = prodDetail.image
                data.desc = prodDetail.desc
                data.link = prodDetail.link
                data.discount = prodDetail.discount
                
                data.name = prodDetail.name
                data.price = prodDetail.price
                delete data.product_id
                return data
            })).then(resolve => resolve) ;
            return listInfoProduct
        } catch (error) {
            throw new HttpException(404, error as any)
        }
    }

    // Get category
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
            
            console.log(queryParam)

            let shopCreate: any[] = []
            const listShops = await fetchAPI(this.linkCampaign, param)
            console.log(listShops)
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
                    category: -1
                }
                listCategory.map((category: Category) => {
                    const listCategoryVN = category.nameVN.split(",")
                    listCategoryVN.find((cate: string) => {
                        if (shop.sub_category === cate.trim()) {
                            console.log(category.id)
                            dataObj.category = category.id
                        }
                    })
                    return dataObj
                })

                if (dataObj.category != -1) {
                    shopCreate.push(dataObj)
                }
                
            })
            
            
            return shopCreate
        } catch (error) {
            throw new HttpException(404, error as any)
        }

    }

    // Get category
    public async getCampaigns() {
        try {
            
            let productCreate: any[] = []
            const getDataFeed = await fetchAPI(this.linkCampaign)
            getDataFeed.data.map((prod: any) => {
                let dataObj = {
                    idCampaign: prod.id,
                    merchant: prod.merchant,
                    name: prod.name,
                    logo: prod.logo,
                    link: prod.url,
                    maxCom: prod.max_com,
                    introduction: prod.description.introduction,
                    actionPoint: prod.description.action_point,
                    commissionPolicy: prod.description.commission_policy,
                    cookiePolicy: prod.description.cookie_policy,
                    rejectedReason: prod.description.rejected_reason,
                    trafficBuildingPolicy: prod.description.traffic_building_policy,
                    otherNotice: prod.description.other_notice,
                    category: prod.category,
                    subCategory: prod.sub_category

                }

                productCreate.push(dataObj)

            })
            return productCreate

        } catch (error) {
            throw new HttpException(404, error as any)
        }

    }
    
}

export default AffiliateAccessTradeService