import React from 'react'
import { TextInput, Text, View, Alert, TouchableHighlight, Image, ScrollView } from 'react-native'
import Global from '../Global'
import Axios from 'axios';

export default class Page2 extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            actionSN: {},
            action: {}
        }
    }

    async componentDidMount(){
        Axios.get(Global.IPServer + "/services").then((response) => {
            if (Global.SN1 === "facebook")
                this.setState({actionSN: response.data[0]})
            else if (Global.SN1 === "twitter")
                this.setState({actionSN: response.data[1]})
            else if (Global.SN1 === "google")
                this.setState({actionSN: response.data[2]})
            else if (Global.SN1 === "twitch")
                this.setState({actionSN: response.data[3]})
            else if (Global.SN1 === "spotify")
                this.setState({actionSN: response.data[4]})
            else if (Global.SN1 === "weather")
                this.setState({actionSN: response.data[5]})
            this.setState({action: this.state.actionSN.actions});
            //console.error(this.state.action);
        })
    }

    ButtonCreate(name, id, description, image) {
        return(
            <TouchableHighlight style={{ marginVertical: 10 }} onPress={() => {
                Global.actionID = id;
                Global.actionName = name;
                this.props.navigation.navigate('Page3')}}>
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

    AllButtons()
    {
        let res = [];
        for (var property in this.state.action)
        {
            if (Global.SN1 === "facebook")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/facebook.png')));
            else if (Global.SN1 === "twitter")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/twitter.png')));
            else if (Global.SN1 === "google")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/google.png')));
            else if (Global.SN1 === "twitch")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/twitch.png')));
            else if (Global.SN1 === "spotify")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/spotify.png')));
            else if (Global.SN1 === "weather")
                res.push(this.ButtonCreate(this.state.action[property].name, this.state.action[property].id, this.state.action[property].description, require('../../assets/SN/weather.png')));
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