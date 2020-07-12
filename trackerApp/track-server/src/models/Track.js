const mongoose = require('mongoose')



const pointSchema = new mongoose.Schema({
    timestamp: Number,
    coords: {
        latitude: Number,
        longitude: Number,
        altitude: Number,
        accuracy: Number,
        heading: Number,
        speed: Number
    }
})

const trackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        default: ''  // incase if someone did not provide a name, it will automatically give it default value of empty string
    },
    locations: [pointSchema] 
    // our locations will be an array of objects...we will create a schema for those objects called(pointschema)
    // pointSchema will be declared above the trackSchema
})


mongoose.model('Track', trackSchema)
//we are not going to load up the pointSchema because we dont want to tie our pointSChema with mongoose
// because we are not going to have a collection of pointSchemas.
// all the objects(pointSchema will be embedded inside the trackSchema)