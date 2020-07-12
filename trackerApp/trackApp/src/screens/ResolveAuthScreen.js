import React, {useContext, useEffect} from 'react'
import AuthContext from "../context/AuthContext"

const ResolveAuthScreen = () => {
    const {autoSignin} = useContext(AuthContext)
 
  useEffect(() => {
    autoSignin()
  }, [])
    return null
}
export default ResolveAuthScreen