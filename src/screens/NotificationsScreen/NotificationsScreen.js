import React, { Component } from 'react'
import { View, ScrollView, FlatList, ActivityIndicator } from 'react-native'

import { connect } from "react-redux";
import { getCurrentClient } from "../../actions/clients"
import { getNotifications, getNotificationsNextPage } from "../../actions/notifications"

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { NotificationItem } from "../../components/NotificationItem";

import { Header } from "../../layout/Header";

import { Components } from "../../helpers";
import styles from "./styles";

class NotificationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    this.props.dispatch(getCurrentClient());
    setTimeout(() => {
      if (this.props.client) {
        let params = { client: this.props.client, filters: {} }
        this.props.dispatch(getNotifications(params));
      }
    }, 1000);
  }

  componentDidMount() {

  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage }
      this.props.dispatch(getNotificationsNextPage(params));
    }
  }

  _renderItem = ({ item }) => (<NotificationItem notificacao={item} />);

  renderFooter = () => {
    if (!this.props.loading) return null;
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16, }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, }}>

        <Header
          style={{ paddingHorizontal: 24, backgroundColor: "transparent", paddingTop: 0 }}
          title={"Notificações"}
        />

        {Components.renderIfElse(this.props.notifications && this.props.notifications.length === 0 && this.props.loading === true,
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
              data={this.props.notifications}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={this._renderItem}
              ListFooterComponent={this.renderFooter()}
            />

          </ScrollView>
        )}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,

    notifications: state.notifications.notifications,
    loading: state.notifications.loading,
    nextPage: state.notifications.next,
    error: state.notifications.error,
  };
}

export default connect(mapStateToProps)(NotificationsScreen);