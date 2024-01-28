const User = require("../models/user");

async function handleSignUp(req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.render("/");
}

async function handleLogIn(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
    return res.render("login",{
        error:"Invalid Username or Password"
    });
    return res.redirect("/");
}


module.exports = {
    handleSignUp,
    handleLogIn
}