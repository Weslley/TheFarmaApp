import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { getOrders, clearOrders, clearError } from "../../actions/orders"

import { Header } from "../../layout/Header";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { OrderAdapter } from "../../components/OrderAdapter";

import styles from "./styles";

class ListOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({ navigation }) => {
        let { state: { params } } = navigation;
        return {
            header: () => (
                <Header
                    title={"Minhas compras"}
                    menuLeft={
                        <MenuItem icon="md-arrow-back" onPress={() => { navigation.goBack(null) }}
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }} />
                    }
                />
            )
        };
    };


    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 || nextProps.error.response.status == 401)) {
                if (nextProps.error.response.data.detail) {
                    if (nextProps.error.response.data.detail === "Token inválido.") {
                        this.props.dispatch(clearError());
                        this.props.dispatch(logout());
                    }
                    Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount() {
        this.props.dispatch(clearError());
        this.props.dispatch(getOrders({ client: this.props.client }));
    }

    componentWillUnmount() {
        this.props.dispatch(clearError());
    }

    /** Private functions */
    _keyExtractor = (item, index) => item.id.toString();

    _showOrder(order) {
        this.props.navigation.navigate("Order", { order });
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this._showOrder(item) }}>
            <View style={{ paddingVertical: 24, borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1 }}>
                <OrderAdapter order={item} />
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={{ backgroundColor: "#FFFFFF" }}>
                <FlatList
                    style={{ paddingHorizontal: 24 }}
                    data={this.props.orders}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        orders: state.orders.orders,
        error: state.orders.error
    };
}

export default connect(mapStateToProps)(ListOrdersScreen);

