import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Text, List, ListItem, Button, Item, Input } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

import { connect } from "react-redux";

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { Icon } from "../../components/Icon";
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProposalApresentation } from "../../components/Product/";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

class ProposalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    let proposal = params ? params.proposal : null;
    if (proposal) this.setState({ proposal });
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _showPaymentDialog() {
    this.setState({ showPaymentDialog: true });
  }

  _showConfirmation() {
    this.props.navigation.navigate("Confirmation");
    this.setState({ showPaymentDialog: false });
  }

  _showListCreditCards() {
    this.props.navigation.navigate("ListCreditCards");
    this.setState({ showPaymentDialog: false });
  }

  onChangeTroco = value => {
    let valueMask = MaskService.toMask('money', value);
    this.setState({ troco: valueMask })
  }

  _renderPaymentDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => {
          this.setState({ showPaymentDialog: false });
        }}
        content={
          <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 }} >
            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 22, color: "rgba(0,0,0,0.87)", marginLeft: 8, marginBottom: 24 }} >Qual a forma de pagamento que você deseja?</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-around" }} >

              <ButtonCustom
                image={require("../../assets/images/ic_money.png")}
                title="Dinheiro"
                description="Indique o valor para que possamos separar o troco."
                onPress={() => { this._showConfirmation(); }}
              />

              <ButtonCustom
                image={require("../../assets/images/ic_credit_card.png")}
                title="Cartão de Crédito"
                description="Efetue o pagamento usando um dos seus cartões de crédito."
                onPress={() => { this._showListCreditCards(); }}
              />
            </View>
          </View>
        }
      />
    );
  }

  _renderTrocoDialog() {
    return (
      <ActionSheet
        callback={buttonIndex => { this.setState({ showPaymentDialog: false }); }}
        content={
          <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 32 }} >
            <Text style={{ fontFamily: "Roboto-Bold", fontSize: 22, color: "rgba(0,0,0,0.87)", marginLeft: 8, marginBottom: 24 }} >Quanto em espécie?</Text>
            <View>

              <Item>
                <Input
                  style={{ fontFamily: "Roboto-Regular", fontSize: 16, paddingLeft: 0, marginLeft: 0 }}
                  multiline={false}
                  onChangeText={this.onChangeTroco}
                  value={this.state.troco}
                  underlineColorAndroid="transparent" />

                <TouchableOpacity onPress={() => { this.setState({ troco: 0 }) }}>
                  <Icon style={{ color: "#000", fontSize: 30 }} name="ios-close-empty" />
                </TouchableOpacity>
              </Item>

              <View style={{ flexDirection: "row", justifyContent: "space-around" }} >
                <Button style={[styles.button]} bordered onPress={() => { this.setState({ showTrocoDialog: false }) }}>
                  <Text style={styles.buttonText} uppercase={false}>{"cancelar"}</Text>
                </Button>

                <TouchableOpacity onPress={this.props.onButtonPress}>
                  <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
                    <Text style={styles.buttonText}>{"Okay"}</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        }
      />
    );
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={"Farmácia Mel"}
            subtitle={"Fazemos entrega até 20:00"}
            menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <MenuItem icon="call" onPress={() => { this.onBack() }} />
                <MenuItem icon="location" onPress={() => { this.onBack() }} />
              </View>
            }
            footer={
              <View style={{ marginTop: 16 }}>
                <View style={styles.InfoContainer}>
                  <Icon name="place" size={30} color={"#000"} />
                  <Text style={styles.InfoTextBold}>
                    100m
                    <Text style={styles.InfoText}>
                      {" do endereço indicado"}
                    </Text>
                  </Text>
                </View>

                <View style={styles.InfoContainer}>
                  <Icon name="location" size={30} color={"#000"} />
                  <Text style={styles.InfoTextBold}>
                    30 min
                    <Text style={[styles.InfoText, { marginBottom: 0 }]}>
                      {" em média para entregar"}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity style={styles.InfoContainer} onPress={() => { this.props.navigation.navigate('Drugstore') }}>
                  <Image style={styles.InfoIcon} source={require("../../assets/images/ic_info.png")} />
                  <Text style={styles.InfoTextBold}>{"Sobre nós"}</Text>
                </TouchableOpacity>
              </View>
            }
          />

          <View style={{ backgroundColor: "#FF1967", marginTop: 4, paddingVertical: 14, paddingHorizontal: 24 }}>
            <Text style={{ fontFamily: "Roboto-Regular", fontSize: 16, color: "#FFFFFF" }}>
              Essa farmacia não tem todos os itens
            </Text>
          </View>

          <List
            style={{ marginRight: 24 }}
            dataArray={this.props.cartItems}
            renderRow={apresentation => (
              <ListItem style={styles.ListItem}>
                <ProposalApresentation apresentation={apresentation} />
              </ListItem>
            )}
          />

        </ScrollView>

        <BottomBar
          buttonTitle="comprar"
          price={CartUtils.getValueTotal(this.props.cartItems)}
          onButtonPress={() => { this._showPaymentDialog(); }}
        />

        {Components.renderIf(this.state.showPaymentDialog,
          this._renderDeliveryDialog()
        )}

        {Components.renderIf(this.state.showTrocoDialog,
          this._renderTrocoDialog()
        )}

      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    uf: state.locations.uf,
    cartItems: state.carts.cartItems
  };
}

export default connect(mapStateToProps)(ProposalScreen);
