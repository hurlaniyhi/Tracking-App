// FAKING MOVEMENT (so that we dont have to move with our phone when testing the app)

// import * as Location from 'expo-location'


// // the Location library exports a ton of different named functions
// // but using * as location, we are essentially getting a single variable
// // which references all those different function

// const tenMetersWithDegrees = 0.0001 // represent 10 meters in latituse and longitude 

// const getLocation = increment => {
//     // we will return an object that is a fake locaion reading..it will give some fake latitude and longitude
//     // and timestamp.
//     // it is going to be a trick that makes expo location think that our physical device is moving around the world.

//     return {
//         timestamp: 10000000,
//         coords: {
//             speed: 0,
//             heading: 0,
//             accuracy: 5,
//             altitudeAccuracy: 5,
//             altitude: 5,
//             longitude: -122.0312186 + increment * tenMetersWithDegrees,  // the expo will think we are moving by 10 meters
//             latitude: 37.33233141 + increment * tenMetersWithDegrees

//         }
//     }

// }

// let counter = 0;

// setInterval(() =>{
//    // this is actually where fake our current location...that is, manipulating location parameters we will be 
//    // getting if we are actually moving 
    
//    Location.EventEmitter.emit('Expo.locationChanged'), {
//        watchId: Location._getCurrentWatchId(),
//        location: getLocation(counter)
//    }
//    counter++
     
// }, 1000)  // that is, we will be calling the function inside this setInterval function every 1 sec

// // so once we import this file to our project, every seconds, we are going to emit an event directly into the location library
// // and fake out that the user location has changed in the real world.
// // so every seconds, calling getLocation will give a changed latitude and longitude 

// // THIS IS FOR TESTING PURPOSES. DONT USE WHEN YOU WANT TO DEPLOY






import * as Location from 'expo-location';
    const tenMetersWithDegrees = 0.0001;

    const getLocation = increment => {
        return {
            timestamp: 100000,
            coords: {
                speed: 0, 
                heading: 0,
                accuracy: 5,
                altitudeAccuracy: 5,
                altitude: 5,
                longitude: 3.3834651 + increment * tenMetersWithDegrees,
                latitude: 6.4824924 + increment * tenMetersWithDegrees,
            }
        }
    }

    let count = 0;
    setInterval(() => {
        Location.EventEmitter.emit('Expo.locationChanged', {
          watchId: Location._getCurrentWatchId(),
          location: getLocation(count)
        })
        count++
      }, 1000);