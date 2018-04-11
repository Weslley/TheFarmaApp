import React, { Component } from "react";
import { StatusBar, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Icon, Text, List, ListItem } from "native-base";

import { connect } from "react-redux";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";
import { ShoppingBagIcon } from "../../layout/ShoppingBagIcon";

import { MenuItem } from '../../components/MenuItem';
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProductDescription } from "../../components/Product";
import { ApresentationDetailDescription } from "../../components/Product";

import { rankingView } from "../../actions/apresentations";
import { getGenerics, clearError, clearGenerics } from "../../actions/generics";
import { addItemToCart, removeItemToCart } from "../../actions/carts";

import { Components, CartUtils } from "../../helpers";
import { TipoMedicamento } from "../../models/enums"

import styles from "./styles";

class ApresentationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apresentation: null
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
    this.props.navigation.navigate("Cart", { title: "Cestinha" });
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

  _addItemToCart(apresentation) {
    this.props.dispatch(addItemToCart(apresentation));
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart(apresentation));
  }

  render() {
    console.log(this.state.apresentation);
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={this.state.apresentation.produto.nome}
            image={
              this.state.apresentation && this.state.apresentation.imagem
                ? { uri: this.state.apresentation.imagem }
                : require("../../assets/images/ic_default_medicine.png")
            }
            menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
            menuRight={
              this.props.cartItems.length > 0 ? <ShoppingBagIcon value={this.props.cartItems.length} onPress={() => { this.showCart() }} /> : null
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

          {Components.renderIf(
            this.props.generics.length > 0,
            <View style={{ marginBottom: 16 }}>
              <View style={styles.containerLabel}>
                <Text style={styles.label}>{"Genéricos e Similhares"}</Text>
              </View>

              <List
                horizontal={true}
                style={styles.list}
                dataArray={this.props.generics}
                renderRow={generic => (
                  <ListItem style={styles.listItem}>
                    <ProductDescription apresentation={generic}
                      onPress={() => {
                        this.props.navigation.navigate("ApresentationDetail", { apresentation: generic });
                      }} />
                  </ListItem>
                )}
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

          <View style={[styles.table, { backgroundColor: "#FAFAFA" }]}>
            <Text style={styles.tableLabel} uppercase>
              {"Quantidade"}
            </Text>
            <Text style={styles.tableValue}>{this.state.apresentation.quantidade_rec}</Text>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    uf: state.locations.uf,
    cartItems: state.carts.cartItems,
    generics: state.generics.generics
  };
}

export default connect(mapStateToProps)(ApresentationDetailScreen);
