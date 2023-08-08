import {React, useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, SafeAreaView, Modal, Pressable, TouchableOpacity, Alert } from "react-native";
import {myUrl} from "../../myUrl"
import {COLOURS} from "../../styles/colours"


function AdminUserEdit({navigation}){


const [modalVisible, setModalVisible] = useState(false);
  
[password, setPassword] = useState('');
[title, setTitle] = useState('');

  // Function for clearing input forms
   function ClearForms(){
     setTitle('');
     setPassword('');
   }
   

   async function ChangeUser(email,password){
    if (password.length < 8){
      return Alert.alert("Password must be at least 8 characters long!");
    }
    else{

    }
    const response = await fetch(`http://${myUrl}/users/edit`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
    const data = await response.json();
    if (await data.status == "done"){
      setModalVisible(true);
    }
    else {
      return Alert.alert("Email is incorrect, please try again.")
    }
   }
    // Add resource function
    // const AddResource = (props) => {
    //   const url = `http://${myUrl}/resources/new/`;
    //   var currentDate = new Date();
    //   currentDate= (currentDate.getDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" +  currentDate.getFullYear()).toString();
    //   var resourceType= "blog";
    //   if (type == "3"){
    //     resourceType = "other";
    //   }
    //   else if (type == "2"){
    //     resourceType = "vlog"
    //   }
    //   else if (type != "1"){
    //     return console.log("error")
    //   }
    
    //   const jsonObject = {
    //     title:title,
    //     description:description,
    //     content:content,
    //     img:imageURL,
    //     tags:tags,
    //     age:age,
    //     date:currentDate,
    //     type:resourceType,
    //   };
    //   // Get current date
    //   fetch(url,{method:"post",
    //   headers:
    //   {'Content-type':'application/json'},
    //   body:JSON.stringify({jsonObject
    //     })
    //   })
    //   .then(res=>res.text())
    //   .then(data=>{
    //     console.log(data)
    //     })
    //   .then(setResource({
    //       title:title,
    //       type:resourceType,
    //       image:imageURL,
    //       content:content
    //   }))
    //   .then(ClearForms())
    // }
  return(
    <SafeAreaView style={styles.container}>
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
          <Text>Password changed for user {title}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={styles.row}>
          <Text style={styles.text}>User Email</Text>
          <TextInput
            autoCapitalize={'none'}
            style={styles.input}
            onChangeText={setTitle}
            value={title}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>New Password</Text>
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
            onPress={() => ChangeUser(title,password)}
            style={styles.manageBtn2}
          >
            <Text style={styles.manageBtnText}>Submit</Text>
          </TouchableOpacity>
        <TouchableOpacity
            onPress={ClearForms}
            style={styles.manageBtn}
          >
            <Text style={styles.manageBtnText}>Clear</Text>
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

export default AdminUserEdit;