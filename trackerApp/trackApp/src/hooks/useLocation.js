import React, {useState, useEffect} from 'react'
import {requestPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location'

export default (isFocused,callback) => {


   const [err, setErr] = useState(null)
   const [subscriber, setSubscriber] = useState(null)

   const getPermission = async () => {
    try{

      await requestPermissionsAsync();  
      const sub = await watchPositionAsync({      // it will watch the current position of the device
        
        accuracy: Accuracy.BestForNavigation,                // how accurate we want our location reading to be. the higher the accuracy, the more battery power it will take
        timeInterval: 1000,  // that is we want to get update (current location) every one seconds
        distanceInterval: 10     // get update every ten meters
     
      }, callback  // we change (location) => {addLocation} to callback because we will make it a parameter we can pass whenever we want to call this useLocation
      )
      setSubscriber(sub)

    } catch (e){

      setErr(e)
      console.log(e)

    }
  }

  useEffect(()=>{
    if(isFocused){
    getPermission()
    }
    else{
      subscriber.remove()
      setSubscriber(null)
    }
  }, [isFocused])

  return [err]  // its the err part we will reference anywhere we are using this useLocation

}