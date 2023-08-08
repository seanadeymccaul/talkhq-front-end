import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, Pressable, Alert } from "react-native";
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';


function AboutScreen({navigation}){
    
    async function getPrivacy(){
        const response = await fetch(`http://talkhq-test.herokuapp.com/get/privacy`,{
             method: 'post',
             mode: 'no-cors',
             headers: {
                 'Content-Type': 'application/json',
             }
         })
         const data = await response.json();
         if (await data.status == "done"){
            PolicyNavigation(data.website);
          }
        else{
            Alert.alert("Privacy Policy is currently unavailable, please go to www.talkhq.com.au")
        }
    }
    function PolicyNavigation(website){
        navigation.navigate("Privacy Policy", {website:website});
    }
    
    return(
        <SafeAreaView style={styles.container}>
             <View style={{flex: 1}}>
                <Image 
                    style={styles.image}
                    source={require('../../assets/logo.png')} 
                />
            </View>
            <View style={{flex:1.4}}>

                <View>
                    <TouchableOpacity style={styles.icon} onPress={getPrivacy}>
                    <View style={styles.row}>
                        <Pressable onPress={getPrivacy}>
                            <Text style={styles.text}>Privacy Policy</Text>
                        </Pressable>
                        <Icon name="chevron-right" size={30} />
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={styles.bottomText}>TalkHQ</Text>
                <Text style={styles.bottomText}>Ver 1.0</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
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
    row:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: COLOURS.darkGrey,
        // borderBottomWidth: 1,
        // marginBottom: 10,
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
    bottomText:{
        textAlign: "center",
        color: '#a0a0a0',
        fontSize: 10,
        marginTop: 3,

    }

})

export default AboutScreen;