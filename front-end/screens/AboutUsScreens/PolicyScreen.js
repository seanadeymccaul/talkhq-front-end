import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';


function PolicyScreen({route, navigation}){
    const {website} = route.params;
        return (
            <SafeAreaView style={styles.container}>
                <WebView 
                    source={{uri: website}}
                />
            </SafeAreaView>
        )
    
}

export default PolicyScreen;
const styles = StyleSheet.create({
    container:{
        flex: 1,
        // alignContent: 'center',
        // justifyContent: 'center',
    }
})