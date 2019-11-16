import React, { Component, useState, useEffect } from 'react';
import {Dimensions, View, Text, ActivityIndicator, Alert, Image,ImageBackground, TouchableOpacity} from 'react-native';
import { useGlobal } from 'reactn'
import Utils from '../../Utils/utils'
function SplashScreen(props) {
  const [global, setGlobal] = useGlobal()
  const [state, setState] = useState({
    isLoading: true,
    animating: true,
    isSuccess: false,
    UserGuid: ' ',
    isConnected:  Utils.NetworkConnection()
  })

  useEffect(() => {
    let isSubscribed = true
  
    restoreUser(isSubscribed)
     

    return () => {
      isSubscribed = false
    }
  }, [])

  const clickEventListener =  () => {
    restoreUser(true)
  }

  
  const restoreUser = async (isSubscribed) => {
    try {
      props.navigation.replace('Login')
     
    }
    catch (e) {
      props.navigation.replace('Login')
      
    }
  }

  return (
     <View style={{flex:1,justifyContent:'center',flexDirection:'column'}}>
     
      <View style={{alignSelf:'center',height: 100, width: 100}}>
        <Image
          style={{alignSelf:'center',height: 100, width: 100 }}
          source={require('../../Images/arcadia_hotel.png')}
          resizeMode="contain" />
      </View> 
      {
         state.isConnected === false
          &&
            <TouchableOpacity  style={styles.card} onPress={() => { clickEventListener() }}>
                <View >
                  <Text style={styles.btnLoginText}>Retry</Text>
                </View>
              </TouchableOpacity>  
      }   
     </View>
  )
}

const styles = {
  viewStyles: {
    flex: 1,
     width: '100%',
     height:'100%',   
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'FFFFFF'
  },

  TitleImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center'
  },
  TitleImageContainer: {
  alignSelf:'center',
  justifyContent: 'center',
  alignItems: 'center',  
 
  },
  card: {
    borderRadius: 100,
    position:'absolute',
    bottom:15,
    backgroundColor: "#f2812c",
   width:  Dimensions.get('window').width - 100,
   // padding: 15,
   marginLeft:50,
   marginRight:50, 
    flexDirection: 'row',
    //top: Dimensions.get('window').height - 500,
    //width: '100%',
    height: 50,
    //backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',  
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  bottomView: {
  //   top: Dimensions.get('window').height - 500,
  //   width: '100%',
  //   height: 50,
  //   //backgroundColor: '#FFFFFF',
  //  // alignSelf:'fle'
  //   justifyContent: 'center',
  //   alignItems: 'center',  
    //position: 'absolute',
   // bottom: 0
   width: '100%',
   height: 50,
   backgroundColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
   position: 'absolute', //Here is the trick
   bottom: 5, //Here is the trick
  },

  textStyle: {
    color: 'orange',
    fontSize: 15,
    marginBottom: 20
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: 'transparent'
  },
  loginButton: {
    backgroundColor: "#f2812c",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,

    elevation: 19,
  },
  btnLoginText: {
    color: "white",
    fontWeight: 'bold'
  },
}

export default SplashScreen