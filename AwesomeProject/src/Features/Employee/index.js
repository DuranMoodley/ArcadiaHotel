import React, { Fragment, useState, useEffect } from 'react';
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ScrollView,
  FlatList,
  RefreshControl
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { useGlobal } from 'reactn'
import { NavigationEvents } from 'react-navigation'
//import 'react-native-gesture-handler'
import CommonStyles from '../../CommonComponents/index'

function Employee(props) {
  const [global, setGlobal] = useGlobal()
  const [state, setState] = useState({
    data: [],
    isLoading: false,
    refreshing: false
  })

  useEffect(() => {

    setState({ ...state, isLoading: true }); 
    RequestData();
    
    return () => {
    }

  }, [])

  const pullToRrefresh = async () => {
    setState({ ...state, refreshing: true });
    RequestData()
  }

  const RequestData = async ()=>{
    return fetch('http://duran.dx.am/GetEmployees.php')
    .then((response) => response.json())
    .then((responseJson) => {

        setState({
          isLoading: false,
          data: responseJson.employees,
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const clickEventListener = async (item) => {
   
   // Alert.alert(JSON.stringify(item))
   setGlobal({...global,employeeSelect : item})
   props.navigation.navigate('ViewEmployee')
  }

  const clickEventListener2 = async () => {
   
    props.navigation.navigate('SaveEmployee')
   }
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
         // console.log('Not Loaded Before' + state.dataItems.length)
          if (global.refreshData) {
            setState({
              ...state,
              isLoading: true,
             refreshData: false
            });
            RequestData()         
          }
          
        }}
       
      />
     <Spinner
        visible={state.isLoading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
      <FlatList
        style={styles.contentList}
        columnWrapperStyle={styles.listContainer}
        data={state.data}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={pullToRrefresh.bind(this)}
          />}
        keyExtractor={(item) => {
          return item.EmployeeId;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => { clickEventListener(item) }}>
              {/* <Image source={require('../../Images/qr_order.png')} style={styles.image} /> */}
              <View style={styles.cardContent}>
                <Text style={styles.name}>{item.Name} {item.Surname}</Text>
                {/* <Text style={[styles.subheading,{color:'black'}]}>{item.EmployeeId}</Text> */}
                <Text style={[styles.subheading,item.Status === 'leave' ? {color:'red'}:{color:'black'}]}>{item.Status}</Text>
              </View>
            </TouchableOpacity>
          )
        }} />

      <TouchableOpacity style={styles.buttonContainer} onPress={() => { clickEventListener2()}}>
          <Text style={{color:'white'}}>Add</Text>  
        </TouchableOpacity>  
    </View>

    
  );


}
Employee.navigationOptions = {
  title: 'Employees'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: CommonStyles.MenuScreenBackground.background,
  },
  outerBottomViewContainer: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: '#rgba(0,0,0,0.8)',
    flexDirection: 'row'
  },
  headerToolbarText: {
    alignSelf: 'center',
    color: "white",
    marginTop: Platform.OS == 'ios' ? 50 : 30
  },
  contentList: {
    flex: 1,

  },
  cardContent: {
    marginLeft: 10,
    marginTop: 10
  },
  ToolbarHeaderView: {
    flex: 1,
    // height: 40
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    alignSelf:'center',
    borderRadius:30,
    backgroundColor: "#f2812c",
  },
  bottomViewImage: {
    height: 40,
    width: 40,
    marginLeft: 10,
    marginTop: 10
  },
  bottomView: {

    height: 80,
    width: 300,
  },

  btnLoginText: {
    color: "white",
    fontWeight: 'bold'
  },

  image: {
    width: 50,
    height: 50,
    marginTop: 12,
    borderColor: "#ebf0f7"
  },
  toolbarbackgroundimage: {
    flex: 1,
    height: 200,
    resizeMode: 'stretch', // or 'stretch'
  },
  card: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: CommonStyles.TopMargin.marginTop,
    backgroundColor: CommonStyles.MenuTile.background, //"#FAFAFA",
    padding: 5,
    flexDirection: 'row'
  },
  bottomOrganisationText: {
    fontSize: 15,
    flex: 1,
    marginTop: 5,
    alignSelf: 'center',
    color: "#F48534",
    fontWeight: "bold",
  },
  bottomWeighbridgeText: {
    fontSize: 15,
    flex: 1,
    marginTop: -10,
    alignSelf: 'center',
    color: "white",
    fontWeight: "bold",
  },
  name: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'flex-start',
    color: "#F48534"
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
  loginText: {
    color: 'white',
  },
  subheading: {
    fontSize: 15,
    flex: 1,
    alignSelf: 'flex-start',
    color: "#727272",
    marginTop: 5
  },
  count: {
    fontSize: 14,
    flex: 1,
    alignSelf: 'center',
    color: "#6666ff"
  },
  followButton: {
    marginTop: 10,
    height: 35,
    width: 100,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#dcdcdc",
  },
  followButtonText: {
    color: "#dcdcdc",
    fontSize: 12,
  },
});

export default Employee;