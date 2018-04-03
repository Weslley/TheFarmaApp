import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Button, Icon, Text, List, ListItem } from "native-base";

import { TextMask } from "react-native-masked-text";
import { connect } from "react-redux";
import { createOrder } from "../../actions/orders";

import { Container } from "../../layout/Container";
import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ApresentationDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";

import { getApresentations, clearError } from "../../actions/apresentations";
import { addItemToCart, removeItemToCart } from "../../actions/carts";

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
    let { state: { params } } = navigation;
    return {
      header: () => (
        <Header
          title={params ? params.title : ""}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { navigation.goBack(null) }} />
          }
          menuRight={
            <ShoppingBagIcon value={params && params.cartSize ? params.cartSize : 0} onPress={params ? params.onPressCart : null} />
          }
        />
      ),

    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onBack: () => {
        this.props.navigation.goBack(null);
      },
      onPressCart: () => {
        this.props.navigation.navigate("Cart", { title: "Cestinha" });
      },
      cartSize: 0
    });
  }

  componentDidMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getApresentations(this.props.uf, this.props.selected.nome));
  }

  componentWillReceiveProps = nextProps => {
    this.setState({ apresentations: this.props.apresentations });
    const apresentations = nextProps.apresentations.map(apresentation => ({
      ...apresentation,
      quantidade: this.getApresentationQuantity(nextProps, apresentation)
    }));
    this.setState({ apresentations });

    //Atualiza badge
    let { state: { params } } = this.props.navigation;
    let cartSize = params ? params.cartSize : 0;
    if (parseInt(cartSize) !== nextProps.cartItems.length) {
      this.props.navigation.setParams({
        cartSize: nextProps.cartItems.length
      });
    }
  };

  /** Private functions */
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

  showActionSheet = () => this.actionSheet.show()

  getActionSheetRef = ref => (this.actionSheet = ref)

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
                onPress={() => {this._showListProposals();}}
              />
              <ButtonCustom
                image={require("../../assets/images/ic_delivery.png")}
                title="Entregar"
                description="Seu medicamento é entregue em um local de sua escolha."
                onPress={() => {this._showListAddress();}}
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
      this.props.cartItems.map((item) => { itens.push({ apresentacao: item.id, quantidade: item.quantidade })})
      order.itens = itens
      order.latitude = this.props.latitude;
      order.longitude = this.props.longitude;
      let params = {client: this.props.client, order: order}
      this.props.dispatch(createOrder(params));
      this.props.navigation.navigate("ListProposals", { title: "Propostas" });
    } else {
      this.props.navigation.navigate("Profile");
    }
    this.setState({ showDeliveryDialog: false });
  }

  _showListAddress() {
    this.props.navigation.navigate("ListAddress", {create_order: true} );
    this.setState({ showDeliveryDialog: false });
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          {Components.renderIf(
            this.props.isLoading,
            <ActivityIndicator size="small" style={{ marginTop: 16 }} />
          )}

          <List
            style={styles.list}
            dataArray={this.state.apresentations}
            renderRow={apresentation => (
              <ListItem style={styles.listItem}>
                <ApresentationDescription
                  apresentation={apresentation}
                  showActions={true}
                  onPress={() => { this.props.navigation.navigate("ApresentationDetail", { apresentation }); }}
                  onPressMinus={() => this._removeItemToCart(apresentation)}
                  onPressPlus={() => this._addItemToCart(apresentation)}
                />
              </ListItem>
            )}
          />
        </ScrollView>

        {Components.renderIf(
          this.props.cartItems.length > 0,
          <BottomBar
            buttonTitle="Ver propostas"
            price={CartUtils.getValueTotal(this.props.cartItems)}
            onButtonPress={() => { this._showDeliveryDialog(); }}
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

export default connect(mapStateToProps)(MedicineApresentationScreen);