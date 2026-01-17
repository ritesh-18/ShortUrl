const CACHE_TTL = 120;        // fresh cache
const STALE_TTL = 300;      // stale fallback
const LOCK_TTL = 5;         // lock expiry (seconds)
const MAX_RETRIES = 5; 
const cachekey=(userId)=>{
    return  `cache:user:{${userId}}`
}  
const staleKey=(userId)=>{
    return  `stale:user:{${userId}}`
} 
const lockKey=(userId)=>{
    return  `lock:user:{${userId}}`
}    
const cacheAllKeys=()=>{
    return `cache:all`
}
module.exports={
    CACHE_TTL , STALE_TTL ,LOCK_TTL , MAX_RETRIES , staleKey , cachekey , lockKey,cacheAllKeys
}