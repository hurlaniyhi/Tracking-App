import React, {useContext} from "react";
import { Text, StyleSheet, View } from "react-native";
import { Button, Text as Title } from "react-native-elements";
import AuthContext from "../context/AuthContext"
import Spacer from "../components/Spacer"
import {SafeAreaView} from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons'

const AccountScreen = () => {

  const {signout} = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <View style={styles.container}>
        <Title h4 style={styles.text}>My Account</Title>
        <Button title="Sign Out" onPress={signout} />
      </View>
    </SafeAreaView>
  )
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: ({tintColor})=> <FontAwesome color={tintColor}  name="gear" size={20} />,
  
}


const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 40,
    paddingTop: 15
  },
  container:{
    // flex: 1,
    // // marginTop: 80,
    marginHorizontal: 15,
  }
});

export default AccountScreen;
