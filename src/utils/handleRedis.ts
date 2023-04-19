import { redisMaster } from "./initRedis"

export const getCache = async (key: string) => {
    const cache = await redisMaster.get(key);
    if (cache) return JSON.parse(cache);
    return null;
  };
  
  export const setCache = async (key: string, value: string, ttl?: number) => {
    // await redisMaster.set(key, value, 'EX', 60 * 60);
    await redisMaster.set(key, value);
    ttl && await redisMaster.expireAt(key, ttl)
  };