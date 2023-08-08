import React, {useState, useCallback} from 'react';
import { StyleSheet, Image, Text, View, Button, Alert, SafeAreaView, StatusBar, Modal, TouchableOpacity, Linking } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { styles } from '../styles/styles';
import { useGlobalState } from "../GlobalState";
import {myUrl} from '../myUrl';
import { ScrollView} from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';

// function deleteNavigation({navigation}){
//   navigation.navigate("AdminUserEdit")
// };

function deleteData(props){
  console.log("Deleting");
  const url = `http://${myUrl}/resources/del/`;
  fetch(url,{method:"post",
  headers:
  {'Content-type':'application/json'},
  body:JSON.stringify({title:props
    })
  })
  // .then({deleteNavigation});
// .then(res=>res.text())
// .then(data=>{
//   console.log(data)
// })
}

function ResourcesInfo({navigation}) {


const windowWidth = Dimensions.get('window').width;
console.log(windowWidth)
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)
  
  const type = JSON.parse(JSON.stringify(useGlobalState("type")[0]));
  const title = JSON.parse(JSON.stringify(useGlobalState("title")[0]));
  const image = JSON.parse(JSON.stringify(useGlobalState("img")[0]));
  const content = JSON.parse(JSON.stringify(useGlobalState("content")));
  const admin = JSON.parse(JSON.stringify(useGlobalState("admin")[0]));
  const description = JSON.parse(JSON.stringify(useGlobalState("description")[0]));
  console.log(title)
  console.log(image)

  const [playing, setPlaying] = useState(false);

  
  const onStateChange = (state) => {
    // if (state === 'ended') {
    //   setPlaying(false);
    //   Alert.alert('video has finished playing!');
    // }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };
  var deleteButton;

  if (admin === "admin"){
    // deleteButton = 
    //  <Button title="Delete" 
    //    onPress={() => {
    //      deleteData(title);
    //      Alert.alert('Delete successfully!', '', [{ text: 'Ok', onPress: () => navigation.navigate('Browse')}]);
    //    }}
    //  />;
    deleteButton = 
     <TouchableOpacity
       style={styles.deleteBtn}
       onPress={() => {
         deleteData(title);
         Alert.alert('Deleted successfully!', '', [{ text: 'Ok', onPress: () => navigation.navigate('Browse')}]);
       }}
     >
       <Text style={styles.deleteBtnText}>Delete</Text>

     </TouchableOpacity>
  }

  //const supportedURL = "https://docs.google.com/document/d/1lFTpmj1xEVTBAnk91xf7RrLHgMsmH_7RIhs99keFbmw/edit";

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      try{Linking.openURL(url)}
      catch(err){
        console.log(err)
      }
    });
    
    return <Button
    title={children}
    onPress={handlePress}
    color= "#922ce6"/>;
  };



  //Blog Details Screen
  if (type == "blog"){
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style = {styles.detailTitle}>{title}</Text>
          <Text style = {styles.detailContent}>{content}</Text>

          {deleteButton}

        </View>
      </ScrollView>
      
    );
  } else if (type === "vlog"){
    //Vlog Deatials Screen
      return (
        <ScrollView>
          <View style ={styles.videoContainer}>
            <View style ={{flex: 1}}>
              <YoutubePlayer
                height={300}
                play={playing}
                videoId={image}
                onChangeState={onStateChange}
                loop
              />
            </View>
            </View>
            <View style ={{flex : 2, alignItems:'center', paddingTop: 0}}>
              <Text style = {styles.detailTitle}>{title}</Text>
              <Text style = {styles.detailContent}>{content}</Text>
              {deleteButton}
            </View>

          

          
        </ScrollView>
      );
  } else if (type === "other"){
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style = {styles.detailTitle}>{title}</Text>
          <Text style = {styles.detailContent}>{content}</Text>
          <OpenURLButton url={description}>Open resource</OpenURLButton>


          {deleteButton}

        </View>
      </ScrollView>
    
  );
  }
  //Others Details Screen
      
}

const scrollstyle = StyleSheet.create({
  image: {
    marginTop:20,
    marginBottom:20,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '90%',
    height:300
  },
});
const videoStyles = StyleSheet.create({
  video: {
    marginTop: 50,
    alignSelf: 'center',
    width: '90%',
    height: '40%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ResourcesInfo;

