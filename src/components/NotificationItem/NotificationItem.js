import moment from 'moment';
import 'moment/locale/pt-br';

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Icon } from "../Icon";

import { Components } from "../../helpers";
import styles from "./styles";

class NotificationItem extends Component {
    static defaultProps = {
        style: {}
    }

    constructor(props) {
        super(props);
        this.state = {};
    }

    getTime(d) {
        try {
            let now = new Date();
            let date = new Date(d);

            if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear() && date.getHours() === now.getHours()) {
                return "Agora";
            }

            if (date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return "Hoje";
            }

            if (date.getDate() === (now.getDate() - 1) && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) {
                return "Ontem";
            }

            if (date) {
                return moment(new Date(d)).format("DD MMM YYYY hh:mm")
            }
        } catch (error) {
            return "";
        }
        return "";
    }

    render() {
        return (
            <View style={[this.props.style]}>
                <View style={{ width: '100%', paddingVertical: 16, }}>
                    <Text style={styles.title}>{this.props.notificacao.titulo}</Text>
                    <Text style={styles.message}>{this.props.notificacao.mensagem}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Icon name='ios-clock' color={"#000"} size={16} style={{ marginRight: 8 }} />
                        <Text style={styles.datetime}>{this.getTime(this.props.notificacao.data_criacao)}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.08)', width: '100%', height: 1 }} />
            </View>
        )
    }
}

export default NotificationItem;