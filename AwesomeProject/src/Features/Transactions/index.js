
import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
  Linking,
  NativeModules,
  RefreshControl,
  Dimensions
} from 'react-native';
import { useGlobal } from 'reactn'
import { NavigationEvents } from 'react-navigation'
//import Utils from '../../Utils/utils'
import Spinner from 'react-native-loading-spinner-overlay';
import CommonStyles from '../../CommonComponents/index'


let width = Dimensions.get('window').width;
function Transactions(props) {
  const [global, setGlobal] = useGlobal()
  const [state, setState] = useState({
    refreshing: false,
    isLoading: false,
    animating: true,
    dialogVisible: false,
    errorMessage: ' ',
    dataItems: [],
    WeighbridgeId: 0
  })

  const { filterType } = props

  useEffect(() => {

    setState({
      ...state,
      isLoading: true
    });

    RequestData();

   

    return () => {

    }
  }, [])

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={styles.MainContainer}>
        <Text style={{ textAlign: 'center' }}>{state.isLoading == true ? '' : 'No Data Available' }</Text>
      </View>
    );
  };

  const clickEventListener = async (item) => {

    setGlobal({...global,clientSelect : item})
   // Alert.alert(JSON.stringify(props))
    props.navigation.navigate('ViewClient');
    


  }
  const pullToRrefresh = async () => {
    setState({ ...state, refreshing: true });
    RequestData()
  }

  const RequestData = async ()=>{
    return fetch('http://duran.dx.am/GetClientMobile.php?status='+filterType)
    .then((response) => response.json())
    .then((responseJson) => {

        setState({
          isLoading: false,
          dataItems: responseJson.clients,
        });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => {
          if (global.refreshData) {
            setState({
              ...state,
              isLoading: true,
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
       {/* <Text style={[styles.mainTransactionTitle,{alignSelf:'center',color:'black'}]}>{filterType}</Text> */}
      <FlatList
        style={styles.contentList}
        ListEmptyComponent={ListEmpty}
        columnWrapperStyle={styles.listContainer}
        data={state.dataItems}
        refreshControl={
          <RefreshControl
            refreshing={state.refreshing}
            onRefresh={pullToRrefresh.bind(this)}
          />}
        keyExtractor={(item) => {
          return item.Id;
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.card} onPress={() => { clickEventListener(item) }}>
              <Text style={styles.mainTransactionTitle}>{item.FullName}</Text>
              <Text style={styles.transactionValues}>{item.Date}</Text>
              <Text style={styles.transactionValues}>{item.Email}</Text>
              <View style={{ flex: 1, flexDirection: 'row' }}>
               
              </View>
            </TouchableOpacity>
          )
        }} />
    </View>
  )
}

export default Transactions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Platform.OS === 'ios' ? 30 : 20,
    backgroundColor: CommonStyles.BackgroundScreenColor.background//"#F2F2F2",
    //backgroundColor:"red",
  },
  DialogContainer: {
    flexDirection: 'row'
  },
  outerBottomViewContainer: {
    flex: 1,
    opacity: 0.8,
    backgroundColor: '#rgba(0,0,0,0.8)',
    flexDirection: 'row'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },

  dialogText: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold'
  },
  tableViewLayout: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red'
  },

  headerToolbarText: {
    alignSelf: 'center',
    color: "white",
    marginTop: Platform.OS == 'ios' ? 50 : 30
  },
  contentList: {
    flex: 1

  },
  cardContent: {
    marginLeft: 10,
    width: '100%',
    marginTop: 10,
    flex: 1,
    //flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'black'
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
    flex: 1,
    flexDirection: 'column'
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
  transactionTitles: {
    fontSize: 15,
    marginLeft: 30,
    //marginTop: 30,
    marginBottom: 2,
    fontWeight: '500',
    color: "#737373",
    fontWeight: 'bold',
    // position:'relative',
    // width: '100%',
    alignSelf: 'flex-end'
  },
  mainTransactionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 8,
    //marginBottom: 10,
   // alignSelf: 'flex_start',
    color: "#F48534"
  },
  transactionValues: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 5,
    //alignSelf: 'flex-end',
    fontWeight: '300',
    // height:20,
    // width:20,
    // position:'relative',
    // marginBottom: 10,
    color: "#737373"
  },
  transactionDescription: {
    fontSize:  width/24,
    marginLeft: 10,
    marginTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    
    // height:20,
    // width:20,
    // position:'relative',
    // marginBottom: 10,
    color: "#737373"
  },
  iconStyle: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 8,
    alignSelf: 'center',
    // height:20,
    // width:20,
    // position:'relative',
    // marginBottom: 10,
    color: "#737373"
  },
  arrowRight: {
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 30,
    //backgroundColor:'pink',
    flex: 0.3,
   // height: Platform.OS === 'ios' ? 90 : 110,
    // height:20,
    // width:20,
    // position:'relative',
    // marginBottom: 10,
    color: "#737373"
  },
  imageIcon: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    height: 20,
    width: 20,
    // position:'relative',
    // marginBottom: 10,
    color: "#737373"
  },
  transactionOrange: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    // marginBottom: 12,
    color: "#E58946"
  },
  transactionOrangeValue: {
    fontSize: width/24,
    marginLeft: 10,
    marginTop: 10,
    //fontWeight: 'bold',
    // marginBottom: 12,
    color: "#F48534",
    alignSelf: 'flex-end'
  },
  transactionOrangeValueTotal: {
    fontSize: 15,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: 'bold',
    // marginBottom: 12,
    color: "#F48534",
    alignSelf: 'flex-start'
  },
  name: {
    fontSize: 15,
    //textAlign:'center',
    //alignSelf:'center',
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