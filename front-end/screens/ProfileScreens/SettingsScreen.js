import {React, useState} from "react";
import { SafeAreaView, Text, Switch, StyleSheet, View } from "react-native";


import {COLOURS} from '../../styles/colours'

function SettingsScreen(){

    const [isAutoplay, setIsAutoplay] = useState(false);
    const AutoplaySwitch = () => setIsAutoplay(previousState => !previousState);
    const [isRecommended, setIsRecommended] = useState(false);
    const RecomendSwitch = () => setIsRecommended(previousState => !previousState);
    const [isReplied, setIsReplied] = useState(false);
    const ReplySwitch = () => setIsReplied(previousState => !previousState);
    const [isPushed, setIsPushed] = useState(false);
    const PushSwitch = () => setIsPushed(previousState => !previousState);
    const [isEmailed, setIsEmailed] = useState(false);
    const EmailSwitch = () => setIsEmailed(previousState => !previousState);

    return(
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.row}>
                    <Text style={styles.text}>Autoplay Vlogs</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: '#8bd1d8' }}
                        thumbColor='white'
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={AutoplaySwitch}
                        value={isAutoplay}
                        
                    />
                </View>
                <Text style={styles.noteText}>Videos will automatically play muted</Text> 
            </View> 

            <View style={{marginTop: 30}}>
                <Text style={styles.noteText}>Notification Settings</Text> 
                <View style={styles.row}>
                    <Text style={styles.text}>New Recommended Resources</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: '#8bd1d8' }}
                        thumbColor='white'
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={RecomendSwitch}
                        value={isRecommended}  
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Community Replies</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: '#8bd1d8' }}
                        thumbColor='white'
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={ReplySwitch}
                        value={isReplied}  
                    />
                </View>
                
            </View> 

            <View style={{marginTop: 30}}>
                <Text style={styles.noteText}>How to receive notifications</Text> 
                <View style={styles.row}>
                    <Text style={styles.text}>Push Notifications</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: '#8bd1d8' }}
                        thumbColor='white'
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={PushSwitch}
                        value={isPushed}  
                    />
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>Email</Text>
                    <Switch 
                        trackColor={{ false: "#767577", true: '#8bd1d8' }}
                        thumbColor='white'
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={EmailSwitch}
                        value={isEmailed}  
                    />
                </View>
                
            </View> 


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    //   alignItems: "center",
    //   justifyContent: 'space-between',
        margin: 20,
    },
    row:{
        // flex: 1,
        flexDirection: 'row',
        flexWrap: "wrap",
        margin: 10,
        borderColor: COLOURS.darkGrey,
        // borderBottomWidth: 1,
    },
    text:{
        flex: 1,
        fontFamily:'Quicksand_400Regular',
        fontSize: 18,
    },
    noteText:{
        fontFamily: 'Quicksand_400Regular',
        fontSize: 12,
        marginLeft: 10,
        marginBottom: 5,
    }
});


export default SettingsScreen;