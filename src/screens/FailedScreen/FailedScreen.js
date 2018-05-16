import React, { Component } from "react";
import { StatusBar, View, ScrollView, Image } from "react-native";
import { Button, Text } from "native-base";

import { Header } from "../../components/Header";
import { MenuItem } from "../../components/MenuItem";
import { Icon } from "../../components/Icon";

import { Components } from "../../helpers";
import styles from "./styles";

class FailedScreen extends Component {
  static defaultProps = {
    style: {},
    onPressExit: null,
    onPressRefresh: null,
    title: "Ocorreu um erro ao conectar no servidor!",
    subtitle: "Por favor, cheque a sua conexão ou pode haver algum erro em nossos servidores."
  }


  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <View style={[{ flex: 1, backgroundColor: '#FFF' }, this.props.style]}>
        <View style={{ paddingHorizontal: 24 }}>
          {Components.renderIf(this.props.onPressExit,
            <Header menuRight={<MenuItem icon="md-exit" text="Sair" onPress={this.props.onPressExit} />} />
          )}
        </View>

        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <ScrollView style={{ paddingHorizontal: 24 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.title}>{this.props.title}</Text>
              <Text style={styles.subtitle}>{this.props.subtitle}</Text>
              <Icon name="md-close" color={"#F0166D"} size={40} />
            </View>
          </ScrollView>

          {Components.renderIf(this.props.onPressRefresh,
            <View style={{ marginHorizontal: 24, marginBottom: 24 }}>
              <Button style={styles.button} bordered dark onPress={this.props.onPressRefresh} >
                <Text style={styles.buttonText} uppercase={false}>Tentar novamente</Text>
                <Icon name="md-refresh" size={24} color={"#000"} style={{ marginRight: 16 }} />
              </Button>
            </View>
          )}
        </View>
      </View >
    )
  }
}

export default FailedScreen;