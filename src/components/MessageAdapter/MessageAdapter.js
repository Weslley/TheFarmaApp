import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from "../Icon";

import styles from "./styles";
export default class MessageAdapter extends Component {
    static defaultProps = {
        style: {}
    }

    render() {
        return (
            <View style={[{ width: '100%', paddingVertical: 16 }, this.props.style]}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.message}>{this.props.message}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Icon name="clock" size={16} color={"#000"} style={{ marginRight: 7 }} />
                    <Text style={styles.date}>{this.props.date}</Text>
                </View>
            </View>
        )
    }
}