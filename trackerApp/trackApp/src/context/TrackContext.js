import React, {useReducer} from 'react'
import {AsyncStorage, StyleSheet} from 'react-native'
import trackerApi from "../API/trackerApi"
import {navigate} from "../navigationRef"  // to have access to navigate to any screen from this file's component
import { startAsync } from 'expo/build/AR'



const TrackContext = React.createContext()

const trackReducer = (state, action) => {
    
    switch (action.type){
        case "fetch_tracks":
            return action.payload  
            // we dont need to fetch from our previous state, since the response from backend is the source of truth
            // we can just get all tracks(action.payload) which will now stand as our new state
        default: 
            return state
    }
}




export const TrackProvider = (props) => {  
    
    
    const [state, dispatch] = useReducer(trackReducer, [])
    

   
    const fetchTracks = async () => {
        const response = await trackerApi.get("/tracks")
        dispatch({type: 'fetch_tracks', payload: response.data})
    }

    const createTrack = async (name, locations) => {
       
        await trackerApi.post('/tracks', {name, locations})
        
      
       
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







