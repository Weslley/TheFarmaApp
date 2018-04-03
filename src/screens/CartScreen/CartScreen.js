import React, { Component } from "react";
import { View, ScrollView, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { Container, Button, Icon, Text, List, ListItem, Thumbnail } from "native-base";

import { TextMask } from "react-native-masked-text";
import { connect } from "react-redux";

import { Header } from "../../layout/Header";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductDescription } from "../../components/Product";

import { Components, CartUtils } from "../../helpers";

import { searchApresentations } from "../../actions/products";
import { addItemToCart, removeItemToCart, cleanCart } from "../../actions/carts";

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
    this.props.dispatch(cleanCart());
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

  _showDeliveryDialog() {
    this.setState({ showDeliveryDialog: true });
  }
  
  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <Header
          title={"Cestinha"}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />
          }
          menuRight={
            <MenuItem icon="trash-a" onPress={() => { this.onClearCart() }} />
          }
        />

        <ScrollView>
          <List
            style={{ marginRight: 24, paddingBottom: 90 }}
            dataArray={this.state.cartItems}
            renderRow={apresentation => (
              <ListItem style={styles.listItem}>
                <ProductDescription
                  apresentation={apresentation}
                  showActions={true}
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
            onButtonPress={() => {
              this._showDeliveryDialog();
            }}
          />
        )}

        {Components.renderIf(
          this.state.showDeliveryDialog,
          <ActionSheet
            callback={buttonIndex => {
              this.setState({ showDeliveryDialog: false });
            }}
            content={
              <View
                style={{
                  paddingHorizontal: 24,
                  paddingTop: 24,
                  paddingBottom: 32
                }}
              >
                <Text
                  style={{
                    fontFamily: "Roboto-Bold",
                    fontSize: 22,
                    color: "rgba(0,0,0,0.87)",
                    marginLeft: 8,
                    marginBottom: 24
                  }}
                >
                  Como deseja obter os seus medicamentos?
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around"
                  }}
                >
                  <ButtonCustom
                    image={require("../../assets/images/ic_walking.png")}
                    title="Buscar"
                    description="Opta em ir buscar seu medicamento em uma farmácia mais próxima."
                    onPress={() => {}}
                  />
                  <ButtonCustom
                    image={require("../../assets/images/ic_delivery.png")}
                    title="Entregar"
                    description="Seu medicamento é entregue em um local de sua escolha."
                    onPress={() => {}}
                  />
                </View>
              </View>
            }
          />
        )}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.carts.cartItems
  };
}

export default connect(mapStateToProps)(CartScreen);
