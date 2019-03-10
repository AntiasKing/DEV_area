import React from 'react'
import { TextInput, Text, View, Alert, AsyncStorage, Image, TouchableHighlight, ScrollView } from 'react-native'
import Global from "./Global"
import Axios from 'axios'
import { Button } from 'react-native-elements';


export default class Home extends React.Component {

    test = async() => {
        this.props.navigation.navigate('Page1');
    }

    constructor (props) {
        super(props)
        this.state = {
            data: {}
        }
    }

    async componentDidMount(){
        Axios.get(Global.IPServer + "/applets/" + await AsyncStorage.getItem("userRef")).then((response) => {
            // if (Global.SN1 === "facebook")
            //     this.setState({actionSN: response.data[0]})
            // else if (Global.SN1 === "twitter")
            //     this.setState({actionSN: response.data[1]})
            // else if (Global.SN1 === "google")
            //     this.setState({actionSN: response.data[2]})
            // else if (Global.SN1 === "twitch")
            //     this.setState({actionSN: response.data[3]})
            // else if (Global.SN1 === "spotify")
            //     this.setState({actionSN: response.data[4]})
            // this.setState({action: this.state.actionSN.actions});
            this.setState({
                data: response.data
            })
        })
    }

    deleteApplet = async (appletID) =>
    {

        let UR = await AsyncStorage.getItem("userRef");
        Axios.delete(Global.IPServer + "/applet/" + UR + "/" + appletID)
            .then((response) => {
                if (response.status == 200 || response.status == 201) {
                    Axios.get(Global.IPServer + "/applets/" + UR).then((response) => {
                        this.setState({data: response.data})
                    })
                }
            }).catch(function (error) {
                console.error(error);
            })
    }

    Applet(SN1, action, SN2, reaction, appletID)
    {
            return(
                <View style={{ margin: 10, backgroundColor: "white", width: 300,}}>
                        <View style={{alignItems:"flex-end"}}>
                            <TouchableHighlight style={{ margin: 5 }} onPress={() => { this.deleteApplet(appletID) }}>
                                <Image
                                style={{height: 20, width: 20}}
                                source={require('../assets/error.png')}>
                                </Image>
                            </TouchableHighlight>
                        </View>
                        <View style={{alignItems:"center"}}>
                            <Text style={{fontSize: 16, marginBottom: 10, marginTop: 5 , textAlign:"center"}} >
                                On {SN1}, when {action}
                            </Text>
                            <Text style={{fontSize: 16, marginBottom: 15 , textAlign:"center"}} >
                                On {SN2}, {reaction}
                            </Text>
                        </View>
                </View>
        )
    }

    AllApplets()
    {
        let res = [];
        for (var property in this.state.data)
        {
            res.push(this.Applet(this.state.data[property].serviceName, this.state.data[property].actionName, 
                this.state.data[property].serviceToName, this.state.data[property].reactionName, this.state.data[property].id));
        }
        return res;
    }

    render () {
        return (
            <View>

            <ScrollView>
            <View style={{flex:1, paddingTop: 20, backgroundColor: "#2f4159", alignItems:"center"}}>
                <Button
                    onPress={() => this.test()}
                    title="Create an applet"
                    color="#32d7fb"
                    buttonStyle={{margin: 20, height:40, width:300}}>
                </Button>
                {this.AllApplets()}
            </View>
            </ScrollView>
            <View style={{ backgroundColor: "#2f4159", width: 1000, height: 500}}></View>
            </View>
        )
    }
}