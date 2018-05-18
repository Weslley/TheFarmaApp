import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import { Text } from "native-base";
import Snackbar from 'react-native-snackbar';
import { SwipeListView } from 'react-native-swipe-list-view';

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
      showBottomBar: false
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
    this.props.navigation.navigate({ key: 'confirmation1', routeName: 'Confirmation', params: {} });
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
    this.props.dispatch(getCreditCards({ client: this.props.client }));
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
    <TouchableHighlight onPress={() => { this._selectCreditCard(item) }} style={styles.rowFront} underlayColor={'#F6F6F6'}>
      <CreditCardAdapter creditCard={item} checked={(this.props.creditCard && item.id === this.props.creditCard.id)} />
    </TouchableHighlight>
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

          <ScrollView>
            <SwipeListView
              useFlatList
              data={this.props.creditCards}
              keyExtractor={item => item.id.toString()}
              renderItem={this._renderItem}
              renderHiddenItem={this._renderActions}
              rightOpenValue={-75}
            />
          </ScrollView>
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
    client: state.clients.client,
    creditCards: state.creditCards.creditCards,
    creditCard: state.creditCards.creditCard,
    isLoading: state.creditCards.isLoading,
    error: state.creditCards.error
  };
}

export default connect(mapStateToProps)(ListCreditCardsScreen);
