import React, { Component } from "react";
import { View, ScrollView, Image } from "react-native";
import { Container, Text, Form, Item, Label, Input, Button, Icon } from "native-base";
import { TextInputMask, MaskService } from "react-native-masked-text";

Input.defaultProps.selectionColor = "black";
Input.defaultProps.underlineColorAndroid = 'black'

import { connect } from "react-redux";
import { login, register, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

class RegisterScreen extends Component {
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
            if (nextProps && nextProps.error && nextProps.error.response && nextProps.error.response.status == 400) {

                if (nextProps.error.response.data.email) {
                    this.setState({ emailError: nextProps.error.response.data.email[0] })
                }

                if (nextProps.error.response.data.celular) {
                    this.setState({ celularError: nextProps.error.response.data.celular[0] })
                }

                if (nextProps.error.response.data.detail) {
                    this.setState({ error: nextProps.error.response.data.detail })
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

    componentDidMount() {
        this.setState({
            nome: "Francisco Weslley",
            email: "weslleyocara@hotmail.com",
            celular: "86995676616",
            password: "123456",
        })
    }

    /** Private functions */
    onBack(){
        this.props.dispatch(clearError());
        this.props.navigation.goBack(null);
    }

    validForm() {
        this.setState({ nomeError: null, emailError: null, celularError: null, passwordError: null })

        if (this.state.nome == null || this.state.nome == "") {
            this.setState({ nomeError: "campo obrigatório" })
            return false;
        }

        if (this.state.email == null || this.state.email == "") {
            this.setState({ emailError: "campo obrigatório" })
            return false;
        }

        if ((this.state.celular != null || this.state.celular == "") && StringUtils.removeMask(this.state.celular).length <= 10) {
            this.setState({ celularError: "campo inválido" })
            return false;
        }

        if (this.state.password == null || this.state.password == "") {
            this.setState({ passwordError: "campo obrigatório" })
            return false;
        }

        return true;
    }

    submit() {
        if (this.validForm()) {
            let params = {}
            params["nome"] = this.state.nome;
            params["email"] = this.state.email;
            params["password"] = this.state.password;

            if (this.state.celular) params["celular"] = this.state.celular;
            if (this.state.facebook_id) params["facebook_id"] = this.state.facebook_id;
            this.props.dispatch(register(params));
        }
    }

    onPhoneChange = phone => {
        let celularMask = MaskService.toMask('cel-phone', phone);
        this.setState({ celular: celularMask })
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 24 }}>
                    <Image
                        resizeMode={"cover"}
                        style={styles.background}
                        source={require("../../assets/images/background-register.png")} />
                    <Header
                        style={{ paddingHorizontal: 0, backgroundColor: "transparent" }}
                        separator={false}
                        menuLeft={<MenuItem icon="md-arrow-back" onPress={() => { this.onBack() }} />} />

                    <ScrollView>
                        <Form>
                            <Item floatingLabel style={styles.formitem}>
                                <Label>Nome</Label>
                                <Input
                                    style={styles.input}
                                    placeholderTextColor="#CCC"
                                    multiline={false}
                                    onChangeText={(nome) => this.setState({ nome })}
                                    value={this.state.nome}
                                />
                            </Item>

                            {Components.renderIf(this.state.nomeError,
                                <Text style={styles.inputError} uppercase={false}>{this.state.nomeError}</Text>
                            )}

                            <Item floatingLabel style={styles.formitem}>
                                <Label >Email</Label>
                                <Input
                                    style={styles.input}
                                    placeholderTextColor="#CCC"
                                    multiline={false}
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </Item>

                            {Components.renderIf(this.state.emailError,
                                <Text style={styles.inputError} uppercase={false}>{this.state.emailError}</Text>
                            )}

                            <Item floatingLabel style={styles.formitem}>
                                <Label >Telefone (opcional)</Label>
                                <Input
                                    keyboardType="phone-pad"
                                    style={styles.input}
                                    placeholderTextColor="#CCC"
                                    multiline={false}
                                    onChangeText={this.onPhoneChange.bind(this)}
                                    value={this.state.celular}
                                />
                            </Item>

                            {Components.renderIf(this.state.celularError,
                                <Text style={styles.inputError} uppercase={false}>{this.state.celularError}</Text>
                            )}

                            <Item floatingLabel style={styles.formitem}>
                                <Label >Senha</Label>
                                <Input
                                    style={styles.input}
                                    placeholderTextColor="#CCC"
                                    multiline={false}
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({ password })}
                                    value={this.state.password}
                                />
                            </Item>

                            {Components.renderIf(this.state.passwordError,
                                <Text style={styles.inputError} uppercase={false}>{this.state.passwordError}</Text>
                            )}

                        </Form>

                    </ScrollView>

                    {(this.props.error && this.props.error != null && this.props.error.message) ?
                        <Text style={styles.inputError} uppercase={false}>{this.props.error.message}</Text>
                        : null
                    }
                    <Button style={[styles.button]} bordered dark onPress={() => this.submit()}>
                        <Text style={styles.buttonText} uppercase={false}>{"Cadastrar"}</Text>
                        <Icon name="ios-arrow-round-forward-outline" style={styles.buttonIcon} />
                    </Button>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        error: state.clients.error
    };
}

export default connect(mapStateToProps)(RegisterScreen);