import React, {useContext} from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button } from "react-native-elements";
import AuthContext from "../context/AuthContext"
import Spacer from "../components/Spacer"
import {SafeAreaView} from 'react-navigation'

const AccountScreen = () => {

  const {signout} = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <View style={styles.container}>
        <Text style={styles.text}>My Account</Text>
        <Button title="Sign Out" onPress={signout} />
      </View>
    </SafeAreaView>
  )
};



const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 40
  },
  container:{
    // flex: 1,
    // // marginTop: 80,
    marginHorizontal: 15,
  }
});

export default AccountScreen;
