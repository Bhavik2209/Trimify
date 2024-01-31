require("dotenv").config();

const express = require("express");
const path  = require("path");
const cookieParser = require("cookie-parser");
const {connectToMongoDB}  = require("./connection")

const { restrictToLoggedInUserOnly,checkAuth } = require("./middleware/auth"); 

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/static_router");
const userRoute = require("./routes/user");


const app = express();
const port = process.env.port || 3000;

connectToMongoDB(process.env.MONGO_URL)
.then(()=>console.log("connected to MognoDB"));

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());    

app.use('/url', restrictToLoggedInUserOnly ,urlRoute);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRoute);


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