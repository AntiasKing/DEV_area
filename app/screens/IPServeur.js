import React from 'react'
import Global from "./Global"
import { TextInput, Text, View, Image, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements';

export default class SignIn extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            IPServer: "https://staging-area-epitech.herokuapp.com",
        }
    }

    setIPServer(text)
    {
        this.setState({
            IPServer: text
        })
    }

    validIP ()
    {
        Global.IPServer = this.state.IPServer;
        this.props.navigation.navigate('SignIn');
    }

    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <KeyboardAvoidingView keyboardVerticalOffset="-100" behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={{width: 150, height: 150, marginTop: 25}} />
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="IPServer"
                            autoCapitalize="none"
                            value={this.state.IPServer}
                            onChangeText={(text) => this.setIPServer(text)}>
                        </TextInput>
                        <Button
                            onPress={() => this.validIP()}
                            title="Validate"
                            color="#32d7fb"
                            buttonStyle={{marginTop: 35, height:40, width:300}}>
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )}
}
