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
      products: []
    };
  }

  componentDidMount() {
    axios
      .get(
        `${CONFIG.IP_SERVER}/apresentacoes/${this.props.uf}?nome=${
          this.props.productName
        }`
      )
      .then(res => this.setState({ products: res.data.results }))
      .catch(err => console.error('ERROR ---', err));
  }

  render() {
    return (
    <Container style={{ backgroundColor: colors.white }}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 0, marginLeft: 8 }}>
              <Icon name='arrow-back' style={{ color: colors.black }} />
            </Button>
          </Left>
          <Right />
        </Header>

        <View style={styles.container}>
          <Text style={styles.title}>{this.props.productName}</Text>
          <View style={{ backgroundColor: colors.black, height: 1, marginBottom: dimens.marginNormal }} />
        </View>

        <List 
        style={{ marginRight: 24 }}
        dataArray={this.state.products} renderRow={item => (<ListItem style={{ paddingVertical: 20 }} >
              {item.imagem ? <Thumbnail square size={80} source={{ uri: item.imagem }} /> : <Image style={{ width: 80, height: 80 }} source={imgDefault} />}
              <Body>
                <Text style={styles.ApresentationName} >{item.nome}</Text>
                <Text style={styles.Maker} uppercase>{item.produto.fabricante}</Text>
                <Body style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ flex: 1, fontFamily: 'Roboto-Medium', fontSize: 18, color: colors.purple }}>{item.preco}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Button transparent>
                      <Icon name='remove' />
                    </Button>
                    <Text>0</Text>
                    <Button transparent>
                      <Icon name='add' />
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
    productName: state.produto.productName
  };
}

export default connect(mapStateToProps)(MedicineScreen);
