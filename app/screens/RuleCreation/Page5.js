import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, TouchableHighlight, Image } from 'react-native'
import { Button } from 'react-native-elements';
import Global from '../Global'
import Axios from 'axios';

export default class Page5 extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            applet: '',
        }
    }

    componentDidMount()
    {
        this.setState({ applet : "On " + Global.SN1 + ", when " + Global.actionName + 
        " \nOn " + Global.SN2 + ", " + Global.reactionName });
    }

    PostApplet = async() => {
        let data = JSON.stringify({
            "applet": {
                "serviceToID": Global.SN2ID,
                "serviceID": Global.SN1ID,
                "actionID": Global.actionID,
                "reactionID": Global.reactionID,
                "message": Global.message
            }
        });

        Axios.post(Global.IPServer + "/applets/" + await AsyncStorage.getItem("userRef"),
            data,
            { headers: { "Content-Type": "application/json" } })
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    Global.message = "none";
                    this.props.navigation.navigate('Home');
                }
            }).catch(function (error) {
                // console.error(error);
            })
    }

    render () {
        return (
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <View style={{ marginVertical: 100}}>
                    <Text  style={{ margin: 30, fontSize: 18, color: 'white', textAlign: 'center'}}>
                        {this.state.applet}
                    </Text>
                    <Button
                        onPress={() => this.PostApplet()}
                        title="Validate this applet"
                        color="#32d7fb"
                        buttonStyle={{margin: 20, height:40, width:300}}>
                    </Button>
                </View>
            </View>
        )
    }
}