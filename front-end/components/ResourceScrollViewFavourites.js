
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, Pressable, StyleSheet, RefreshControl, SafeAreaView, Button, Text, View } from 'react-native';
import { styles } from '../styles/styles';
import { Card, Title, Paragraph } from "react-native-paper";
import { COLOURS } from '../styles/colours';
import { myUrl } from '../myUrl.js';
import { Searchbar } from 'react-native-paper';
import { setGlobalState } from '../GlobalState';
import { useGlobalState } from '../GlobalLoginState';
import FavouriteButtonThumbnail from './FavouriteButtonThumbnail';
import YoutubePlayer from 'react-native-youtube-iframe';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
console.log(windowWidth)
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)

const ResourceScrollView = (props) => {

  
  const username = JSON.parse(JSON.stringify(useGlobalState("email")[0]));
  const globalFavourites = JSON.parse(JSON.stringify(useGlobalState("favourites")[0]));

  // Refresh bar
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
  }, []);



    // Define the state of the loaded data
    const [data,setData]=useState([
        {
        title: null,
        description: null,
        blog: null,
        img: null,
        tags: null
        }
    ]);

    // Define the state of the searched data
    const [displayedData,setDisplayedData]=useState([
      {
      title: null,
      description: null,
      blog: null,
      img: null,
      tags: null
      }
  ]);

    // Function for fetching resources
    function fetchBlogs() {
        const url = `http://${myUrl}/resources/${props.searchProp}`
        return fetch(url)
        .then((res) => res.json())
        .then((res) => (res.resourcesData2))
      }
      

    // Function for saving JSON as JS object
    function saveBlogs(jsonData){
        //console.log(jsonData);
        const blogArray = Object.entries(jsonData);
        let objectArray = new Array(blogArray.length);
        for (i = 0; i < blogArray.length; i++){
          let currentBlog = blogArray[i];
          if (globalFavourites.includes(currentBlog[1].title)){
            
            objectArray[i] = currentBlog[1];
          }
          
        }
        //console.log(globalFavourites);
        setData(objectArray)
        setDisplayedData(objectArray)
        setRefreshing(false)
    }
    
    // Make the call to retrieve resources when params change
    useEffect(() => {
        fetchBlogs()
        .then((res) => {
        saveBlogs(res)
        })
    },[refreshing])

    // Change the global state when the resource is selected
    function handleResourceData(resourceObject){
      setGlobalState("type",resourceObject.type);
      setGlobalState("img",resourceObject.img);
      setGlobalState("title",resourceObject.title);
      setGlobalState("content",resourceObject.content);
      { props.navigationProp.navigate(props.navigationPath) }
    }

    const VideoThumbnail = (props) => {

      const [playing, setPlaying] = useState(false);
      
      const onStateChange = (state) => {
        // if (state === 'ended') {
        //   setPlaying(false);
        //   Alert.alert('video has finished playing!');
        // }
        if (state) {
          setPlaying(false);
        }
        else{
          setPlaying(true);
        }
      };
    
          if (props.item.type === "vlog"){
            //Vlog Deatials Screen
              return (
                <View style ={styles.videoContainer}>
                  <Pressable style = {{height: windowWidth/4}}
                  onPress={() => {onStateChange(playing)}}>
                  <View pointerEvents="none" style ={{flex: 1}}>
                    <YoutubePlayer
                      height={400}
                      play={playing}
                      videoId={props.item.img}
                      //onChangeState={onStateChange}
                      loop
                    />
                  </View>
                  </Pressable>
                </View>
              );
        }
        else{
          if (props.item.img == '') {
            return(
            <Card.Cover style={scrollstyle.cover} source={require("../assets/logo.png")} resizeMode="contain" backgroundColor="white" />
            
            )
          }
            else{
              return(
                <Card.Cover source={{uri:props.item.img}}/>
                )
            }
          
        }
      }

      const DynamicTitle = (props) => {
        if (props.item.type === "vlog"){
          return(
            <Title style={styles.vlogTitle}>{props.item.title}</Title>
          ) 
        } else {
          return (
            <Title style={styles.blogTitle}>{props.item.title}</Title>
          )
        }
      }

    function GetStyle(type){
      if (type === "vlog"){
        return {borderWidth: 1, borderColor: COLOURS.aqua, borderTopWidth:0, flex: 1, height:(windowWidth/2)+(windowWidth/3.75)}
      } else {
        return {borderWidth: 1, borderColor: COLOURS.aqua, borderTopWidth:0, flex: 1}
      }
    }

    function GetStyle2(type){
      if (type === "vlog"){
        return styles.blog
      } else {
        return styles.blog2
      }
    }


    // Define a pressable component for each resource in data
    const pressable = displayedData.map((item) =>
    <Pressable 
        key={item.title}
        onPress={() =>
        {handleResourceData(item)}
        } >

        <Card style={GetStyle(item.type)}>
        <Card.Content>
            <VideoThumbnail
            item={item}
            />
            <DynamicTitle
            item={item}
            />
            <Paragraph style={GetStyle2(item.type)}>{item.temp}</Paragraph>
        </Card.Content>
        

        <FavouriteButtonThumbnail
        Title={item.title}
      />
        </Card>
        
    </Pressable>
    )


    // Function to add favourite to that profile
    async function ManageFavourite(titleName){

    

      // Send a post request with username and favourite in the body
      const response = await fetch(`http://${myUrl}/resources/favourites/manage`,{
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: username,
                resourceName: titleName
            })
        })
        const data = await response.json();
        return await data;
    }

    // Define state for search term
    const [search, setSearch] = useState("");

    function onChangeSearch(query){
      setSearch(query)

      // copy data to an array
      console.log("DATA")
      console.log(data)
      let copyArray = new Array;
 
      
      // search everything in the array for a match
      for (i = 0; i < data.length; i++){
        if (data[i] !== undefined){
          let text = data[i].title;
          if (text.includes(query)){
          copyArray.push(data[i]);
        }
        }
      }
      // copy this to set as DisplayedData
      setDisplayedData(copyArray);
    }

    // returns false if none, returns true if there is


    //console.log(globalFavourites.length)

    function CheckFavouritesLength(){
      
      let result = false

      for (i = 0; i < displayedData.length; i++){
        if (displayedData[i] != undefined){
          result = true
        }
      }

      return result

    }

    if (!CheckFavouritesLength()){
      return (
        <SafeAreaView>
        <ScrollView 
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
        }>
          <Searchbar style={{borderWidth:0, borderColor:"white", backgroundColor:"#F5F5F5"}}
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={search}
          />


      <Pressable style={scrollstyle.nofavourites}>
        <Text style={styles.title}>Add a favourite and pull down to refresh</Text>
      </Pressable>
      
      </ScrollView>
      </SafeAreaView>
    )
    } else {
      
      return (
        <SafeAreaView>
        <ScrollView 
            contentContainerStyle={styles.scrollView}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
        }>
          <Searchbar style={{borderWidth:0, borderColor:"white", backgroundColor:"#F5F5F5"}}
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={search}
          />


      {pressable}
      
      </ScrollView>
      </SafeAreaView>
    )
    }
    

}

const scrollstyle = StyleSheet.create({
    nofavourites: {
      marginTop: 250,
      marginBottom: 300
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    refreshMessage:{
      width:380,
      height:30,
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop:0
    },
    image: {
      marginTop:0,
      marginBottom:0,
      resizeMode: 'contain',
      alignSelf: 'center',
      width:50,
      height:50
    },
    resources: {
      resizeMode: 'contain',
      alignSelf: 'center',
      marginTop:10,
      marginBottom:10,
      width:320,
      height:320
    },
    scroller: {
      width:360
    },
    favbutton: {
      height: 20,
      width: 20,
      paddingLeft: 200,
      position: 'absolute'
    }
  })


export default ResourceScrollView;