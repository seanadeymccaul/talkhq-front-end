import React from "react";
import { SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import {COLOURS} from '../../styles/colours'

function GetSupportScreen(){
    return(
        <SafeAreaView style={styles.container}>
            <View style={{flex:3}}>
                <Text style={styles.text}>What can we help you with?</Text>
                <TextInput 
                    style={styles.inputSubject}
                    name='subject'
                    placeholder="Subject"
                />
                <TextInput
                    style={styles.input}
                    multiline
                />
                <TouchableOpacity
                    style={styles.submitBtn}
                >
                    <Text style={styles.btnText}>Submit</Text>
                </TouchableOpacity>
            </View>

            <View style={{flex:2}}>
                <Text style={{textAlign:'center', fontFamily:'Quicksand_400Regular'}}>Or all us on</Text>
                <TouchableOpacity
                    style={styles.phoneNumBtn}
                >
                    <Text style={styles.btnText}>07 4755 0225</Text>
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
    text:{
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Quicksand_400Regular',

    },
    inputSubject:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    input:{
        height: 200,
        margin: 12,
        borderWidth: 1,
    },
    submitBtn:{
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
    btnText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10,
        fontFamily:'Quicksand_400Regular',
        fontSize:20,
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

})

export default GetSupportScreen;