import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';

import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  List,
  ListItem,
  Thumbnail
} from 'native-base';

import { addItemToCart, removeItemToCart } from '../actions/carrinho';

import CONFIG from '../utils/config';
import colors from '../values/colors';
import dimens from '../values/dimens';

const icHome = require('../images/ic_home.png');
const imgDefault = require('../images/ic_default_medicine.png');

class MedicineScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image source={icHome} style={[styles.icon, { tintColor }]} />
    )
  };

  constructor(props) {
    super(props);
    this.state = {
      apresentations: []
    };
  }
  componentDidMount() {
    this.setState({ cartItems: this.props.cartItems });
    axios
      .get(`${CONFIG.IP_SERVER}/apresentacoes/${this.props.uf}?nome=${this.props.productName}`)
      .then(res => this.setState({ apresentations: res.data.results }))
      .catch(err => console.error('ERROR ---', err));
  }

  componentWillReceiveProps() {
    const apresentations = this.state.apresentations.map(apresentation => ({
        ...apresentation,
        quantity: this.getProductQuantity(apresentation)
      }));
    this.setState({ apresentations });
  }
  getProductQuantity(product) {
    const cItem = this.props.cartItems.find(item => item.id === product.id);
    return cItem ? cItem.quantidade : 0;
  }

  render() {
    return (<Container style={{ backgroundColor: colors.white }}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 0, marginLeft: 8 }}>
              <Icon name="arrow-back" style={{ color: colors.black }} />
            </Button>
          </Left>
          <Right />
        </Header>

        <View style={styles.container}>
          <Text style={styles.title}>{this.props.productName}</Text>
          <View style={{ backgroundColor: colors.black, height: 1, marginBottom: dimens.marginNormal }} />
        </View>

        <List style={{ marginRight: 24 }} dataArray={this.state.apresentations} renderRow={apresentation => (<ListItem style={{ paddingVertical: 20 }}>
              {apresentation.imagem ? <Thumbnail square size={80} source={{ uri: apresentation.imagem }} /> : <Image style={{ width: 80, height: 80 }} source={imgDefault} />}
              <Body>
                <Text style={styles.ApresentationName}>
                  {apresentation.nome}
                </Text>
                <Text style={styles.Maker} uppercase>
                  {apresentation.produto.fabricante}
                </Text>
                <Body style={{ paddingHorizontal: 15, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Text style={{ flex: 1, fontFamily: "Roboto-Medium", fontSize: 18, color: colors.purple }}>
                    {apresentation.preco}
                  </Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Button transparent onPress={() => this.props.dispatch(removeItemToCart(apresentation))}>
                      <Icon name="remove" />
                    </Button>
                    <Text>{apresentation.quantity || 0}</Text>
                    <Button transparent onPress={() => this.props.dispatch(addItemToCart(apresentation))}>
                      <Icon name="add" />
                    </Button>
                  </View>
                </Body>
              </Body>
            </ListItem>)} />
    </Container>);
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    elevation: 0,
    shadowOpacity: 0
  },
  container: {
    marginHorizontal: dimens.marginMedium
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontSize: 32,
    marginBottom: dimens.marginSmall
  },
  ApresentationName: {
    flexWrap: 'wrap',
    width: null,
    fontFamily: 'Roboto',
    fontSize: 14,
    marginBottom: dimens.marginSmall
  },
  Maker: {
    fontFamily: 'Roboto-Bold',
    fontSize: 10,
    marginBottom: dimens.marginNormal
  }
});

function mapStateToProps(state) {
  return {
    uf: state.localizacao.uf,
    productName: state.produto.productName,
    cartItems: state.carrinho.cartItems
  };
}

export default connect(mapStateToProps)(MedicineScreen);
