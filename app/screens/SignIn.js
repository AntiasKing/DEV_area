import React from 'react'
import { TextInput, Text, View, Image, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { Button } from 'react-native-elements';
import Axios from 'axios';

export default class SignIn extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: ''
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

    handleSubmit() {
        let data = JSON.stringify({
            "user": {
                "email": this.state.email,
                "password": this.state.password,
            }
        });
        if (this.state.email.lenght > 0 && this.state.password.lenght > 0)
        {
            Axios.post("https://staging-area-epitech.herokuapp.com/user/local/login",
            data,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                //console.error(response);
                this.props.navigation.navigate('Home');
            }).catch(function (error) {
                console.error(error);
            })
        }
    }


    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <KeyboardAvoidingView keyboardVerticalOffset="-100" behavior="position" enabled>
                    <View style={{alignItems:"center"}}>
                        <Image source={require("../assets/Logo.png")} style={{width: 150, height: 150, marginTop: 25}} />
                        <TextInput style={{marginTop: 30, height:40, width:300, borderColor: 'white', borderBottomWidth: 1}} 
                            placeholder="Email"
                            autoCapitalize="none"
                            textContentType="emailAddress"
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
                        <Button
                            onPress={() => this.handleSubmit()}
                            title="Sign In"
                            color="#32d7fb"
                            buttonStyle={{marginTop: 35, height:40, width:300}}>
                        </Button>
                        <View style={{flexDirection: 'row', marginTop: 35}}>
                            {/* <TouchableHighlight style={{marginHorizontal: 5}} onPress={this._onPressButton}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/facebook.png')}
                                />
                            </TouchableHighlight> */}
                            <FBLogin style={{ marginBottom: 10 }}
                                ref={(fbLogin) => { this.fbLogin = fbLogin }}
                                permissions={["email","user_friends"]}
                                loginBehavior={FBLoginManager.LoginBehaviors.Native}
                                onLogin={function(data){
                                console.log("Logged in!");
                                console.log(data);
                                _this.setState({ user : data.credentials });
                                }}>
                            </FBLogin>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this._onPressButton}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/twitter.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this._onPressButton}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/google.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this._onPressButton}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/spotify.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this._onPressButton}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/twitch.png')}
                                />
                            </TouchableHighlight>
                        </View>
                        <Text style={{color: "#30d5ff", marginTop: 35}}
                        onPress={() => this.props.navigation.navigate('SignUp')}>
                            Create account
                        </Text>
                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }
}