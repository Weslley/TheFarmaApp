import React, { Component } from "react";
import { View, ScrollView, TouchableOpacity, FlatList, Picker, Platform, BackHandler } from "react-native";
import { Button, Text, Picker as NBPicker } from "native-base";
import { TextInputMask, TextMask, MaskService } from "react-native-masked-text";

import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";

import { NavigationActions } from 'react-navigation';

import { Header } from "../../layout/Header";
import { BottomBar } from "../../layout/Bar";

import { Icon } from "../../components/Icon";
import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem";
import { OrderItemAdapter } from "../../components/Product/";
import { AddressAdapter } from "../../components/Address";
import { CreditCardAdapter } from "../../components/CreditCard";

import { StatusPedido } from "../../models/enums"
import { Components, CartUtils, StringUtils, Date as DateUtils } from "../../helpers";
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

    _renderParcel() {
        let numero_parcelas = this.state.order.numero_parcelas;
        let valor = (this.state.order.valor_total / numero_parcelas).toFixed(2);
        let sValor = MaskService.toMask('money', valor);
        if (numero_parcelas === 1) {
            return (
                <View>
                    <Text>{`${sValor} à vista`}</Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Text>{`${numero_parcelas}X de ${sValor}`}</Text>
                </View>
            )
        }
    }

    _renderItem = ({ item }) => {
        return (<OrderItemAdapter apresentation={item.apresentacao} item={item} />)
    };

    _renderPagamento() {
        if (this.state.order.forma_pagamento === 0) {
            if (this.state.order.cartao) {
                return (
                    <View style={styles.container}>
                        <Text style={styles.title}>{"Pagamento"}</Text>

                        <View>
                            <CreditCardAdapter creditCard={this.state.order.cartao} />
                            <View style={styles.containerParcel}>
                                <Text style={styles.parcelTitle} >{"Parcelas"}</Text>
                                {this._renderParcel()}
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
                    <Text style={styles.title}>{"Endereço para entrega"}</Text>
                    <View style={{ marginHorizontal: -24, paddingHorizontal: 24, backgroundColor: "#F8F8F8" }}>
                        <AddressAdapter address={address} />
                    </View>
                </View>
            );
        } else {
            if (this.state.order.farmacia) {
                return (
                    <View style={[styles.container]}>
                        <Text style={styles.title}>{"Endereço da farmácia"}</Text>
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
        console.log(this.state);
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
                                <Text style={styles.footerOrderText} >{"GRÁTIS"}</Text>,
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
                        <Text style={styles.title}>{"Alguma duvida ou problema?"}</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: '100%', borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
                                <Text style={styles.buttonText}>{'entrar em contato'}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

export default OrderScreen;