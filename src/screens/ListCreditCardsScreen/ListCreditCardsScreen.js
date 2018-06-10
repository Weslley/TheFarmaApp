import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight, FlatList } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import { connect } from "react-redux";
import { logout } from "../../actions/clients";
import { selectCreditCard, getCreditCards, removeCreditCard, clearCreditCards, clearError } from "../../actions/creditCards"

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { Container } from '../../layout/Container';

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading";
import { MenuItem } from "../../components/MenuItem";
import { CreditCardAdapter } from "../../components/CreditCard";

import { Components } from "../../helpers";
import styles from "./styles";


class ListCreditCardsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showBottomBar: false,
      scroll: true
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {
      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.detail) {
            if (nextProps.error.response.data.detail === "Token inválido.") {
              this.props.dispatch(clearError());
              this.props.dispatch(logout());
            }
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getCreditCards({ client: this.props.client }));
  }

  componentDidMount() {
    let { state: { params } } = this.props.navigation;
    if (params && params.showBottomBar) this.setState({ showBottomBar: true })
  }

  componentWillUnmount() {
    this.props.dispatch(clearError());
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _showConfirmation() {
    if (this.props.creditCard) {
      this.props.navigation.navigate({ key: 'confirmation1', routeName: 'Confirmation', params: {} });
    } else {
      Snackbar.show({ title: "Selecione um cartão", duration: Snackbar.LENGTH_SHORT });
    }
  }

  _showCreditCard(creditCard) {
    this.props.navigation.navigate({ key: 'new_credit_card1', routeName: 'NewCreditCard', params: { creditCard } });
  }

  _selectCreditCard(creditCard) {
    this.props.dispatch(selectCreditCard(creditCard))
  }

  _removeCreditCard(creditCard) {
    let params = { client: this.props.client, creditCard }
    this.props.dispatch(removeCreditCard(params));

    setTimeout(() => { this.props.dispatch(getCreditCards({ client: this.props.client })); }, 1000);
  }

  _renderActions = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => { this._removeCreditCard(data.item) }} >
        <Icon name="trash" size={24} style={{ color: "#FFF" }} />
      </TouchableOpacity>
    </View>
  );

  _renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.rowFront}
      onPress={() => { this._selectCreditCard(item) }}>

      <CreditCardAdapter
        creditCard={item}
        checked={(this.props.creditCard && item.id === this.props.creditCard.id)} />

    </TouchableOpacity>
  );

  _renderItemV2 = ({ item }) => (
    <SwipeRow
      disableRightSwipe={true}
      rightOpenValue={-75}
      onRowOpen={() => this.setState({ scroll: false })}
      onRowDidClose={() => this.setState({ scroll: true })}
    >

      <View style={styles.rowBack}>
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => { this._removeCreditCard(item) }} >
          <Icon name="trash" size={24} style={{ color: "#FFF" }} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.rowFront}
        onPress={() => { this._selectCreditCard(item) }}>

        <CreditCardAdapter
          creditCard={item}
          checked={(this.props.creditCard && item.id === this.props.creditCard.id)} />

      </TouchableOpacity>

    </SwipeRow>
  );

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#FFFFFF" }}>
          <Header
            title={"Meus Cartões"}
            subtitle={"Seus cartões de creditos são salvos aqui"}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => { this.onBack() }}
                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
              />
            }
            menuRight={
              <MenuItem
                icon="add-circle"
                onPress={() => { this._showCreditCard({}) }}
                style={{ paddingRight: 24, paddingVertical: 12 }}
              />
            }
          />

          <FlatList
            scrollEnabled={ false }
            style={{ marginBottom: 64 }}
            data={this.props.creditCards}
            keyExtractor={item => item.id.toString()}
            renderItem={this._renderItemV2}
          />

        </View>

        {Components.renderIf(this.props.creditCards && this.props.creditCards.length === 0 && this.props.isLoading === true,
          <Loading />
        )}

        {Components.renderIf(this.state.showBottomBar,
          <BottomBar buttonTitle="Continuar" onButtonPress={() => { this._showConfirmation() }} />
        )}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    creditCards: state.creditCards.creditCards,
    creditCard: state.creditCards.creditCard,
    isLoading: state.creditCards.isLoading,
    error: state.creditCards.error,

    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(ListCreditCardsScreen);
