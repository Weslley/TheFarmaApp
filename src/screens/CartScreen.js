import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "native-base";
import { IconBadge } from "react-native-icon-badge";
import { connect } from "react-redux";

import { TabIcon } from "../components/Icon";

import colors from "../values/colors";
import dimens from "../values/dimens";

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartSize: 0
    };
  }

  componentWillMount() {
    console.log('will mount cartScreen');
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation)
    let { state: {params} } = navigation;
    return {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <TabIcon name='cart' size={(params ? params.cartSize : 0)} />
    }
  };

  componentWillReceiveProps() {
    this.props.navigation.setParams({
      cartSize: this.props.cartItems.length
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Carrinho</Text>
      </View>
    );
  }
}

function mapStateToProp(state) {
  return {
    cartItems: state.carrinho.cartItems
  };
}

export default connect(mapStateToProp)(CartScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center",
    paddingLeft: dimens.marginMedium,
    paddingRight: dimens.marginMedium
  },
  icon: {
    width: 26,
    height: 26
  }
});
