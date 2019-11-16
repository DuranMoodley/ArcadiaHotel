import React, { Fragment, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ProgressBarAndroid,
  ProgressViewIOS,
  ToastAndroid,
  FlatList,
  Dimensions,
  RefreshControl
} from 'react-native';
import { NavigationEvents } from 'react-navigation'
import { useGlobal } from 'reactn'
import Utils from '../../Utils/utils'
import Spinner from 'react-native-loading-spinner-overlay';
import CommonStyles from '../../CommonComponents/index'

let width = Dimensions.get('window').width;
function index(props) {

  const [global, setGlobal] = useGlobal()
  const [state, setState] = useState({
    refreshing: false,
    isLoading: false,
    animating: true,
    dialogVisible: false,
    errorMessage: ' ',
    dataItems: [],
    // Name: global.client.Name,
    // Surname: global.employeeSelected.Surname,
    // EmployeeId: global.employeeSelected.EmployeeId
  })

  useEffect(() => {

    setState({
      ...state,isLoading: false
    });
    //_onRefresh();
    return () => {

    }
  }, [])

  const pullToRrefresh = async () => {
    setState({ ...state, refreshing: true });
    _onRefresh()
  }

  const _onRefresh = async () => {
   
     
  }

  const save = () => { 

   
    const fetchConfig = {
    method: '',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
    };
   
    fetch('http://duran.dx.am/UpdateClient.php?Id=' +global.clientSelect.Id+'&status=Approved', fetchConfig)
    //.then(res)
    .then(e => {
   
       if(e.status === 200)
       {
           setGlobal({...global,refreshData:true})
           ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
           props.navigation.goBack(null);
       }
       else{
          Utils.ShowAlert(state,setState,'Message','Connectivity Issue, Please try again');
       }
    });
   
    }
    

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>{state.isLoading == true ? '' : 'No Data Available' }</Text>
      </View>
    );
  };


  return (
    <View style={styles.container}>
       <NavigationEvents
        onWillFocus={() => {
         // console.log('Not Loaded Before' + state.dataItems.length)
          if (global.refreshData) {
            setState({
              ...state,
              isLoading: true,
             refreshData: false,

            //  Name: global.employeeSelected.Name,
            //  Surname: global.employeeSelected.Surname,
            //  EmployeeId: global.employeeSelected.EmployeeId
            });


            //RequestData()         
          }
          
        }}
       
      />
    <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{global.clientSelect.FullName}</Text>
              <Text style={[styles.name,{fontSize:20}]}>{global.clientSelect.Id}</Text>
              <Text style={styles.info}>{global.clientSelect.ContactNumber}</Text>
              <Text style={styles.info}>{global.clientSelect.Email}</Text>
              <Text style={styles.info}>Booking Date {global.clientSelect.Date}</Text>
              <Text style={styles.info}>{global.clientSelect.Status}</Text>
              <Text style={styles.info}>{global.clientSelect.NumOfPeople} people</Text>
              {/* <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text> */}
              {
                  global.clientSelect.Status !== 'Approved' &&
                  <TouchableOpacity style={styles.buttonContainer} onPress={() => { save()}}>
                  <Text style={{color:'white'}}>Approve</Text>  
                  </TouchableOpacity>  
              }
                                  
            </View>
        </View>
    </View>
  )
}


index.navigationOptions = {
  title: 'Details',
}

export default index

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#8b0000",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:80
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    marginTop:50
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#727272",
    marginTop:10,
    color:'black'
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#f2812c",
  },
});