import React from 'react'
import {
  Alert
} from 'react-native';


let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  })

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  })

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  }
}

const GetTicketType = (rawString) => {
  console.log(rawString.substring(0, 3))
  return rawString = rawString.substring(0, 3);

  
}


const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 200,// speed of transition
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: SlideFromRight(index, position, width),
      }[transition];
    },
  }
}
const NetworkConnection  = () =>
{
//   let isConnection = ' ' ;
//   const unsubscribe = NetInfo.addEventListener(state => {
//     // console.log("Connection type", state.type);
//     // console.log("Is connected?", state.isConnected);
//     isConnection = state.isConnected;
   
//   });
  //Alert.alert('Connected ' + isConnection );
  return true;
}
const GetDropDownList = (result, item) => {

  let wbArr = []
  wbArr.push(item)

  result.map(Weighbridges => {

    wbArr.push({

      WeighbridgeId: Weighbridges.WeighbridgeId,
      WeighbridgeCode: Weighbridges.WeighbridgeCode,
      IsTonTrac: Weighbridges.IsTonTrac,
      OrganisationId: Weighbridges.OrganisationId,
      WeighbridgeLocationId: Weighbridges.WeighbridgeLocationId,
      WeighbridgeName: Weighbridges.WeighbridgeName//.charAt(0).toUpperCase() + Weighbridges.WeighbridgeName.toLowerCase().slice(1)
    })
  })

  let result2 = []
  result2.push(result);
  
  return wbArr;
}

const GetDropDownListOrganisation = (result, item) => {

  let wbArr = []
  wbArr.push(item)

  result.map(Organisations => {

    wbArr.push({

      OrganisationId: Organisations.OrganisationId,
      OrganisationName: Organisations.OrganisationName,
      NumTonTracWeighbridges: Organisations.NumTonTracWeighbridges
     
    })
  })

  let result2 = []
  result2.push(result);
  
  return wbArr;
}

// const ErrorLog = async (val, token) => {
//   try {


//       if(NetworkConnection())
//       {
//         var params = {
//           UserGuid: val.UserGuid,
//           ApplicationVersion : val.ApplicationVersion,
//           Message : val.Message,
//           ProcedureName : val.ProcedureName,
//           StackTrace : val.Message,
//           Timestamp : val.Timestamp,
//           MobileErrorId :JSON.stringify(val.id),
//           MobilePlatform: val.Platform + ' ' + DeviceInfo.getSystemVersion() 
//         };

//         console.log('error params' + JSON.stringify(params)  + '-------' + token);

//         api.errorLog(params, token)
//           .then(function (result) {

//             console.log(' Error sENT ' + result.data[0].MobileErrorId)

//             if(result.data[0].MobileErrorId === val.id)
//             {
//               Database.DeleteRecord('mobile_error_log',val.id);
//             }
          
//           }).catch(function (error) {    
//             console.log('Error Log error ' + error)
//           //  Utils.ShowAlert(state,setState,'Message', error.message,'Ok')
//           })
//         }
//         else{     
//           console.log('No Internet Connection, Please try again or use a different network.')
//           //Utils.ShowAlert(state,setState,'Message', 'No Internet Connection, Please try again or use a different network.','Ok')
//         }
//   } catch (error) {    
//     console.log('Error Log error ' + error)
//     //Utils.ShowAlert(state,setState,'Message', error.message,'Ok')
//   }
// }



const ShowAlert = async (state, setState, title, message, buttonName) => {
  
  //setState({ ...state, isConnected:  false, isLoading:false , refreshing: false})
  if(Platform.OS === 'android')
  {
   setState({ ...state, isLoading:false , refreshing: false})
  }
  Alert.alert(
    title,
    message, // <- this part is optional, you can pass an empty string
    [
      {text: buttonName, onPress: () =>  message.includes('No Internet Connection' ) ?  setState({ ...state, isConnected: false,isLoading:false, refreshing: false }) :setState({ ...state, isLoading:false, refreshing: false }) },
    ],
    {cancelable: false},
  );

  console.log(' state val ' +  message + title)
}

const ShowAlertNoConnection = async (state, setState, title, message, buttonName) => {
  
  //setState({ ...state, isConnected:  false, isLoading:false , refreshing: false})
  if(Platform.OS === 'android')
  {
   setState({ ...state, isLoading:false , refreshing: false})
  }
  Alert.alert(
    title,
    message, // <- this part is optional, you can pass an empty string
    [
      {text: buttonName, onPress: () => setState({ ...state, isConnected: false,isLoading:false, refreshing: false })},
    ],
    {cancelable: false},
  );

  console.log(' state val ' +  JSON.stringify(state))
}

const SubtractDate = (currDate, errorLogTimeStamp) => {

  currDate = new Date(currDate)

  errorLogTimeStamp = new Date(errorLogTimeStamp)

  let numOfDays = Math.abs(currDate.getDate() - errorLogTimeStamp.getDate())

  return numOfDays;

  //console.log(' num days ' + numOfDays  + ' curr ' + currDate  + ' timestamp ' + errorLogTimeStamp );
}
const getOrganisationName = async (state, setState) => {
  let organisationName, weighbridgeName
  try {

    organisationName = await AsyncStorage.getItem('organisationName')
    weighbridgeName = await AsyncStorage.getItem('WeighbridgeName')

    setState({
      ...state,
      organisationName: organisationName,
      weighbridgeName: weighbridgeName
    });

  } catch (error) {
    // Error retrieving data
    Alert.alert("Could not get data" + error)
  }
}
const getFormattedDateString = () => {
  let date = new Date().toISOString().slice(0, 10)
  return `${date}`

}
const getFormattedDateTime = () => {
	// Handling values passed through state. (undefined initially - false)
		let date =   new Date().toISOString().slice(0, 10)
		let time = new Date().toISOString().slice(11, 19)
		return `${date} ${time}`
}

const getCurrentTime = ()=>{
  //let time = new Date().toISOString().slice(11, 19)
  let hours = new Date().getHours(); //Current Hours
  let min = new Date().getMinutes(); 
  let time =  hours + ':' + min ;
	return `${time}`
}

const getFullDateTimeString = () =>{
  let date = new Date().toISOString().slice(0, 11)
  return `${date}`
}
export default {
  TransitionConfiguration,
  GetDropDownList,
  getOrganisationName,
  getFormattedDateString,
  NetworkConnection,
  GetTicketType,
  ShowAlert,
  getFullDateTimeString,
  //ErrorLog,
  getFormattedDateTime,
  SubtractDate,
  ShowAlertNoConnection,
  GetDropDownListOrganisation,
  getCurrentTime
}