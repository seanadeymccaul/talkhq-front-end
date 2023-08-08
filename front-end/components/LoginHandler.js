/*
import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Image, Button, SafeAreaView, Text, StyleSheet, Modal, View, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import {myUrl } from "../myUrl.js"
import {setGlobalState, useGlobalState} from "../GlobalLoginState";

function LoginHandler({navigation}){

    // Set the state of the input forms
    [username, setUsername] = useState(``);
    [password, setPassword] = useState(``);
    [resStatus, setResStatus] = useState(false);
    [resMessage, setResMessage] = useState(``);
    [modalVisible, setModalVisible] = useState(false);

    // Navigate to create account screen
    function onClickCreate(){
        navigation.navigate("Create Account")
    }

    // Navigate to the home screen
    async function onClickLogin(){
        if (await LoginPostRequest()){
            if (resStatus){
                setUsername('')
                setPassword('')
                // set the global state
                setGlobalState("username",resMessage);
                navigation.navigate("LandingPage")
            }
        } else {
            setModalVisible(true)
        }
    }
    
    // Handle the login
    async function LoginPostRequest(){
        const response = await fetch(`http://${myUrl}:8080/users/login`,{
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
        console.log(`Response`)
        console.log(data)
        return await data.status
    }

    return (
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

                <Text>{resMessage}</Text>

                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
                >

                    <Text style={styles.textStyle}>Ok</Text>

                </Pressable>

                </View>
            </View>
        </Modal>

            <Image 
                style={styles.image}
                source={require('../assets/logo.png')} 
            />

            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                defaultValue='Username'
            />

            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                defaultValue='Password'
            />

            <Button title="Login" onPress={() => onClickLogin()}></Button>

            <Text>------- OR --------</Text>

            <Button title="Create Account" onPress={() => onClickCreate()}></Button>


        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    image: {
        marginTop:0,
        marginBottom:0,
        resizeMode: 'contain',
        alignSelf: 'center',
        width:50,
        height:50
      },
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 16,
      },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    text:{
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
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
        elevation: 2
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


export default LoginHandler;*/