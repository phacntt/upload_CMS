import fetch from "node-fetch"
import { API_KEY_ACCESSTRADE } from "../config"

export const fetchAPI = async(linkAPI: string, param?: string) => {
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