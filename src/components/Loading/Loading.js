import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Components } from "../../helpers";

export default class Loading extends Component {

    static defaultProps = {
        color: "#00C7BD",
        size: "large",
        message: '',
        messageStyle: {},
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size={this.props.size} color={this.props.color} />
                {Components.renderIf(this.props.message,
                    <Text style={[this.props.messageStyle]}>{this.props.message}</Text>
                )}
            </View>
        );
    }
}