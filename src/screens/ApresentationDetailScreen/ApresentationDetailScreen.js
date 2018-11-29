import React, { Component } from "react";
import { StatusBar, View, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import { Text } from "native-base";

import { connect } from "react-redux";
import { createOrder } from "../../actions/orders";
import { rankingView } from "../../actions/apresentations";
import { getGenerics, clearError, clearGenerics } from "../../actions/generics";
import { addItemToCart, removeItemToCart } from "../../actions/carts";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductDescription } from "../../components/Product";
import { ApresentationDetailDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";
import { TipoMedicamento } from "../../models/enums"

import styles from "./styles";

const imgDefault = require("../../assets/images/ic_default_medicine.png");

class ApresentationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apresentation: null,
      generics: [],
      showDeliveryDialog: false
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    if (this.state.apresentation) {
      let apresentation = this.state.apresentation;
      apresentation.quantidade = this.getApresentationQuantity(nextProps, apresentation);
      this.setState({ apresentation })
    }
    this.setState({ generics: nextProps.generics })
  };

  componentWillMount() {
    let apresentation = this.props.navigation.state.params.apresentation
    apresentation.quantidade_rec = apresentation.quantidade
    this.setState({ apresentation });
  }

  componentDidMount() {
    StatusBar.setHidden(true);

    this.props.dispatch(clearError());
    this.props.dispatch(clearGenerics());
    this.props.dispatch(getGenerics(this.props.uf, this.state.apresentation.id));
    this._rankingView();
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null)
  }

  showCart() {
    this.props.navigation.navigate({ key: 'cart1', routeName: 'Cart', params: {} });
  }

  _rankingView() {
    setTimeout(() => {
      this.props.dispatch(rankingView(this.state.apresentation.id));
    }, 3000);
  }

  getApresentationQuantity(nextProps, apresentation) {
    try {
      const cItem = nextProps.cartItems.find(item => item.id === apresentation.id);
      return cItem ? cItem.quantidade : 0;
    } catch (error) {
      return 0;
    }
  }

  getPhoto() {
    let apresentation = this.state.apresentation;
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
      let imagem = apresentation.imagem
      if (imagem.square_crop) {
        return { uri: imagem.square_crop }
      }
    }
    return imgDefault;
  }

  _addItemToCart(apresentation) {
    this.props.dispatch(addItemToCart(apresentation));
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart(apresentation));
  }

  _showGenerics(generic) {
    this.props.navigation.navigate({ routeName: 'ApresentationDetail', params: { apresentation: generic } });
  }

  _showDeliveryDialog() { this.setState({ showDeliveryDialog: true }); }

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
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: { actionBack: 'ApresentationDetail' } });
    }
    this.setState({ showDeliveryDialog: false });
  }

  _showListAddress() {
    if (this.props.client) {
      this.props.navigation.navigate({ key: 'list_address1', routeName: 'ListAddress', params: { showBottomBar: true } });
    } else {
      this.props.navigation.navigate({ key: 'profile1', routeName: 'Profile', params: { actionBack: 'ApresentationDetail' } });
    }
    this.setState({ showDeliveryDialog: false });
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

  renderFooter = () => {
    if (!this.props.isLoading) return null;
    return (
      <View style={{ alignItems: 'center', paddingVertical: 16, }}>
        <ActivityIndicator color={"#00C7BD"} size={"large"} />
      </View>
    );
  };

  _renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <ProductDescription
        apresentation={item}
        onPress={() => { this._showGenerics(item) }}
      />
    </View>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={this.state.apresentation.produto.nome}
            image={this.getPhoto()}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => { this.onBack() }}
                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
              />
            }
            menuRight={
              <View style={{ paddingRight: 12 }}>
                <ShoppingBagIcon value={this.props.cartItems.length} onPress={() => { this.showCart() }} />
              </View>
            }
          />

          {Components.renderIf(this.state.apresentation,
            <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
              <ApresentationDetailDescription
                apresentation={this.state.apresentation}
                showActions={true}
                onPressMinus={() => this._removeItemToCart(this.state.apresentation)}
                onPressPlus={() => this._addItemToCart(this.state.apresentation)}
              />
            </View>
          )}

          {Components.renderIf(this.props.generics.length > 0,
            <View style={{ marginBottom: 16 }}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>{"Genéricos e Similares"}</Text>
              </View>

              <FlatList
                style={styles.list}
                horizontal={true}
                data={this.props.generics}
                keyExtractor={(item, index) => item.id.toString()}
                renderItem={this._renderItem}
                ListFooterComponent={this.renderFooter()}
              />
            </View>
          )}

          <View style={[styles.containerLabel, { marginTop: 16 }]}>
            <Text style={styles.label}>{"Sobre este medicamento"}</Text>
          </View>

          <View style={styles.table}>
            <Text style={styles.tableLabel} uppercase>
              {"Princípio Ativo"}
            </Text>
            <Text style={styles.tableValue}>{this.state.apresentation.produto.principio_ativo.nome}</Text>
          </View>

          <View style={[styles.table, { backgroundColor: "#FAFAFA" }]}>
            <Text style={styles.tableLabel} uppercase>
              {"TIPO"}
            </Text>
            <Text style={styles.tableValue}>{TipoMedicamento[this.state.apresentation.produto.tipo][1]}</Text>
          </View>

          <View style={[styles.table]}>
            <Text style={styles.tableLabel} uppercase>
              {"Forma Farmacêutica"}
            </Text>
            <Text style={styles.tableValue}>{this.state.apresentation.classe_terapeutica}</Text>
          </View>

          <View style={[styles.table, { backgroundColor: "#FAFAFA", marginBottom: 90 }]}>
            <Text style={styles.tableLabel} uppercase>
              {"Quantidade"}
            </Text>
            <Text style={styles.tableValue}>{this.state.apresentation.quantidade_rec}</Text>
          </View>
        </ScrollView>

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

    client: state.clients.client,
    cartItems: state.carts.cartItems,
    order: state.orders.order,

    generics: state.generics.generics,
    isLoading: state.generics.isLoading,
    nextPage: state.generics.next,
    error: state.generics.error,
  };
}

export default connect(mapStateToProps)(ApresentationDetailScreen);
