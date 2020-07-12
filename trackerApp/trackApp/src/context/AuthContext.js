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

        case 'signout':
            return{token: null, errorMessage: ""}

        default: 
             return state
    }
}




export const AuthProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(authReducer, {token: null, errorMessage: ""})
    

    const signup = async(email, password) => {
        
        try {
            const response = await trackerApi.post('/signup', {email, password})
           
           await AsyncStorage.setItem('token', response.data.token)
           dispatch({type: 'signin', payload: response.data.token})
           navigate("mainFlow")
           // we can easily pass props as parameter from where we call this function
           // and include props as third parameter in this function 
           // we then can use props.navigation.navigate("mainFlow") instead of this navigation("mainFlow")

        } catch (err){

            dispatch({type: 'add_error', payload: "Something went wrong"})
        }
        
    }

    const signin = async(email, password) => {

        try {
            const response = await trackerApi.post('/signin', {email, password})
           
           await AsyncStorage.setItem('token', response.data.token)
           dispatch({type: 'signin', payload: response.data.token})
           navigate("mainFlow")
          
        } catch (err){

            dispatch({type: 'add_error', payload: "Something went wrong with sign in"})
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
            navigate('Signup')
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
        signout
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
