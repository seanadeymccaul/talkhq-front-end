import React from 'react';
import { StyleSheet, Image, Text, View, Button,Alert, SafeAreaView, StatusBar } from 'react-native';
import { Video} from 'expo-av';
import { styles } from '../styles/styles';
import { useGlobalState } from "../GlobalState";
import { COLOURS } from '../styles/colours';


const ResourcesDisplay = (props) => {

    const type = props.type;
    const title = props.title;
    const image = props.image;
    const content = props.content;
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    //Blog Details Screen
  if (type === "blog"){
    return (
      <View style={styles.container}>
        <Text style = {styles.detailTitle}>{title}</Text>
        <Text style = {styles.detailContent}>{content}</Text>
        <Image
        style = {scrollstyle.image }
        source={{uri:image}}
          />
      </View>
      
    );
  } else if (type === "vlog"){
  //Vlog Details Screen
    return (
      <View style={styles.container}>
        <Video
          ref={video}
          style={videoStyles.video}
          source={{
            uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={status => setStatus(() => status)}
        />
        <View style={videoStyles.buttons}>
          <Button
            title={status.isPlaying ? 'Pause' : 'Play'}
            onPress={() =>
              status.isPlaying ? video.current.pauseAsync() : video.current.playAsync()
            }
          />
        </View>
        <Text style = {styles.detailTitle}>{title}</Text>
        <Text style = {styles.detailContent}>{content}</Text>
      </View>
      
    );
  } else 
  //Others Details Screen
      return (
      <View style={styles.container}>
        <Text style = {styles.detailTitle}>{title}</Text>
        <Text style = {styles.detailContent}>{content}</Text>
        <Image
          style = {scrollstyle.image }
          source={{uri:image}}
        />
        <View style = {styles.bottomView}>
          <Button 
            
            color='white'
            title="Download"
            onPress={() => Alert.alert('Download successfully!')}
          />
          <Button
            color='white'
            title="Share"
            onPress={() => Alert.alert('Share successfully!')}
          />
        </View>
      </View>
      
    );

}

const scrollstyle = StyleSheet.create({
  image: {
    marginTop:20,
    marginBottom:20,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '90%',
    height:300
  }
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
export default ResourcesDisplay;
