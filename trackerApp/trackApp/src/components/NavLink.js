import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Spacer from "./Spacer"
import {withNavigation} from 'react-navigation'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen'
import {NavigationEvents} from 'react-navigation' 
  


const NavLink = ({navigation, text, routeName}) => {
    return(
        <TouchableOpacity  onPress={()=> navigation.navigate(routeName)}>
        <Text style={{color: "#9263CC", paddingTop: hp("0.3%"), textAlign: "center"}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
   
})

export default withNavigation(NavLink)