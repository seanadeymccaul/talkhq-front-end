import { StyleSheet} from 'react-native';
import {COLOURS} from './colours.js';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
console.log(windowWidth)
const windowHeight = Dimensions.get('window').height;
console.log(windowHeight)

export const styles = StyleSheet.create({
  
    title: {
      paddingBottom:10,
      paddingLeft:70,
      paddingRight:70,
      textAlign:'center',
      color: COLOURS.darkGrey,
      fontFamily:'Quicksand_400Regular',
      fontSize: 26,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        // justifyContent: 'center',
      },
    videoContainer: {
      flex: 1,
      backgroundColor: '#fff',
      // justifyContent: 'center',
    },
    videoContainer2: {
      flex: 1,
      backgroundColor: '#fff',
      height: 200,
      // justifyContent: 'center',
    },
    createPage: {
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'center',
      textAlign:"center",
    },
    blogTitle:{
      paddingLeft:15,
      paddingRight: 15,
      textAlign:'left',
      color: COLOURS.darkGrey,
      fontFamily:'Quicksand_400Regular',
      fontSize: 24,
    },
    vlogTitle:{
      position: 'relative',
      top:(windowWidth/2)+(windowWidth/30),
      paddingLeft:10,
      paddingRight: 10,
      textAlign:'left',
      color: COLOURS.darkGrey,
      fontFamily:'Quicksand_400Regular',
      fontSize: 24,
    },
    blog: {
      top:(windowWidth/2)+(windowWidth/30),
      textAlign:'left',
      paddingBottom: "2%",
      color: COLOURS.purple,
      paddingLeft: 10,
      fontFamily:'Quicksand_400Regular',
      fontSize: 16,
      },
      blog2: {
        paddingTop:"1%",
        paddingBottom:"5%",
        textAlign:'left',
        color: COLOURS.purple,
        paddingLeft: 15,
        fontFamily:'Quicksand_400Regular',
        fontSize: 16,
        },
      
    detailTitle:{
      fontSize: 25,
      fontWeight: 'bold',
      textAlign:'center',
      fontFamily:'Quicksand_400Regular',
      color: COLOURS.purple,
      marginTop: 20,
      marginBottom: 20,
      marginLeft:20,
      marginRight:20,
    },
    detailContent:{
      fontFamily: 'Quicksand_400Regular',
      fontSize: 16,
      textAlign:'left',
      marginLeft:20,
      marginRight:20,
    },
    bottomView:{
      width:'100%',
      height:60,
      backgroundColor: COLOURS.purple,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      flexDirection: "row",
    },
    deleteBtn:{
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
    deleteBtnText:{
      color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10,
      fontFamily:'Quicksand_400Regular',
      fontSize:20,
    }
  });