import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import { Header } from "../../layout/Header";
import { MenuItem } from '../../components/MenuItem';

import styles from "./styles";

const DeviceInfo = require('react-native-device-info');
export default class VersionScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    /** Private functions */
    onBack = () => {
        this.props.navigation.goBack(null);
    }

    getVersion = () => {
        return `versão ${DeviceInfo.getVersion()}`
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.header} >
                    <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
                    <Text style={[styles.version]} uppercase={false}>{this.getVersion()}</Text>

                    <View style={styles.headerBar}>
                        <Header
                            separator={false}
                            style={{ backgroundColor: 'transparent' }}
                            menuLeft={
                                <MenuItem
                                    icon="md-arrow-back"
                                    iconColor={"#FFF"}
                                    onPress={() => { this.onBack() }}
                                    style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                                />
                            }
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    <Text style={styles.text}>{"Apoio"}</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                        <Image source={require('./images/fapepi.png')} resizeMode={"center"} style={{ width: 64, height: 64 }} />
                        <Image source={require('./images/inovativa.png')} resizeMode={"center"} style={{ width: 128, height: 35 }} />
                        <Image source={require('./images/sebrae.png')} resizeMode={"center"} style={{ width: 64, height: 64 }} />
                    </View>
                </View>
            </View>
        )
    }
}