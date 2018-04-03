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
    //Atualiza badge
    let { state: { params } } = this.props.navigation;
    let cartSize = params ? params.cartSize : 0;
    if (parseInt(cartSize) !== nextProps.cartItems.length) {
      this.props.navigation.setParams({
        cartSize: nextProps.cartItems.length
      });
    }
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onBack: () => {
        this.props.navigation.goBack(null);
      },
      onPressCart: () => {
        this.props.navigation.navigate("Cart", { title: "Cestinha" });
      }
    });
    this.setState({
      apresentation: this.props.navigation.state.params.apresentation
    });
  }

  componentDidMount() {
    StatusBar.setHidden(true);

    this.props.dispatch(clearError());
    this.props.dispatch(clearGenerics());
    this.props.dispatch(getGenerics(this.props.uf, this.state.apresentation.id));
    this._rankingView();
  }

  /** Private functions */
  _rankingView() {
    setTimeout(() => {
      this.props.dispatch(rankingView(this.state.apresentation.id));
    }, 3000);
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
    this.setState({ showBottomBar: true });
  }

  _removeItemToCart(apresentation) {
    this.props.dispatch(removeItemToCart(apresentation));
    this.setState({ showBottomBar: true });
  }

  render() {
    const { state: { params } } = this.props.navigation;
    const apresentation = params ? params.apresentation : null;
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={apresentation.produto.nome}
            image={
              apresentation && apresentation.imagem
                ? { uri: apresentation.imagem }
                : require("../../assets/images/ic_default_medicine.png")
            }
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => { this.props.navigation.goBack(null) }}
              />
            }
            menuRight={
              <ShoppingBagIcon
                value={params && params.cartSize ? params.cartSize : 0}
                onPress={params ? params.onPressCart : null}
              />
            }
          />

          {Components.renderIf(apresentation,
            <View style={{ paddingHorizontal: 24, marginTop: 8 }}>
              <ApresentationDetailDescription
                apresentation={apresentation}
                showActions={true}
                onPressMinus={() => this._removeItemToCart(apresentation)}
                onPressPlus={() => this._addItemToCart(apresentation)}
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
            <Text style={styles.tableValue}>{apresentation.produto.principio_ativo.nome}</Text>
          </View>

          <View style={[styles.table, { backgroundColor: "#FAFAFA" }]}>
            <Text style={styles.tableLabel} uppercase>
              {"TIPO"}
            </Text>
            <Text style={styles.tableValue}>{TipoMedicamento[apresentation.produto.tipo][1]}</Text>
          </View>

          <View style={[styles.table]}>
            <Text style={styles.tableLabel} uppercase>
              {"Forma Farmacêutica"}
            </Text>
            <Text style={styles.tableValue}>{apresentation.classe_terapeutica}</Text>
          </View>

          <View style={[styles.table, { backgroundColor: "#FAFAFA" }]}>
            <Text style={styles.tableLabel} uppercase>
              {"Quantidade"}
            </Text>
            <Text style={styles.tableValue}>{apresentation.quantidade}</Text>
          </View>

          <View style={[styles.table]}>
            <Text style={styles.tableLabel} uppercase>
              {"Fabricante"}
            </Text>
            <Text style={styles.tableValue}>{apresentation.produto.fabricante}</Text>
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
