import React, {useContext} from "react";
import { Text, StyleSheet, View } from "react-native";
import TrackContext from '../context/TrackContext'
import MapView, {Polyline, Circle} from 'react-native-maps'

const TrackDetailScreen = (props) => {

  const {state} = useContext(TrackContext)

  const _id = props.navigation.getParam('_id')

  const track = state.find(t => t._id == _id)
  console.log(track)
  const initialCoords = track.locations[0].coords


  return (
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
                <Polyline coordinates={track.locations.map(loc => loc.coords)} />
               
              
            </MapView>
          </View>

      </View>
  )
};


TrackDetailScreen.navigationOptions = () => {
  return {
    headerTitleStyle: {
      paddingLeft: 50,
      fontSize: 25,
      fontWeight: "bold"
    },
    title: "Track Details"
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 60,
    paddingBottom: 25
  },
  map: {
    height: 350,
    borderWidth: 1,
    borderColor: "green"
 }
});

export default TrackDetailScreen;
