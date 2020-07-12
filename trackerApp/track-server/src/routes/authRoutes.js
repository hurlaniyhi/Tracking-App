const express = require("express")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')


const router = express.Router()


router.post("/signup", async(req,res) => {
    console.log(req.body)
    
    const {email, password} = req.body  
    // we destructure so as to have access to the email and password sent during request without having to do
    // req.body.email or req.body.password
    try{
    const user = new User({
        email: email,
        password: password
    })
      
    await user.save()
    console.log("created")

    // CREATING A Json web TOken

    const token = jwt.sign({userId: user._id}, "MY_SECRET_KEY")
    // user._id is the id of the user gotten from the database...secret key can be any string

    res.send({token: token})

     } catch (err){
        //  if(!email || !password){
        //      return res.send("please enter email / password")
        //  }
        //  else{
        return res.status(422).send("user already exist")  // the return will simply not allow execution of anycode after this line
    //}
}
})

router.post('/signin', async(req, res) => {
    const {email, password} = req.body
    console.log(req.body)

    if (!email || !password){ 
      return  res.send("You must provide email and password")
    }
    
   const user = await User.findOne({email: email})
    // we are using await because the operation(asynchronous) is going to take some time as 
    // mongoose has to reach out to MongoDB database

    //NOTE: the user value gotten from the database will contain existing email and hashed password

    if(!user){
        return res.send("Invalid password or email")
    }
    else{
        try{
           await user.comparePassword(password)
           const token = jwt.sign({userId: user.id}, "MY_SECRET_KEY")
           res.send({token: token})
           console.log("welcome to your account")
        }
        catch(err){
            return res.status(422).send("Invalid password or email")
        }
    }
})



module.exports = router