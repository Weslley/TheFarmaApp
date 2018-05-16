import React, { Component } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, Imagem, TextInput, Image, TouchableOpacity } from "react-native";
import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";
import CodeInput from 'react-native-confirmation-code-input';


import { connect } from "react-redux";
import { login, register, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"
import { Icon } from "../../components/Icon"
import { MenuItem } from "../../components/MenuItem"
import ConfirmationCodeInput from "../../components/ConfirmationCodeInput"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class VerificationCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            email: "",
            celular: "",
            password: "",
            cpf: "",
            data_nascimeento: "",
            sexo: "",
            facebook_id: "",
            nomeError: null,
            emailError: null,
            celularError: null,
            passwordError: null
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 || nextProps.error.response.status == 401)) {

                if (nextProps.error.response.data.email) {
                    this.setState({ emailError: nextProps.error.response.data.email[0] })
                }

                if (nextProps.error.response.data.celular) {
                    this.setState({ celularError: nextProps.error.response.data.celular[0] })
                }

                if (nextProps.error.response.data.non_field_errors) {
                    Snackbar.show({
                        title: nextProps.error.response.data.non_field_errors[0],
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }

                if (nextProps.error.response.data.detail) {
                    Snackbar.show({
                        title: nextProps.error.response.data.detail,
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount() {
        const { state: { params } } = this.props.navigation;
        if (params) {
            if (params.nome) this.setState({ nome: params.nome })
            if (params.email) this.setState({ email: params.email })
            if (params.facebook_id) this.setState({ facebook_id: params.facebook_id })
            if (params.foto) this.setState({ foto: params.foto })
            if (params.data_nascimento) this.setState({ data_nascimento: params.data_nascimento })
            if (params.sexo) this.setState({ sexo: params.sexo })
        }

        this.setState({ nomeError: null, emailError: null, celularError: null, passwordError: null })
        this.props.dispatch(clearError());
    }

    componentDidMount() { }

    /** Private functions */
    onBack() {
        this.props.dispatch(clearError());
        this.props.navigation.goBack(null);
    }

    validForm() {
        this.setState({ nomeError: null, emailError: null, celularError: null, passwordError: null })

        if (this.state.celular == null || this.state.celular == "") {
            this.setState({ nomeError: "Este campo é obrigatório" })
            return false;
        }

        if (this.state.celular.length > 1) {
            if (StringUtils.removeMask(this.state.celular).length <= 10) {
                this.setState({ celularError: "Número incompleto" })
                return false;
            }
        }

        return true;
    }

    submit() {
        if (this.validForm()) {
            let params = {}
            params["celular"] = StringUtils.removeMask(this.state.celular);
            this.props.dispatch(register(params));
        }
    }

    _onFulfill(code) {

    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} >

                <Image
                    resizeMode={"cover"}
                    style={styles.background}
                    source={require("../../assets/images/background-register.png")} />

                <Header
                    style={{ paddingHorizontal: 24, paddingTop: 24, backgroundColor: "transparent" }}
                    separator={false}
                    menuLeft={
                        <MenuItem
                            icon="md-arrow-back"
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                            onPress={() => { this.onBack() }} />
                    }
                />

                <View style={{ flex: 1, paddingHorizontal: 24, justifyContent: "space-between" }}>
                    <View style={{ paddingTop: 40 }}>
                        <Text style={[styles.title, { paddingBottom: 40 }]}>{"Digite o código SMS que enviamos"}</Text>

                        <ConfirmationCodeInput
                            size={50}
                            codeLength={4}
                            ref="codeInput"
                            className={'border-b'}
                            secureTextEntry
                            keyboardType="phone-pad"
                            activeColor='#7ED321'
                            inactiveColor='rgba(0,0,0,0.80)'
                            inputPosition='full-width'
                            containerStyle={{ minHeight: 50 }}
                            codeInputStyle={styles.codeInput}
                            onFulfill={(code) => this._onFulfill(code)}
                        />

                        {Components.renderIf(this.state.celularError,
                            <Text style={styles.inputError} uppercase={false}>{this.state.celularError}</Text>
                        )}
                    </View>

                    <View style={{ paddingVertical: 16, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: '48%', alignItems: 'center', }} onPress={() => { }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="md-refresh" size={24} color={"#000"} style={{ marginRight: 8, }} />
                                <Text style={[styles.buttonText, { color: 'rgba(0,0,0,0.80)' }]}>{"Reenviar código"}</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '48%' }} onPress={() => { this.submit() }} >
                            <LinearGradient colors={["#00C7BD", "#009999"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 8, paddingHorizontal: 28, paddingVertical: 14 }}>
                                <Text style={[styles.buttonText, { textAlign: 'center' }]}>{"Continuar"}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        error: state.clients.error
    };
}

export default connect(mapStateToProps)(VerificationCodeScreen);