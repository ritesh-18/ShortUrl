const express = require("express")
const cors=require("cors")
const dotenv=require("dotenv")
const {checkDbHealth , connectDB}=require("./config/db.config");
const {RedisManager , connectRedis}= require("./config/redis.config");

const linkRoutes=require("./router/linkrouter")
 const runQuery=require("./db/db.queries")
dotenv.config(); 
const app= express()
app.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT"]

}));
app.use(express.json());
app.use("/api/links", linkRoutes);
connectRedis();
connectDB();
const PORT =process.env.PORT||3000;




app.get("/healthz", (_, res) => {
    res.json({ ok: true, version: "1.0" });
  });
app.get("/db/db-health" , async(req, res)=>{
  try {
    const result= await checkDbHealth();
    res.json( result);
    
  } catch (error) {
    res.status(error.status|| 500).json({ok:false, error:error.message});
    
  }
})
app.get("/:code", async (req, res) => {
  try {
    const code = req.params.code;

    if (!code) {
      return res.status(400).json({ error: "Code is required" });
    }

    // fetch data from db
    const findQuery = `SELECT * FROM short_url.links WHERE code = $1`;
    const result = await runQuery(findQuery, [code]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Link not found" });
    }

    const link = result.rows[0];

    //  Update clicks + lastClicked
    const updateQuery = `
      UPDATE short_url.links 
      SET clicks = clicks + 1, last_clicked = NOW()
      WHERE code = $1
    `;
    await runQuery(updateQuery, [code]);
    //  Redirect to original URL
    console.log("Redirecting to:" , link.target_url);

    return res.redirect(302, link.target_url);

  } catch (error) {
    console.error("Redirect error:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
    console.log('version:', process.env.MAJOR_VERSION + '.' + process.env.MINOR_VERSION);
});