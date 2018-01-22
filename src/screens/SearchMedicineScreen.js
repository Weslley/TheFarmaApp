import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Text,
  Button,
  Input,
  Icon,
  Item,
  Left,
  Right,
  Body,
  List,
  ListItem,
  Spinner
} from 'native-base';

import axios from 'axios';

import CONFIG from '../utils/config';

import { fillProducts, storeProduct } from '../actions/produto';
import colors from '../values/colors';
import dimens from '../values/dimens';

import renderIf from '../utils/renderIf';

const ichome = require('../images/ic_home.png');

class SearchMedicineScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarLabel: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image source={ichome} style={[styles.icon, { tintColor }]} />
    )
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
			searchType: 0,
    };
    timer = 0;
  }

  onSearchChange = query => {
      if (timer !== 0) {
        this.setState({ isLoading: false });
        clearTimeout(timer);
      }

      if (query.trim().length > 2) {
        timer = 0;
        this.setState({ isLoading: true });
        timer = setTimeout(() => {
          axios
            .get(`${CONFIG.IP_SERVER}/produtos/v2/${this.props.uf}?nome=${query}`)
            .then(res => {
              this.setState({ isLoading: false });
              this.props.dispatch(fillProducts(res.data.results));
            })
            .catch(err => console.error('ERROR ---', err));
        }, 500);
      } else {
        //TODO cache medicamentos
      }
  };

  onSelectProduct = productName => {
    this.props.dispatch(storeProduct(productName));
    this.props.navigation.navigate('MedicineScreen');
    //TODO add medicamento ao cache medicamentos
  };

  render() {
    return (
    <Container style={{ backgroundColor: colors.white }}>
        <Header style={styles.header}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()} style={{ paddingLeft: 0, marginLeft: 16 }}>
              <Icon name='arrow-back' style={{ color: colors.black }} />
            </Button>
          </Left>
          <Body><Title /></Body>
          <Right />
        </Header>
        <View style={styles.container}>
          <Item>
            <Input style={{ fontFamily: 'Roboto-Bold', fontSize: 24 }} placeholder='Nome do medicamento ' placeholderTextColor='#CCC' multiline={false} onChangeText={this.onSearchChange} />
            <Icon style={{ color: colors.black, fontSize: 30 }} name='ios-close' />
          </Item>
          {renderIf(this.state.isLoading, <Text uppercase style={{ fontFamily: 'Roboto-Bold', fontSize: 12, marginTop: 32, marginBottom: 8 }}> Resultado da busca </Text>)}
        </View>

        {renderIf(this.state.isLoading, <Spinner color='#CCC' />)}

        {this.props.produtos.length ? <List 
        dataArray={this.props.produtos} 
        renderRow={product => (
        <ListItem 
        onPress={() => { this.onSelectProduct(product.nome); }} >
          <Text>{product.nome}</Text>
        </ListItem>)} /> : null}
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
    marginLeft: dimens.marginMedium,
    marginRight: dimens.marginMedium
  },
  icon: {
    width: 26,
    height: 26
  }
});

function mapStateToProps(state) {
  return {
    uf: state.localizacao.uf,
    produto: state.produto.productName,
    produtos: state.produto.products
  };
}

export default connect(mapStateToProps)(SearchMedicineScreen);
