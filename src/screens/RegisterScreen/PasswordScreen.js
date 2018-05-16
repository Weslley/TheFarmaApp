import React, { Component } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, Imagem, TextInput, Image, TouchableOpacity } from "react-native";
import { PasswordInputText } from "../../components/PasswordInputText";
import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { login, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class PasswordScreen extends Component {
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
                if (nextProps.error.response.data.senha) {
                    this.setState({ passwordError: nextProps.error.response.data.senha[0] })
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
            if (nextProps && nextProps.client) {
                if(nextProps.client.nome){
                    this.props.navigation.navigate({ key: 'welcome1', routeName: 'Welcome', params: {} });
                }else{
                    this.props.navigation.navigate({ key: 'name1', routeName: 'Name', params: {} });
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

        this.setState({ passwordError: null })
        this.props.dispatch(clearError());
    }

    /** Private functions */
    onBack() {
        this.props.dispatch(clearError());
        this.props.navigation.goBack(null);
    }

    validForm() {
        this.setState({ passwordError: null })
        if (this.state.password == null || this.state.password == "") {
            this.setState({ passwordError: "campo obrigatório" })
            return false;
        }
        return true;
    }

    submit() {
        if (this.validForm()) {
            let params = {}
            params["login_type"] = 0;
            params["email"] = this.state.email;
            params["password"] = this.state.password;

            this.props.dispatch(login(params));
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
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
                        <Text style={[styles.title, { paddingBottom: 40 }]}>{"Digite a sua senha"}</Text>
                        <PasswordInputText
                            label=""
                            autoCapitalize="none"
                            tintColor={"#000"}
                            autoFocus={true}
                            multiline={false}
                            style={[styles.input]}
                            onChangeText={(password) => this.setState({ password })}
                            value={this.state.password}
                        />
                    </View>

                    <View style={{ paddingVertical: 16, flexDirection: 'row', }}>
                        <View style={{ width: '50%' }} />
                        <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.submit() }} >
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

export default connect(mapStateToProps)(PasswordScreen);
