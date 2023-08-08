import React, { useState, useEffect } from 'react';
import { Image, Button, SafeAreaView, Text, StyleSheet, Modal, View, Pressable, TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { myUrl } from '../../myUrl';
import {COLOURS} from '../../styles/colours';
import { Dimensions } from 'react-native';


function ForgotPassword({navigation}){

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('Details are not correct')
    const [modalVisibleReturn, setModalVisibleReturn] = useState(false)

        // The state
        const [email, setEmail] = useState('');
        const [childDob, setChildDob] = useState('')
        const [newPassoword, setNewPassword] = useState('')
        const [newPassoword2, setNewPassword2] = useState('')

    // New Password Validation
    function PasswordValidator(){
      // if empty
      if (newPassoword == "" || newPassoword2 == ""){
        setModalMessage("Password can't be blank")
        setModalVisible(true)
        return false
      } else if (newPassoword !== newPassoword2){
        setModalMessage("Passwords don't match")
        setModalVisible(true)
        return false
      } else if (newPassoword.length < 8){
        setModalMessage("Password must be at least 8 characters long")
        setModalVisible(true)
        return false
      }else {
        return true
      }
    }

    // Function for changing the password
        async function onResetPassword(){
          if (PasswordValidator()){
            // check the details and change the password
            if(await ChangePasswordPostRequest() !== "error"){
                setModalVisibleReturn(true)
            } else {
                setModalVisible(true)
            }
          }
        }
    
    // Handle the reset password
    async function ChangePasswordPostRequest(){
        const response = await fetch(`http://${myUrl}/users/edit`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: newPassoword,
                childDob: childDob
            })
        })
        const data = await response.json()
        return await data.status;
    }

    function onSuccessfulChange(){
        navigation.navigate("Login")
    }

    function onFailedChange(){
        setModalVisible(false)
    }

    // The return
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

                <Text>{modalMessage}</Text>

                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onFailedChange()}
                >
                    <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
                </View>
            </View>
            </Modal>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibleReturn}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibleReturn(!modalVisibleReturn);
            }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                <Text>Password changed successfully</Text>

                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => onSuccessfulChange()}
                >
                    <Text style={styles.textStyle}>Ok</Text>
                </Pressable>
                </View>
            </View>
            </Modal>


                <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                placeholder='Email'
                // secureTextEntry={true}
                />

                <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                onChangeText={setChildDob}
                value={childDob}
                placeholder='First Child Dob (DD/MM/YYYY)'
                />

                <TextInput
                autoCapitalize={'none'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setNewPassword}
                value={newPassoword}
                placeholder='New Password'
                // secureTextEntry={true}
                />

                <TextInput
                autoCapitalize={'none'}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setNewPassword2}
                value={newPassoword2}
                placeholder='Confirm New Password'
                // secureTextEntry={true}
                />

                <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => onResetPassword()}
                underlayColor='#fff'>
                <Text style={styles.loginText}>Reset Password</Text>
                </TouchableOpacity>

        </SafeAreaView>
    )



}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
    
      },
    
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
        height: 30,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      inputWrap: {
        flex: 1,
    
      },
      createAccountBtn:{
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:COLOURS.darkGrey,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
      },
      createAccountText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontFamily:'Quicksand_400Regular',
        fontSize:20,
      },
      checkbox:{
        margin: 10,
      },
      text:{
          textAlign: 'left',
          fontSize: 20,
          marginBottom: 10,
          textDecorationLine: 'underline',
      },
      itemText:{
        textAlign: 'center',
        marginLeft: 20,
        color: COLOURS.darkGrey,
      },
      centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22
        },
        modalView: {
          position: "absolute",
          top: (windowHeight/2)-55,
          height:110,
          width:250,
          left: (windowWidth/2)-125,
            margin: 0,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 20,
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
        marginTop: 10,
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
      },
      loginBtn:{
        marginRight:30,
        marginLeft:30,
        marginTop:10,
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
    });

export default ForgotPassword;