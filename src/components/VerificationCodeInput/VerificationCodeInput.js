import React, { Component } from "react";
import { Platform, View, Text, TextInput, TouchableOpacity } from "react-native";

import { Components } from "../../helpers";
import styles from "./styles";

class VerificationCodeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeLength: 4
        };
    }

    componentWillMount() {
        this.setState({ codeLength: this.props.codeLength || 4 })
    }

    /* Private functions */
    
    render() {
        return (
            <TouchableOpacity onPress={() => { }}>
                <View style={[styles.container]}>

                    {Array(this.props.codeLength).fill().map(() => {
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid='transparent'
                            onChangeText={this.props.onChangeText}
                            maxLength={1}
                            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                            autoFocus={this.props.autoFocus || true}
                            selectionColor={this.props.selectionColor}
                            underlineColorAndroid={this.props.underlineColorAndroid}
                        />
                    })}

                </View>
            </TouchableOpacity>
        );
    }
}

export default VerificationCodeInput;