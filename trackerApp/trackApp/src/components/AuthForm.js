import React, {useContext} from 'react'
import {useState} from 'react'
import {  StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, View } from "react-native";
import {Text, Button} from 'react-native-elements'
import Spacer from "./Spacer"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen'

import AuthContext from '../context/AuthContext'


const AuthForm = ({headerText, errorMessage, onSubmit, buttonText, info}) => {

  const {state} = useContext(AuthContext)
  //alert(state.send)
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
   
   

    return (
        <>
          <Spacer>
            <Text h4 style={styles.text}>{headerText}</Text>
            <Text style={{textAlign: "center", paddingBottom: hp("10%"), paddingTop: hp("1%")}}>{info}</Text>
               
            <Text style={styles.label}>Email or Username</Text>
            <TextInput 
              style={styles.textInput} 
              autoCapitalize="none"
              placeholder="Enter Email or Username"
              autoCorrect={false}
              onChangeText={(newValue)=> setEmail(newValue)} 
            /> 
            {/* we could easily do onChangeText ={setEmail} */}
            <Text style={styles.label}>Password</Text>
            <TextInput 
              secureTextEntry
              style={styles.textInput} 
              autoCapitalize="none"
              placeholder="Enter Password"
              autoCorrect={false} 
              onChangeText={(newValue)=> setPassword(newValue)}
            /> 
          </Spacer>
          {errorMessage ? <Text style={{textAlign: "center", color: "red"}}>{errorMessage}</Text> : null}
    
          <Spacer>
          {/* <TouchableOpacity>  
          {!state.submitting ?<Text style={{fontSize: wp("5%"), color: "white"}}>Sign In</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Sending    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
            </TouchableOpacity> */}

          <TouchableOpacity  style={styles.button} onPress={()=>onSubmit(email, password)}>
          {!state.load && !state.send ?<Text style={{fontSize: wp("5%"), color: "white"}}>{buttonText}</Text> : 
            <View style={{flexDirection: "row", justifyContent: "center"}}>
              <Text style={{fontSize: wp("5%"), color: "white"}}>Sending    </Text>
            <ActivityIndicator color="whitesmoke" size="large"/>
            </View> }
          </TouchableOpacity>
            
          </Spacer>
    
         
        </>
      )
}


const styles = StyleSheet.create({
   
    label: {
      fontSize: wp("3.2%"),
      fontWeight: "bold",
      paddingBottom: hp("0.7%"),
      paddingLeft: wp("2%")
  },
 
  textInput: {
    borderWidth: 1,
    height: hp("7%"),
    marginBottom: hp("4%"),
    paddingLeft: wp("3%"),
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    borderColor: "#C3C3C3"
},
text:{

  paddingTop: hp("2%"),
  //paddingBottom: hp("10%"),
  textAlign: "center",
  color: "#9263CC"
},

  button:{
    justifyContent: "center", 
    alignItems: "center",
    height: hp("7%"), 
    // backgroundColor: "#0993F3",
    backgroundColor: "#9263CC",
    borderRadius: 10,
    //marginTop: hp("2%")
}
  });


  export default AuthForm