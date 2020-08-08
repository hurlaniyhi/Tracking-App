import React, {useContext} from 'react'
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native'
import MapView, {Polyline, Circle} from 'react-native-maps'
import LocationContext from '../context/LocationContext'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'


  

const Map = () => {

    const {state: {currentLocation, locations}} = useContext(LocationContext)
    
    // since we set our initial current location to null, we dont want to display the map if 
    // if the current location is still null we will rather show a spinner (loading icon). hence we use the below condition

    if(!currentLocation){
        return <ActivityIndicator size="large" style={{marginTop: hp("20%")}} />
    }
 
    return(
        <View style={{borderWidth: 1, borderColor: "green"}}>
            <MapView 
            initialRegion={{
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
            style={styles.map} 

            region={{        
                // whenever we update this region property, the map will automatically update itself
                // and re-center and resume on the user's current location
                ...currentLocation.coords,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01

            }}
            >
                <Polyline coordinates={locations.map(loc => loc.coords)} strokeWidth={3} strokeColor="green"/>
                <Circle
                center={currentLocation.coords}
                radius={30}
                strokeColor="rgba(158, 158, 255, 1.0)"
                fillColor="rgba(158, 158, 255, 0.3)"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    map: {
       height: hp("42%")
    }
})

export default Map