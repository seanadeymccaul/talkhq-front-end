import React from "react";
import { SafeAreaView, Text, View, Image, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import { WebView } from 'react-native-webview';


function GetinTouchScreen({navigation}){
    // function SupportNavigation(){
    //     navigation.navigate("Get Support");
    // }
    // function FeedbackNavigation(){
    //     navigation.navigate("Leave Feedback");
    // }
    // function BookingNavigation(){
    //     navigation.navigate("Booking");
    // }

    return (
        <SafeAreaView style={styles.container}>
                {/* <View>
                    <TouchableOpacity style={styles.icon} onPress={SupportNavigation}>
                    <View style={styles.row}>
                        <Pressable onPress={SupportNavigation}>
                            <Text style={styles.text}>Get Support</Text>
                        </Pressable>
                        <Icon name="chevron-right" size={30} />
                    </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={FeedbackNavigation}>
                    <View style={styles.row}>
                        <Pressable onPress={FeedbackNavigation}>
                            <Text style={styles.text}>Leave Feedback</Text>
                        </Pressable>
                        <Icon name="chevron-right" size={30} />
                    </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.icon} onPress={BookingNavigation}>
                    <View style={styles.row}>
                        <Pressable onPress={BookingNavigation}>
                            <Text style={styles.text}>Booking</Text>
                        </Pressable>
                        <Icon name="chevron-right" size={30} />
                    </View>
                    </TouchableOpacity>
                </View> */}

            <WebView 
                source={{uri: 'https://talkhq.com.au/contact-us/'}}
            />
        </SafeAreaView>
        
    );
}

    

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // alignContent: 'center',
        // justifyContent: 'center',
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
})

export default GetinTouchScreen;