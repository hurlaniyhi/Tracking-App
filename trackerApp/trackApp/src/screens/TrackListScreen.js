import React, {useContext} from "react";
import { Text, StyleSheet, View, Button, FlatList, TouchableOpacity, ScrollView, YellowBox } from "react-native";
import {Text as Title} from 'react-native-elements'
import {ListItem} from 'react-native-elements'  // with chevron props  make our list items to be display in a good way with icon(>) beside each item 
import {SafeAreaView} from 'react-navigation'
import {NavigationEvents} from 'react-navigation'
import TrackContext from '../context/TrackContext'

const TrackListScreen = (props) => {

  const{state, fetchTracks} = useContext(TrackContext)

  YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested', // TODO: Remove when fixed
  ])

  // console.log(state)

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <ScrollView>
      <NavigationEvents onWillFocus={fetchTracks} />
      
      <View>
        
       
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={() => 
              props.navigation.navigate('TrackDetail',{_id: item._id})}>
                <ListItem  chevron={{color: "#9263CC"}} title={item.name} /> 
              </TouchableOpacity>
            )
          }}
        />
       
      </View>
      </ScrollView>
      </SafeAreaView>
  )
};

TrackListScreen.navigationOptions = () => {
  // return {
  //   headerShown: false
  // }

  return {
    headerTitleStyle: {
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      color: "white"
    },
    title: "Tracks",
    headerStyle:{ 
    backgroundColor: "#9263CC"
    }
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 30,
    paddingTop: 15
  }
});

export default TrackListScreen;
