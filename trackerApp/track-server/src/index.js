require("./models/User")
require("./models/Track")
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require("./routes/authRoutes")
const trackRoutes = require("./routes/trackRoutes")
const requireAuth = require("./middlewares/requireAuth")

const app = express() 


app.use(bodyParser.json())
app.use("/",authRoutes) //  the "/" is not necessary
app.use(trackRoutes)

//const mongoUri = "mongodb+srv://ridwan:Ridko5267$@react-native.18jix.mongodb.net/<dbname>?retryWrites=true&w=majority"
const mongoUri = "mongodb+srv://ridwan:Ridko5267$@tracker-app.slsrb.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log("connected to mongodb cloud")
})

mongoose.connection.on('error', (err) => {
    console.error("Error connecting to mongodb cloud", err)
})

app.get('/',requireAuth, (req, res) => {
    res.send({userId: req.user.email})
})




app.listen(4000, ()=>{
    console.log("Listening to port 4000")
})