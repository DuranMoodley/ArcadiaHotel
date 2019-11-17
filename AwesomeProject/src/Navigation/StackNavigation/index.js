import { createStackNavigator } from 'react-navigation-stack'
import AppDrawerNavigation from '../../Navigation/DrawerNavigation'
import React from 'react'
import {
  ImageBackground,
  Dimensions,
  View,
  Text
} from 'react-native';
import Login from '../../Features/Login'
import SplashScreen from '../../Features/SplashScreen'
import Utils from '../../Utils/utils' 
import SaveEmployee from '../../Features/Employee/AddEmployee'
import ViewEmployee from '../../Features/Employee/ViewEmployee'
import EditEmployee from '../../Features/Employee/EditEmployee'
import ViewClient from '../../Features/Transactions/ViewClient'
//import 'react-native-gesture-handler'
let width = Dimensions.get('window').width;
const AppStack = createStackNavigator({
  Dashboard: {
    screen: AppDrawerNavigation,
  },
  Login: {
    screen: Login,
  },
  SplashScreen: {
    screen: SplashScreen,
  },
}, {
    transitionConfig: Utils.TransitionConfiguration,
    headerMode: 'none',
    initialRouteName: 'SplashScreen',
    drawerWidth: Dimensions.get('window').width - 130,
  }
)

//Fixes the back button (Navigation)
const DrillDownStack = createStackNavigator({
  AppStack: {
    screen: AppStack,
    navigationOptions: {
      header: null,
    }
  },
  SaveEmployee: {
    screen: SaveEmployee,
  },
  ViewEmployee: {
    screen: ViewEmployee,
    navigationOptions: {
        header: null,
      }
  },
  ViewClient: {
    screen: ViewClient,
    navigationOptions: {
        header: null,
      }
  },
  EditEmployee: {
    screen: EditEmployee,
    // navigationOptions: {
    //     header: null,
    //   }
  },
},
  {
    defaultNavigationOptions: {
      //headerBackground: <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../Images/header_arcadia.jpeg')} />,
      headerTintColor: '#fff',
      headerBackTitle: <Text> </Text>,
      headerTitleStyle: {
        textAlign: "center",
        flex: 0.8,
        marginBottom:8,
        fontSize: width/24
      },
      headerStyle: { height: 60, backgroundColor:'#8b0000'}
    },
    transitionConfig: Utils.TransitionConfiguration,
    headerMode: 'float'
  }
)

export default DrillDownStack