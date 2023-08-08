import React, { useState, useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { COLOURS } from '../../styles/colours';


function ProfileScreen({navigation}) {


  function AccountNavigation(){
    navigation.navigate("Account");
  }
  
  // function SettingsNavigation(){
  //   navigation.navigate("Settings");
  // }

  function AboutNavigation(){
    navigation.navigate("About Us");
  }

  function HelpNavigation(){
    navigation.navigate("Get in Touch");
  }

  // function ManageResourcesNavigation(){
  //   navigation.navigate("Manage Resources");
  // }

  function ManageLogoutNavigation(){
    navigation.navigate("Login");
  }

  return (

    <SafeAreaView>
      {/* <Pressable style={styles.button} onPress={AccountNavigation}>
        <Text>Account and Security</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={SettingsNavigation}>
        <Text>Settings</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={AboutNavigation}>
        <Text>About Us</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={HelpNavigation}>
        <Text>Help</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={ManageResourcesNavigation}>
        <Text>Add/Delete resource (temporary)</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={ManageLogoutNavigation}>
        <Text>Logout</Text>
      </Pressable> */}
        <View >
          <TouchableOpacity style={styles.icon} onPress={AccountNavigation}>
            <View style={styles.row}>
              <Pressable onPress={AccountNavigation}>
                <Text style={styles.text}>Account and Security</Text>
              </Pressable>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.icon} onPress={SettingsNavigation}>
            <View style={styles.row}>
              <Pressable onPress={SettingsNavigation}>
                <Text style={styles.text}>Settings</Text>
              </Pressable>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.icon} onPress={AboutNavigation}>
            <View style={styles.row}>
              <Pressable onPress={AboutNavigation}>
                <Text style={styles.text}>About Us</Text>
              </Pressable>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.icon} onPress={HelpNavigation} >
            <View style={styles.row}>
              <Pressable onPress={HelpNavigation}>
                <Text style={styles.text}>Get in Touch</Text>
              </Pressable>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.icon} onPress={ManageResourcesNavigation}>
            <View style={styles.row}>
              <Pressable onPress={ManageResourcesNavigation}> 
                <Text style={styles.text}>Add/Delete resource (temporary)</Text>
              </Pressable>
              <Icon name="chevron-right" size={30} />
            </View>
          </TouchableOpacity> */}
        </View>

        <View style={styles.buttonWrap}>
          <TouchableOpacity
              style={styles.logoutBtn}
              onPress={ManageLogoutNavigation}
              underlayColor='#fff'
            >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>

  )
  
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderColor: COLOURS.darkGrey,
    // borderBottomWidth: 1,
    // marginBottom: 10,
  },

  buttonWrap:{
    marginTop: 40,

  },
  icon:{
    paddingTop: 21,
    paddingBottom: 16,
    paddingLeft: 15,
    paddingRight: 10,
  },
  text:{
    fontSize:18,
    fontFamily:'Quicksand_400Regular',

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
})

export default ProfileScreen;