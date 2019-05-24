import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
//import { Text } from "native-base";

import { Icon } from '../Icon';
import styles from './styles';
export default class LocationListItem extends Component {
    static defaultProps = {
        icon: "place",
        style: {},
        iconStyle: {},
        titleStyle: {},
        subtitleStyle: {},
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    getIcon(type) {
        switch (type) {
            case 0:
                return "home"
            case 1:
                return "business"
            case 2:
                return "favorite-o"
            case 3:
                return "history"
            case 4:
                return "map-pin"
            default:
                return "place"
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.container, this.props.style]} onPress={this.props.onPress}>
                <Icon name={this.getIcon(this.props.address.type)} size={16} color={'#000000'} style={[styles.icon, this.props.iconStyle]} />
                <View style={{ flex: 9 }}>
                    <Text style={[styles.title, this.props.titleStyle]}>{this.props.address.name}</Text>
                    <Text numberOfLines={1} ellipsizeMode={"tail"} style={[styles.subtitle, this.props.subtitleStyle]}>
                        {this.props.address.address}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}