import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";

import Snackbar from "react-native-snackbar";

import { Header } from "../../layout/Header";
import { BottomBarV2 } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { Icon } from '../../components/Icon';
import { Loading } from '../../components/Loading';
import { MenuItem } from '../../components/MenuItem';
import { ButtonDefault } from "../../components/ButtonDefault"

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

import { connect } from "react-redux";
import { addItemToCartV2, removeItemToCartV2 } from "../../actions/carts";
import { getDosages, clearDosages, clearProduct, clearError } from "../../actions/products";

import { orderBy, groupBy, keys } from 'lodash';

const imgDefault = require("../../assets/images/ic_default_medicine.png");

class SelectApresentationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      dosage: "",
      packing: "",
      quantity: 1,
      apresentation: null,
      accept_generic: false,

      show_dosage: false,
      show_error_dosage: false,
      show_packing: false,

      packings: []
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    if (params) {
      if (params.product) this.setState({ product: params.product });
      if (params.item){
        let item = params.item;
        let product = item.product;
        let dosage = item.dosage;
        let packing = item.packing;
        let generic = item.generic;
        let quantity = item.quantity;
        this.setState({ product, dosage, packing, generic, quantity  });
      }
    }
  }

  componentDidMount() {
    this.props.dispatch(clearError());
    this.props.dispatch(getDosages({ product: this.state.product }));
  }

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps && nextProps.error) {
        let error = nextProps.error;

        if (error.response && (error.response.status >= 400 && error.response.status <= 403)) {
          if (error.response.data.detail) {
            Snackbar.show({ title: error.response.data.detail, duration: Snackbar.LENGTH_SHORT, });
            return;
          }
          Snackbar.show({ title: nextProps.error.message, duration: Snackbar.LENGTH_SHORT });
        }

        if (error.response && (error.response.status >= 500 && error.response.status <= 504)) {
          Snackbar.show({ title: "Erro ao conectar com o servidor!", duration: Snackbar.LENGTH_SHORT });
        }

        if (error.message && error.message === "Network Error") {
          Snackbar.show({ title: "Sem conexão com a internet", duration: Snackbar.LENGTH_SHORT });
        }
      }

    } catch (error) {
      Snackbar.show({ title: e.message, duration: Snackbar.LENGTH_SHORT });
    }
  };

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _addItemToCart() {
    this.props.dispatch(clearError());
    let params = {}
    let packing = this.state.packing;
    let apresentations = this.state.packings[packing];
    let accept_generic = this.state.accept_generic;

    params = {
      dosage: this.state.dosage,
      packing: packing,
      generic: this.state.accept_generic,
      product: this.state.product,
      quantity: this.state.quantity,
      apresentations,
    }

    if(accept_generic === false) {
      params.apresentations = [this.state.apresentation];
    }

    this.props.dispatch(addItemToCartV2(params));
    this.onBack();
  }

  _onPressPlus(){
    let quantity = this.state.quantity;
    quantity += 1;
    this.setState({ quantity })
  }

  _onPressMinus(){
    let quantity = this.state.quantity;
    quantity -= 1;
    if(quantity <= 0) {
      quantity = 1
    }
    this.setState({ quantity })
  }

  onPressSelectDosage = () => {
    this.setState({ show_dosage: true, show_error_dosage: false,  packings: [], packing: ''})
  }

  selectDosage(dosage){
    try {
      let options = this.props.dosages[dosage]
      let packings = groupBy(options[0].apresentacoes, 'embalagem');
      this.setState({dosage, packings, apresentation: null, show_dosage: false });
    } catch (error) {
      console.log(error);
    }
  }

  _renderDosageItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: '100%', paddingVertical: 14}} onPress={() => { this.selectDosage(item) } }>
        <View>
          <Text style={[styles.label, {fontSize: 14, textAlign: 'center'}]}>{item}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  renderDosageDialog = () => {
    let options = keys(this.props.dosages)
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ show_dosage: false }); }}
        content={
          <View style={[styles.dialog]}>
            <Text style={[styles.titleDialog]}>{"Dosagem"}</Text>
            <FlatList
              refreshing={false}
              keyboardShouldPersistTaps={'always'}
              data={options}
              style={{ paddingTop: 16, paddingHorizontal: 16, paddingBottom: 24 }}
              renderItem={ this._renderDosageItem }
              keyExtractor={(item, index) => item.toString()}
            />
          </View>
        }
      />
    );
  };

  onPressSelectPacking = () => {
    this.setState({ show_packing: true, show_dosage: false, show_error_dosage: false})
  }

  selectPacking(packing){
    let has_generic = this.props.generic;
    let packings = this.state.packings[packing];
    let accept_generic = this.state.accept_generic;

    if(packings){
      let apresentation = packings[0];
      this.setState({packing, apresentation, show_packing: false });
    }
  }

  _renderPackingItem = ({ item }) => {
    return (
        <TouchableOpacity style={{ width: '100%', paddingVertical: 14}} onPress={() => { this.selectPacking(item) } }>
          <View>
            <Text style={[styles.label, {fontSize: 14, textAlign: 'center'}]}>{item}</Text>
          </View>
        </TouchableOpacity>
    )
  }
  
  renderPackingDialog = () => {
    let packings = keys(this.state.packings);
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ show_packing: false }); }}
        content={
          <View style={[styles.dialog]}>
            <Text style={[styles.titleDialog]}>{"Embalagem"}</Text>
            <FlatList
              refreshing={false}
              keyboardShouldPersistTaps={'always'}
              data={packings}
              style={{ paddingTop: 16, paddingHorizontal: 16, paddingBottom: 24 }}
              renderItem={this._renderPackingItem}
              keyExtractor={(item, index) => item.toString()}
            />
          </View>
        }
      />
    );
  };

  selectApresentation(apresentation){
    this.setState({ apresentation });
  }

  getPhoto(apresentation) {
    if (apresentation.imagem && apresentation.imagem !== null && apresentation.imagem !== {}) {
      return { uri: apresentation.imagem }
    }
    return imgDefault;
  }

  _renderGenericItem = ({item}) => {
    let apresentation_id = this.state.apresentation.id;
    return(
      <TouchableOpacity style={[styles.ctnGeneric, item.id === apresentation_id ? styles.ctnGenericSelected : {} ]} onPress={()=>{ this.selectApresentation(item) }}>
        <Image style={[styles.imgGeneric]} resizeMode="contain" source={this.getPhoto(item)} />
        <Text style={[ styles.btnTextDefault, {fontSize: 10, textAlign: 'center'}]}>{item.fabricante}</Text>
      </TouchableOpacity>
    )
  }

  renderView(){
    let dosage = this.state.dosage;
    let packing = this.state.packing;
    let has_generic = this.props.generic;
    let accept_generic = this.state.accept_generic;
    
    let packings = this.state.packings[packing];
    let apresentations = [];

    if(packings)
      apresentations = packings;

    if (has_generic === false)
      accept_generic = false;

    if(dosage){
      if(packing){
        return(
          <View>
            <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
              <Text style={styles.label}>{"Embalagem"}</Text>
              <TouchableOpacity style={styles.checkbox} onPress={() => {this.onPressSelectPacking()}} >
                  <Text style={styles.checkboxText}>{packing}</Text>
                <Icon name="chevron-down" color={"#000"} size={20}/>
              </TouchableOpacity>
            </View>

            {Components.renderIf(has_generic === true,
              <View>
                {/*
                <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
                  <Text style={[ styles.label ]}>{"Aceita genéricos ou similares?"}</Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <ButtonDefault
                      text="Sim"
                      style={[ (accept_generic === true)? styles.btnSelected : styles.btnDefault ]}
                      textStyle={[(accept_generic === true)? styles.btnTextSelected: styles.btnTextDefault ]}
                      onPress={() => {this.setState({ accept_generic: true })}}
                    />
                    <ButtonDefault
                      text="Não"
                      style={[ (accept_generic === false)? styles.btnSelected : styles.btnDefault ]}
                      textStyle={[(accept_generic === false)? styles.btnTextSelected: styles.btnTextDefault ]}
                      onPress={() => {this.setState({ accept_generic: false })}}
                    />
                  </View>
                </View>
                */}

                {Components.renderIf(accept_generic === false,
                  <View style={{ width: "100%", marginBottom: 24 }}>
                    <Text style={[ styles.label,{ marginLeft: 24} ]}>{"Selecione a fabricante"}</Text>
                    <FlatList
                      style={{marginLeft: 24}}
                      horizontal={true}
                      data={apresentations}
                      keyExtractor={ (item, index) => index.toString() }
                      renderItem={this._renderGenericItem}
                      />
                  </View>
                )}
              </View>
            )}

          </View>
        )
      }else{
        return(
          <View>
            <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
              <Text style={styles.label}>{"Embalagem"}</Text>
              <TouchableOpacity style={styles.checkbox} onPress={() => {this.onPressSelectPacking()}} >
                  <Text style={styles.placeholder}>{"Escolha uma opção"}</Text>
                <Icon name="chevron-down" color={"#000"} size={20}/>
              </TouchableOpacity>
            </View>

            {/*
            <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
              <Text style={[styles.label, styles.labelDisabled]}>{"Aceita genéricos ou similares?"}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <ButtonDefault
                  text="Sim"
                  style={{ width: '48%', backgroundColor: "rgba(0,0,0,0.04)", borderColor: 'transparent' }}
                  textStyle={{ color: 'rgba(0,0,0,0.40)' }}
                />
                <ButtonDefault
                  text="Não"
                  style={{ width: '48%', backgroundColor: "rgba(0,0,0,0.04)", borderColor: 'transparent' }}
                  textStyle={{ color: 'rgba(0,0,0,0.40)' }}
                />
              </View>
            </View>
            */}
          </View>
        )
      }
    }else{
    return(
      <TouchableOpacity onPress={() => { this.setState({ show_error_dosage: true })}} >
        <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
          <Text style={[styles.label, styles.labelDisabled]}>{"Embalagem"}</Text>
          <View style={[styles.checkbox, styles.checkboxDisabled]}>
            <Text/>
            <Icon name="chevron-down" color={"#000"} size={20}/>
          </View>
        </View>
        {/*
        <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24 }}>
          <Text style={[styles.label, styles.labelDisabled]}>{"Aceita genericos ou similares?"}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <ButtonDefault
              text="Sim"
              style={{ width: '48%', backgroundColor: "rgba(0,0,0,0.04)", borderColor: 'transparent' }}
              textStyle={{ color: 'rgba(0,0,0,0.40)' }}
            />
            <ButtonDefault
              text="Não"
              style={{ width: '48%', backgroundColor: "rgba(0,0,0,0.04)", borderColor: 'transparent' }}
              textStyle={{ color: 'rgba(0,0,0,0.40)' }}
            />
          </View>
        </View>
        */}
      </TouchableOpacity>
    )
  }
  }

  render() {
    let product = this.state.product.nome || "";

    let dosage = this.state.dosage;
    let packing = this.state.packing;
    let quantity = this.state.quantity;

    let show_dosage = this.state.show_dosage;
    let show_error_dosage = this.state.show_error_dosage;
    let show_packing = this.state.show_packing;
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={product}
          style={{ backgroundColor: "#FFF", paddingTop: 16 }}
          menuLeft={
            <MenuItem
              icon="md-arrow-back"
              onPress={() => {
                this.onBack();
              }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />
          }
        />

        {Components.renderIfElse(
          this.props.loading === true,
          <Loading />,
          <ScrollView  style={{}} keyboardShouldPersistTaps={'always'}>
            <View style={{ width: "100%", marginBottom: 24, paddingHorizontal: 24, marginTop: 16 }}>
              <Text style={styles.label}>{"Dosagem"}</Text>
              <TouchableOpacity style={styles.checkbox} onPress={() => {this.onPressSelectDosage()}} >
                {Components.renderIfElse(dosage,
                  <Text style={styles.checkboxText}>{dosage}</Text>,
                  <Text style={styles.placeholder}>{"Escolha uma opção"}</Text>
                )}
                <Icon name="chevron-down" color={"#000"} size={20}/>
              </TouchableOpacity>
              {Components.renderIf(show_error_dosage,
                <Text style={[styles.label, styles.labelError]} uppercase={false}>{"Selecione a dosagem"}</Text>
              )}
            </View>

            {this.renderView()}

            {Components.renderIf(show_dosage, this.renderDosageDialog() )}
            {Components.renderIf(show_packing, this.renderPackingDialog() )}

            <View style={[{ marginBottom: 120 }]}/>
          </ScrollView>
        )}

        {Components.renderIf(dosage && packing,
          <BottomBarV2
            buttonTitle="Adicionar"
            quantity={quantity}
            onPressPlus={() => { this._onPressPlus() }}
            onPressMinus={() => { this._onPressMinus() }}
            onButtonPress={() => { this._addItemToCart() }}
          />
        )}
      </View>
    );
  }
}


function mapStateToProps(state) {
  return {
    cartItems: state.carts.cartItems,
    uf: state.locations.uf,
    latitude: state.locations.latitude,
    longitude: state.locations.longitude,
    selected: state.products.selected,
    client: state.clients.client,

    dosages: state.products.dosages,
    generic: state.products.generic,
    loading: state.products.loading,
    error: state.products.error
  };
}

export default connect(mapStateToProps)(SelectApresentationsScreen);

