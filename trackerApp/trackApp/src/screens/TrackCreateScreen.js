//import '../_mockLocation'
import React, {useEffect, useState, useContext, useCallback} from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import {Text} from 'react-native-elements'
import {SafeAreaView, withNavigationFocus} from 'react-navigation'
import Map from "../components/Map"
import {requestPermissionsAsync, watchPositionAsync, Accuracy} from 'expo-location'
import LocationContext from '../context/LocationContext'
import TrackForm from '../components/TrackForm'
import { startAsync } from 'expo/build/AR';
import {FontAwesome} from '@expo/vector-icons'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'


//import useLocation from '../hooks/useLocation'




const TrackCreateScreen = ({isFocused}) => {

  const {state: {recording}, addLocation} = useContext(LocationContext)

  const callback = useCallback((location) => {
    addLocation(location, recording)
  }, [recording]) // gives us new version(updated) anytime state.recording changes

  const [err, setErr] = useState(null)
  //const [subscriber, setSubscriber] = useState(null)

   
  useEffect(()=>{
    let subscriber;
    const getPermission = async () => {
      try{
  
        await requestPermissionsAsync();  
           subscriber = await watchPositionAsync({      // it will watch the current position of the device
          
          accuracy: Accuracy.BestForNavigation,                // how accurate we want our location reading to be. the higher the accuracy, the more battery power it will take
          timeInterval: 3000,  // that is we want to get update (current location) every one seconds
          distanceInterval: 8     // get update every ten meters
       
        },   // location parameter represent object from the expo-location that describe the user's actual location
             callback
        )
  
        
  
      } catch (e){
  
        setErr(e)
        console.log(e)
  
      }
    }
  
    
    if(isFocused || recording){
      getPermission()
    }
    else{
      if(subscriber){
      subscriber.remove()
      }
       subscriber = null
    }

    return () => {
      if(subscriber){
        subscriber.remove()
      }
    }
  }, [isFocused, callback])  
  
  // with this callback, the useEffect works with the memory(information) of the callback
  // that is, everytime getPermission() get called from useEffect, instead of sticking with the old memory,
  // it uses the memory of the callback since the callback is inside the getPermission() and the callback get
  // updated anytime its second parameter(array) changes
  return (
    <SafeAreaView forceInset={{top: "always"}}>
    <ScrollView>
      <View>
        <Text h4 style={styles.text}>Create Track</Text>
        <Text style={{textAlign: "center", paddingBottom: hp("4%"), paddingTop: hp("1%"), fontSize: wp("2.3%")}}>Start recording your path or see your current location on the map as you move</Text>
        <Map />
        {err? <Text>Please enable locaton services</Text> : null}
      </View>
      
      <TrackForm />
      </ScrollView>
      </SafeAreaView>
  )
};

TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarOptions: { activeTintColor:'#9263CC'},
  tabBarIcon: ({tintColor}) => <FontAwesome color={tintColor} name="plus" size={20} />
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp("7%"),
    textAlign: "center",
    paddingTop: hp("3%"),

  }
});

export default withNavigationFocus(TrackCreateScreen);























// const TrackCreateScreen = ({isFocused}) => {

//   const {addLocation} = useContext(LocationContext)

//   const [err] = useLocation(isFocused, addLocation)
//   console.log(isFocused)
  
//   return (
//     <SafeAreaView forceInset={{top: "always"}}>
//       <View>
        
//         <Text h3 style={styles.text}>Create Track</Text>
//         <Map />
//         {err ? <Text>Please enable locaton services</Text> : null}
//       </View>
//       </SafeAreaView>
//   )
// };

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30,
//     textAlign: "center"
//   }
// });

// export default withNavigationFocus(TrackCreateScreen);





















