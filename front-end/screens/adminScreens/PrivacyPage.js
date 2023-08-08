import {React, useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, SafeAreaView, Modal, Pressable, TouchableOpacity, Alert } from "react-native";
import {myUrl} from "../../myUrl"
import {COLOURS} from "../../styles/colours"


function PrivacyPage({navigation}){

[password, setPassword] = useState('');

  // Function for clearing input forms
   
    async function getPrivacy(){
        const response = await fetch(`http://${myUrl}/get/privacy`,{
             method: 'post',
             mode: 'no-cors',
             headers: {
                 'Content-Type': 'application/json',
             }
         })
         const data = await response.json();
         if (await data.status == "done"){
            return Alert.alert("Current Privacy Policy website is " + data.website)
          }
    }
    async function changePrivacyPolicy(password){
     const response = await fetch(`http://${myUrl}/privacy`,{
             method: 'post',
             mode: 'no-cors',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                 website: password
             })
         })
     const data = await response.json();
     if (await data.status == "done"){
       return Alert.alert("Privacy policy website changed to " + data.website)
     }
     else {
       return Alert.alert("Something's not right, please try again!")
     }
    }
  return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Link for Privacy Policy Website</Text>
        <View style={styles.row}>
          <TextInput
            autoCapitalize={'none'}
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
        </View>

          
          
      <View style={{flex:1}}>  
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
          <TouchableOpacity
            onPress={() => changePrivacyPolicy(password)}
            style={styles.manageBtn2}
          >
            <Text style={styles.manageBtnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getPrivacy()}
            style={styles.manageBtn2}
          >
            <Text style={styles.manageBtnText}>Current Link</Text>
          </TouchableOpacity>
      </View>
        </View>
        

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
    margin:20,
  },
  row:{
    flexDirection:"row",
    alignItems:"center",
  },
  contentInput:{
    flex:1,
    height: 150,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  input: {
    flex:1,
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
  },
  logoutBtn:{
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
  logoutText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontFamily:'Quicksand_400Regular',
    fontSize:20,
  },
  manageBtn:{
    flex:1,
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:COLOURS.aqua,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',

  },
  manageBtn2:{
    flex:1,
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom:20,
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:COLOURS.purple,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff',

  },
  manageBtnText:{
    color:'#fff',
    textAlign:'center',
    paddingLeft : 10,
    paddingRight : 10,
    fontFamily:'Quicksand_400Regular',
    fontSize:20,
  }
});

export default PrivacyPage;