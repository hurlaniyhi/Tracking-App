import React, {useContext} from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { Button, Text as Title } from "react-native-elements";
import AuthContext from "../context/AuthContext"
import Spacer from "../components/Spacer"
import {SafeAreaView} from 'react-navigation'
import {FontAwesome} from '@expo/vector-icons'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

const AccountScreen = () => {

  const {signout} = useContext(AuthContext)

  return (
    <SafeAreaView forceInset={{top: "always"}}>
      <View style={styles.container}>
        <Title h4 style={styles.text}>My Account</Title>
        
        <TouchableOpacity  style={styles.button} onPress={signout}>
          <Text style={{fontSize: wp("5%"), color: "white"}}>Sign Out</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarOptions: { activeTintColor:'#9263CC'},
  tabBarIcon: ({tintColor})=> <FontAwesome color={tintColor}  name="gear" size={20} />,
  
}


const styles = StyleSheet.create({
  text: {
    fontSize: wp("6%"),
    textAlign: "center",
    paddingBottom: hp("6%"),
    paddingTop: wp("4%")
  },
  container:{
    // flex: 1,
    // // marginTop: 80,
    marginHorizontal: wp("10%"),
  },
  button:{
    justifyContent: "center", 
    alignItems: "center",
    height: hp("7%"), 
    backgroundColor: "#9263CC",
    borderRadius: 10,
    marginBottom: hp("2%")
}
});

export default AccountScreen;
