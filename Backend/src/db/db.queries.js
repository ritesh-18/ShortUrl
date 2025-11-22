//here we add the logic to interact with the databse using raw sql queries
const pool= require('../config/db.config')

async function runQuery(querytext, params=[]){

    const client=await pool.connect();
    try {
    
        const res=await client.query(querytext , params);
        return res;
    } catch (error) {
        console.error('Error acquiring client' , error.stack)
        throw new Error("Database query failed");
    }
}
module.exports=runQuery;