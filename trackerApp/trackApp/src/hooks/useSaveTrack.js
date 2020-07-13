import {useContext} from 'react'
import TrackContext from '../context/TrackContext'
import LocationContext from '../context/LocationContext'
import {navigate} from '../navigationRef'



export default () => {
    const {createTrack} = useContext(TrackContext)
    const {state: {locations, name}, reset} = useContext(LocationContext)

    const saveTrack = async () => {
       await createTrack(name, locations)
       reset()
       navigate('TrackList')
    }

    return [saveTrack]
}