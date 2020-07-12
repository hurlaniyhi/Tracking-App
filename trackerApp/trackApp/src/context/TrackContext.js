import React, {useReducer} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import trackerApi from "../API/trackerApi"
import {navigate} from "../navigationRef"  // to have access to navigate to any screen from this file's component
import { startAsync } from 'expo/build/AR'



const TrackContext = React.createContext()

const trackReducer = (state, action) => {
    
    switch (action.type){
      
        default: 
             return state
    }
}




export const TrackProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(trackReducer, [])
    

   
    const fetchTracks = () => {
        
        dispatch({type: "fetch_tracks"})
    }

    const createTrack = () => {
        
        dispatch({type: "create_track"})
    }

    
    const boundActions = {
        fetchTracks,
        createTrack
    }
    
    return (
    <TrackContext.Provider value={{state: state, ...boundActions}}>
        {props.children}
    </TrackContext.Provider>
    )
        
}
export default TrackContext







