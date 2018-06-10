import React, { Component } from "react";
import { KeyboardAvoidingView, ScrollView, View, Image, TextInput } from "react-native";
import { Container, Text, Button } from "native-base";
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
            facebook_user: null,
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
                        this.setState({ emailError: nextProps.error.response.data.email[0] })
                    }

                    if (nextProps.error.response.data.facebook_id) {
                        if (this.state.facebook_user) {
                            let params = { login_type: 1, facebook_user: this.state.facebook_user }
                            this.props.navigation.navigate({ key: 'email1', routeName: 'Email', params });
                        }
                    }

                    if (nextProps.error.response.data.non_field_errors) {
                        Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT, });
                    }

                    if (nextProps.error.response.data.detail) {
                        Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
                    }
                }

                if (nextProps.error.message && nextProps.error.message === 'Network Error') {
                    this.setState({ showNetworkError: true });
                }
            }

            if (nextProps && nextProps.client) {
                this.onBack()
            }
        } catch (e) {
            console.log(e);
        }
    }

    componentWillMount() {
        let params = this.props.navigation.state.params;
        let actionBack = params ? params.actionBack : null;
        this.setState({ actionBack })
    }

    componentWillUnmount() { }

    /** Private functions */
    onBack() {
        this.props.navigation.goBack(null);
    }

    loginEmail() {
        this.props.navigation.navigate({ key: 'email1', routeName: 'Email', params: { login_type: 0, actionBack: this.state.actionBack } });
    }

    loginPhone() {
        this.props.navigation.navigate({ key: 'phone1', routeName: 'Phone', params: { login_type: 2, actionBack: this.state.actionBack } });
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
                        this.props.dispatch(login({ login_type: 1, facebook_id: res.id }));
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

    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, paddingHorizontal: 24 }}>
                <Image
                    resizeMode={"cover"}
                    style={styles.background}
                    source={require("../../assets/images/background-login.png")} />

                <Header
                    style={{ paddingHorizontal: 0, paddingTop: 24, backgroundColor: "transparent" }}
                    separator={false}
                    menuRight={
                        <MenuItem
                            icon="md-close"
                            iconColor="#FFF"
                            style={{ paddingVertical: 12, paddingRight: 24 }}
                            onPress={() => { this.onBack() }}
                        />
                    }
                />
                <View style={{ flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ alignItems: 'center', }} >
                        <Image source={require('../../assets/images/logo-white.png')} style={styles.logo} />
                        <Text style={[styles.text, { fontSize: 20 }]} uppercase={false}>{"theFarma"}</Text>
                    </View>

                    <View style={{ marginBottom: 24 }}>
                        <Text style={styles.text} uppercase={false}>{"Logar com"}</Text>

                        <Button style={[styles.button]} transparent bordered iconLeft onPress={() => this.loginPhone()}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }} >
                                <Icon name="call-o" style={[styles.buttonIcon, { marginLeft: 16 }]} />
                                <Text style={styles.buttonText} uppercase={false}>{"Telefone"}</Text>
                            </View>
                        </Button>

                        <Button style={[styles.button]} transparent bordered iconLeft onPress={() => this.loginEmail()}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }} >
                                <Icon name="mail" style={[styles.buttonIcon, { marginLeft: 16 }]} />
                                <Text style={styles.buttonText} uppercase={false}>{"Email"}</Text>
                            </View>
                        </Button>

                        <Button style={[styles.button, { marginBottom: 0 }]} transparent bordered iconLeft onPress={() => this.loginFacebook()}>
                            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "flex-start" }} >
                                <Icon name="social-facebook" style={[styles.buttonIcon, { marginLeft: 24 }]} />
                                <Text style={styles.buttonText} uppercase={false}>{"Facebook"}</Text>
                            </View>
                        </Button>
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

export default connect(mapStateToProps)(LoginScreen);