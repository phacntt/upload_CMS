import { createClient } from "redis"
export const redisPub = createClient({
    url: process.env.REDIS_URL,
})

export const redisSub = createClient({
    url: process.env.REDIS_URL,
})

const initRedis = async () => {
    try {
        redisPub.on("error", (err) => console.error("Redis Pub Error", err))
        redisSub.on("error", (err) => console.error("Redis Sub Error", err))
        await redisPub.connect()
        await redisSub.connect()
        console.log(
            `🚀 Connect & runnding REDIS inside Docker - P ${process.env.REDIS_PORT ?? 6380} 🚀`
        )
    } catch (error) {
        console.log("Redis Client Error", error)
        // process.exit(1)
    }
}

export default initRedis

// Qmd286K6pohQcTKYqnS1YhWrCiS4gz7Xi34sdwMe9USZ7u
