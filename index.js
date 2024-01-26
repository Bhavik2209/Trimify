const express = require("express");
const {connectToMongoDB}  = require("./connection")
const urlRoute = require("./routes/url");

const URL = require("./models/url");

const app = express();
const port =3000;

connectToMongoDB("mongodb://localhost:27017/short-url-db")
.then(()=>console.log("connected to MognoDB"));

app.use(express.json());

app.use('/url',urlRoute);

app.get('/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{ $push:{
        visitHistroy: {
            timestamp : Date.now(),
        },
    } });
    res.redirect(entry.redirectURL)
});

app.listen(port,()=>{
    console.log("Server is runnning");
})