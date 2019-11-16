import React, { useState, useEffect, Fragment } from 'react'
import { View, StyleSheet, Image, Text, Alert,Dimensions,TouchableOpacity,ImageBackground } from 'react-native'
import { useGlobal } from 'reactn';
import profileImage from '../Images/arcadia_hotel.png'
import { SafeAreaView } from 'react-navigation';

let width = Dimensions.get('window').width;
export default function CustomDrawer(props) {
  const [global, setGlobal] = useGlobal()

  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigation.closeDrawer();
  };

  const itemsSystemDisabled = [
    {
      navOptionName: 'Dashboard',
      screenToNavigate: 'Dashboard',
      //image: require("../Images/orderOrange.png")
    },   
    {
        navOptionName: 'Employee Management',
        screenToNavigate: 'Employee',
        //image: require("../Images/orderOrange.png")
      },   
  ]

  return (
    <Fragment>
        <SafeAreaView style={{ flex: 0 , backgroundColor: 'white'}}>
        {/* <View style={{ flex: 1, backgroundColor: 'white' }} /> */}
    
        <View style={styles.sideMenuContainer}>
          {/*Top Large Image */}
          <View style={{marginTop:18,width:'100%',height:55}}>
          <Image source={require('../Images/arcadia_hotel.png')} style={{ height: 40, width: 40,  alignSelf: 'center' }} />
          <Text style={{alignSelf:'center',marginTop:10,color:'black',fontSize:width/24}}>{global.FullName}</Text>
          <Text numberOfLines={1} maxLength={15} style={{alignSelf:'center',marginLeft:10,marginRight:10,marginTop:10,color:'black',fontSize:width/24}}>{global.HaulierName}</Text>
          {/* <View style={{marginTop:10,marginLeft:50, marginRight:50, borderBottomColor: '#F2F2F2',borderBottomWidth: 1}}></View> */}
      
          </View>
        
          <View
            style={{
              width: '80%',
              height: 1,
              backgroundColor: '#e2e2e2',      
              marginTop: Platform.OS ==='android' ? 60 : 50,
              marginBottom: 16
             
            }}
          />
         
         <View style={{ width: '100%' }}>
             {itemsSystemDisabled.map((item, key) => (
               <View
                 key={key}
                 style={{
                   padding: 0,
                   paddingBottom: 10,
                   backgroundColor: global.currentScreenIndex === key ?  '#ffffff' : '#ffffff',
                 }}>
                 <View
                   style={{ height: 30 }}>
                   <TouchableOpacity
                     style={{ width: '100%', height: '100%'}}
                     onPress={() => {
 
                       setGlobal({
                         ...global,
                         currentScreenIndex: key
                       })
                      // Alert.alert('' + key)
                       props.navigation.navigate(item.screenToNavigate);
                     }}>
                     <View style={{flex:1,flexDirection:'row'}}> 
                     <Image source={item.image} style={styles.image} />
                     <Text
                       style={{
                         width: 160,
                         height: 22,
                         marginTop: 10,
                         justifyContent: 'center',
                         fontSize: 15,
                         marginLeft: 10,
                         color: global.currentScreenIndex === key ? '#f2812c' : 'gray',
                       }}
                     >
                       {item.navOptionName}
                     </Text>
                    
                     </View> 
                   </TouchableOpacity>
                  
                 </View>
               </View>
         ))}      
          </View>           
          </View>
          </SafeAreaView>
    
    <View style={{flex:1,bottom:30}}>
          <View style={{position:"absolute",bottom:65, width: '100%',  borderBottomColor: '#F2F2F2',borderBottomWidth: 1}}></View>
     
        <TouchableOpacity 
        style={{position:"absolute",bottom:0,alignSelf:'center', backgroundColor:'#f2812c',padding:10,borderRadius:10}}
        onPress={async ()=>{setGlobal({})
      
        props.navigation.replace('Login')
        }
          }
        >
            <Text style={{color:'white'}}>Logout</Text>
            </TouchableOpacity>
    
    
            </View>
            <SafeAreaView style={{ flex: 0, backgroundColor: 'white' }}>
              <View style={{ flex: 1, backgroundColor: 'white' }} />
            </SafeAreaView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    //paddingTop: 20,
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    // width: '50%',
    // height: '30%',
    marginLeft:10,
    marginRight:10,
    marginTop: 20,
    borderRadius: 150 / 2,
  },
  bottomView: {
    top: Dimensions.get('window').height - 200,
     width: '100%',
     height: 50,
     backgroundColor: '#FFFFFF',
     justifyContent: 'center',
     alignItems: 'center',  
     //position: 'absolute',
    // bottom: 0
   },
   image: {
    width: 20,
    height: 20,
    marginTop: 10,
    marginLeft: 20,
    borderColor: "#ebf0f7"
  },
   card: {
    borderRadius: 100,
    backgroundColor: "red",
   // width: 300,
   // padding: 15,
   marginLeft:50,
   marginRight:50, 
    flexDirection: 'row',
    top: Dimensions.get('window').height - 200,
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
  logButton: {
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

});