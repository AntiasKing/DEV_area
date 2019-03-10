import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, TouchableHighlight, Image } from 'react-native'
import Global from '../Global'
import Axios from 'axios';

export default class Page1 extends React.Component {

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
                        Global.SN1 = "facebook";
                        Global.SN1ID = 0;
                        this.props.navigation.navigate('Page2')}}>
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
                        Global.SN1 = "twitter";
                        Global.SN1ID = 1;
                        this.props.navigation.navigate('Page2')}}>
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
                        Global.SN1 = "twitch";
                        Global.SN1ID = 3;
                        this.props.navigation.navigate('Page2')}}>
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
                        Global.SN1 = "spotify";
                        Global.SN1ID = 4;
                        this.props.navigation.navigate('Page2')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/spotify.png')}
                            />
                    </TouchableHighlight>
                )
        }
    }

    Weather () {
            return(
                    <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                        Global.SN1 = "weather";
                        Global.SN1ID = 5;
                        this.props.navigation.navigate('Page2')}}>
                        <Image
                            style={{height: 70, width: 70}}
                            source={require('../../assets/SN/weather.png')}
                            />
                    </TouchableHighlight>
                )
    }

    Timer () {
        return(
                <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                    Global.SN1 = "timer";
                    Global.SN1ID = 6;
                    this.props.navigation.navigate('Page2')}}>
                    <Image
                        style={{height: 70, width: 70}}
                        source={require('../../assets/SN/weather.png')}
                        />
                </TouchableHighlight>
            )
}
        
    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                {this.Facebook()}
                {this.Twitter()}
                {this.Twitch()}
                {this.Spotify()}
                {this.Weather()}
                {this.Timer()}
            </View>
        )
    }
}