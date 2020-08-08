import {useContext} from 'react'
import TrackContext from '../context/TrackContext'
import AuthContext from '../context/AuthContext'
import LocationContext from '../context/LocationContext'
import {navigate} from '../navigationRef'



export default () => {
    const {state:{track}, cancelload,saveload} = useContext(AuthContext)
    const {createTrack} = useContext(TrackContext)
    const {state: {locations, name}, reset} = useContext(LocationContext)

    const saveTrack = async () => {
        if(!name){
            return alert("Enter Track Name")
         }
         else{
            saveload()
           await createTrack(name, locations)
           cancelload()
       reset()
       navigate('TrackList')
    }
    }

    return [saveTrack]
}