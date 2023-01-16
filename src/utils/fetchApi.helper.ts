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
        }).then((response) => response.json())
        return fetchData
    } catch (error) {
        console.log(error)
    }
}