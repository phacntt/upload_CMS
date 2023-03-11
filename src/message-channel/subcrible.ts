import { redisSub } from "../utils/initRedis"

type Notification = {
    userId: number
    message: string
    isRead: boolean
}

export const handleSubcribeChannel = async (pushEventManager: any) => {
    await redisSub.subscribe("ADD_AD", async (msg: string) => {
        const data = JSON.parse(msg)
        const advUserId = data.id
        const dataSend: Notification = {
            userId: advUserId,
            message: "Ads " + data.name + " was approve!!",
            isRead: false
        }
        pushEventManager.send(advUserId, dataSend)
        // const notificationStore = new NotificationResolver
        // await notificationStore.createNotification({userId: advUserId, message: dataSend.message})
        // return requestAddAdToAdserver(modifyAd(data))
    })

    await redisSub.subscribe("REMOVE_AD", (msg: string) => {
        const data = JSON.parse(msg)
        console.log(data)
        // return requestRemoveAd(data.adId)
    })

    await redisSub.subscribe("TEST-1", (msg: string) => {
        const data = JSON.parse(msg)
        console.log(data)
        
        // return requestRemoveAd(data.adId)
    })
}
