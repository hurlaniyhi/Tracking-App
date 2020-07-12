import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import Spacer from "./Spacer"
import {withNavigation} from 'react-navigation'

const NavLink = ({navigation, text, routeName}) => {
    return(
        <TouchableOpacity style={styles.touchable}  onPress={()=> navigation.navigate(routeName)}>
        <Text style={{color: "blue", paddingTop: 8}}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    touchable:{
        marginLeft: 15
      }
})

export default withNavigation(NavLink)