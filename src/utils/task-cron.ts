import cron from 'node-cron'
import { context } from '../types/context.type'
import { Banner } from '@prisma/client'
import moment from 'moment'

export const task = () => {
    const client = context
    const taskUpdate = cron.schedule('0 0 * * *', async() => {
        const dateNow = moment().add(7, "hours").toDate()
        const banners = await client.prisma.banner.findMany()
        if (banners.length) {
            banners.map(async(banner: Banner) => {

                if (banner.status === 'Inactive' && dateNow >= banner.airTimeCreate && dateNow < banner.airTimeEnd) {
                    console.log("update inactive")
                    await client.prisma.banner.updateMany({where: {id: banner.id}, data: {status: "Active"}})
                }

                if (banner.status === 'Active' && (dateNow < banner.airTimeCreate || dateNow > banner.airTimeEnd)) {
                    console.log("update Active")
                    await client.prisma.banner.updateMany({where: {id: banner.id}, data: {status: "Inactive"}})
                }

                return []
            })
        }

    })
    return taskUpdate.start();
}
