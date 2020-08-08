import React, {useContext} from 'react'
import {TextInput, Text, StyleSheet, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import {Button} from 'react-native-elements'
import Spacer from "./Spacer"
import LocationContext from '../context/LocationContext'
import useSaveTrack from '../hooks/useSaveTrack'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'
import AuthContext from '../context/AuthContext'


const TrackForm = () => {

  const {state} = useContext(AuthContext)
    const {state: {name, recording, locations}, 
       changeName, 
       stopRecording, 
       startRecording} = useContext(LocationContext)

    const [saveTrack] = useSaveTrack()

    return(
        <View style={styles.container}>
            
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter Track Name"
              autoCapitalize="none"
              autoCorrect={false}
              value={name}
              onChangeText={(newValue) => changeName(newValue)} 
            />

          
              {recording ? <TouchableOpacity style={styles.button} onPress={stopRecording} ><Text style={{textAlign: "center", color: "white", fontSize: wp("4.5%")}}>Stop</Text></TouchableOpacity>
              : <TouchableOpacity style={styles.button} onPress={startRecording}><Text style={{textAlign: "center", color: "white", fontSize: wp("4.5%")}}>Start Recording</Text></TouchableOpacity>}
            
        
          
          
          {!recording && locations.length ? 
          <TouchableOpacity style={styles.button} onPress={saveTrack} >
           {!state.track ? <Text style={{textAlign: "center", color: "white", fontSize: wp("4.5%")}}>Save Recording</Text>:
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Saving    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
            </TouchableOpacity>
           : null }
          
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      marginTop: hp("5%"),
      justifyContent: "center",
      
    },
  //   label: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  //     paddingBottom: 5,
  //     paddingHorizontal: 15

  // },
  textInput: {
    borderWidth: 1,
    height: hp("7%"),
    marginBottom: hp("4%"),
    paddingLeft: wp("3%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderColor: "#C3C3C3",
    textAlign: "center", 
    fontSize: wp("4%"),
    marginHorizontal: wp("10%")
},
  text:{
    paddingBottom: 50,
    textAlign: "center"
  }, 
  button:{
    justifyContent: "center", 
    alignItems: "center",
    height: hp("7%"), 
    backgroundColor: "#9263CC",
    borderRadius: 10,
    marginHorizontal: wp("10%"),
    marginBottom: hp("2%")
}
  });

  export default TrackForm