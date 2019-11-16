import React, { Fragment, useState, useEffect } from 'react';
import {
 StyleSheet,
 View,
 Text,
 Alert,
 TouchableOpacity,
 Image,
 FlatList,
 TextInput,
 RefreshControl,
 Keyboard,
 ToastAndroid,
 ScrollView
} from 'react-native';

import Utils from '../../Utils/utils'
import { useGlobal } from "reactn";
import Spinner from 'react-native-loading-spinner-overlay';
import CommonStyles from '../../CommonComponents/index'


export default function index(props) {

 const [global, setGlobal] = useGlobal()
 
 const [state, setState] = useState({
 
 refreshing: false,
 isLoading: false,
 dataItems: [],
 dialogVisible: false,
 errorMessage: ' ',
 search: '' ,
 InductionNumber: '',
 dateFrom: '',
 dateTo: '',
 comment : '',
 isChecked : true,
 Name:global.employeeSelect.Name,
 Surname:global.employeeSelect.Surname,
 Duty:global.employeeSelect.Duty,
 ContactNumber:global.employeeSelect.ContactNumber,
 EmailAddress:global.employeeSelect.EmailAddress,
 Shift:global.employeeSelect.Shift,
 Status:global.employeeSelect.Status
 })
 
 useEffect(() => {
 
 
 return () => {
 }
 
 }, [])

 const save = () => { 

 const {Name,Surname,Duty,ContactNumber,EmailAddress,Shift,Status} = state;

 const fetchConfig = {
 method: '',
 headers: {
 'Accept': 'application/json',
 'Content-Type': 'application/json'
 }
 };
//http://duran.dx.am/UpdateEmployee.php?EmployeeId=26&name=t&surname=f&contactNumber=4444&emailAddress=ddfdfd&duty=Cleaner&shift=8:00-12:00pm&status=Leave
 fetch('http://duran.dx.am/UpdateEmployee.php?name=' +Name+'&surname=' + Surname + '&EmployeeId=' + global.employeeSelect.EmployeeId + '&contactNumber=' + ContactNumber + '&emailAddress=' + EmailAddress + '&duty=' + Duty + '&shift=' + Shift + '&status=' + Status, fetchConfig)
 //.then(res)
 .then(e => {

    if(e.status === 200)
    {
        setGlobal({...global,refreshData:true,employeeSelect:{EmployeeId:global.employeeSelect.EmployeeId,Name:Name,Surname:Surname,Duty:Duty,EmailAddress:EmailAddress,ContactNumber:ContactNumber,Shift:Shift,Status:Status}})
        ToastAndroid.show('Successfully Updated', ToastAndroid.SHORT);
        props.navigation.goBack(null);
    }
    else{
       Utils.ShowAlert(state,setState,'Message','Connectivity Issue, Please try again');
    }
 });

 }
 
 
 const _onRefresh = async () => 
 {
 Utils.ShowAlert(state,setState,'Message', 'Saved','Ok')
 }
 ListEmpty = () => {
 return (
 //View to show when list is empty
 <View style={styles.MainContainer}>
 <Text style={{ textAlign: 'center' }}>{state.isLoading == true ? '' : 'No Data Available' }</Text>
 </View>
 );
 };

 const clickEventListener = (item) => {
 
 }

 return (
 <View style={styles.container}>
 
 <ScrollView>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Name"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.Name} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 Name: text
 })
 }
 />
 </View>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Surname"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.Surname} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 Surname: text
 })
 }
 />
 </View>
 
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Contact Number"
 returnKeyType="next"
 keyboardType="number-pad"
 underlineColorAndroid='transparent'
 value={state.ContactNumber} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 ContactNumber: text
 })
 }
 />
 </View>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Email Address"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.EmailAddress} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 EmailAddress: text
 })
 }
 />
 </View>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Duty"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.Duty} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 Duty: text
 })
 }
 />
 </View>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Shift"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.Shift} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 Shift: text
 })
 }
 />
 </View>
 <View style={styles.inputContainer}>
 <TextInput style={styles.inputs}
 placeholder="Enter Status"
 returnKeyType="next"
 keyboardType="default"
 underlineColorAndroid='transparent'
 value={state.Status} 
 blurOnSubmit={false}
 onChangeText={(text) => 
 setState({
 ...state,
 Status: text
 })
 }
 />
 </View>
 <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => {save() }}>
 <Text style={styles.btnLoginText}>Save</Text>
 </TouchableOpacity> 
 <Spinner
 visible={state.isLoading}
 textContent={'Loading...'}
 textStyle={styles.spinnerTextStyle}
 />
 <View>
 
 </View>
 </ScrollView>
 </View>
 )

}


index.navigationOptions = {
 title: 'Edit'
 }

const styles = StyleSheet.create({
 container: {
 flex: 1,
 //marginTop: Platform.OS === 'ios' ? 30 : 20,
 backgroundColor: CommonStyles.BackgroundScreenColor.background
 },
 outerBottomViewContainerOtherScreens: {
 opacity: 0.8,
 height: 70,
 marginTop: Platform.OS === 'ios' ? 5 : 10,
 backgroundColor: '#rgba(0,0,0,0.8)',
 flexDirection: 'row'
 },
 inputContainer: {
 borderBottomColor: '#F5FCFF',
 backgroundColor: '#FFFFFF',
 borderRadius: 30,
 marginTop:20,
 borderBottomWidth: 1,
 width: 300,
 alignSelf:'center',
 height: 45,
 // marginBottom: 20,
 flexDirection: 'row',
 alignItems: 'center',
 
 shadowColor: "#808080",
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 
 elevation: 5,
 },
 inputContainerMulti: {
 borderBottomColor: '#F5FCFF',
 backgroundColor: '#FFFFFF',
 
 marginTop:20,
 
 width: 300,
 alignSelf:'center',
 height: 300,
 // marginBottom: 20,
 flexDirection: 'row',
 // alignItems: 'center',
 alignItems:'flex-start',
 shadowColor: "#808080",
 shadowOffset: {
 width: 0,
 height: 2,
 },
 shadowOpacity: 0.25,
 shadowRadius: 3.84,
 
 elevation: 5,
 },
 inputs: {
 height: 45,
 marginLeft: 16,
 borderBottomColor: '#FFFFFF',
 flex: 1,
 color:'black'
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
 inputsMultiLine: { 
 //height:300,
 marginLeft: 16,
 // borderBottomColor: '#FFFFFF',
 flex: 1,
 },
 toolbarbackgroundimage: {
 flex: 1,
 height: 200,
 resizeMode: 'stretch', // or 'stretch'
 },
 dialogText: {
 flex: 1,
 justifyContent: 'center',
 alignSelf: 'center',
 fontSize: 14,
 fontWeight: 'bold'
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
 height: 30,
 flexDirection: 'row',
 justifyContent: 'center',
 alignItems: 'center',
 marginBottom: 20,
 width: 200,
 marginTop: 20,
 borderRadius: 30,
 alignSelf: 'center',
 backgroundColor: 'transparent'
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
 marginLeft: 0,
 marginRight: 0,
 marginTop: CommonStyles.TopMargin.marginTop,
 backgroundColor: CommonStyles.NormalWhite.background,
 padding: 5,
 flexDirection: 'row',
 alignItems: 'center',
 flex: 1,
 justifyContent: 'center'
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
 marginBottom: 5,
 color: "#727272"
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
 alignSelf: 'center',
 color: "#727272",
 marginBottom: 10
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
 
 