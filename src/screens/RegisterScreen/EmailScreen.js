import React, { Component } from "react";
import { View, KeyboardAvoidingView, ScrollView, Text, Imagem, TextInput, Image, TouchableOpacity } from "react-native";
import Snackbar from 'react-native-snackbar';
import LinearGradient from "react-native-linear-gradient";

TextInput.defaultProps.selectionColor = "black";
TextInput.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { login, updateV2, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";
import { update } from "../../actions/clients";

class EmailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_type: 0,
            email: "",
            password: "",
            emailError: null,
            passwordError: null,
            facebook_user: null
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error && nextProps.error.response && (nextProps.error.response.status == 400 || nextProps.error.response.status == 401)) {

                if (nextProps.error.response.data.email) {
                    this.setState({ nomeError: nextProps.error.response.data.email[0] })
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
            if (params.login_type) this.setState({ login_type: params.login_type })
            if (params.facebook_user) this.setState({ facebook_user: params.facebook_user })
        }

        this.setState({ emailError: null })
        this.props.dispatch(clearError());
    }

    /** Private functions */
    onBack() {
        this.props.dispatch(clearError());
        this.props.navigation.goBack(null);
    }

    validForm() {
        this.setState({ emailError: null })

        if (this.state.email == null || this.state.email == "") {
            this.setState({ emailError: "Este campo é obrigatório" })
            return false;
        }

        let regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
        if (!regexEmail.test(this.state.email)) {
            this.setState({ emailError: "E-mail inválido." })
            return false;
        }

        return true;
    }

    submit() {
        if (this.validForm()) {
            let params = {}
            params["email"] = this.state.email;

            if (this.state.login_type === 0) {
                this.props.navigation.navigate({ key: 'password1', routeName: 'Password', params });
            } else {
                let u = this.state.facebook_user
                if (u.id) params["facebook_id"] = u.id;
                if (u.email) params["email"] = this.state.email;
                if (u.first_name) params["nome"] = u.first_name;
                if (u.last_name) params["nome"] += u.last_name;
                if (u.birthday) params["data_nascimento"] = u.birthday;
                if (u.gender) params["sexo"] = u.birthday === 'male' ? "M" : "F";
                if (u.picture && u.picture.data) params["foto"] = u.picture.data;
                params["password"] = u.id;

                this.props.dispatch(login(params));
            }
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
                        <Text style={[styles.title, { paddingBottom: 40 }]}>{"Digite seu email"}</Text>
                        <TextInput
                            autoFocus={true}
                            multiline={false}
                            autoCapitalize="none"
                            style={[styles.input]}
                            onChangeText={(email) => this.setState({ email })}
                            value={this.state.email}
                        />
                        {Components.renderIf(this.state.emailError,
                            <Text style={styles.inputError} uppercase={false}>{this.state.emailError}</Text>
                        )}
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

export default connect(mapStateToProps)(EmailScreen);
