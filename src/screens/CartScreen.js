import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text
} from 'react-native';
import { Icon } from 'native-base';
import { IconBadge } from "react-native-icon-badge";
import { connect } from 'react-redux';

import { TabIcon } from '../components/Icon';

import colors from '../values/colors';
import dimens from '../values/dimens';

//const ic_cart = require('../images/ic_shopping_cart.png');
class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartSize: 0
    };
  }

  static navigationOptions = ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => (
      <View>
        {console.log("Props ---", navigation)}
        <Text>{0}</Text>
      </View>
    )
  });

  componentWillMount() {
    //this.props.navigation.setParams({ badgeCount: 0 });
  }

  componentWillReceiveProps() {
    this.setState({ cartSize: this.props.cartItems.length });
    this.props.navigation.setParams({ badgeCount: this.state.cartSize });
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
		justifyContent: 'center',
		paddingLeft: dimens.marginMedium,
		paddingRight: dimens.marginMedium
	},
	icon: {
		width: 26,
		height: 26,
	},
});
