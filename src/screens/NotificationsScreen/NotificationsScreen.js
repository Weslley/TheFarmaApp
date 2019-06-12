import React, { Component } from "react";
import { NavigationEvents } from 'react-navigation';
import { View, ScrollView, FlatList, ActivityIndicator } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";
import { getCurrentClient } from "../../actions/clients";
import { getOrder, clearOrder } from "../../actions/orders";
import {
  getNotifications,
  getNotificationsNextPage,
  viewNotification
} from "../../actions/notifications";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading";
import { IconWithBadge } from "../../components/IconWithBadge";
import { NotificationItem } from "../../components/NotificationItem";

import { Header } from "../../layout/Header";

import { Components } from "../../helpers";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    let badgeCount = 0;
    const { params } = navigation.state;
    if (params) badgeCount = params.badgeCount;

    return {
      header: null,
      tabBarIcon: ({ focused, tintColor }) => (
        <IconWithBadge
          icon={<Icon name="notification" size={24} color={tintColor} />}
          badgeCount={badgeCount}
        />
      )
    };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps.order && nextProps.order != this.props.order) {
        this._showOrder(nextProps.order);
      }
    } catch (error) {
      console.log(error);
    }
  };

  componentWillMount() {
    this.props.dispatch(getCurrentClient());
    setTimeout(() => {
      if (this.props.client) {
        let params = { client: this.props.client, filters: {} };
        this.props.dispatch(getNotifications(params));
      }
    }, 1000);
  }

  componentDidMount() { }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage };
      this.props.dispatch(getNotificationsNextPage(params));
    }
  };

  _showOrder(order) {
    this.props.navigation.navigate({ key: "order1", routeName: "Order", params: { order } });
  }

  viewAllNotifications() {
    let nao_visualizadas = this.props.notifications.filter((x) => x.visualizada !== true)
    nao_visualizadas.forEach((n) => { this._viewNotification(n); });
    
    this.props.navigation.setParams({ badgeCount: 0 });
  }

  _openNotification(notificacao) {
    let params = {};
    params.client = this.props.client;
    params.notificacao = notificacao;
    this.props.dispatch(viewNotification(params));

    if (notificacao.pedido) {
      params.order = { id: notificacao.pedido };
      params.history = true;
      this.props.dispatch(getOrder(params));
    }
  }

  _viewNotification(notificacao) {
    let params = {};
    params.client = this.props.client;
    params.notificacao = notificacao;
    this.props.dispatch(viewNotification(params));
  }

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this._openNotification(item);
        }}
      >
        <NotificationItem notificacao={item} />
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View style={{ alignItems: "center", paddingVertical: 16 }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents onWillFocus={payload => this.viewAllNotifications()} />
        <Header
          style={{
            paddingHorizontal: 24,
            backgroundColor: "transparent",
            paddingTop: 0
          }}
          title={"Notificações"}
        />

        {Components.renderIfElse(
          this.props.notifications &&
          this.props.notifications.length === 0 &&
          this.props.loading === true,
          <Loading />,
          <ScrollView
            style={{ paddingHorizontal: 24 }}
            onScroll={e => {
              let paddingToBottom = 0;
              paddingToBottom += e.nativeEvent.layoutMeasurement.height;
              if (
                e.nativeEvent.contentOffset.y.toFixed(1) ===
                (e.nativeEvent.contentSize.height - paddingToBottom).toFixed(1)
              ) {
                this.onEndReached(0);
              }
            }}
          >
            <FlatList
              data={this.props.notifications}
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

    notifications: state.notifications.notifications,
    loading: state.notifications.loading,
    nextPage: state.notifications.next,
    error: state.notifications.error,

    order: state.orders.order_history,
    o_success: state.orders.success,
    o_error: state.orders.error
  };
}

export default connect(mapStateToProps)(NotificationsScreen);
