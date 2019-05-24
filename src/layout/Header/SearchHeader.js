import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input, Item } from "native-base";

import { connect } from 'react-redux';
import { searchProducts, getHistory } from "../../actions/products";

import { Icon } from "../../components/Icon";
import { Components } from '../../helpers';

import styles from './styles';

class SearchHeader extends Component {
    static defaultProps = {
        query: "",
        style: {},
        inputStyle: {},
        separator: true,
        onQueryChange: () => {},
        onClearSearch: () => {},
        placeholder: "Nome do medicamento",
        placeholderTextColor: "#CCC",
    }

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <View style={styles.actions}>
                    {Components.renderIf(
                        this.props.menuLeft,
                        <View style={styles.menuLeft}>{this.props.menuLeft}</View>
                    )}

                    {Components.renderIf(
                        this.props.menuRight,
                        <View style={styles.menuRight}>{this.props.menuRight}</View>
                    )}
                </View>

                <Item>
                    <Input
                        autoFocus={true}
                        style={[styles.input, this.props.inputStyle]}
                        multiline={false}
                        value={this.props.query}
                        underlineColorAndroid="transparent"
                        placeholder={this.props.placeholder}
                        onChangeText={this.props.onQueryChange}
                        placeholderTextColor={this.props.placeholderTextColor}
                    />

                    {Components.renderIf(this.props.query,
                        <TouchableOpacity onPress={this.props.onClearSearch}>
                            <Icon style={{ color: "#000", fontSize: 30 }} name="ios-close-empty" />
                        </TouchableOpacity>
                    )}
                </Item>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uf: state.locations.uf,
    }
}

export default connect(mapStateToProps)(SearchHeader);