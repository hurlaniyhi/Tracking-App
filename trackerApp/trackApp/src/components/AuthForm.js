import React from 'react'
import {useState} from 'react'
import {  StyleSheet, TextInput, TouchableOpacity } from "react-native";
import {Text, Button} from 'react-native-elements'
import Spacer from "./Spacer"


const AuthForm = ({headerText, errorMessage, onSubmit, buttonText}) => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    return (
        <>
          <Spacer>
            <Text h4 style={styles.text}>{headerText}</Text>
               
            <Text style={styles.label}>Email</Text>
            <TextInput 
              style={styles.textInput} 
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(newValue)=> setEmail(newValue)} 
            /> 
            {/* we could easily do onChangeText ={setEmail} */}
            <Text style={styles.label}>Password</Text>
            <TextInput 
              secureTextEntry
              style={styles.textInput} 
              autoCapitalize="none"
              autoCorrect={false} 
              onChangeText={(newValue)=> setPassword(newValue)}
            /> 
          </Spacer>
          {errorMessage ? <Text style={{textAlign: "center", color: "red"}}>{errorMessage}</Text> : null}
    
          <Spacer>
            <Button title={buttonText} onPress={()=>onSubmit(email, password)} />
          </Spacer>
    
         
        </>
      )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      marginBottom: 200
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      paddingBottom: 5
  },
    textInput: {
      borderWidth: 1,
      height: 40,
      marginBottom: 15,
      paddingLeft: 10
  },
  text:{
    paddingBottom: 50,
    textAlign: "center"
  }, 
  });


  export default AuthForm