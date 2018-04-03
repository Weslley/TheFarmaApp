import React, { Component } from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import { Container, Icon, Text, List, Button } from "native-base";

import { Header } from "../../layout/Header";
import { BusinessHour } from "../../components/BusinessHour";

import styles from "./styles";

class DrugstoreScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount() {
    
  }

  /** Private functions */
  render() {
    const { state: { params } } = this.props.navigation;
    return (
      <Container style={{ backgroundColor: "#FFFFFF" }}>

        <ScrollView >
          <Header
            title={params ? params.title : "Farmácia"}
            subtitle={"Detalhes da farmácia"}
            backAction={() => {
              this.props.navigation.goBack(null);
            }}
            menuRight={
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ marginRight: 16 }}
                  onPress={() => {}}
                >
                  <Image
                    source={require("../../assets/images/ic_call.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}}>
                  <Image
                    source={require("../../assets/images/ic_location.png")}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            }
          />

          <View style={[styles.row]}>
            <Text style={styles.label}>{"Dono"}</Text>
            <Text style={styles.info}>{"Henrique de Oliveira Carvalho"}</Text>
          </View>

          <View style={[styles.row]}>
            <Text style={styles.label}>{"Telefone"}</Text>
            <Text style={styles.info}>{"(86) 99912-1234"}</Text>
          </View>

          <View style={[styles.row, { paddingBottom: 0 }]}>
            <Text style={[styles.label, { marginBottom: 24 }]}>
              {"Horários"}
            </Text>
          </View>

          <List
            style={{ marginHorizontal: 24 }}
            dataArray={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
            renderRow={apresentation => (
              <BusinessHour label={"Segunda-feira"} value={"08:00 até 20:00"} />
            )}
          />

          <View style={{paddingBottom: 90}}/>

        </ScrollView>

        <View style={[styles.footer]}>
          <Button style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>{"Chamar"}</Text>
          </Button>

          <Button style={[styles.button, styles.buttonDirection]} onPress={() => {}}>
            <Text style={styles.buttonText}>{"Direção"}</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

export default DrugstoreScreen;
