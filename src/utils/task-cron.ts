import cron from 'node-cron'
import { context } from '../types/context.type'
import { Banner } from '@prisma/client'

export const task = () => {
    const client = context
    const taskUpdate = cron.schedule('0 * * * *', async() => {
        const dateNow = new Date()
        const banners = await client.prisma.banner.findMany() 
        if (banners.length) {
            let arrBannerActive: Banner[] = []
            let arrBannerInactive: Banner[] = []
            banners.map((banner: Banner) => {
                if (banner.status === 'Inactive' && banner.airTimeCreate >= dateNow) {
                    banner.status = 'Active'
                    arrBannerActive.push(banner)
                }
            })
            banners.map((banner: Banner) => {
                if (banner.status === 'Active' && banner.airTimeEnd < dateNow) {
                    banner.status = 'Inactive'
                    arrBannerInactive.push(banner)
                }
            })
            if (arrBannerActive.length) {
                await client.prisma.banner.updateMany({data: arrBannerActive})
            }
            if (arrBannerInactive.length) {
                await client.prisma.banner.updateMany({data: arrBannerInactive})
            }
        }

    })
    taskUpdate.start();
}
