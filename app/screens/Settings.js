import React from 'react'
import { TextInput, Text, View, Button } from 'react-native'

export default class Settings extends React.Component {
    render () {
        return (
            <View>
                <Text>
                    Settings
                </Text>
                {/* <Button  onPress={this.props.navigation.navigate('Auth')}>
                    Sign Out
                </Button> */}
            </View>
        )
    }
}