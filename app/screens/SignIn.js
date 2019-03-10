import React from 'react'
import { TextInput, Text, View, Image, KeyboardAvoidingView, TouchableHighlight, AsyncStorage } from 'react-native'
import { Button } from 'react-native-elements';
import Axios from 'axios';
import Global from './Global'
import queryString from 'query-string';

//import Expo from "expo";

export default class SignIn extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
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
            Axios.post(Global.IPServer + "/user/local/login",
            data,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    this._storeData("userRef", response.data);
                    this.props.navigation.navigate('Home');
                }
            }).catch(function (error) {
                // console.error(error);
            })
        }
        
    _storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch {
            console.error(error)
        }
    }

    _retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key)
            if (value !== null)
                console.error(value);
        } catch {
            console.error(error)
        }
    }

    loginSpotify = async() => {
        let redirectUrl = Expo.AuthSession.getRedirectUrl();
        let client_id = 'c9052bce50244b7e818d0658e64fcd91';
        let client_secret = 'nn3ocy7rcaeuedwarnuc60psqlz3oe';
        let scopes = 'user-read-email%20user-read-private';
        let result = await Expo.AuthSession.startAsync({
            authUrl:
            `https://accounts.spotify.com/authorize?` +
            `client_id=${client_id}` +
            `&response_type=token` +
            '&scope=' + scopes +
            `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
          });

        if (result.type === 'success')
        {
            Axios.get("https://api.spotify.com/v1/me", {headers:{ Accept: "application/json", 'Content-Type': "application/json", 'Authorization': "Bearer " + result.params.access_token }}).then((response) => {
                if (response.status == 200 || response.status == 201)
                {
                    let data = JSON.stringify({
                        "user": {
                            "access_token": result.params.access_token,
                            "data": response.data
                        }
                    });
                    Axios.post(Global.IPServer + "/spotify",
                    data,
                    { headers: { "Content-Type": "application/json" } })
                    .then((response2) => {
                        if (response2.status == 200 || response2.status == 201) {
                            this._storeData("userRef", response2.data);
                            this.props.navigation.navigate('Home');
                        }
                    }).catch(function (error)
                    { console.error(error)})
                }
            })
        }
    }


    loginTwitch = async() => {
        let redirectUrl = Expo.AuthSession.getRedirectUrl();

        let client_id = '914dfvimr9qpoj3ah40l0e2ny5k50s';
        let client_secret = 'nn3ocy7rcaeuedwarnuc60psqlz3oe';
        let result = await Expo.AuthSession.startAsync({
          authUrl:
          `https://id.twitch.tv/oauth2/authorize?` +
          `client_id=${client_id}` +
          `&redirect_uri=${encodeURIComponent(redirectUrl)}`+
          '&response_type=token&scope=user:read:email',
        });

        if (result.type === 'success')
        {
            console.log(result.params.access_token);
            Axios.get("https://api.twitch.tv/helix/users",
            { headers: { 'Authorization': "Bearer " + result.params.access_token }
            }).then((response) => {
                if (response.status == 200 || response.status == 201)
                {
                    let data = JSON.stringify({
                        "user": {
                            "access_token": result.params.access_token,
                            "data": response.data.data[0]
                        }
                    });
                    Axios.post(Global.IPServer + "/twitch",
                    data,
                    { headers: { "Content-Type": "application/json" } })
                    .then((response2) => {
                        if (response2.status == 200 || response2.status == 201) {
                            this._storeData("userRef", response2.data);
                            this.props.navigation.navigate('Home');
                        }
                    }).catch(function (error)
                    {})
                }
            })
        }
    }

    loginFacebook = async() => {
        const {
            type,
            token,
            expires,
            permissions,
            declinedPermissions,
        } = await Expo.Facebook.logInWithReadPermissionsAsync('410435456195867', {permissions: ['public_profile', 'email'],});

        if (type === 'success') {
            Axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`, { headers: { "Content-Type": "application/json" } }).then((response) => {
                let data = JSON.stringify({
                    user: {
                        userID: response.data.id,
                        token: token,
                        name: response.data.name,
                        email: response.data.email
                    }
                });
                Axios.post(Global.IPServer + "/facebook/",
                data, { headers: { "Content-Type": "application/json" } })
                .then((response2) => {
                    if (response2.status == 200 || response2.status == 201) {
                        this._storeData("userRef", response2.data);
                        this.props.navigation.navigate('Home');
                    }
                }).catch(function (e) {console.log(e)});
            });
        }
    }

    loginTwitter = async() => {
        this.props.navigation.navigate('Home');
    }

    loginGoogle = async() => {
        this.props.navigation.navigate('Home');
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
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this.loginFacebook}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/facebook.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this.loginTwitter}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/twitter.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this.loginGoogle}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/google.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this.loginSpotify}>
                                <Image
                                    style={{height: 50, width: 50}}
                                    source={require('../assets/SN/spotify.png')}
                                />
                            </TouchableHighlight>
                            <TouchableHighlight style={{marginHorizontal: 5}} onPress={this.loginTwitch}>
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