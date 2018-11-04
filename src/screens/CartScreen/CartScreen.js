import React, { Component } from "react";
import { Alert, View, ScrollView, ActivityIndicator, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Button, Text, Thumbnail } from "native-base";
import { TextMask } from "react-native-masked-text";

import { connect } from "react-redux";

import { createOrder } from "../../actions/orders";
import { getApresentations, clearError } from "../../actions/apresentations";
import { addItemToCart, removeItemToCart, cleanCart } from "../../actions/carts";

import { Header } from "../../layout/Header";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";

import styles from "./styles";

class CartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: [],
      showDeliveryDialog: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentDidMount() {
    if (this.props.cartItems.length > 0) {
      this.setState({ cartItems: this.props.cartItems, showBottomBar: true });
    }
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ cartItems: this.props.cartItems });
    const cartItems = nextProps.cartItems.map(apresentation => ({
      ...apresentation,
      quantidade: this.getApresentationQuantity(nextProps, apresentation)
    }));
    this.setState({ cartItems });
  };

  /** Private functions */
  onBack = () => {
    this.props.navigation.goBack(null);
  }

  onClearCart = () => {
    Alert.alert(
      '',
      'Você gostaria de limpar a cestinha?',
      [
        { text: 'NÃO', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'SIM', onPress: () => { this.props.dispatch(cleanCart()) } },
      ],
      { cancelable: false }
    )
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

  _showSearchMedicine() {
    this.props.navigation.navigate({ key: 'search_medicine1', routeName: 'SearchMedicine', params: {} });
  }

  _showDeliveryDialog() {
    this.setState({ showDeliveryDialog: true });
  }

  _renderDeliveryDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ showDeliveryDialog: false }); }}
        content={
          <View style={styles.containerDelivery}>
            <Text style={styles.titleDialog}>Como deseja obter os seus medicamentos?</Text>
            <View style={styles.row}>
              <ButtonCustom
                style={{ width: '48%' }}
                image={require("../../assets/images/ic_walking.png")}
                title="Buscar"
                description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                onPress={() => { this._showListProposals(); }}
              />
              <ButtonCustom
                style={{ width: '48%' }}
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
      order.delivery = false;
      let params = { client: this.props.client, order: order }
      this.props.dispatch(createOrder(params));
      this.props.navigation.navigate({ key: 'list_proposals1', routeName: 'ListProposals', params: {} });
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: { actionBack: 'Cart' } });
    }
    this.setState({ showDeliveryDialog: false });
  }

  _showListAddress() {
    if (this.props.client) {
      this.props.navigation.navigate({ key: 'list_address1', routeName: 'ListAddress', params: { showBottomBar: true } });
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: { actionBack: 'Cart' } });
    }
    this.setState({ showDeliveryDialog: false });
  }

  _renderItem = ({ item }) => (
    <ProductDescription
      apresentation={item}
      showActions={true}
      onPressMinus={() => this._removeItemToCart(item)}
      onPressPlus={() => this._addItemToCart(item)}
    />
  );

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <Header
          title={"Cestinha"}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => { this.onBack() }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
          menuRight={
            <MenuItem
              icon="trash"
              onPress={() => { this.onClearCart() }}
              style={{ paddingRight: 24, paddingVertical: 12 }}
            />
          }
        />

        {Components.renderIfElse(this.state.cartItems.length > 0,
          <ScrollView style={{ paddingHorizontal: 24 }}>
            <FlatList
              style={{ paddingBottom: 90 }}
              data={this.state.cartItems}
              keyExtractor={item => item.id.toString()}
              renderItem={this._renderItem} />
          </ScrollView>,
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 90 }}>
            <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 14, color: 'rgba(0,0,0,0.48)', textAlign: 'center' }}>{"Cestinha vazia"}</Text>
          </View>
        )}

        {Components.renderIfElse(
          this.props.cartItems.length > 0,
          <BottomBar
            buttonTitle="Ver propostas"
            price={CartUtils.getValueTotal(this.props.cartItems)}
            onButtonPress={() => { this._showDeliveryDialog() }}
          />,
          <BottomBar
            buttonTitle="Adicionar"
            price={0}
            onButtonPress={() => { this._showSearchMedicine() }}
          />
        )}

        {Components.renderIf(this.state.showDeliveryDialog,
          this._renderDeliveryDialog()
        )}

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    uf: state.locations.uf,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    selected: state.products.selected,
    isLoading: state.products.isLoading,
    apresentations: state.apresentations.apresentations,
    cartItems: state.carts.cartItems,
    error: state.apresentations.error,
    client: state.clients.client,
    order: state.orders.order,
    errorOrder: state.orders.error
  };
}

export default connect(mapStateToProps)(CartScreen);
