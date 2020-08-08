import React, {useReducer} from 'react'
import {AsyncStorage} from 'react-native'
import trackerApi from "../API/trackerApi"
import {navigate} from "../navigationRef"  // to have access to navigate to any screen from this file's component
import { startAsync } from 'expo/build/AR'



const AuthContext = React.createContext()

const authReducer = (state, action) => {
    
    switch (action.type){
        case "add_error":
            return {...state, errorMessage: action.payload}
        case "signin":
            return {errorMessage: "", token: action.payload} 
            // because we dont want error message to show up again after the user
            // has successfully logged in. so its better to set the properties 
            // inside the state to default(initial value) except the token
        case 'clear_errorMessage':
            return {...state, errorMessage: ""}

        case 'load':
            return {...state, load: "loading"}

        case 'clear_load':
            return {...state, load: "", send: "", track: ""}
    
        
        case 'send':
            return {...state, send: "loading"}

        case 'track':
            return {...state, track: "loading"}

        case 'signout':
            return{token: null, errorMessage: ""}

        default: 
             return state
    }
}




export const AuthProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(authReducer, {token: null, errorMessage: "", load: "", send: "", track: ""})
    

    const signup = async(email, password) => {
        dispatch({type: 'load'})
        
        try {
            const response = await trackerApi.post('/signup', {email, password})
           if (response.data.token){
           await AsyncStorage.setItem('token', response.data.token)
           dispatch({type: 'signin', payload: response.data.token})
           dispatch({type: 'clear_load'})
           navigate("mainFlow")
           }
           else{
            dispatch({type: 'clear_load'})
            dispatch({type: 'add_error', payload: response.data})
            
           }
           // we can easily pass props as parameter from where we call this function
           // and include props as third parameter in this function 
           // we then can use props.navigation.navigate("mainFlow") instead of this navigation("mainFlow")

        } catch (err){
            dispatch({type: 'clear_load'})
            alert("No network connection")
           
        }
        
    }

    const saveload = async ()=>{
        dispatch({type: 'track'})
    }
   const cancelload = async ()=>{
        dispatch({type: 'clear_load'})
    }

    const signin = async(email, password) => {
  
       await dispatch({type: 'send'})

        try {
            const response = await trackerApi.post('/signin', {email, password})
           if(response.data.token){
           await AsyncStorage.setItem('token', response.data.token)
           dispatch({type: 'signin', payload: response.data.token})
           dispatch({type: 'clear_load'})
           navigate("mainFlow")
           }
           else{
            dispatch({type: 'clear_load'})
            dispatch({type: 'add_error', payload: response.data})
           
           }
          
        } catch (err){
            dispatch({type: 'clear_load'})
           alert("No network connection")
        }
    }

    const clearErrorMessage = () => {
        dispatch({type: 'clear_errorMessage'})
    }

    const autoSignin = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token){
        dispatch({type: 'signin', payload: token})
        navigate('TrackList')
        }
        else{
            navigate('Signin')
        }
    }

    const signout = async () => {
         await AsyncStorage.removeItem('token')
        
        dispatch({type: 'signout'})
        navigate("loginFlow")
        
    }


    const boundActions = {
        signup,
        signin,
        clearErrorMessage,
        autoSignin,
        signout, 
        saveload,
        cancelload
    }
    
    return (
    <AuthContext.Provider value={{state: state, ...boundActions}}>
        {props.children}
    </AuthContext.Provider>
    )
        
}
export default AuthContext














// import createDataContext from "./createDataContext"




// const authReducer = (state, action) => {
    
//     switch (action.type){
       
        
//            }
// }
    
    
  
// export const {Context, Provider} = createDataContext(
//     authReducer, {}, {isSignedIn: false}  
// )
