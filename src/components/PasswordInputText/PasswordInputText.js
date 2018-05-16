import React, { Component } from 'react'
import { View } from 'react-native'
import { TextField } from 'react-native-material-textfield';
import { Icon } from "../Icon";

import styles from "./styles";

class PasswordInputText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icEye: 'eye-disabled',
            password: true
        }
    }

    changePwdType = () => {
        let newState;
        if (this.state.password) {
            newState = {
                icEye: 'eye',
                password: false
            }
        } else {
            newState = {
                icEye: 'eye-disabled',
                password: true
            }
        }

        // set new state value
        this.setState(newState)

    };


    render() {
        return (
            <View>
                <TextField {...this.props} secureTextEntry={this.state.password} />

                <Icon style={styles.icon}
                    name={this.state.icEye}
                    size={this.props.iconSize}
                    color={this.props.iconColor}
                    onPress={this.changePwdType}
                />
            </View>
        );
    }
}



PasswordInputText.defaultProps = {
    iconSize: 25,
    iconColor: "#000"
}

export default PasswordInputText