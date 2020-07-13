import React, {useReducer} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import trackerApi from "../API/trackerApi"
import {navigate} from "../navigationRef"  // to have access to navigate to any screen from this file's component
import { startAsync } from 'expo/build/AR'



const LocationContext = React.createContext()

const locationReducer = (state, action) => {
    
    switch (action.type){
        case 'add_current_location':
            return {...state, currentLocation: action.payload}

        case 'start_recording':
            return {...state, recording: true}

        case 'stop_recording':
            return {...state, recording: false}

        case 'add_location':
            return {...state, locations: [...state.locations, action.payload]}

        case 'change_name':
            return {...state, name: action.payload}
        case 'reset':
            return {...state, name: "", locations: []}
    
        default: 
             return state
    }
}




export const LocationProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(locationReducer, {recording: false, locations: [], currentLocation: null, name: ""})
    

    const startRecording = () => {
        
        dispatch({type: "start_recording"})
    }

    const stopRecording = async() => {
        dispatch({type: "stop_recording"})
    }

    const addLocation = async(location, recording) => {
        
        dispatch({type: 'add_current_location', payload: location})
        
        if (recording){
            dispatch({type: "add_location", payload: location})
        }
    }

    const changeName = (name) => {
        dispatch({type: "change_name", payload: name})
    }

    const reset = (name) => {
        dispatch({type: "reset"})
    }


    
    const boundActions = {
        startRecording,
        stopRecording,
        addLocation,
        changeName,
        reset
    }
    
    return (
    <LocationContext.Provider value={{state: state, ...boundActions}}>
        {props.children}
    </LocationContext.Provider>
    )
        
}
export default LocationContext







