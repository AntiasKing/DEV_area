import React from 'react'
import { TextInput, Text, View, Button, TouchableHighlight, Image, ScrollView} from 'react-native'

export default class Settings extends React.Component {
    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <View style={{marginTop: 20}}>
                <ScrollView>
                    <View style={{flexDirection: 'row', margin: 30}}>
                                <TouchableHighlight style={{marginHorizontal: 25}} onPress={this.loginFacebook}>
                                    <View style={{alignItems:"center"}}>
                                        <Image
                                            style={{height: 100, width: 100}}
                                            source={require('../assets/SN/facebook.png')}
                                            />
                                        <Text style={{ color:'white', marginTop: 10 }}>
                                            Connected
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight style={{marginHorizontal: 25}} onPress={this._onPressButton}>
                                    <View style={{alignItems:"center"}}>
                                        <Image
                                            style={{height: 100, width: 100}}
                                            source={require('../assets/SN/twitter.png')}
                                            />
                                        <Text style={{ color:'white', marginTop: 10 }}>
                                            Connected
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                    </View>
                    <View style={{flexDirection: 'row', margin: 30}}>
                                <TouchableHighlight style={{marginHorizontal: 25}} onPress={this.loginSpotify}>
                                <View style={{alignItems:"center"}}>
                                        <Image
                                            style={{height: 100, width: 100}}
                                            source={require('../assets/SN/spotify.png')}
                                            />
                                        <Text style={{ color:'white', marginTop: 10 }}>
                                            Connected
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight style={{marginHorizontal: 25}} onPress={this.loginTwitch}>
                                    <View style={{alignItems:"center"}}>
                                        <Image
                                            style={{height: 100, width: 100}}
                                            source={require('../assets/SN/twitch.png')}
                                            />
                                        <Text style={{ color:'white', marginTop: 10 }}>
                                            Connected
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                    </View>
                    <View style={{flexDirection: 'row', margin: 30}}>
                                <TouchableHighlight style={{marginHorizontal: 25}} onPress={this.loginSpotify}>
                                <View style={{alignItems:"center"}}>
                                        <Image
                                            style={{height: 100, width: 100}}
                                            source={require('../assets/SN/google.png')}
                                            />
                                        <Text style={{ color:'white', marginTop: 10 }}>
                                            Connected
                                        </Text>
                                    </View>
                                </TouchableHighlight>
                    </View>
                </ScrollView>
                </View>
                <View style={{ backgroundColor: "#2f4159", width: 1000, height: 500}}></View>
            </View>
        )
    }
}