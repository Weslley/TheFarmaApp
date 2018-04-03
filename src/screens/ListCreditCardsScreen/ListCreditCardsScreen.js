import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { getCreditCards, clearCreditCards, clearError } from "../../actions/creditCards"

import { Header } from "../../layout/Header";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { CreditCardAdapter } from "../../components/CreditCard";

import styles from "./styles";


class ListCreditCardsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    let { state: { params } } = navigation;
    return {
      header: () => (
        <Header
          title={"Meus Cartões"}
          subtitle={"Seus cartões de creditos são salvos aqui"}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { navigation.goBack(null) }}
            />
          }
          menuRight={
            <MenuItem
              icon="add-circle"
              onPress={() => { navigation.navigate("NewCreditCard") }}
            />
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
    this.props.dispatch(getCreditCards({client: this.props.client}));
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  /** Private functions */
  _removeCreditCard(creditCard){
    let params = {client: this.props.client, creditCard}
    this.props.dispatch(removeCreditCard(params));
  }

  _showUpdateCreditCard(creditCard){
    this.props.navigation.navigate("NewCreditCard", { creditCard });
  }

  _renderItem = ({ item }) => (
    <TouchableHighlight onPress={() => { }} style={styles.rowFront} underlayColor={'#F6F6F6'}>
      <CreditCardAdapter creditCard={item} checked={true} />
    </TouchableHighlight>
  );

  _renderActions = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity 
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => {this._removeCreditCard(data)}} >
        <Icon name="trash" size={24} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={{ backgroundColor: "#FFFFFF" }}>
        <SwipeListView
          useFlatList
          data={this.props.creditCards}
          keyExtractor={item => item.id.toString()}
          renderItem={this._renderItem}
          renderHiddenItem={this._renderActions}
          rightOpenValue={-75}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    creditCards: state.creditCards.creditCards,
    creditCard: state.creditCards.creditCard,
    error: state.creditCards.error
  };
}

export default connect(mapStateToProps)(ListCreditCardsScreen);
