import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { getOrders, getOrdersNextPage, clearOrders, clearError } from "../../actions/orders"

import { Header } from "../../layout/Header";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading";
import { MenuItem } from "../../components/MenuItem";
import { OrderAdapter } from "../../components/OrderAdapter";

import { Components } from "../../helpers";
import styles from "./styles";

class ListOrdersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
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
    onBack() {
        this.props.navigation.goBack(null);
    }

    _showOrder(order) {
        this.props.navigation.navigate({ key: 'order1', routeName: 'Order', params: { order } });
    }

    onEndReached = ({ distanceFromEnd }) => {
        if (this.props.nextPage) {
            let params = { client: this.props.client, url: this.props.nextPage }
            this.props.dispatch(getOrdersNextPage(params));
        }
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => { this._showOrder(item) }}>
            <View style={{ paddingVertical: 24, borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1 }}>
                <OrderAdapter order={item} />
            </View>
        </TouchableOpacity>
    );

    renderFooter = () => {
        if (!this.props.isLoading) return null;
        return (
            <View style={{ alignItems: 'center', paddingVertical: 16, }}>
                <ActivityIndicator color={"#00C7BD"} size={"large"} />
            </View>
        );
    };

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

                <Header
                    title={"Minhas compras"}
                    menuLeft={
                        <MenuItem
                            icon="md-arrow-back"
                            onPress={() => { this.onBack() }}
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                        />
                    }
                />

                {Components.renderIfElse(this.props.orders && this.props.orders.length === 0 && this.props.isLoading === true,
                    <Loading />,
                    <ScrollView style={{ paddingHorizontal: 24 }}
                        onScroll={(e) => {
                            let paddingToBottom = 0;
                            paddingToBottom += e.nativeEvent.layoutMeasurement.height;
                            if (e.nativeEvent.contentOffset.y.toFixed(1) === (e.nativeEvent.contentSize.height - paddingToBottom).toFixed(1)) {
                                this.onEndReached(0)
                            }
                        }}
                    >
                        <FlatList
                            data={this.props.orders}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={this._renderItem}
                            ListFooterComponent={this.renderFooter()}
                        />

                    </ScrollView>
                )}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        orders: state.orders.orders,
        isLoading: state.orders.isLoading,
        nextPage: state.orders.next,

        error: state.orders.error
    };
}

export default connect(mapStateToProps)(ListOrdersScreen);

