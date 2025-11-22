const express=require("express")
const { createShortLink, getAllLinks, getLinkById, deleteLinkById } = require("../controllers/links.controller")
const router=express.Router();
// router.get("/", (req, res)=>{
//     res.send("Link Router is working")
// })
// we need four routes here
//1. create a short link
//2. get all links
//3. get a single link by id
//4. delete a link by id

router.post('/', createShortLink);
router.get('/', getAllLinks);
router.get('/:code', getLinkById);
router.delete('/:code', deleteLinkById);
module.exports=router;