const shortid = require("shortid"); 
const URL = require("../models/url");

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({error:"URL is required"})
    const  shortID = shortid();
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy: req.user._id,
    });
    return res.render("home",{id:shortID});

}

async function getAnalytics(req,res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({
        shortId
    })
    return res.json({
        totalClicks : result.visitHistroy.length,
        analytics : result.visitHistroy,
    });
}

module.exports = {
    handleGenerateNewShortURL,
    getAnalytics
}