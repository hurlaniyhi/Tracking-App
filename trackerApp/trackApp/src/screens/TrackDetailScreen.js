import React, {useContext} from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import TrackContext from '../context/TrackContext'
import MapView, {Polyline, Circle} from 'react-native-maps'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'


const TrackDetailScreen = (props) => {

  const {state, deleteTrack} = useContext(TrackContext)

  const _id = props.navigation.getParam('_id')

  const track = state.find(t => t._id == _id)
  console.log(track)
  const initialCoords = track.locations[0].coords


  return (
    <ScrollView>
      <View>
        
        <Text style={styles.text}>{`${track.name} Path`}</Text>
        <View style={{borderWidth: 1, borderColor: "green"}}>
        <MapView 
            initialRegion={{
                ...initialCoords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            style={styles.map} 

            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)} strokeWidth={3} strokeColor="green"/>
               
              
            </MapView>
          </View>
          <TouchableOpacity  style={styles.button} onPress={()=>deleteTrack(_id)}>
          <Text style={{fontSize: wp("5%"), color: "white"}}>Delete Track</Text>
          </TouchableOpacity>

      </View>
      </ScrollView>
  )
};


TrackDetailScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      paddingLeft: wp("13%"),
      fontSize: wp("6%"),
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white",
    title: "Track Details",
    headerStyle:{ 
      backgroundColor: "#9263CC"
      }
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: wp("4.5%"),
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: hp("10%"),
    paddingBottom: hp("5%")
  },
  map: {
    height: hp("44%"),
    borderWidth: 1,
    borderColor: "green"
 },
 button:{
  justifyContent: "center", 
  alignItems: "center",
  height: hp("7%"), 
  marginTop: hp("5%"),
  marginHorizontal: wp("27%"),
  backgroundColor: "#9263CC",
  borderRadius: 10,
  
}
});

export default TrackDetailScreen;
