import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { Container, Text, Button } from "native-base";
import { TextMask } from "react-native-masked-text";

import Communications from 'react-native-communications';

import { Header } from "../../layout/Header";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem"
import { BusinessHour } from "../../components/BusinessHour";

import { Components } from "../../helpers";
import styles from "./styles";

class DrugstoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { drugstore: null };
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    const { state: { params } } = this.props.navigation;
    let drugstore = params ? params.drugstore : null;
    if (drugstore) this.setState({ drugstore });
  }

  /** Private functions */
  onBack() {
    this.props.navigation.goBack(null);
  }

  _callPhone(){
    Communications.phonecall(this.state.drugstore.telefone, true);
  }

  _callMap(){
    Communications.web(`https://www.google.com/maps/dir/${this.state.drugstore.latitude},${this.state.drugstore.longitude}`)
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>
        <ScrollView >

          <Header
            title={this.state.drugstore.nome_fantasia}
            subtitle={"Detalhes da farmácia"}
            menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <MenuItem icon="call" onPress={() => { this.onBack() }} />
                <MenuItem icon="marker" onPress={() => { this.onBack() }} />
              </View>
            }
          />

          {Components.renderIf(
            this.state.drugstore.responsavel,
            <View style={[styles.row]}>
              <Text style={styles.label}>{"Dono"}</Text>
              <Text style={styles.info}>{"Henrique de Oliveira Carvalho"}</Text>
            </View>
          )}

          {Components.renderIf(
            this.state.drugstore.telefone,
            <View style={[styles.row]}>
              <Text style={styles.label}>{"Telefone"}</Text>
              <TextMask style={styles.info} type={"cel-phone"} value={this.state.drugstore.telefone} />
            </View>
          )}

          {Components.renderIf(
            this.state.drugstore.endereco,
            <View style={[styles.row]}>
              <Text style={styles.label}>{"Endereço"}</Text>
              <Text style={[styles.info, { marginBottom: 8 }]}>
                {`${this.state.drugstore.endereco.logradouro}, ${this.state.drugstore.endereco.numero}`}
              </Text>
              <Text style={styles.info}>
                {`${this.state.drugstore.endereco.cidade.nome}-${this.state.drugstore.endereco.cidade.uf}, ${this.state.drugstore.endereco.bairro.nome}`}
              </Text>
            </View>
          )}

          <View style={[styles.row, { paddingBottom: 0 }]}>
            <Text style={[styles.label, { marginBottom: 24 }]}>
              {"Horários"}
            </Text>
          </View>

          <FlatList
            style={{ marginHorizontal: 24, marginBottom: 90 }}
            data={this.state.drugstore.horarios}
            keyExtractor={item => item.dia_semana}
            renderItem={(item) => { <BusinessHour label={item.dia_semana} value={item.horario} /> }}
          />
        </ScrollView>

        <View style={[styles.footer]}>
          <Button style={styles.button} onPress={() => {this._callPhone()}}>
            <Text style={styles.buttonText}>{"Chamar"}</Text>
          </Button>

          <Button style={[styles.button, styles.buttonDirection]} onPress={() => {this._callMap()}}>
            <Text style={styles.buttonText}>{"Direção"}</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default DrugstoreScreen;
