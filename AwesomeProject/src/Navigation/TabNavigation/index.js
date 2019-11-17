//This is an example of Tab inside Navigation Drawer in React Native//
import React from 'react';
//import react in our code.
import { SafeAreaView } from 'react-native'
import {createMaterialTopTabNavigator,MaterialTopTabBar} from 'react-navigation-tabs';
//Import all the screens for Tab
import Transactions from '../../Features/Transactions/index'
//import 'react-native-gesture-handler'
function SafeAreaMaterialTopTabBar (props) {
  return (
    <SafeAreaView style={{ flex: 0, backgroundColor: 'black' }}>
      <MaterialTopTabBar {...props} />
    </SafeAreaView>
  )
}

 
const TabScreen = createMaterialTopTabNavigator(
  {
    Pending:  { screen: props => <Transactions {...props}  filterType={'Pending'}/>,
    navigationOptions: {
      title: 'Pending'
     }
    },
    Approved: { screen: props => <Transactions {...props}  filterType={'Approved'}/>,
    navigationOptions: {
      title: 'Approved'
     }
    },
    Declined: { screen: props => <Transactions {...props}  filterType={'Decline'}/>,
    navigationOptions: {
      title: 'Declined'
     }
    }
  },
  
  {
    tabBarComponent: SafeAreaMaterialTopTabBar,
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    lazy:true,
    tabBarOptions: {
        
      activeTintColor: '#f58433',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: 'black',
      },
      labelStyle: {
        margin: 8, fontSize: 9.9
      },
      indicatorStyle: {
        backgroundColor: 'white'
      },
    },  
  },
 

);

export default TabScreen