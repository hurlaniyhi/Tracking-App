import React from "react";
import { Text, StyleSheet, View, Button } from "react-native";
import {SafeAreaView} from 'react-navigation'

const TrackListScreen = (props) => {
  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <View>
        <Text style={styles.text}>Track List</Text>
        <Button title="Go to Detail page" onPress={()=> props.navigation.navigate("TrackDetail")} />
      </View>
      </SafeAreaView>
  )
};

TrackListScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}
const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 30
  }
});

export default TrackListScreen;
