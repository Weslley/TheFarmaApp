import { debounce } from 'lodash';

import React, { Component } from 'react';
import { View, Image, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Input, Item } from "native-base";

import { connect } from 'react-redux';
import { searchProducts, getHistory } from "../../actions/products";

import { Icon } from "../../components/Icon";
import { Components } from '../../helpers';

import styles from './styles';

class SearchHeader extends Component {
    static defaultProps = {
        separator: true,
        style: {}
    }

    constructor(props) {
        super(props);
        this.state = { query: "" }
    }

    /** Private functions */
    onSearch = query => {
        this.setState({ query });
        this.props.dispatch(searchProducts(this.props.uf, query));
    }

    onClearSearch = () => {
        this.setState({ query: "" });
        this.props.dispatch(getHistory());
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
                        style={{ fontFamily: "Roboto-Bold", fontSize: 24, paddingLeft: 0, marginLeft: 0 }}
                        placeholder="Nome do medicamento "
                        placeholderTextColor="#CCC"
                        multiline={false}
                        onChangeText={this.onSearch}
                        value={this.state.query}
                        underlineColorAndroid="transparent" />

                    <TouchableOpacity onPress={this.onClearSearch}>
                        <Icon style={{ color: "#000", fontSize: 30 }} name="ios-close-empty" />
                    </TouchableOpacity>
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