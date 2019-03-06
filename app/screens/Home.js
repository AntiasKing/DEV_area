import React from 'react'
import { TextInput, Text, View, Alert } from 'react-native'
import { Button } from 'react-native-elements';

export default class Home extends React.Component {

    test = async() => {
        let redirectUrl = Expo.AuthSession.getRedirectUrl();
        console.log(redirectUrl);
        Alert.alert(redirectUrl);
    }

    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <Button
                    onPress={() => this.test()}
                    title="Create an applet"
                    color="#32d7fb"
                    buttonStyle={{margin: 20, height:40, width:300}}>
                </Button>
            </View>
        )
    }
}