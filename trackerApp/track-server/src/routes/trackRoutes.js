const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const Track = mongoose.model('Track')

const router = express()

router.use(requireAuth)  // to make all our routes here to pass through the requireAuth middleware...instead of apply it to each route one by one


// Fetch tracks from database
router.get('/tracks', async (req, res) => {
    //note that the middleware add a user property to the request when if token verification is successful
    // the middleware set the user property to a value equals the user information.
    // that is, req.user = user ... where user is the user information(email and password) gotten from database
    
    const tracks = await Track.find({userId: req.user._id}) 
    res.send(tracks)

})

router.post('/tracks', async (req, res)=>{
    const{name, locations} = req.body

    if(!name || !locations) {
        return res.send(" you must provide a name and location")
    }

    try{
    const track = new Track({
        name: name,
        locations: locations,
        userId: req.user._id
    })
    await track.save()
    res.send(track)
  } catch (err){
      return res.send("Provide appropriate i nformation")
  }
})



module.exports = router