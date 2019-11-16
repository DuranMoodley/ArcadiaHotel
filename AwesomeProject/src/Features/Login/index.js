import React, { useState ,useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  ActivityIndicator
} from 'react-native';

import { useGlobal } from 'reactn'



function LoginScreen(props) {
  const [global, setGlobal] = useGlobal()

  const [state, setState] = useState({
    TextUsername: '',
    TextPassword: '',
    isLoading: false,
    HasValue: false,
    animating: true,
    token: '',
    userGuid: '',
    dialogVisible: false,
    errorMessage: ' '
  })
  
  useEffect(() => {

    
    return () => {
    }

  }, [])

  
  
  const username = state.TextUsername
  const password = state.TextPassword

  

  const onClickListener = async () => {
    try {
      props.navigation.replace('Dashboard')
   
     } catch (error) {
      console.log('-------DS-----------' + JSON.stringify(error.message))
      
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.TitleImageContainer}>
     
        <Image
          style={{ flex: 1, height: undefined, width: undefined }}
          source={require('../../Images/arcadia_hotel.png')}
          resizeMode="contain"
        />
      </View>
      <TextInput
        placeholder=""
        underlineColorAndroid='transparent' />
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Username"
          returnKeyType="next"
          keyboardType="email-address"
          underlineColorAndroid='transparent'
          value={state.TextUsername}
          //onSubmitEditing={() => { this.secondTextInput.focus(); }}
          blurOnSubmit={false}
          onChangeText={(TextUsername) => setState({
            ...state,
            TextUsername
          })
          }
        />
        <Image style={styles.inputIcon} source={require('../../Images/username.png')} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.inputs}
          placeholder="Password"
          returnKeyType="done"
          //ref={(input) => { this.secondTextInput = input; }}
          secureTextEntry={true}
          value={state.TextPassword}
          underlineColorAndroid='transparent'
          onChangeText={(TextPassword) => setState({ ...state, TextPassword })} />
        <Image style={styles.inputIcon} source={require('../../Images/password.png')} />
      </View>
      <TouchableOpacity style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener()}>
        <Text style={styles.btnLoginText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.textStyle}>v1.0</Text>
      {
         state.isLoading === true
         ?
        <View >
            <ActivityIndicator size="large" color="orange" />
        
        </View>
        :
        <View></View>
      }
    </View>
  )

}

const resizeMode = 'center'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 0
  },
  textStyle: {
    color: '#737373',
    fontSize: 15,
    marginBottom: 20
  },
  bottomView: {
    top: Dimensions.get('window').height - 500,
     width: '100%',
     height: 50,
     //backgroundColor: '#FFFFFF',
     justifyContent: 'center',
     alignItems: 'center',  
     //position: 'absolute',
    // bottom: 0
   },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
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
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  TitleImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    justifyContent: 'center'
  },
  TitleImageContainer: {
    width: 300,
    height: 80,
    marginBottom: 20
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    justifyContent: 'center'
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
  btnForgotPassword: {
    height: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
    width: 300,
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
  loginText: {
    color: 'white',
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  btnText: {
    color: "#8bb5f7",
    fontWeight: 'bold'
  },
  btnLoginText: {
    color: "white",
    fontWeight: 'bold'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default LoginScreen