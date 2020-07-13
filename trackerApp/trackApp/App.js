import React from "react"
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createSwitchNavigator} from 'react-navigation'
import SignupScreen from "./src/screens/SignupScreen";
import SigninScreen from "./src/screens/SigninScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import AccountScreen from "./src/screens/AccountScreen";
import {AuthProvider} from "./src/context/AuthContext"
import {setNavigator} from './src/navigationRef'
import ResolveAuthScreen from "./src/screens/ResolveAuthScreen"
import {LocationProvider} from "./src/context/LocationContext"
import {TrackProvider} from "./src/context/TrackContext"
import {FontAwesome} from '@expo/vector-icons'


const trackList = createStackNavigator({   // we did this instead of using what we commented out at the bottom so as to have access to the styling options
    TrackList: TrackListScreen,
    TrackDetail: TrackDetailScreen
  })

  trackList.navigationOptions = {
    title: 'Tracks',
    tabBarIcon: ({tintColor}) => <FontAwesome color={tintColor} name="th-list" size={20} />
  }


const switchNavigator = createSwitchNavigator({
  autoSignin: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  mainFlow: createBottomTabNavigator({
     trackList: trackList,
    // trackList: createStackNavigator({
    //   TrackList: TrackListScreen,
    //   TrackDetail: TrackDetailScreen
    // }),
    createTrack: TrackCreateScreen,
    Account: AccountScreen
  })
})

//export default createAppContainer(switchNavigator)

const App = createAppContainer(switchNavigator)

export default () => {
  return(
    <TrackProvider>
      <LocationProvider>
        <AuthProvider>
          <App                       // we added the props so as to have access to navigating in any file that is not wrapped in our navigator (switchNavigator) here
          ref = {navigator => {
          setNavigator(navigator)
          }}
         />
        </AuthProvider>
      </LocationProvider>
    </TrackProvider>
  )
}























//   {
//     Signup: SignupScreen
//   },
//   {
//     initialRouteName: "Signup",
//     defaultNavigationOptions: {
//       title: "App"
//     }
//   }
// );

//export default createAppContainer(navigator);
