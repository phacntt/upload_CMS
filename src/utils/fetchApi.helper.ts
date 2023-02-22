import fetch from "node-fetch"
import { API_KEY_ACCESSTRADE, API_KEY_SHOPEE_APP_ID, API_KEY_SHOPEE_SECRET } from "../config"
import CryptoJS from "crypto-js"
import { HttpException } from "../exception/HttpException"

export const fetchAPI = async (linkAPI: string, param?: string) => {
    try {
        const fetchData = await fetch(linkAPI + (param ? "?" + param : ''), {
            method: 'GET',
            headers: {
                'Authorization': `Token ${API_KEY_ACCESSTRADE}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await fetchData.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export const fetchAPIShopee = async (cURL: any) => {
    try {
        const timeStamp = Math.ceil(new Date().getTime() / 1000)

        const payload = JSON.stringify(cURL)

        const factor = API_KEY_SHOPEE_APP_ID! + timeStamp + payload + API_KEY_SHOPEE_SECRET;

        const signature = CryptoJS.SHA256(factor).toString(CryptoJS.enc.Hex);

        const authorizationHeader = `SHA256 Credential=${API_KEY_SHOPEE_APP_ID}, Timestamp=${timeStamp}, Signature=${signature}`


        const data = await fetch(`https://open-api.affiliate.shopee.vn/graphql`, {
            method: 'POST',
            headers: {
                'Authorization': authorizationHeader,
                'Content-Type': 'application/json'
            },
            body: payload,
        })

        const dataResponse = await data.json();
        console.log(dataResponse)
        return dataResponse
    } catch (error: any) {
        throw new HttpException(400, error)
    }
}