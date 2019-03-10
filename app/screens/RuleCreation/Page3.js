import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, TouchableHighlight, Image } from 'react-native'
import { Button } from 'react-native-elements';
import Global from '../Global'
import Axios from 'axios';

export default class Page3 extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            service: {}
        }
    }

    async componentDidMount(){
        Axios.get(Global.IPServer + "/social?userRef=" + await AsyncStorage.getItem("userRef")).then((response) => {
            this.setState({service: response.data});
            console.log(this.state.service)
        })
    }

    
    Facebook () {
        if (this.state.service.facebook == true)
        {
            return(
                    <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                        Global.SN2 = "facebook";
                        Global.SN2ID = 0;
                        this.props.navigation.navigate('Page4')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/facebook.png')}
                            />
                    </TouchableHighlight>
                )
            }
        }
    
    Twitter () {
        if (this.state.service.twitter == true)
        {
            return(
                    <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                        Global.SN2 = "twitter";
                        Global.SN2ID = 1;
                        this.props.navigation.navigate('Page4')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/twitter.png')}
                            />
                    </TouchableHighlight>
                )
            }
        }

    Twitch () {
        if (this.state.service.twitch == true)
        {
            return(
                    <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                        Global.SN2 = "twitch";
                        Global.SN2ID = 3;
                        this.props.navigation.navigate('Page4')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/twitch.png')}
                            />
                    </TouchableHighlight>
                )
            }
        }

    Spotify () {
        if (this.state.service.spotify == true)
        {
            return(
                    <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                        Global.SN2 = "spotify";
                        Global.SN2ID = 4;
                        this.props.navigation.navigate('Page4')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/spotify.png')}
                            />
                    </TouchableHighlight>
                )
        }
    }
        
    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                {this.Facebook()}
                {this.Twitter()}
                {this.Twitch()}
                {this.Spotify()}
            </View>
        )
    }
}