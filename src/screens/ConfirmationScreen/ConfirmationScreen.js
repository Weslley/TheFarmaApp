import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Container, Icon, Text, List, ListItem } from "native-base";

import { connect } from "react-redux";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";

import { ProductDescription } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { Components, CartUtils } from "../../helpers";

import styles from "./styles";

class ConfirmationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    let { state: { params } } = navigation;
    return {
      header: () => (
        <Header
          title={"Confirmação"}
          subtitle={"Detalhes do seu pedido"}
          backAction={params ? params.onBack : null}
        />
      )
    };
  };

  componentWillMount() {
    this.props.navigation.setParams({
      onBack: () => {
        this.props.navigation.goBack(null);
      }
    });
  }

  /** Private functions */

  render() {
    return <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>{"Meu pedido"}</Text>

            <List dataArray={this.props.cartItems} renderRow={apresentation => <ListItem style={styles.ListItem}>
                  <ProductDescription apresentation={apresentation} />
                </ListItem>} />

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginBottom: 8, marginTop: 16 }}>
              <Text
                style={{
                  flex: 2,
                  textAlign: "right",
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  color: "rgba(0,0,0,0.32)"
                }}
              >
                {"Entrega"}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Roboto-Regular",
                  fontSize: 18,
                  color: "rgba(0,0,0,0.80)"
                }}
              >
                {"99,99"}
              </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Text
                style={{
                  flex: 2,
                  textAlign: "right",
                  fontFamily: "Roboto-Regular",
                  fontSize: 16,
                  color: "rgba(0,0,0,0.80)"
                }}
              >
                {"Total"}
              </Text>
              <Text
                style={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Roboto-Medium",
                  fontSize: 18,
                  color: "rgba(0,0,0,0.80)"
                }}
              >
                {"999,99"}
              </Text>
            </View>
          </View>

          <View style={styles.container}>
            <Text style={styles.title}>{"Pagamento"}</Text>
            <CreditCardAdapter />

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 24 }}>
              <Text
                style={{
                  fontFamily: "Roboto-Bold",
                  fontSize: 16,
                  color: "rgba(0,0,0,0.80)"
                }}
              >
                {"Parcelas"}
              </Text>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 18,
                  color: "rgba(0,0,0,0.87)"
                }}
              >
                {"R$ 999,99 à vista"}
              </Text>
            </View>
          </View>

          <View style={[styles.container, { marginBottom: 90 }]}>
            <Text style={styles.title}>{"Endereço para entrega"}</Text>
            <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
              <AddressAdapter />
            </View>
          </View>
        </ScrollView>

        <BottomBar buttonTitle="Confirmar" price={CartUtils.getValueTotal(this.props.cartItems)} onButtonPress={() => {}} />
      </Container>;
  }
}

function mapStateToProps(state) {
  return {
    cartItems: state.carts.cartItems
  };
}

export default connect(mapStateToProps)(ConfirmationScreen);
