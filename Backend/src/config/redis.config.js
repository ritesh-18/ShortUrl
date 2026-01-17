const { createClient } = require("redis");
const config = require("../constants/constants.d");

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
  },
});

let redisReady;

async function connectRedis() {
  if (!redisReady) {
    redisReady = redisClient.connect();
  }
  await redisReady;
  console.log(" Redis connected");
}

class RedisManager {
  static instance;

  constructor() {
    if (RedisManager.instance) {
      return RedisManager.instance;
    }
    this.redisClient = redisClient;
    RedisManager.instance = this;
  }

  static getInstance() {
    return new RedisManager();
  }

  async get(key) {
    const data = await this.redisClient.get(key);
    // console.log("getting from cache for key " ,key , data)
    return data ? JSON.parse(data) : null;
  }
  async setWithoutStale(key , value, expiry){
    await this.redisClient.setEx(key , expiry , JSON.stringify(value));
    // console.log("added into cache without stale for key " , key , value);
  }
  async set(cacheKey, staleKey, value) {
    await this.redisClient
       .multi()   // pipeline does not work in redis modules (use ioredis)
      .setEx(cacheKey, config.CACHE_TTL, JSON.stringify(value))
      .setEx(staleKey, config.STALE_TTL, JSON.stringify(value)).exec();


    // await this.redisClient.setEx(key, expiry, JSON.stringify(value));
    console.log("added into cache");
  }

  async delete(key) {
    await this.redisClient.del(key);
  }
  async addLock(lockKey){
   const lock = await this.redisClient.set(lockKey, '1', 'NX', 'EX', 5)
    return lock
  }
  async releaseLock(lockKey){
    await this.redisClient.del(lockKey)
  }
    sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = {
  RedisManager,
  connectRedis,
};