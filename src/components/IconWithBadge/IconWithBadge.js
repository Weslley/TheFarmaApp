import React, { Component } from "react";
import { View, Text } from "react-native";

import { connect } from "react-redux";
import { getNotifications } from "../../actions/notifications";


class IconWithBadge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      badgeCount: 0
    };
  }

  componentWillReceiveProps = nextProps => {
    try {
      let notifications = nextProps.notifications;
      if (notifications && notifications !== this.props.notifications) {

        let nao_visualizadas = notifications.filter((x) => x.visualizada !== true)
        this.setState({ badgeCount: nao_visualizadas.length });

      }
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    //this.props.dispatch(getCurrentClient());
    setTimeout(() => {
      if (this.props.client) {
        let params = { client: this.props.client, filters: {} };
        this.props.dispatch(getNotifications(params));
      }
    }, 1000);
  }

  render() {
    let badgeCount = this.state.badgeCount;
    return (
      <View style={{ width: 50, height: 50, alignItems: "center", justifyContent: "center" }}>
        {this.props.icon}
        {badgeCount >= 1 ? (
          <View style={{ position: "absolute", top: 3, right: 1, backgroundColor: "#FF1967", borderRadius: 100, paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={{ fontSize: 10, color: "#FFF" }}>{badgeCount}</Text>
          </View>

        ) : null}
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
  };
}

export default connect(mapStateToProps)(IconWithBadge);

