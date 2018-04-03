import React, { Component } from "react";
import { Platform, View, Text, TextInput, TouchableOpacity } from "react-native";
TextInput.defaultProps.selectionColor = "white";

import { Components } from "../../helpers";
import styles from "./styles";

class VerificationCodeInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codeLength: 4
        };
    }

    componentWillMount(){
        this.setState({codeLength: this.props.codeLength || 4})
    }

    /* Private functions */
    renderBalls(i){
        if(this.props.value[i]){
            return(<View><Text>{this.props.value}</Text></View>)
        }else{
            return(<View><View style={styles.ball} /></View>)
        }
    }

    render() {
        var balls = []
        for(i = 0; i < this.state.codeLength; i++) {
            balls.push(this.renderBalls(i));
        }
        return (
            <TouchableOpacity onPress={() => { }}>
                <View style={[styles.container]}>
                    <TextInput 
                        style={styles.input} 
                        underlineColorAndroid='transparent'
                        onChangeText={this.props.onChangeText} 
                        maxLength={this.props.codeLength || 4} 
                        keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
                        autoFocus={this.props.autoFocus || true}
                        selectionColor = 'transparent'
                    />
                    <View style={styles.containerBalls}>
                        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                            {Components.renderIfElse(
                                this.props.value && this.props.value[0],
                                <Text style={styles.text}>{this.props.value[0]}</Text>,
                                <View style={styles.ball} />
                            )}
                        </View>

                        <View>
                            {Components.renderIfElse(
                                this.props.value && this.props.value[1],
                                <Text style={styles.text}>{this.props.value[1]}</Text>,
                                <View style={styles.ball} />
                            )}
                        </View>

                        <View>
                            {Components.renderIfElse(
                                this.props.value && this.props.value[2],
                                <Text style={styles.text}>{this.props.value[2]}</Text>,
                                <View style={styles.ball} />
                            )}
                        </View>

                        <View>
                            {Components.renderIfElse(
                                this.props.value && this.props.value[3],
                                <Text style={styles.text}>{this.props.value[3]}</Text>,
                                <View style={styles.ball} />
                            )}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default VerificationCodeInput;