import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Button, SafeAreaView, Text, StyleSheet, Modal, View, Pressable, TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { myUrl } from '../../myUrl';
import {setGlobalState, useGlobalState} from "../../GlobalLoginState";
import {COLOURS} from '../../styles/colours';
import ForgotPassword from './ForgotPasswordScreen';
import { Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



function LoginScreen({navigation}){

    // Set the state of the input forms
    [username, setUsername] = useState(``);
    [password, setPassword] = useState(``);
    [resStatus, setResStatus] = useState(false);
    [resMessage, setResMessage] = useState(``);
    [resObject, setResObject] = useState({
        username: null,
        email: null,
        childName: [],
        childDob: [],
        favourites: []
    });
    [modalVisible, setModalVisible] = useState(false);

    // Navigate to create account screen
    function onClickCreate(){
        navigation.navigate("Create Account")
    }

    function onForgotPassword(){
        navigation.navigate("Forgot Password")
    }

    // Navigate to the home screen
    async function onClickLogin(){
        if (username == '' | password == ''){
            return Alert.alert("Please enter your email and password.")
        }
        if (await LoginPostRequest()){
            
            if (resStatus == true){
                setUsername('')
                setPassword('')
                // set the global state
                setGlobalState("username",resObject.username)
                setGlobalState("email",resObject.email)
                setGlobalState("childName",resObject.childName)
                setGlobalState("childDob",resObject.childDob)
                setGlobalState("favourites",resObject.favourites)

                if (resObject.username === 'admin'){
                    navigation.navigate("AdminLandingPage")
                } else{
                    navigation.navigate("LandingPage")
                }
            }
            else{
                setModalVisible(true)
            }
        } else {
            setModalVisible(true)
        }
    }

    
    // Handle the login
    async function LoginPostRequest(){
        const response = await fetch(`http://${myUrl}/users/login`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password
            })
        })
        const data = await response.json()
        setResStatus(await(data.status))
        setResMessage(await(data.message))
        setResObject({
            username: data.username,
            email: data.email,
            childName: data.childName,
            childDob: data.childDob,
            favourites: data.favourites
        }    
        )
        return await data.status
    }


    return (
        <KeyboardAwareScrollView>
        <SafeAreaView
        style={styles.container}>



        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                <Text style={{padding: 20}}>{resMessage}</Text>

                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
                </View>
            </View>
        </Modal>

        <View style ={{flex : 2}}>
            <Image 
                style={styles.image}
                source={require('../../assets/logo.png')} 
            />
        </View>
        <View style ={{flex : 1, }}>
            <TextInput
                    autoCapitalize={'none'}
                    style={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    placeholder='Email'
                />
            <TextInput
                autoCapitalize={'none'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                // secureTextEntry={true}
            />
        </View>
        <View style ={{flex : 1, }}>
            {/* <Button 
                color={COLOURS.purple}
                title="Login" 
                onPress={() => onClickLogin()}
            ></Button> */}
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => onClickLogin()}
                underlayColor='#fff'>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
            <Button
                style={styles.loginBtn2}
                color={COLOURS.purple}
                title="Forgot password?"
                onPress={() => onForgotPassword()}
            ></Button>
        </View>
        <View style ={{flex : 1}}>
            <View style ={{alignItems: 'center'}}>
                <Text style={styles.orText}>------- OR --------</Text>
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => onClickCreate()}
                underlayColor='#fff'>
                <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>
        </View>
        
        </SafeAreaView>
        </KeyboardAwareScrollView>
    )

}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    image: {
        marginTop:(windowHeight/20),
        marginBottom:0,
        marginLeft:(windowWidth/2)-(windowWidth/2.5),
        resizeMode: 'contain',
        alignSelf: 'center',
        width:200,
        height:200,
        flex:1,
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems:'center',
        marginHorizontal: 16,
        
      },
    input: {
        marginRight:30,
        marginLeft:30,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    loginBtn:{
        marginRight:30,
        marginLeft:30,
        marginTop:20,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:COLOURS.darkGrey,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },

    loginText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontFamily:'Quicksand_400Regular',
        fontSize:20,
    },
    orText:{
        fontFamily:'Quicksand_400Regular',
        fontSize:15,
    },

    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        position: "absolute",
        top: (windowHeight/2)-60,
        height:120,
        width:300,
        left: (windowWidth/2)-150,
          margin: 0,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 0,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
              width: 0,
              height: 2
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5
      },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


export default LoginScreen;