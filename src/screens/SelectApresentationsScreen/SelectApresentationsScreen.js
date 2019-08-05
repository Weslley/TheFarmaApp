import React, { Component } from "react";
import {
  Alert,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";

import Snackbar from "react-native-snackbar";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";

class SelectApresentationsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dosage: "",
      packing: "",
      apresentation: [],
      accept_generic: false,

      show_dosage: false,
      show_packing: false,
      show_apresentations: false
    };
  }

  renderDosagens = () => {};

  render() {
    let dosage = this.state.dosage;
    let packing = this.state.packing;
    let product = this.props.selected.nome || "Dorflex";

    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={product}
          style={{ backgroundColor: "#FFF" }}
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
          <ScrollView style={{ paddingHorizontal: 24 }}>

            <View style={{ width: "100%", marginVertical: 32 }}>
              <Text style={styles.label}>{"Dosagem"}</Text>
              <TouchableOpacity style={styles.checkbox} onPress={() => {}} >
                <Text style={styles.checkboxText}>{dosage}</Text>
                <Icon name="" color={"#000"} size={24}/>
              </TouchableOpacity>
            </View>

          </ScrollView>
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
    selected: state.products.selected,
    client: state.clients.client,
    cartItems: state.carts.cartItems,
    order: state.orders.order,

    apresentations: state.apresentations.apresentations,
    loading: state.apresentations.isLoading,
    nextPage: state.apresentations.next,
    error: state.apresentations.error
  };
}

export default SelectApresentationsScreen;
