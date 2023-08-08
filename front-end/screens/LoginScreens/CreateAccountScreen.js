import { React, useState } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, Modal, Pressable, TouchableOpacity, Alert} from 'react-native';
import { TextInput } from 'react-native-paper';
import { myUrl } from '../../myUrl';
import {COLOURS} from '../../styles/colours';




function CreateAccountScreen({navigation}) {

    // The user stuff 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [email, setEmail] = useState('');

    // The child stuff
    const [name1, setName1] = useState('')
    const [dob1, setDob1] = useState('')
    const [name2, setName2] = useState('')
    const [dob2, setDob2] = useState('')
    const [name3, setName3] = useState('')
    const [dob3, setDob3] = useState('')

    // The modal things
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('')
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalMessage2, setModalMessage2] = useState('')

    // Function to navigate back to login screen
    function BackNavigate(){
        navigation.navigate("Login")
    }

    // Handle the creation button
    async function onClickCreate(){
        if (await AddPostRequest()){
          setModalMessage2("User created successfully")
          setModalVisible2(true);
        } else {
          setModalMessage("Cannot create a user with this email address")
          setModalVisible(true);
        }
    }

    // Validator functions

    // Email validator
    function EmailValidator(){
      // if empty
      let emailRegEx2 = email.search(/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/)
      if (email == ""){
        setModalMessage("Email can't be blank")
        setModalVisible(true)
        return false
      } else if (emailRegEx2 == -1){
        setModalMessage("Invalid email format")
        setModalVisible(true)
        return false
      } else {
        return true
      }
    }

    function navigateBack(){
      setModalVisible2(false)
      navigation.navigate("Login")
    }

    // Username validator
    function UsernameValidator(){
      // if empty
      if (username == ""){
        setModalMessage("Username can't be blank")
        setModalVisible(true)
        return false
      } else {
        return true
      }
    }

    // Password validator
    function PasswordValidator(){
      // if empty
      if (password == "" || confirmedPassword == ""){
        setModalMessage("Password can't be blank")
        setModalVisible(true)
        return false
      } else if (password !== confirmedPassword){
        setModalMessage("Passwords don't match")
        setModalVisible(true)
        return false
      } else if (password.length < 8){
        setModalMessage("Password must be at least 8 characters long")
        setModalVisible(true)
        return false
      }else {
        return true
      }
    }

    // Birth day validator
    function BirthdayValidator(){

      const StateArray = [dob1, dob2, dob3]
      const StateArrayNames = [name1, name2, name3]

      let x = 0
      let amount = 0

      for (var i = 0; i < StateArray.length; i++){
        if (StateArray[i] !== '' || StateArrayNames[i] !== ''){
          amount++;
          var dob = StateArray[i].split("/");
          var temp = new Date(+dob[2], dob[1] - 1, +dob[0])
          if (temp instanceof Date && !isNaN(temp.valueOf())){
            var day = parseInt(dob[0]);
            var month = parseInt(dob[1]);
            var year = parseInt(dob[2]);
            var currentYear = new Date().getFullYear();
              if (day < 32 && month < 13 && year > 1900 && year <= currentYear){
                x++
              }
            
          }
        }

        }

      if (x === amount){
        return true
      } else {
        setModalMessage("Dob needs format DD/MM/YYYY")
        setModalVisible(true)
        return false
      }

    }

    // Check the child names
    function ChildNameValidator(){

      const StateArray = [dob1, dob2, dob3]
      const StateArrayNames = [name1, name2, name3]
      let amount = 0
      let x = 0
      for (let i = 0; i < StateArray.length; i++){

        if (StateArray[i] !== '' || StateArrayNames[i] !== ''){

          amount++
          if (StateArrayNames[i] !== ''){
            x++
          }

      }

      if (x === amount){
        return true
      } else {
        setModalMessage("Child name can't be blank")
        setModalVisible(true)
        return false
      }

    }
  }



    // On Submit Validator
    function OnSubmitValidator(){
      if (UsernameValidator() && BirthdayValidator() && PasswordValidator(password) && EmailValidator() && ChildNameValidator()){
        onClickCreate()
      }

    }

    // Create account hook
    async function AddPostRequest(){
      var names = Array();
      var dobs = Array();
      dobs[0] = dob1;
      dobs[1] = dob2;
      dobs[2] = dob3;
      names[0] = name1;
      names[1] = name2;
      names[2] = name3;

      var dob = Array();
      var name = Array();
      for (var i = 0; i < 3; i++){
        if (dobs[i] != ''){
          dob.push(dobs[i])
        }
      }
      for (var i = 0; i < 3; i++){
        if (names[i] != ''){
          name.push(names[i]);
        }
      }

        const response = await fetch(`http://${myUrl}/users/add`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                password: password,
                email: email,
                childName: name,
                childDob: dob
            })
        })
        const data = await response.json();
        return await data.status;
    }


  return (
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

            <Text>{modalMessage}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text>{modalMessage2}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => navigateBack()}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style ={{flex : 3, marginTop: 30, marginBottom: 20}}>
        <Text style={styles.text}>Basic Info</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                defaultValue=''
                maxLength={20}
                placeholder='Your Name'
            />

            <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                defaultValue=''
                maxLength={20}
                placeholder='Password'
            />

            <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                onChangeText={setConfirmedPassword}
                value={confirmedPassword}
                defaultValue=''
                maxLength={20}
                placeholder='Confirm Password'
            />

            <TextInput
                autoCapitalize={'none'}
                style={styles.input}
                onChangeText={setEmail}
                value={email}
                maxLength={20}
                defaultValue=''
                placeholder='Email'
            />

      </View>

      <View style ={{flex : 2}}>
        <Text style={styles.text}>Children's Info</Text>
        
      <View style={styles.row} >
        <View style={styles.inputWrap}> 
          <TextInput
            style={styles.input}
            onChangeText={setName1}
            value={name1}
            placeholder={"Child's Name"}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setDob1}
            value={dob1}
            placeholder={'DD/MM/YYYY'}
          />
        </View>
        </View>
        <View style={styles.row} >
        <View style={styles.inputWrap}> 
          <TextInput
            style={styles.input}
            onChangeText={setName2}
            value={name2}
            placeholder={"Child's Name"}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setDob2}
            value={dob2}
            placeholder={'DD/MM/YYYY'}
          />
        </View>


      </View>
      <View style={styles.row} >
        <View style={styles.inputWrap}> 
          <TextInput
            style={styles.input}
            onChangeText={setName3}
            value={name3}
            placeholder={"Child's Name"}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            onChangeText={setDob3}
            value={dob3}
            placeholder={'DD/MM/YYYY'}
          />
        </View>
        </View>
      </View>
      
      <View style ={{flex : 1}}>
        {/* <View style={styles.row}>
          <Checkbox
            disabled={false}
            value={isChecked} 
            onValueChange={setChecked}
          />
          <Text style={styles.itemText}>I have read and accepted the privacy policy and terms and conditions.</Text>
        </View> */}

        <TouchableOpacity
          style={styles.createAccountBtn}
          onPress={() => OnSubmitValidator()}
          underlayColor='#fff'
        >
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )

}

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
  }
});


export default CreateAccountScreen;
