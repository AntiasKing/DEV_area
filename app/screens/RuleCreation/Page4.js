import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, TouchableHighlight, Image, ScrollView } from 'react-native'
import { Button } from 'react-native-elements';
import Global from '../Global'
import Axios from 'axios';

export default class Page4 extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            reactionSN: {},
            reaction: {},

            message: '',
        }
    }

    async componentDidMount(){
        Axios.get(Global.IPServer + "/services").then((response) => {
            if (Global.SN2 === "facebook")
                this.setState({reactionSN: response.data[0]})
            else if (Global.SN2 === "twitter")
                this.setState({reactionSN: response.data[1]})
            else if (Global.SN2 === "google")
                this.setState({reactionSN: response.data[2]})
            else if (Global.SN2 === "twitch")
                this.setState({reactionSN: response.data[3]})
            else if (Global.SN2 === "spotify")
                this.setState({reactionSN: response.data[4]})
            this.setState({reaction: this.state.reactionSN.reactions});
        })
    }

    ButtonCreate(name, id, description, image) {
        return(
            <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                Global.reactionID = id;
                Global.reactionName = name;
                this.props.navigation.navigate('Page5')}}>
                <View style={{flexDirection: "row", margin: 10, backgroundColor: "white", alignItems:"center", width: 300, height: 100}}>
                        <View style={{flex: 0.35, alignItems:"center"}}>
                            <Image
                            style={{height: 70, width: 70}}
                            source={image}
                            />
                        </View>
                        <View style={{flex: 0.65, alignItems:"center"}}>
                            <Text style={{fontSize: 16, marginVertical: 5 , textAlign:"center"}} >
                                {name}
                            </Text>
                            <Text style={{ textAlign:"center"}}>
                                {description}
                            </Text>
                        </View>
                </View>
            </TouchableHighlight>
        )
    }

    ButtonCreateWithMessage(name, id, description, image) {
        return(
            // <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
            //     Global.reactionID = id;
            //     Global.reactionName = name;
            //     this.props.navigation.navigate('Page5')}}>
            <View style={{marginVertical: 10, backgroundColor: "white", alignItems:"center", width: 300, height: 200}}>
                <View style={{flexDirection: "row", margin: 10, alignItems:"center"}}>
                        <View style={{flex: 0.35, alignItems:"center"}}>
                            <Image
                            style={{height: 70, width: 70}}
                            source={image}
                            />
                        </View>
                        <View style={{flex: 0.65, alignItems:"center"}}>
                            <Text style={{fontSize: 16, marginVertical: 5 , textAlign:"center"}} >
                                {name}
                            </Text>
                            <Text style={{ textAlign:"center"}}>
                                {description}
                            </Text>
                        </View>
                </View>
                <View style={{alignItems:"center"}}>
                    <TextInput style={{marginvertical: 15, height:40, width:250, borderColor: 'black', borderBottomWidth: 1}} 
                            placeholder="Parameter"
                            autoCapitalize="none"
                            value={this.state.message}
                            onChangeText={(text) => this.setState({message: text})}>
                    </TextInput>
                    <Button
                            onPress={() => { Global.message = this.state.message;
                                Global.reactionID = id;
                                Global.reactionName = name;
                                this.props.navigation.navigate('Page5')}}
                            title="Validate"
                            color="#32d7fb"
                            buttonStyle={{marginTop: 15, height:40, width:150}}>
                    </Button>
                </View>
            </View>
            // </TouchableHighlight>
        )
    }

    AllButtons()
    {
        let res = [];
        for (var property in this.state.reaction)
        {
            if (this.state.reaction[property].needMessage == false)
            {
                if (Global.SN2 === "facebook")
                    res.push(this.ButtonCreate(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/facebook.png')));
                else if (Global.SN2 === "twitter")
                    res.push(this.ButtonCreate(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/twitter.png')));
                else if (Global.SN2 === "google")
                    res.push(this.ButtonCreate(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/google.png')));
                else if (Global.SN2 === "twitch")
                    res.push(this.ButtonCreate(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/twitch.png')));
                else if (Global.SN2 === "spotify")
                    res.push(this.ButtonCreate(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/spotify.png')));
            }
            else
            {
                if (Global.SN2 === "facebook")
                    res.push(this.ButtonCreateWithMessage(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/facebook.png')));
                else if (Global.SN2 === "twitter")
                    res.push(this.ButtonCreateWithMessage(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/twitter.png')));
                else if (Global.SN2 === "google")
                    res.push(this.ButtonCreateWithMessage(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/google.png')));
                else if (Global.SN2 === "twitch")
                    res.push(this.ButtonCreateWithMessage(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/twitch.png')));
                else if (Global.SN2 === "spotify")
                    res.push(this.ButtonCreateWithMessage(this.state.reaction[property].name, this.state.reaction[property].id, this.state.reaction[property].description, require('../../assets/SN/spotify.png')));
            }
        }
        return res;
    }


    render () {
        return (
            <View>
            <ScrollView>
            <View style={{flex:1, paddingTop: 10, backgroundColor: "#2f4159", alignItems:"center"}}>
                {this.AllButtons()}
            </View>
            </ScrollView>
            <View style={{ backgroundColor: "#2f4159", width: 1000, height: 500}}></View>
            </View>

        )
    }

}