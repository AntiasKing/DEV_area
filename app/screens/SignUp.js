import React from 'react'
import { TextInput, Text, View, KeyboardAvoidingView, Image } from 'react-native'
import { Button } from 'react-native-elements';
import Axios from 'axios';
import Global from "./Global";

export default class SignUp extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            password2: ''
        }
    }

    setEmail(text)
    {
        this.setState({
            email: text
        })
    }

    setPassword(text)
    {
        this.setState({
            password: text
        })
    }

    setPassword2(text)
    {
        this.setState({
            password2: text
        })
    }

    handleSubmit() {
        let data = JSON.stringify({
            "user": {
                "email": this.state.email,
                "password": this.state.password,
            }
        });
            Axios.post(Global.IPServer + "/signup",
                data,
                { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    //console.error(response);
                    this._storeData("userRef", response2.data);
                    this.props.navigation.navigate('Home');
                }).catch(function (error) {
                    console.error(error);
                })
    }

    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <KeyboardAvoidingView keyboardVerticalOffset="-100" behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={{width: 150, height: 150, marginTop: 25}} />
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Email"
                            value={this.state.email}
                            onChangeText={(text) => this.setEmail(text)}>
                        </TextInput>
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Password"
                            autoCapitalize="none"
                            textContentType="password"
                            value={this.state.password}
                            onChangeText={(text) => this.setPassword(text)}>
                        </TextInput>
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Confirm password"
                            autoCapitalize="none"
                            textContentType="password"
                            value={this.state.password2}
                            onChangeText={(text) => this.setPassword2(text)}>
                        </TextInput>
                        <Button
                            onPress={() => this.handleSubmit()}
                            title="Sign Up"
                            color="#32d7fb"
                            buttonStyle={{marginTop: 40, height:40, width:300}}>
                        </Button>
                        <Text style={{color: "#30d5ff", marginTop: 40}}
                        onPress={() => this.props.navigation.navigate('SignIn')}>
                            Sign in instead
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}