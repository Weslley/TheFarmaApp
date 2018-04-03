import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Container, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";
import { getOrder } from "../../actions/orders";

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"
import { ProposalDescription } from "../../components/Proposal";

import styles from "./styles";

class ListProposalsScreen extends Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentDidMount(){
    setInterval(() => {this.getProposals();}, 10000);
  }

  /** Private functions */
  onBack() {
    this.props.dispatch(clearError());
    this.props.navigation.goBack(null);
  }

  getProposals(){
    let params = {client: this.props.client, order: this.props.order}
    this.props.dispatch(getOrder(params));
  }

  _keyExtractor = (item, index) => item.id.toString();

  _showProposal(proposal) {
    this.props.navigation.navigate("Proposal", { proposal });
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { this._showProposal(item) }}>
      <View style={{ paddingVertical: 24, borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1 }}>
        <ProposalDescription proposal={item} />
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={"Propostas"}
          menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />}
        />
        <ScrollView>
          <FlatList
            style={{ paddingHorizontal: 24 }}
            data={this.props.order.propostas}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </ScrollView>

        <LinearGradient colors={["#A445B2", "#D41872", "#FF0066"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} location={[0.0, 0.52, 1]} style={styles.bottomBar}>
          <Text style={styles.button}>
            {"Recebendo propostas aguarde…"}
          </Text>
        </LinearGradient>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    client: state.clients.client,
    order: state.orders.order,
    error: state.orders.error,
  };
}

export default connect(mapStateToProps)(ListProposalsScreen);