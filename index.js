const express = require("express");
const path  = require("path");
const {connectToMongoDB}  = require("./connection")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static_router");

const URL = require("./models/url");

const app = express();
const port =3000;

connectToMongoDB("mongodb://localhost:27017/short-url-db")
.then(()=>console.log("connected to MognoDB"));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/url',urlRoute);
app.use('/',staticRoute);

app.get('/url/:shortId',async(req,res)=>{
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