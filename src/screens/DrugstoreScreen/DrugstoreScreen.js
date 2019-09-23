import React, { Component } from "react";
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList
} from "react-native";
import { Container, Text, Button } from "native-base";
import { TextMask } from "react-native-masked-text";

import Communications from "react-native-communications";

import { Header } from "../../layout/Header";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { BusinessHour } from "../../components/BusinessHour";

import { Components } from "../../helpers";
import styles from "./styles";

import { connect } from "react-redux";

class DrugstoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { drugstore: null };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    const {
      state: { params }
    } = this.props.navigation;
    let drugstore = params ? params.drugstore : null;
    if (drugstore) this.setState({ drugstore });
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _callPhone() {
    let drugstore = this.props.drugstore;
    Communications.phonecall(drugstore.telefone, true);
  }

  _callMap() {
    let drugstore = this.props.drugstore;
    Communications.web(
      `https://www.google.com/maps/search/?api=1&query=${drugstore.latitude},${drugstore.longitude}`
    );
  }

  getAddress() {
    let drugstore = this.props.drugstore;
    try {
      if (drugstore.endereco) {
        return (
          <View style={[styles.row]}>
            <Text style={styles.label}>{"Endereço"}</Text>
            <Text style={[styles.info, { marginBottom: 8 }]}>
              {`${drugstore.endereco.logradouro}, ${drugstore.endereco.numero}`}
            </Text>
            <Text style={styles.info}>
              {`${drugstore.endereco.bairro}, ${drugstore.endereco.cidade.nome} - ${drugstore.endereco.cidade.uf}`}
            </Text>
          </View>
        );
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  _renderItem = ({ item }) => (
    <BusinessHour label={item.dia_semana} value={item.horario} />
  );

  render() {
    let drugstore = this.props.drugstore;
    if (drugstore == null) {
      drugstore = this.state.drugstore;
    }
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView>
          <Header
            title={drugstore.nome_fantasia}
            subtitle={"Detalhes da farmácia"}
            menuLeft={
              <MenuItem
                icon="md-arrow-back"
                onPress={() => {
                  this.onBack();
                }}
                style={{
                  paddingLeft: 24,
                  paddingVertical: 12,
                  paddingRight: 12
                }}
              />
            }
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <MenuItem
                  icon="call-o"
                  iconSize={20}
                  onPress={() => { this._callPhone(); }}
                  style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                />
                <MenuItem
                  icon="place"
                  iconSize={20}
                  onPress={() => { this._callMap(); }}
                  style={{ paddingVertical: 12, paddingHorizontal: 12 }}
                />
              </View>
            }
          />

          {Components.renderIf(
            drugstore.responsavel,
            <View style={[styles.row]}>
              <Text style={styles.label}>{"Dono"}</Text>
              <Text style={styles.info}>{"Henrique de Oliveira Carvalho"}</Text>
            </View>
          )}

          {Components.renderIf(
            drugstore.telefone,
            <View style={[styles.row]}>
              <Text style={styles.label}>{"Telefone"}</Text>
              <TextMask
                style={styles.info}
                type={"cel-phone"}
                value={drugstore.telefone}
              />
            </View>
          )}

          {this.getAddress()}

          <View style={[styles.row, { paddingBottom: 0 }]}>
            <Text style={[styles.label, { marginBottom: 24 }]}>{"Horários"}</Text>
          </View>

          <FlatList
            style={{ marginHorizontal: 24, marginBottom: 90 }}
            data={drugstore.horarios}
            keyExtractor={item => item.dia_semana}
            renderItem={this._renderItem}
          />
        </ScrollView>

        <View style={[styles.footer]}>
          <Button
            style={[styles.button]}
            bordered
            dark
            onPress={() => {
              this._callPhone();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }}>
              <Icon name="call-o" size={24} color={"#000"} />
              <Text style={styles.buttonText} uppercase={false}>{"Chamar"}</Text>
            </View>
          </Button>

          <Button
            style={[styles.button, styles.buttonDirection]}
            bordered
            dark
            onPress={() => { this._callMap(); }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 16 }}>
              <Icon name="navigate" size={24} color={"#000"} />
              <Text style={styles.buttonText} uppercase={false}> {"Direção"}</Text>
            </View>
          </Button>
        </View>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    drugstore: state.drugstores.drugstore
  };
}

export default connect(mapStateToProps)(DrugstoreScreen);
