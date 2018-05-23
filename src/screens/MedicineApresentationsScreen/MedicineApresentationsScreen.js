import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Button, Text } from "native-base";
import { TextMask } from "react-native-masked-text";

import { connect } from "react-redux";

import { createOrder } from "../../actions/orders";
import { getApresentations, getApresentationsNextPage, clearError } from "../../actions/apresentations";
import { addItemToCart, removeItemToCart } from "../../actions/carts";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ApresentationDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

class MedicineApresentationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apresentations: [],
      showDeliveryDialog: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null }
  };

  componentWillReceiveProps = nextProps => {
    this.setState({ apresentations: this.props.apresentations });
    const apresentations = nextProps.apresentations.map(apresentation => ({
      ...apresentation,
      quantidade: this.getApresentationQuantity(nextProps, apresentation)
    }));
    this.setState({ apresentations });
  };

  componentWillMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getApresentations(this.props.uf, this.props.selected.nome));
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  showCart() {
    this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart', params: {} });
  }

  getCartSize() {
    return (this.props.cartItems && this.props.cartItems.length) ? this.props.cartItems.length : 0;
  }

  getApresentationQuantity(nextProps, apresentation) {
    try {
      const cItem = nextProps.cartItems.find(
        item => item.id === apresentation.id
      );
      return cItem ? cItem.quantidade : 0;
    } catch (error) {
      return 0;
    }
  }

  _addItemToCart(apresentation) {
    this.props.dispatch(addItemToCart(apresentation));
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart(apresentation));
  }

  _showDeliveryDialog() { this.setState({ showDeliveryDialog: true }); }

  _renderDeliveryDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ showDeliveryDialog: false }); }}
        content={
          <View style={styles.containerDelivery}>
            <Text style={styles.titleDialog}>Como deseja obter os seus medicamentos?</Text>
            <View style={styles.row}>
              <ButtonCustom
                image={require("../../assets/images/ic_walking.png")}
                title="Buscar"
                description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                onPress={() => { this._showListProposals(); }}
              />
              <ButtonCustom
                image={require("../../assets/images/ic_delivery.png")}
                title="Entregar"
                description="Seu medicamento é entregue em um local de sua escolha."
                onPress={() => { this._showListAddress(); }}
              />
            </View>
          </View>
        }
      />
    )
  }

  _showListProposals() {
    if (this.props.client) {
      let order = this.props.order;
      let itens = []
      this.props.cartItems.map((item) => { itens.push({ apresentacao: item.id, quantidade: item.quantidade }) })
      order.itens = itens
      order.latitude = this.props.latitude;
      order.longitude = this.props.longitude;
      let params = { client: this.props.client, order: order }
      this.props.dispatch(createOrder(params));
      this.props.navigation.navigate({ key: 'list_proposals1', routeName: 'ListProposals', params: {} });
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: {} });
    }
    this.setState({ showDeliveryDialog: false });
  }

  _showListAddress() {
    if (this.props.client) {
      this.props.navigation.navigate({ key: 'list_address1', routeName: 'ListAddress', params: { showBottomBar: true } });
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: {} });
    }
    this.setState({ showDeliveryDialog: false });
  }

  _showProductDetail(item) {
    this.props.navigation.navigate({ key: 'apresentation_detail1', routeName: 'ApresentationDetail', params: { apresentation: item } });
  }

  onEndReached = ({ distanceFromEnd }) => {
    if (this.props.nextPage) {
      let params = { client: this.props.client, url: this.props.nextPage }
      this.props.dispatch(getApresentationsNextPage(params));
    }
  }

  _renderItem = ({ item }) => (
    <ApresentationDescription
      apresentation={item}
      showActions={true}
      onPress={() => { this._showProductDetail(item) }}
      onPressMinus={() => this._removeItemToCart(item)}
      onPressPlus={() => this._addItemToCart(item)}
    />
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
          title={this.props.selected.nome}
          style={{ backgroundColor: "#FFF" }}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { this.onBack() }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }} />
          }
          menuRight={
            <ShoppingBagIcon
              value={this.getCartSize()}
              onPress={() => { this.showCart() }}
            />
          }
        />

        {Components.renderIfElse(this.props.apresentations && this.props.apresentations.length === 0 && this.props.isLoading === true,
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
              style={{ paddingBottom: 90 }}
              data={this.state.apresentations}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={this._renderItem}
              ListFooterComponent={this.renderFooter()}
            />
          </ScrollView>
        )}

        {Components.renderIf(this.props.cartItems.length > 0,
          <BottomBar
            buttonTitle="Ver propostas"
            price={CartUtils.getValueTotal(this.props.cartItems)}
            onButtonPress={() => { this._showDeliveryDialog(); }}
          />
        )}

        {Components.renderIf(this.state.showDeliveryDialog,
          this._renderDeliveryDialog()
        )}

      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    uf: state.locations.uf,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    selected: state.products.selected,
    client: state.clients.client,
    cartItems: state.carts.cartItems,
    order: state.orders.order,

    apresentations: state.apresentations.apresentations,
    isLoading: state.apresentations.isLoading,
    nextPage: state.apresentations.next,
    error: state.apresentations.error,
  };
}

export default connect(mapStateToProps)(MedicineApresentationScreen);