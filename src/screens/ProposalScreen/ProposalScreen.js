import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Text, Button, Item, Input } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";
import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";

import { Header } from "../../layout/Header"
import { BottomBar } from "../../layout/Bar";
import { ActionSheet } from "../../layout/ActionSheet";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem"
import { ButtonCustom } from "../../components/ButtonCustom";
import { ProposalApresentation } from "../../components/Product/";

import { Components, CartUtils } from "../../helpers";
import styles from "./styles";

class ProposalScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onScrollList: false,
      showPaymentDialog: false,
      showTrocoDialog: false,
      troco: 0,
      proposal: {}
    };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    let params = this.props.navigation.state.params;
    let proposal = params ? params.proposal : null;
    this.setState({ proposal });
  }

  /** Private functions */
  onChangeTroco = value => {
    let valueMask = MaskService.toMask('money', value);
    this.setState({ troco: valueMask })
  }

  onBack() {
    this.props.navigation.goBack(null);
  }

  _showPaymentDialog() {
    this.setState({ showPaymentDialog: true });
  }

  _showTrocoDialog() {
    this.setState({ showTrocoDialog: true, showPaymentDialog: false });
  }

  _showDrugstore() {
    this.props.navigation.navigate('Drugstore', { drugstore: this.state.proposal.farmacia })
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
  }

  _showConfirmation() {
    this.props.navigation.navigate("Confirmation");
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
  }

  _showListCreditCards() {
    this.props.navigation.navigate("ListCreditCards");
    this.setState({ showPaymentDialog: false, showTrocoDialog: false });
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
                onPress={() => { this._showTrocoDialog() }}
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
        callback={buttonIndex => { this.setState({ showTrocoDialog: false }); }}
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

                <TouchableOpacity onPress={() => { }}>
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

  _renderHeaderFooter() {
    if (!this.state.onScrollList) {
      return (
        <View style={{ marginTop: 16 }}>
          <View style={styles.InfoContainer}>
            <Icon name="place" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.InfoTextBold}>
              {this.state.proposal.farmacia.distancia}
              <Text style={styles.InfoText}>{" do endereço indicado"}</Text>
            </Text>
          </View>

          <View style={styles.InfoContainer}>
            <Icon name="clock-o" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.InfoTextBold}>
              {this.state.proposal.farmacia.tempo_entrega}
              <Text style={[styles.InfoText, { marginBottom: 0 }]}>{" em média para entregar"}</Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.InfoContainer} onPress={() => { this._showDrugstore() }}>
            <Icon name="info" size={18} color={"#000"} style={{ marginRight: 8 }} />
            <Text style={styles.InfoTextBold}>{"Sobre nós"}</Text>
          </TouchableOpacity>
        </View>
      )
    } else {
      return null;
    }
  }

  _renderItem = ({ item }) => (<ProposalApresentation proposalItem={item} />);

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={this.state.proposal.farmacia.nome_fantasia}
            subtitle={`Fazemos entrega até ${this.state.proposal.farmacia.horario_funcionamento}`}
            menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <MenuItem icon="call" onPress={() => { this.onBack() }} />
                <MenuItem icon="marker" onPress={() => { this.onBack() }} />
              </View>
            }
            footer={this._renderHeaderFooter()}
          />

          {Components.renderIf((!this.state.proposal.possui_todos_itens && !this.state.onScrollList),
            <View style={{ backgroundColor: "#FF1967", marginTop: 4, paddingVertical: 14, paddingHorizontal: 24 }}>
              <Text style={{ fontFamily: "Roboto-Regular", fontSize: 16, color: "#FFFFFF" }}>{"Essa farmacia não tem todos os itens"}</Text>
            </View>
          )}

          <FlatList
            style={{ paddingHorizontal: 24 }}
            data={this.state.proposal.itens}
            keyExtractor={item => item.apresentacao.toString()}
            renderItem={this._renderItem}
          />
        </ScrollView>

        <BottomBar
          buttonTitle="comprar"
          price={this.state.proposal.valor_total}
          onButtonPress={() => { this._showPaymentDialog(); }}
        />

        {Components.renderIf(this.state.showPaymentDialog,
          this._renderPaymentDialog()
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
