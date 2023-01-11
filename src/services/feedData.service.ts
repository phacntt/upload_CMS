import { Product } from "@prisma/client";
import fetch from 'node-fetch'
import { fetchAPI } from "../utils/fetchApi.helper";
import { HttpException } from "../exception/HttpException";
import { resolve } from "path";
import fs from 'fs'


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

class FeedDataService {
    //Link AccessTrade
    public linkDataFeed = 'https://api.accesstrade.vn/v1/datafeeds';
    public linkCampaign = 'https://api.accesstrade.vn/v1/campaigns';
    public linkProductDetail = 'https://api.accesstrade.vn/v1/product_detail'


    // AccessTrade
    // Get product and save to DB
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
    // Get category and save to DB
    public async getCategories(merchant: string) {
        try {
            let param = ''
            if (merchant) {
                param = `merchant=${merchant}`
            }
            let productCreate: any[] = []
            const getDataFeed = await fetchAPI(this.linkDataFeed, `merchant=${merchant}&update_from=01-01-2018&update_to=01-01-2023&limit=200`) as any
            getDataFeed.data.map((prod: any) => {
                let dataObj = {
                    product_id: prod.product_id.substring(prod.product_id.indexOf('_') + 1),
                    category_name: ''
                }
                if (merchant === 'lazada' || merchant === 'sendovn') {
                    dataObj.category_name = prod.cate
                }
                
                productCreate.push(dataObj)
                return productCreate
            })
            const listInfoProduct = Promise.all(productCreate.map(async (data: any) => {
                const prodDetail = await fetchAPI(this.linkProductDetail, `merchant=${merchant}&product_id=${data.product_id}`)
                if (merchant === 'shopee' || merchant === 'tikivn' ) {
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
    
}

export default FeedDataService