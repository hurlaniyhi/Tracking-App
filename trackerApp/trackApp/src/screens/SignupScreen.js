import React, {useContext} from "react";
//import {useState} from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
//import {Text, Input, Button} from 'react-native-elements'
import AuthContext from "../context/AuthContext"
import AuthForm from "../components/AuthForm"
import NavLink from "../components/NavLink"
import {NavigationEvents} from 'react-navigation'

const SignupScreen = (props) => {

  const {state, signup, clearErrorMessage} = useContext(AuthContext)
 
  

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage}/>
      <AuthForm 
        headerText="Sign Up for Tracker"
        errorMessage={state.errorMessage}
        buttonText="Sign Up"
        onSubmit={signup}
      />
      <NavLink 
      text="Already have an account?  Sign in instead!"
      routeName="Signin"
      />
     
    </View>
  )
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "center",
    marginBottom: 200
  }
})


export default SignupScreen;
