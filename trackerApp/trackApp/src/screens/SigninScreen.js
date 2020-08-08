import React, {useContext} from "react";
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import AuthContext from "../context/AuthContext"
import AuthForm from "../components/AuthForm"
import NavLink from "../components/NavLink"
import {NavigationEvents} from 'react-navigation'
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'


const SigninScreen = () => {

  const {state, signin, clearErrorMessage} = useContext(AuthContext)

  

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage}/>
      <AuthForm 
        headerText="Sign In"
        errorMessage={state.errorMessage}
        buttonText="Sign In"
        info="Login to easily track your path as you journey"
        onSubmit={signin}
      />
      <NavLink 
      text="Don't have an account?  Go back to sign up"
      routeName="Signup"
      />
     
    </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    marginBottom: hp("20%")
  }
})

export default SigninScreen;
