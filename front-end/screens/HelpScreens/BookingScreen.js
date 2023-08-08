import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import {COLOURS} from '../../styles/colours'


function BookingScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:1}}>
                <Text 
                    style={{
                        marginTop: 20,
                        marginBottom:15,
                        fontFamily:'Quicksand_400Regular',
                        textAlign:'center',
                        fontSize:20,
                    }}
                >
                    To book an appointment, please call us
                </Text>
                <TouchableOpacity
                    style={styles.phoneNumBtn}
                >
                    <Text style={styles.btnText}>07 4755 0225</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex:3}}>
                <Text
                    style={{
                        fontFamily:'Quicksand_400Regular',
                        textAlign:'center',
                    }}
                >
                    or
                </Text>
                <TextInput
                    name='dob'
                    label="Child's date of birth"
                    style={{height: 60, margin:12, borderWidth:1  }}
                />
                <TextInput
                    name='description'
                    label="Description and appointment time availability"
                    multiline
                    style={{height: 200, margin:12, borderWidth:1  }}
                />
                <TextInput
                    name='phoneNum'
                    label="Contact Number"
                    style={{height: 60, margin:12, borderWidth:1  }}
                />
            </View>
            <View style={{flex:1}}>
            <Text
                style={{
                    fontFamily:'Quicksand_400Regular',
                    textAlign:'center',
                }}
            >
                Please give us a brief description and how we can help, and when you are available
            </Text>
                <TouchableOpacity
                    style={styles.submitBtn}
                >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent:'center',
        alignContent:'center',
        margin: 10,
    },
    phoneNumBtn:{
        marginRight:10,
        marginLeft:10,
        marginTop:10,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:COLOURS.aqua,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btnText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontFamily:'Quicksand_400Regular',
        fontSize:20,
    },
    submitBtn:{
        marginRight:10,
        marginLeft:10,
        marginTop:30,
        marginBottom:20,
        paddingTop:10,
        paddingBottom:10,
        backgroundColor:COLOURS.purple,
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
    },
    btnText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontFamily:'Quicksand_400Regular',
        fontSize:20,
    },
})

export default BookingScreen;