import React, { Component } from "react";
import { NavigationActions } from 'react-navigation'
import { Alert, View, ScrollView, TouchableOpacity, FlatList, BackHandler } from "react-native";
import { Container, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";

import { connect } from "react-redux";
import { getOrder, cancelOrder, clearError, updateOrder, selectProposal } from "../../actions/orders";

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"
import { ProposalDescription } from "../../components/Proposal";

import { Components } from "../../helpers";
import styles from "./styles";

class ListProposalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      back_screen: 'Cart'
    }
    loadPropostas = 0;
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillMount = () => {
    console.log("Montando -> ListProposal");
    BackHandler.addEventListener('hardwareBackPress', this.nothing);
  }

  componentDidMount() {
    console.log("Montou  -> ListProposal");
    this.loadPropostas = setInterval(() => this.getProposals(), 10000);
  }

  componentWillUnmount = () => {
    console.log("Desmontou  -> ListProposal");
    clearInterval(this.loadPropostas);
    BackHandler.removeEventListener('hardwareBackPress', this.nothing);
  }

  /** Private functions */
  nothing = () => { return true; }

  onBack() {
    this.props.navigation.goBack(null);
  }

  alertCancel() {
    Alert.alert(
      '',
      'Você gostaria de cancelar o recebimento das propostas?',
      [
        { text: 'NÃO', onPress: () => { console.log('cancelou.'); } },
        { text: 'SIM', onPress: () => { this._cancelOrder() } },
      ],
      { cancelable: false }
    )
  }

  _cancelOrder() {
    clearInterval(this.loadPropostas);
    let params = { client: this.props.client, order: this.props.order }
    this.props.dispatch(cancelOrder(params));

    this.onBack();
  }

  getProposals() {
    if (this.props.order.id) {
      let params = { client: this.props.client, order: this.props.order }
      this.props.dispatch(getOrder(params));
    }
  }

  _showProposal(proposal) {
    BackHandler.removeEventListener('hardwareBackPress', this.nothing);
    clearInterval(this.loadPropostas);

    if (this.props.order.id) {
      let order = this.props.order;
      order.proposta = proposal;

      this.props.dispatch(selectProposal(proposal));

      let params = { client: this.props.client, order }
      this.props.dispatch(updateOrder(params));
      this.props.navigation.navigate({ key: 'proposal1', routeName: 'Proposal', params: {} });
    }

  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => { this._showProposal(item) }}>
      <View style={{ borderBottomColor: 'rgba(0,0,0,0.08)', borderBottomWidth: 1 }}>
        <ProposalDescription proposal={item} />
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <Header
          title={"Propostas"}
          menuLeft={
            <MenuItem icon="md-arrow-back" onPress={() => { this.alertCancel() }}
              style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
            />}
        />
        <ScrollView>
          <FlatList
            style={{ paddingHorizontal: 24 }}
            data={this.props.order.propostas}
            keyExtractor={item => item.farmacia.id.toString()}
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
    success: state.orders.success,
    error: state.orders.error,
  };
}

export default connect(mapStateToProps)(ListProposalsScreen);