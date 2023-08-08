import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, SafeAreaView, Modal, Pressable, TouchableOpacity, Alert } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {myUrl} from "../../myUrl"
import {COLOURS} from "../../styles/colours"


function ManageResourcesScreen({navigation}){
    
  function ManageLogoutNavigation(){
    navigation.navigate("Login");
  }

  // Set the state of the input forms
  [title, setTitle] = useState('');
  [content, setContent] = useState('');
  [imageURL, setImageURL] = useState('');
  [description, setDescription] = useState('');
  [tags, setTags] = useState('');
  [age, setAge] = useState('');
  [type, setType] = useState('');

  // another state with the object set (it is set when submit in clear forms before clearing)
  [resource, setResource] = useState({
    title:'',
    type:'',
    image:'',
    content:'',
    description:''
  })

  // Function for clearing input forms
  function ClearForms(){
    setTitle('');
    setContent('');
    setImageURL('');
    setDescription('');
    setTags('');
    setAge('');
    setType('');
    navigation.navigate("Browse");
  }
    // Add resource function
    async function AddResource(){
      const url = `http://${myUrl}/resources/new/`;
      var currentDate = new Date();
      currentDate= (currentDate.getDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" +  currentDate.getFullYear()).toString();
      var resourceType= "blog";
      title = title.trim();
      if (title == '' || content == '' || age == '' || type == ''){
        return Alert.alert("You must at least fill out title, body, age range, and type!")
      }
      if (type == "3"){
        resourceType = "other";
        if (description == ""){
          return Alert.alert("You must include a link for Other resources.");
        }
      }
      else if (type == "2"){
        resourceType = "vlog"
        if (imageURL == ""){
          return Alert.alert("You must include a youtube link for vlogs.");
        }
      }
      let ageRegEx = age.search(/[0-9]+-[0-9]+/)
      if (ageRegEx == -1){
        return Alert.alert("Age must be in format [min age]-[max age] eg. 1-2 or 10-12")
      }
      const jsonObject = {
        title:title,
        description:description,
        content:content,
        img:imageURL,
        tags:tags,
        age:age,
        date:currentDate,
        type:resourceType,
      };
      // Get current date
      const response = await fetch(`http://${myUrl}/resources/new`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({jsonObject
            })
        })
        const data = await response.json();
        if (await data.status == "done"){
          ClearForms();
          return Alert.alert("Resource created!")
        }
        else {
          setTitle('');
          console.log(data.status)
          return Alert.alert("A resource by that title already exists, please try again.")
        }
    }

        /*
      // Delete resource function
      function DeleteResource(){
          const url = `http://${myUrl}/resources/del/`;
          fetch(url,{method:"post",
          headers:
          {'Content-type':'application/json'},
          body:JSON.stringify({title:props
            })
        })
        .then(res=>res.text())
        .then(data=>{
          console.log(data)
        }).then(ClearForms())
        }*/

      // Return
  return(
    
      <KeyboardAwareScrollView>
        <SafeAreaView style={styles.container}>
      <View style={{flex:4}}>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Title</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={setTitle}
            value={title}
            placeholder='Title'
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Content</Text> */}
          <TextInput
            style={styles.contentInput}
            onChangeText={setContent}
            value={content}
            placeholder='Body'
            multiline
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Image URL</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={setImageURL}
            value={imageURL}
            placeholder="Image URL,Youtube URL for vlog, leave blank for logo"
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Tags</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={setTags}
            value={tags}
            placeholder='Tags (eg. "help diagram speech")'
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Age Range</Text> */}
          <TextInput
              style={styles.input}
              onChangeText={setAge}
              value={age}
              placeholder='Age Range (eg. "0-4")'
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Type (blog = 1, vlog = 2, other = 3)</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={setType}
            value={type}
            placeholder="Type: 1, 2 or 3 (blog = 1, vlog = 2, other = 3)"
          />
        </View>
        <View style={styles.row}>
          {/* <Text style={styles.text}>Type (blog = 1, vlog = 2, other = 3)</Text> */}
          <TextInput
            style={styles.input}
            onChangeText={setDescription}
            value={description}
            placeholder='Link for Other resource (eg. https://docs.google...)'
          />
        </View>
        <TouchableOpacity
            onPress={AddResource}
            style={styles.manageBtn}
          >
            <Text style={styles.manageBtnText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.logoutBtn}
          onPress={ManageLogoutNavigation}
          underlayColor='#fff'
        >
        <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    </KeyboardAwareScrollView>
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
    justifyContent: 'center',
    margin:5
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
     paddingTop:10,
     paddingBottom:10,
    backgroundColor:COLOURS.aqua,
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

export default ManageResourcesScreen;