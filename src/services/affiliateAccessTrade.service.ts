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
    public linkProductDetail = 'https://api.accesstrade.vn/v1/product_detail'
    public client = context

    // AccessTrade
    // Get product
    public async getProducts(queryParam: any) {
        try {
            let param = ''
            if (queryParam.merchant) {
                param = `merchant=${queryParam.merchant}&`
            }
            if (queryParam.limit) {
                param = param + `limit=${queryParam.limit}&`
            }
            console.log(param)
            let productCreate: any[] = []
            const getDataFeed = await fetchAPI(this.linkDataFeed, param) as any
            console.log(getDataFeed)
            getDataFeed.data.map((prod: any) => {
                let dataObj = {
                    aff_link: prod.aff_link,
                    product_id: prod.product_id.substring(prod.product_id.indexOf('_') + 1),
                    discount_rate: prod.discount_rate,
                    merchant: prod.merchant,
                    category_name: ''
                }
                if (queryParam.merchant === 'lazada' || queryParam.merchant === 'sendovn') {
                    dataObj.category_name = prod.cate
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
                if (queryParam.merchant === 'shopee' || queryParam.merchant === 'tikivn' ) {
                    data.category_name = prodDetail.category_name
                }
                data.name = prodDetail.name
                data.price = prodDetail.price
                return data
            })).then(resolve => resolve) ;
            return listInfoProduct
        } catch (error) {
            throw new HttpException(404, error as any)
        }
    }

    // Get category
    public async getCategories(queryParam: any) {
        try {
            let param = ''
            if (queryParam.merchant) {
                param = `merchant=${queryParam.merchant}`
            }
            let productCreate: any[] = []
            const getDataFeed = await fetchAPI(this.linkDataFeed, `merchant=${queryParam.merchant}&update_from=01-01-2018&update_to=01-01-2023&limit=200`) as any
            getDataFeed.data.map((prod: any) => {
                let dataObj = {
                    product_id: prod.product_id.substring(prod.product_id.indexOf('_') + 1),
                    merchant: prod.merchant,
                    category_name: ''
                }
                if (queryParam.merchant === 'lazada' || queryParam.merchant === 'sendovn') {
                    dataObj.category_name = prod.cate
                }
                
                productCreate.push(dataObj)
                return productCreate
            })
            const listInfoProduct = Promise.all(productCreate.map(async (data: any) => {
                const prodDetail = await fetchAPI(this.linkProductDetail, `merchant=${queryParam.merchant}&product_id=${data.product_id}`)
                if (queryParam.merchant === 'shopee' || queryParam.merchant === 'tikivn' ) {
                    data.category_name = prodDetail.category_name
                }
                delete data.product_id
                return data
            })).then(resolve => resolve)
            const seen = new Set()
            const filterArray = (await listInfoProduct).filter((el: any) => {
                const duplicate = seen.has(el.category_name);
                seen.add(el.category_name)
                return !duplicate
            })
            console.log(filterArray.length)
            return filterArray
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
                    otherNotice: prod.description.other_notice
                }
               
                
                productCreate.push(dataObj)
                return productCreate
            })
            
            return productCreate
        } catch (error) {
            throw new HttpException(404, error as any)
        }

    }
    
}

export default AffiliateAccessTradeService