const runQuery = require("../db/db.queries");
const { RedisManager }= require("../config/redis.config");
const keys = require("../constants/constants.d");
let globalCount=0
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function createShortLinkService({ targetUrl, code }) {
  try {
    if (!targetUrl) {
      const err = new Error("targetUrl is required");
      err.status = 400;
      throw err;
    }

    if (!isValidUrl(targetUrl)) {
      const err = new Error("Invalid URL format");
      err.status = 400;
      throw err;
    }

    if (code && !/^[a-zA-Z0-9]{6,8}$/.test(code)) {
      const err = new Error("Invalid code format");
      err.status = 400;
      throw err;
    }

    // generate 6-8 char random code
    const shortCode = code || Math.random().toString(36).substring(2, 8);

    // check duplicate
    const exists = await runQuery(
      `SELECT * FROM short_url.links WHERE code = $1`,
      [shortCode]
    );

    if (exists.rows.length > 0) {
      const err = new Error("Code already exists");
      err.status = 409;
      throw err;
    }

    const result = await runQuery(
      `INSERT INTO short_url.links (code, target_url) VALUES ($1, $2) RETURNING *`,
      [shortCode, targetUrl]
    );

    return result.rows[0];

  } catch (error) {
    const err = new Error("Error in createShortLinkService: " + error.message);
    err.status = error.status || 500;
    throw err;
  }
}

async function getAllLinksService() {
  try {
   
    
    const result = await runQuery(
      `SELECT * FROM short_url.links ORDER BY created_at DESC`
    );
    // set the cache data
    console.log("Fetched links:");
    return result.rows;  // empty is OK

  } catch (error) {
    const err = new Error("Error in getAllLinksService: " + error.message);
    err.status = 500;
    throw err;
  }
}

async function getLinkByIdService(code) {
  try {
    if (!code) {
      const err = new Error("Code is required");
      err.status = 400;
      throw err;
    }
     // fetch links from cache if exists , otherwise from db and set cache
     // if not in cache , then add lock (redis lock on that data 0) and then fetch from db and set cache also for others users add fallback and stale data logic
    // here we skip lock and stale for all links fetch for simplicity
    const data=await RedisManager.getInstance().get(keys.cachekey(code))
    if(data){
      globalCount++;
      console.log("Fetched links from cache source : " , globalCount);

      return {...data , source:'cache'}
    }

    const result = await runQuery(
      `SELECT * FROM short_url.links WHERE code=$1`,
      [code]
    );

    if (result.rows.length === 0) {
      const err = new Error("Link not found");
      err.status = 404;
      throw err;
    }
    await RedisManager.getInstance().setWithoutStale(keys.cachekey(code) , result?.rows[0] , keys.CACHE_TTL)
    globalCount++;
    console.log("Fetched links from DB source. Total fetch count: ", globalCount);
    return {...result.rows[0] , source:'db'};

  } catch (error) {
    const err = new Error("Error in getLinkByIdService: " + error.message);
    err.status = error.status || 500;
    throw err;
  }
}

async function deleteLinkByIdService(code) {
  try {
    if (!code) {
      const err = new Error("Code is required");
      err.status = 400;
      throw err;
    }

    const result = await runQuery(
      `DELETE FROM short_url.links WHERE code=$1 RETURNING *`,
      [code]
    );

    if (result.rows.length === 0) {
      const err = new Error("Link not found");
      err.status = 404;
      throw err;
    }

    return result.rows[0];

  } catch (error) {
    const err = new Error("Error in deleteLinkByIdService: " + error.message);
    err.status = error.status || 500;
    throw err;
  }
}

module.exports = {
  createShortLinkService,
  getAllLinksService,
  getLinkByIdService,
  deleteLinkByIdService,
};
