import React from 'react'

//import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import {createAppContainer } from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Platform
} from 'react-native'
import { Dimensions } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'
import CustomSidebarMenu from '../../CommonComponents/CommonSideMenu'
import Employee from '../../Features/Employee/index'
import Tabs from '../TabNavigation/index'
let width = Dimensions.get('window').width;
function Drawer(props) {

  toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row', marginBottom: 5 }}>
      <TouchableOpacity onPress={toggleDrawer.bind(this)}>
        <Icon name={Platform.OS === "ios" ? "ios-menu" : "md-menu"} style={{ color: 'white', marginLeft: 15 }} size={30} />
      </TouchableOpacity>
    </View>
  )

}


const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Dashboard: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Drawer navigationProps={navigation} />,
        //headerBackground: <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../Images/header_arcadia.jpeg')} />,
        headerTintColor: '#fff',
        headerTitle : 'Dashboard',
        headerTitleStyle: {
          textAlign: "center",
          flex: 0.8,
          marginBottom: 8,
          fontSize: width/24
          //paddingBottom: 10
          //position: 'absolute' ,
          //marginBottom: 10       
        },
        headerStyle: { height: 60 ,backgroundColor:'#8b0000'}
      }),
    },
  })

const SecondActivity_StackNavigator = createStackNavigator({
  //All the screen from the First Option will be indexed here
  Employee: {
    screen: Employee,
    navigationOptions: ({ navigation }) => ({
        headerLeft: <Drawer navigationProps={navigation} />,
        //headerBackground: <ImageBackground style={{ width: '100%', height: '100%' }} source={require('../../Images/header_arcadia.jpeg')} />,
        headerTintColor: '#fff',
        headerTitle : 'Employee',
        headerTitleStyle: {
          textAlign: "center",
          flex: 0.8,
          marginBottom: 8,
          fontSize: width/24
          //paddingBottom: 10
          //position: 'absolute' ,
          //marginBottom: 10       
        },
        headerStyle: { height: 60 ,backgroundColor:'#8b0000'}
      }),
    },
  })



const AppDrawerNavigation = createDrawerNavigator({
  Dashboard: {
    screen: FirstActivity_StackNavigator
  },
  Employee: {
    screen: SecondActivity_StackNavigator
  },
  
},
  {
    contentComponent: CustomSidebarMenu,
    drawerWidth: Dimensions.get('window').width - 130
  },
)

export default AppDrawerNavigation


