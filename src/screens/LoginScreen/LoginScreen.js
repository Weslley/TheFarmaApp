import React, { Component } from "react";
import { View, ScrollView, Image, TextInput } from "react-native";
import { Container, Text, Form, Item, Label, Input, Button } from "native-base";
import Snackbar from 'react-native-snackbar';

import { connect } from "react-redux";

import { login, register, clearError } from "../../actions/clients"

import { Header } from "../../layout/Header"
import { MenuItem } from "../../components/MenuItem"
import { Icon } from "../../components/Icon"

import { Components } from "../../helpers";
import styles from "./styles";

const FBSDK = require("react-native-fbsdk");
const { LoginButton, LoginManager, AccessToken, GraphRequest, GraphRequestManager } = FBSDK;

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            facebook_id: null,

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
                    this.setState({ emailError: nextProps.error.response.data.email[0] })
                }

                if (nextProps.error.response.data.facebook_id) {
                    if (this.state.facebook_user) {
                        let params = {}
                        let u = this.state.facebook_user
                        if (u.id) params["facebook_id"] = u.id;
                        if (u.email) params["email"] = u.email;
                        if (u.first_name) params["nome"] = u.first_name;
                        if (u.last_name) params["nome"] += u.last_name;
                        if (u.birthday) params["data_nascimento"] = u.birthday;
                        if (u.gender) params["sexo"] = u.birthday === 'male' ? "M" : "F";
                        if (u.picture && u.picture.data) params["foto"] = u.picture.data;
                        params["password"] = u.id;
                        this.props.dispatch(register(params));
                    }
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
        this.setState({ emailError: null, passwordError: null })
        this.props.dispatch(clearError());
    }

    componentWillUnmount() {
        this.props.dispatch(clearError());
    }

    /** Private functions */
    validForm() {
        this.setState({ emailError: null, passwordError: null })

        if (this.state.email == null || this.state.email == "") {
            this.setState({ emailError: "campo obrigatório" })
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
            params["email"] = this.state.email;
            params["password"] = this.state.password;
            if (this.state.facebook_id) params["facebook_id"] = this.state.facebook_id;
            this.props.dispatch(login(params));
        }
    }

    loginFacebook() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(
            (result) => {
                if (result.isCancelled) {
                    Snackbar.show({
                        title: 'Erro ao logar com facebook',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                } else {
                    const infoRequest = new GraphRequest('/me', {
                        parameters: { 'fields': { 'string': 'email, first_name, last_name, gender, birthday, picture.width(480)' } }
                    }, (err, res) => {
                        this.setState({ facebook_user: res })
                        let params = { email: "", password: "", facebook_id: res.id }
                        this.props.dispatch(login(params));
                    });
                    new GraphRequestManager().addRequest(infoRequest).start();
                }
            }, (error) => {
                console.log(error);
                Snackbar.show({
                    title: 'Erro ao logar com facebook',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        );
    }

    showRegisterScreen() {
        this.props.navigation.navigate({ key: 'register1', routeName: 'Register', params: {} });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, paddingHorizontal: 24 }}>
                    <Image
                        resizeMode={"cover"}
                        style={styles.background}
                        source={require("../../assets/images/background-login.png")} />

                    <Header
                        style={{ paddingHorizontal: 0, paddingTop: 24, backgroundColor: "transparent" }}
                        separator={false}
                        menuLeft={
                            <MenuItem
                                icon="md-arrow-back"
                                iconColor="#FFF"
                                style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                                onPress={() => { this.props.navigation.goBack(null) }}
                            />
                        }
                    />

                    <ScrollView>
                        <Form style={styles.form}>
                            <Item floatingLabel style={styles.item}>
                                <Label style={{
                                    fontFamily: "Roboto-Bold",
                                    fontSize: 12,
                                    color: "#FFFFFF"
                                }}>Email</Label>
                                <Input
                                    style={styles.input}
                                    placeholderTextColor="#CCC"
                                    multiline={false}
                                    keyboardType={"email-address"}
                                    onChangeText={(email) => this.setState({ email })}
                                    value={this.state.email}
                                />
                            </Item>

                            {Components.renderIf(this.state.emailError,
                                <Text style={styles.inputError} uppercase={false}>{this.state.emailError}</Text>
                            )}

                            <Item floatingLabel style={styles.item}>
                                <Label style={{
                                    fontFamily: "Roboto-Bold",
                                    fontSize: 12,
                                    color: "#FFFFFF"
                                }}>Senha</Label>
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

                        <Button style={[styles.button]} bordered onPress={() => this.submit()}>
                            <Text style={styles.buttonText} uppercase={false}>{"Entrar"}</Text>
                            <Icon name="arrow-long-right" style={[styles.buttonIcon, { marginRight: 16 }]} />
                        </Button>
                    </ScrollView>

                    <Button style={[styles.button]} bordered onPress={() => this.loginFacebook()}>
                        <View style={{ flexDirection: 'row', alignItems: "center" }} >
                            <Icon name="social-facebook" style={[styles.buttonIcon, { marginLeft: 16 }]} />
                            <Text style={styles.buttonText} uppercase={false}>{"Entrar com fabebook"}</Text>
                        </View>
                    </Button>

                    <Button style={[styles.button]} bordered onPress={() => this.showRegisterScreen()}>
                        <Text style={styles.buttonText} uppercase={false}>{"Não possue cadastro? Cadastre-se"}</Text>
                        <Icon name="arrow-long-right" style={[styles.buttonIcon, { marginRight: 16 }]} />
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

export default connect(mapStateToProps)(LoginScreen);