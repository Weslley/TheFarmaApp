import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Badge } from "native-base";
import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

export default class ViewCartBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={[styles.container, styles.bottom]}>
                <TouchableOpacity style={[styles.row, styles.button, { paddingHorizontal: 16, paddingVertical: 12 }]} onPress={this.props.onPress} >
                    <Icon name="shopping-bag" color={"#FFF"} size={24} style={styles.icon} />
                    <Text style={styles.text}>{"Ver Cestinha"}</Text>
                    {Components.renderIfElse(this.props.value >= 1,
                        <Badge style={styles.badge}>
                            <Text style={styles.badgeText}>{this.props.value}</Text>
                        </Badge>, 
                        <View/>
                    )}
                </TouchableOpacity>
            </View>
        )
    }
}