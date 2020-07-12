import React, {useContext} from 'react'
import {TextInput, Text, StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import Spacer from "./Spacer"
import LocationContext from '../context/LocationContext'


const TrackForm = () => {

    const {state: {name, recording, locations}, changeName, stopRecording, startRecording} = useContext(LocationContext)

    
    return(
        <View style={styles.container}>
            
            <TextInput 
              style={styles.textInput} 
              placeholder="Enter Track Name"
              autoCapitalize="none"
              autoCorrect={false}
            //   value={name}
              onChangeText={(newValue) => changeName(newValue)} 
            />

          <Spacer>
              {recording ? <Button title="Stop" onPress={stopRecording} />
              : <Button title="Start Recording" onPress={startRecording} />}
            
          </Spacer>
          
          <Spacer>
          {!recording && locations.length ? <Button title="Save Recording" onPress={startRecording} /> : null }
          </Spacer>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      justifyContent: "center",
      
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      paddingBottom: 5,
      paddingHorizontal: 15

  },
    textInput: {
      borderWidth: 1,
      height: 40,
      marginBottom: 15,
      textAlign: "center",
      marginHorizontal: 15
  },
  text:{
    paddingBottom: 50,
    textAlign: "center"
  }, 
  });

  export default TrackForm