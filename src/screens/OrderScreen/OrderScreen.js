import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Linking } from "react-native";
import { Text } from "native-base";
import { TextMask, MaskService } from "react-native-masked-text";

import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";
import Communications from 'react-native-communications';

import { Header } from "../../layout/Header";

import { Icon } from "../../components/Icon";
import { MenuItem } from "../../components/MenuItem";
import { OrderItemAdapter } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { StatusPedido } from "../../models/enums"
import { Components, StringUtils, Date as DateUtils } from "../../helpers";

import { SUPPORT_LINK } from "../../config/server";
import styles from "./styles";

class OrderScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { order: null };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    componentWillMount = () => {
        let order = this.props.navigation.state.params.order
        this.setState({ order });
    }

    componentWillUnmount = () => {

    }

    /** Private functions */
    onBack() {
        this.props.navigation.goBack(null);
    }

    openSupport() {
        try {
          Linking.openURL(SUPPORT_LINK);
        } catch (error) {
          console.log(error);
          Snackbar.show({ title: "Erro ao abrir o whatsapp.", duration: Snackbar.LENGTH_SHORT });
        }
    }

    _showDrugstore() {
        this.props.navigation.navigate({ key: 'drugstore1', routeName: 'Drugstore', params: { drugstore: this.state.order.farmacia } });
    }

    _callPhone() {
        Communications.phonecall(this.state.order.farmacia.telefone, true);
    }

    _callMap() {
        Communications.web(`https://www.google.com/maps/search/?api=1&query=${this.state.order.farmacia.latitude},${this.state.order.farmacia.longitude}`)
    }

    _renderParcel() {
        let numero_parcelas = this.state.order.numero_parcelas;
        let valor = (this.state.order.valor_total / numero_parcelas).toFixed(2);
        let sValor = MaskService.toMask('money', valor);
        if (numero_parcelas === 1) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.parcelTitle, { marginRight: 8 }]}>{`${sValor} à vista`}</Text>
                    <Icon name="arrow-down-b" size={18} color={"#000"} />
                </View>
            )
        } else {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.parcelTitle, { marginRight: 8 }]}>{`${numero_parcelas}X de ${sValor}`}</Text>
                    <Icon name="arrow-down-b" size={18} color={"#000"} />
                </View>
            )
        }
    }

    _renderItem = ({ item }) => {
        if (item.status !== 4) {
            return (<OrderItemAdapter apresentation={item.apresentacao} item={item} />)
        }
    };

    _renderPagamento() {
        if (this.state.order.forma_pagamento === 0) {
            if (this.state.order.cartao) {
                return (
                    <View style={styles.container}>
                        <Text style={[styles.title]}>{"Pagamento"}</Text>

                        <View>
                            <CreditCardAdapter creditCard={this.state.order.cartao} />
                            <View style={[styles.containerParcel, styles.row]}>
                                <Text style={styles.parcelTitle} >{"Parcelas"}</Text>
                                <View>
                                    {this._renderParcel()}
                                </View>
                            </View>
                        </View>
                    </View>
                )
            }
        } else {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>{"Pagamento"}</Text>
                    <View>
                        <Text>{`Troco para ${MaskService.toMask('money', this.state.order.troco)}`}</Text>
                    </View>
                </View>
            );
        }
        return null;
    }

    _renderEndereco() {
        if (this.state.order.delivery === true) {
            let address = {}
            address.nome_endereco = this.state.order.nome_endereco;
            address.logradouro = this.state.order.logradouro;
            address.numero = this.state.order.numero;
            address.bairro = { nome: this.state.order.bairro }
            address.cidade = { nome: this.state.order.cidade };
            return (
                <View style={[styles.container]}>
                    <Text style={[styles.title]}>{"Endereço para entrega"}</Text>
                    <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                        <AddressAdapter address={address} />
                    </View>
                </View>
            );
        } else {
            if (this.state.order.farmacia) {
                return (
                    <View style={[styles.container]}>
                        <View style={[styles.row, { marginBottom: 16 }]}>
                            <Text style={[styles.title, { marginBottom: 0 }]}>{"Endereço da farmácia"}</Text>
                            <View style={{ flexDirection: "row", marginRight: -24 }}>
                                <MenuItem
                                    icon="call"
                                    onPress={() => { this._callPhone() }}
                                    style={{ paddingVertical: 5, paddingHorizontal: 12 }}
                                />
                                <MenuItem
                                    icon="marker"
                                    onPress={() => { this._callMap() }}
                                    style={{ paddingVertical: 5, paddingHorizontal: 12 }}
                                />
                            </View>
                        </View>

                        <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                            <AddressAdapter address={this.state.order.farmacia.endereco} />
                        </View>
                    </View>
                );
            }
        }
        return null;
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
                <Header
                    title={`Ordem #${StringUtils.rjust('' + this.state.order.id, 9, '0')}`}
                    subtitle={"Todos os detalhes do seu pedido está aqui"}
                    menuLeft={
                        <MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }}
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }} />
                    }
                />
                <ScrollView>
                    <View style={styles.container}>
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <Text style={styles.title}>{DateUtils.toDate(this.state.order.log.data_criacao)}</Text>
                            <Text style={styles.title}>{StatusPedido[this.state.order.status][1]}</Text>
                        </View>

                        {Components.renderIf(this.state.order && this.state.order.itens,
                            <FlatList
                                data={this.state.order.itens}
                                keyExtractor={item => item.apresentacao.id.toString()}
                                renderItem={this._renderItem}
                            />
                        )}

                        <View style={[styles.footerOrder, { marginBottom: 8, marginTop: 16 }]}>
                            <Text style={styles.footerOrderTitle}>{"Frete"}</Text>
                            {Components.renderIfElse(this.state.order.valor_frete === "0.00",
                                <Text style={[styles.footerOrderText, { fontSize: 14 }]} >{"GRÁTIS"}</Text>,
                                <TextMask type={"money"} value={this.state.order.valor_frete} />
                            )}
                        </View>

                        <View style={[styles.footerOrder]}>
                            <Text style={[styles.footerOrderTitle, { color: "rgba(0,0,0,0.80)" }]}>{"Total"}</Text>
                            <TextMask style={styles.footerOrderText} type={"money"} value={this.state.order.valor_total} />
                        </View>
                    </View>

                    {this._renderPagamento()}

                    {this._renderEndereco()}

                    <View style={[styles.container, { marginBottom: 90 }]}>
                        <Text style={styles.title}>{"Alguma dúvida ou problema?"}</Text>
                        <TouchableOpacity onPress={() => { this.openSupport() }}>
                            <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: '100%', borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
                                <Text style={styles.buttonText}>{'Entrar em contato'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default OrderScreen;