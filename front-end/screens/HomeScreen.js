import React from 'react';
import { Text, View, Button, Image, ScrollView, StyleSheet, RefreshControl, SafeAreaView, StatusBar} from 'react-native';
import { styles } from '../styles/styles';
import ResourceScrollView from '../components/ResourceScrollView';
import { COLOURS } from '../styles/colours';
import LoginHandler from '../components/LoginHandler';
import {setGlobalState, useGlobalState} from '../GlobalLoginState';


function HomeScreen({navigation}) {

  // check the global state what to render
  const title = JSON.parse(JSON.stringify(useGlobalState("username")));

  return (

    <SafeAreaView style={{backgroundColor:"white"}}>
      <StatusBar
     backgroundColor={COLOURS.purple}
      />
      <Image 
        style={scrollstyle.image}
        source={require('../assets/logo.png')} 
      />
      <Text style={styles.title}>Welcome Back, {title}!</Text>
      <ResourceScrollView
        navigationProp={navigation}
        navigationPath={"Details"}
        searchProp="all"
        filterProp="all"
        screen="home"
      />
    </SafeAreaView>
  );
}


const scrollstyle = StyleSheet.create({
  image: {
    marginTop:0,
    marginBottom:0,
    resizeMode: 'contain',
    alignSelf: 'center',
    width:70,
    height:70,
  }
})
export default HomeScreen;