import React, {useState} from "react";
import { SafeAreaView, Text, View, StyleSheet, Pressable, Modal, Button, Alert} from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useGlobalState } from "../../GlobalLoginState";
import { Foundation } from '@expo/vector-icons';
import { TextInput } from "react-native-paper";
import {COLOURS} from '../../styles/colours';
import { myUrl } from '../../myUrl';
import { setGlobalState } from "../../GlobalLoginState";
import { Dimensions } from "react-native"




function AccountScreen({navigation}){

    const emailGlobal = JSON.parse(JSON.stringify(useGlobalState("email")));
    const [password, setPassword] = useState('')
    const [editable, setEditable] = useState(false)
    const [isLocked, setIsLocked] = useState('true')
    const name = JSON.parse(JSON.stringify(useGlobalState("username")));
    const childName = JSON.parse(JSON.stringify(useGlobalState("childName")[0]));
    const childDob = JSON.parse(JSON.stringify(useGlobalState("childDob")[0]))

    // The login stuff
    async function LoginPostRequest(){
        const response = await fetch(`http://${myUrl}/users/login`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: emailGlobal[0],
                password: password
            })
        })
        const data = await response.json()
        return await data.status
    }

    // Navigate to the home screen
    async function onClickLogin(){
        if (await LoginPostRequest()){
            setEditable(true)
            setModalVisible(false)
            setIsLocked(false)
        } else {
          return Alert.alert("Incorrect password")
        }
    }

    // INITIALISE THE STATE FOR THE INPUTS
    const [username, setUsername] = useState(name[0]);
    const [email, setEmail] = useState(emailGlobal[0]);
    const [name1, setName1] = useState(childName[0])
    const [dob1, setDob1] = useState(childDob[0])
    const [name2, setName2] = useState(childName[1])
    const [dob2, setDob2] = useState(childDob[1])
    const [name3, setName3] = useState(childName[2])
    const [dob3, setDob3] = useState(childDob[2])
    

    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false)
    const [modalMessage, setModalMessage] = useState('Hey this is the modal message');

    function GetPassword(){
        if (editable){
            return password
        } else {
            return '*********'
        }
    }

    //const favourites = JSON.parse(JSON.stringify(useGlobalState("favourites")));

    // THE VALIDATION STUFF
    // function EmailValidator(){
    //     // if empty
    //     let emailRegEx2 = email.search(/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|\[[\t -Z^-~]*])/)
    //     if (email == ""){
    //       setModalMessage("Email can't be blank")
    //       setModal2Visible(true)
    //       return false
    //     } else if (emailRegEx2 == -1){
    //       setModalMessage("Invalid email format")
    //       setModal2Visible(true)
    //       return false
    //     } else {
    //       return true
    //     }
    //   }
  
      // Username validator
      // function UsernameValidator(){
        // if empty
      //   if (username == ""){
      //     setModalMessage("Username can't be blank")
      //     setModal2Visible(true)
      //     return false
      //   } else {
      //     return true
      //   }
      // }
  
      // Password validator
      // function PasswordValidator(){
      //   // if empty
      //   if (password == ""){
      //     setModalMessage("Password can't be blank")
      //     setModal2Visible(true)
      //     return false
      //   } else if (password.length < 8){
      //     setModalMessage("Password must be at least 8 characters long")
      //     setModal2Visible(true)
      //     return false
      //   }else {
      //     return true
      //   }
      // }
  
      // Birth day validator
      function BirthdayValidator(){
  
        const StateArray = [dob1, dob2, dob3]
        const StateArrayNames = [name1, name2, name3]
  
        let x = 0
        let amount = 0

  
        for (var i = 0; i < StateArray.length; i++){

            if (StateArray[i] == undefined){
                StateArray[i] = ''
            }
            if (StateArrayNames[i] == undefined){
                StateArrayNames[i] = ''
            }
            
          if ((StateArray[i] !== '' && StateArray[i] !== undefined) || (StateArrayNames[i] !== '' && StateArrayNames[i] !== undefined)){
            amount++;
            var dob = StateArray[i].split("/");
            console.log(dob);
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
        } else if (dob[0] === '' && dob.length === 1){
          setModalMessage("Dob can't be blank")
          setModal2Visible(true)
          return false
        } else{
          setModalMessage("Dob needs format DD/MM/YYYY")
          setModal2Visible(true)
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
  
            if ((StateArray[i] !== '' && StateArray[i] !== undefined) || (StateArrayNames[i] !== '' && StateArrayNames[i] !== undefined)){
  
            amount++
            if (StateArrayNames[i] !== '' && StateArrayNames[i] !== undefined){
              x++
            }
        }
  
      }
        
      if (x === amount){
        return true
      } else {
        setModalMessage("Child name can't be blank")
        setModal2Visible(true)
        return false
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
          if (dobs[i] != '' && dobs[i] !== undefined){
            dob.push(dobs[i])
          }
        }
        for (var i = 0; i < 3; i++){
          if (names[i] != '' && names[i] !== undefined){
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

    // async function DeleteUser(email){
    //     const response = await fetch(`http://${myUrl}/users/delete`,{
    //             method: 'post',
    //             mode: 'no-cors',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 email: email
    //             })
    //         })
    //     const data = await response.json();
    //     return await data.response
    //     // should be "done"
    //    }

      async function ChangeUser(){
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
        if (dobs[i] != '' && dobs[i] !== undefined){
          dob.push(dobs[i])
        }
      }
      for (var i = 0; i < 3; i++){
        if (names[i] != '' && names[i] !== undefined){
          name.push(names[i]);
        }
      }
        const response = await fetch(`http://${myUrl}/users/change`,{
          method: 'post',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            childName: name,
            childDob: dob
          })
        })
        const data = await response.json()
        return await data.status;
      }
  
      // On Submit Validator
      async function OnSubmitValidator(){
        
        if (BirthdayValidator() && ChildNameValidator()){

            if (await ChangeUser()){
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
                if (dobs[i] != '' && dobs[i] !== undefined){
                  dob.push(dobs[i])
                }
              }
              for (var i = 0; i < 3; i++){
                if (names[i] != '' && names[i] !== undefined){
                  name.push(names[i]);
                }
              }
                    setModal2Visible(true)
                    setModalMessage("Changes saved")
                    setEditable(false)
                    setPassword('')
                    setGlobalState("childName",name)
                    setGlobalState("childDob",dob)
            } else {
              setModal2Visible(true)
              setModalMessage("Changes are invalid")
            }
        
        } 
      }

      const CustomSubmitButton = (props) => {
        if (editable){
            return(
                <Button title="Submit changes" onPress={() => OnSubmitValidator()}></Button>
            )
        } else {
            return(
                <View></View>
            )
        }
    }

    return(
        <SafeAreaView style= {styles.container}>
            {/* <Text>Account Screen</Text>
            <Text>{details}</Text> */}
            {/* <View style={{flexDirection: 'column', flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20}}>Travel</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Username</Text>
                    <TextInput style={{width: 200}}/>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 20}}>Password</Text>
                    <TextInput style={{width: 200}}/>
                </View>
            </View> */}

<Modal
        animationType="slide"
        transparent={true}
        visible={modal2Visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModal2Visible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>

            <Text>{modalMessage}</Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModal2Visible(false)}
            >
              <Text style={styles.textStyle}>Ok</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
<KeyboardAwareScrollView>

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <View style ={{marginTop: 0, marginBottom: 0}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>


<TextInput
                autoCapitalize={'none'}
                style={styles.input}
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
                placeholder='Password'
                // secureTextEntry={true}
            />
                    </View>

                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Pressable
              style={[styles.button,styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
                    <Pressable
              style={[styles.button,styles.buttonClose]}
              onPress={() => onClickLogin()}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>


                    </View>

            </View>
          </View>
        </View>
        </KeyboardAwareScrollView>
      </Modal>

            <View style ={{marginTop: 30, marginBottom: 20}}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={styles.title}>Basic Info</Text>
                    <Pressable onPress={() => setModalVisible(true)}>
                    { isLocked === 'true' ? <Foundation name="lock" size={24} color="black" />: <Foundation name="unlock" size={24} color="black" /> }
                    </Pressable>
                </View>
                <View style={{ flexDirection:'row', alignItems:'center'}}> 
                    <Text style={styles.text}>Your Name:</Text>
                    <TextInput
                        style={styles.input}
                        // onChangeText={setUsername}
                        value={username}
                        onChangeText={setUsername}
                        editable={false}
                    />      
                </View>
                
                <View style={{ flexDirection:'row', alignItems:'center'}}>
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                    style={styles.input}
                    // onChangeText={setEmail}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize={'none'}
                    editable={false}
                    // defaultValue=''
                    // placeholder='Email'
                    />
                </View>      
            </View>

            <View style ={{}}>
                <Text style={styles.title}>Children's Info</Text>
                <View style={styles.row} >
                    <View style={{flexDirection:'row', flex:1, alignItems:'center',}}> 
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setFirstName}
                        value={name1}
                        onChangeText={setName1}
                        label="First name"
                        editable={editable}
                        selectionState={true}
                        // defaultValue=''
                        // placeholder='First Name'
                        />
                    </View>
                    <View style={{flexDirection:'row', flex:1, alignItems:'center', }}>
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setBirthDate}
                        value={dob1}
                        onChangeText={setDob1}
                        label="Dob"
                        editable={editable}
                        // defaultValue=''
                        // placeholder='Date of Birth'
                        />
                    </View>
                </View>
                <View style={styles.row} >
                    <View style={{flexDirection:'row', flex:1, alignItems:'center',}}> 
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setFirstName}
                        value={name2}
                        onChangeText={setName2}
                        label="First name"
                        editable={editable}
                        // defaultValue=''
                        // placeholder='First Name'
                        />
                    </View>
                    <View style={{flexDirection:'row', flex:1, alignItems:'center', }}>
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setBirthDate}
                        value={dob2}
                        onChangeText={setDob2}
                        label="Dob"
                        editable={editable}
                        // defaultValue=''
                        // placeholder='Date of Birth'
                        />
                    </View>
                </View>  
                <View style={styles.row} >
                    <View style={{flexDirection:'row', flex:1, alignItems:'center',}}> 
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setFirstName}
                        value={name3}
                        onChangeText={setName3}
                        label="First name"
                        editable={editable}
                        // defaultValue=''
                        // placeholder='First Name'
                        />
                    </View>
                    <View style={{flexDirection:'row', flex:1, alignItems:'center', }}>
                        <TextInput
                        style={styles.inputSubject}
                        // onChangeText={setBirthDate}
                        value={dob3}
                        label="Dob"
                        onChangeText={setDob3}
                        editable={editable}
                        // defaultValue=''
                        // placeholder='Date of Birth'
                        />
                    </View>
                </View>       
            </View>
            <CustomSubmitButton/>
        </SafeAreaView>
    )
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
    },
    inputSubject:{
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 0,
        flex: 1
    },
    row: {
        // flex: 1,
        flexDirection: 'row',
      },
      input: {
        flex:1,
        width: "75%",
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      input2: {
        marginRight:30,
        marginLeft:30,
        height: 10,
        margin: 0,
        borderWidth: 1,
        padding: 0,
    },
      inputWrap: {
        flex: 1,
        // borderColor: COLOURS.purple,
        // borderBottomWidth: 1,
        // marginBottom: 10,
      },
      title:{
          textAlign: 'left',
          fontSize: 20,
          marginBottom: 10,
          textDecorationLine: 'underline',
          fontFamily:'Quicksand_400Regular',
      },
      text:{
          fontSize: 15,
          marginBottom: 10,
          fontFamily:'Quicksand_400Regular',
          alignItems:'center',
          alignContent:'center',
          justifyContent:'center',
      },
      image: {
        marginTop:0,
        marginBottom:0,
        marginLeft:30,
        resizeMode: 'contain',
        alignSelf: 'center',
        width:200,
        height:200,
        flex:1,
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
    orText:{
        fontFamily:'Quicksand_400Regular',
        fontSize:15,
    },
    centeredView: {
        flex: 1,
        paddingTop: 300,
        paddingBottom: 250,
      },
    modalView: {
      position: "absolute",
      top: (windowHeight/2)-87.5,
      height:175,
      width:200,
      left: (windowWidth/2)-100,
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
    modalView2: {
      position: "absolute",
      top: (windowHeight/2)-50,
      height:100,
      width:200,
      left: (windowWidth/2)-100,
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
        marginTop: 5,
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
      margin:10,
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
    
  })

export default AccountScreen;