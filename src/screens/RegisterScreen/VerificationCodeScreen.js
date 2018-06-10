import React, { Component } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, Imagem, TextInput, Image, TouchableOpacity, Platform } from "react-native";
import { NavigationActions } from 'react-navigation';
import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";
import CodeInput from 'react-native-confirmation-code-input';

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { login, register, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"

import { Icon } from "../../components/Icon"
import { Loading } from "../../components/Loading"
import { MenuItem } from "../../components/MenuItem"
import ConfirmationCodeInput from "../../components/ConfirmationCodeInput"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class VerificationCodeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo_sms: "",
            nome: "",
            email: "",
            celular: "",
            password: "",
            cpf: "",
            data_nascimeento: "",
            sexo: "",
            facebook_id: "",

            nome_error: null,
            email_error: null,
            celular_error: null,
            codigo_sms_error: null,
            password_error: null,
            showNetworkError: false,
            actionBack: null,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error) {
                if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {

                    if (nextProps.error.response.data.email) {
                        this.setState({ email_error: nextProps.error.response.data.email[0] })
                    }

                    if (nextProps.error.response.data.codigo_sms) {
                        this.setState({ codigo_sms_error: nextProps.error.response.data.codigo_sms[0] })
                    }

                    if (nextProps.error.response.data.celular) {
                        this.setState({ celular_error: nextProps.error.response.data.celular[0] })
                    }

                    if (nextProps.error.response.data.non_field_errors) {
                        Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
                    }

                    if (nextProps.error.response.data.detail) {
                        Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT, });
                    }
                }

                if (nextProps.error.message && nextProps.error.message === 'Network Error') {
                    this.setState({ showNetworkError: true });
                }
            }

            if (nextProps && nextProps.client) {
                if (nextProps.client.nome) {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Welcome', params: { actionBack: this.state.actionBack } })],
                    });
                    this.props.navigation.dispatch(resetAction);
                } else {
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Name', params: { actionBack: this.state.actionBack } })],
                    });
                    this.props.navigation.dispatch(resetAction);
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
            if (params.celular) this.setState({ celular: params.celular })
            if (params.facebook_id) this.setState({ facebook_id: params.facebook_id })
            if (params.foto) this.setState({ foto: params.foto })
            if (params.data_nascimento) this.setState({ data_nascimento: params.data_nascimento })
            if (params.sexo) this.setState({ sexo: params.sexo })
            if (params.actionBack) this.setState({ actionBack: params.actionBack })
        }
    }

    componentDidMount() { 
        this.confirmCode._setFocus(0);
    }

    /** Private functions */
    onBack() {
        this.props.dispatch(clearError());
        this.props.navigation.goBack(null);
    }

    resend() {
        let params = {}
        params["login_type"] = 2;
        params["celular"] = StringUtils.removeMask(this.state.celular);
        this.props.dispatch(login(params));
    }

    _onFulfill(code) {
        this.setState({ codigo_sms: "" + code });
        setTimeout(() => {
            this.submit();
        }, 500);
    }

    validForm() {
        this.setState({ nome_error: null, email_error: null, celular_error: null, password_error: null, codigo_sms_error: null })

        if (this.state.codigo_sms == null || this.state.codigo_sms == "") {
            this.setState({ codigo_sms_error: "Este campo é obrigatório" })
            return false;
        }

        if (this.state.codigo_sms.length !== 4) {
            this.setState({ codigo_sms_error: "Este campo é inválido" })
            return false;
        }

        if (this.state.celular == null || this.state.celular == "") {
            this.setState({ nome_error: "Este campo é obrigatório" })
            return false;
        }

        if (this.state.celular.length > 1) {
            if (StringUtils.removeMask(this.state.celular).length <= 10) {
                this.setState({ celular_error: "Número incompleto" })
                return false;
            }
        }

        return true;
    }

    submit() {
        console.log(this.state);
        if (this.validForm()) {
            let params = {}
            params["login_type"] = 2;
            params["celular"] = StringUtils.removeMask(this.state.celular);
            params["codigo_sms"] = StringUtils.removeMask(this.state.codigo_sms);
            this.props.dispatch(login(params));
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='padding' enabled>

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
                            ref={(c) => { this.confirmCode = c }}
                            className={'border-b'}
                            autoFocus={true}
                            secureTextEntry
                            keyboardType="phone-pad"
                            activeColor='#7ED321'
                            inactiveColor='rgba(0,0,0,0.80)'
                            inputPosition='full-width'
                            containerStyle={{ minHeight: 50 }}
                            codeInputStyle={styles.codeInput}
                            onFulfill={this._onFulfill.bind(this)}
                        />

                        {Components.renderIf(this.state.codigo_sms_error,
                            <Text style={styles.inputError} uppercase={false}>{this.state.codigo_sms_error}</Text>
                        )}
                    </View>

                    <View style={{ paddingVertical: 16, flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                        <TouchableOpacity style={{ width: '48%', alignItems: 'center', }} onPress={() => { this.resend() }}>
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

                {Components.renderIf(this.props.isLoading === true,
                    <View style={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}>
                        <Loading />
                    </View>
                )}
            </KeyboardAvoidingView>
        );
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        isLoading: state.clients.isLoading,
        error: state.clients.error
    };
}

export default connect(mapStateToProps)(VerificationCodeScreen);