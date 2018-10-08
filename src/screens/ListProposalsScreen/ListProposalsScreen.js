import React, { Component } from "react";
import { NavigationActions } from 'react-navigation'
import { Alert, View, ScrollView, TouchableOpacity, FlatList, BackHandler } from "react-native";
import { Container, Text } from "native-base";
import LinearGradient from "react-native-linear-gradient";
import TimerCountdown from "react-native-timer-countdown";

import { connect } from "react-redux";
import { getOrder, cancelOrder, clearError, updateOrder, selectProposal } from "../../actions/orders";

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"
import { ButtonDefault } from "../../components/ButtonDefault"

import { ProposalDescription } from "../../components/Proposal";
import { ProposalNotFoundScreen } from "../ProposalNotFoundScreen";

import { Components } from "../../helpers";
import styles from "./styles";
class ListProposalsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      back_screen: 'Cart',
      start_timer: false,
      status: 0,
    }
    loadPropostas = 0;
  }

  static navigationOptions = ({ navigation }) => {
    return { header: null };
  };

  componentWillReceiveProps = nextProps => {
    try {

      if (nextProps.order !== this.props.order) {
        if (nextProps.order.status === 8) {
          this.setState({ show_not_fount_proposal: true })
        }

        if (nextProps.order.status === 9) {
          this.setState({ show_not_fount_proposal: true })
        }
      }

      if (nextProps && nextProps.error) {
        if (nextProps.error.response && (nextProps.error.response.status >= 400 || nextProps.error.response.status <= 403)) {
          if (nextProps.error.response.data.detail) {
            if (nextProps.error.response.data.detail === "Token inválido.") {
              this.props.dispatch(clearError());
              this.props.dispatch(logout());
            }
            Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
          }
        }
      }

    } catch (e) {
      console.log(e);
    }
  }

  componentWillMount = () => {
    console.log("Montando -> ListProposal");
    BackHandler.addEventListener('hardwareBackPress', this.nothing);
  }

  componentDidMount() {
    console.log("Montou  -> ListProposal");
    this.loadPropostas = setInterval(() => this.getProposals(), 10000);
    setTimeout(() => { this.setState({ start_timer: true }), 3000 });
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

  renderProposals() {
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

        <LinearGradient colors={["#A445B2", "#D41872", "#FF0066"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} location={[0.0, 0.52, 1]} style={[styles.footer, styles.bottomBar]}>
          <Text style={styles.button}>
            {"Recebendo propostas aguarde…"}
          </Text>
        </LinearGradient>
      </View>
    )
  }

  renderNotFoundTimeout(timeout = false) {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <ProposalNotFoundScreen timeout={timeout} onPress={() => { this._cancelOrder() }} />
      </View>
    )
  }

  renderText() {
    let startTimer = this.state.start_timer
    if (!startTimer) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>

          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={[styles.txtDefault, { width: 300 }]}>
              {"Aguarde, estamos verificando as farmacias próxima do endereço indicado…"}
            </Text>
          </View>

          <View style={[{ padding: 24 }]}>
            <ButtonDefault
              text="Cancelar"
              style={{ backgroundColor: "#FFF", borderColor: "rgba(0,0,0,0.16)" }}
              textStyle={{ color: '#000' }}
              onPress={() => { this.alertCancel() }}
            />
          </View>
        </View>
      )
    } else {
      if (this.props.order && this.props.order.views) {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.txtDefault}>{`${this.props.order.views} farmacias estão visualizando sua proposta…`}</Text>
          </View>
        )
      } else {
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={[styles.txtDefault, { marginTop: 32 }]}>{"Enviando sua proposta para as farmacias…"}</Text>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
              <TimerCountdown
                initialSecondsRemaining={1000 * 30}
                onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                onTimeElapsed={() => console.log('complete')}
                allowFontScaling={true}
                style={{ fontSize: 40 }}
              />
            </View>

            <View style={[{ padding: 24 }]}>
              <ButtonDefault
                text="Cancelar"
                style={{ backgroundColor: "#FFF", borderColor: "rgba(0,0,0,0.16)" }}
                textStyle={{ color: '#000' }}
                onPress={() => { this.alertCancel() }}
              />
            </View>
          </View>
        )
      }
    }
  }

  renderView() {
    switch (this.state.status) {
      case 0:
        return this.renderText()
        break;
      case 1:
        return this.renderNotFoundTimeout()
        break;
      case 2:
        return this.renderNotFoundTimeout(true)
        break;
      default:
        this.renderProposals();
        break;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {this.renderView()}
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