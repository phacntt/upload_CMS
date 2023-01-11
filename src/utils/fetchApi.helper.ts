import fetch from "node-fetch"
import { AC_API_KEY } from "../config"

export const fetchAPI = async(linkAPI: string, param?: string) => {
    try {
        const fetchData = await fetch(linkAPI + (param ? "?" + param : ''), {
            method: 'GET',
            headers: {
                'Authorization': `Token ${AC_API_KEY}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => response.json())
        return fetchData
    } catch (error) {
        console.log(error)
    }
}