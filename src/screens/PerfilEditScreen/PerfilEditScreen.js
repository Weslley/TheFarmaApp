import moment from 'moment';
import 'moment/locale/pt-br';

import React, { Component } from 'react';
import { ScrollView, View, Image, Text, TextInput, Dimensions, TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView, Keyboard } from 'react-native';
import { Picker as NBPicker } from "native-base";
import { MaskService } from "react-native-masked-text";
import { StackActions, NavigationActions } from "react-navigation";

import { connect } from "react-redux";
import { update as updateClient } from "../../actions/clients";

import { Header } from "../../layout/Header";

import { Icon } from "../../components/Icon";
import { Loading } from '../../components/Loading';
import { MenuItem } from '../../components/MenuItem';

import { Components, StringUtils } from "../../helpers";
import styles from "./styles";

const { width, height } = Dimensions.get('screen');
const avatar = require('../../assets/images/avatar.png');

class PerfilEditScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeInputs: false,
            nome: "",
            nome_error: null,
            celular: "",
            celular_error: null,
            email: "",
            email_error: null,
            data_nascimento: "",
            data_nascimento_error: null,
            sexo: "",
            sexo_error: null,
            photo: null,
            photo64: null,
        };
    }

    static navigationOptions = ({ navigation }) => {
        return { header: null };
    };

    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error) {
                if (nextProps.error.response && (nextProps.error.response.status >= 400 && nextProps.error.response.status <= 403)) {

                    if (nextProps.error.response.data.nome) {
                        this.setState({ nome_error: nextProps.error.response.data.nome[0] })
                    }

                    if (nextProps.error.response.data.celular) {
                        this.setState({ celular_error: nextProps.error.response.data.celular[0] })
                    }

                    if (nextProps.error.response.data.email) {
                        this.setState({ email_error: nextProps.error.response.data.email[0] })
                    }

                    if (nextProps.error.response.data.data_nascimento) {
                        this.setState({ data_nascimento_error: nextProps.error.response.data.data_nascimento[0] })
                    }

                    if (nextProps.error.response.data.sexo) {
                        this.setState({ sexo_error: nextProps.error.response.data.sexo[0] })
                    }

                    if (nextProps.error.response.data.non_field_errors) {
                        Snackbar.show({ title: nextProps.error.response.data.non_field_errors[0], duration: Snackbar.LENGTH_SHORT });
                    }

                    if (nextProps.error.response.data.detail) {
                        Snackbar.show({ title: nextProps.error.response.data.detail, duration: Snackbar.LENGTH_SHORT });
                    }
                }
            }

            if (nextProps.photo) {
                this.setState({ photo: nextProps.photo, photo64: nextProps.photo64, changeInputs: true })
            }

            if (nextProps.success === true) {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ key: 'home1', routeName: 'Home', params: {} })],
                });
                this.props.navigation.dispatch(resetAction);
            }

        } catch (e) {
            console.log(e);
        }
    };

    componentDidMount() {
        StatusBar.setHidden(true);
        let client = this.props.client;
        if (client) {

            if (client.nome) this.setState({ nome: client.nome })
            if (client.email) this.setState({ email: client.email })
            if (client.celular) this.setState({ celular: MaskService.toMask('cel-phone', client.celular) })
            if (client.data_nascimento) this.setState({ data_nascimento: client.data_nascimento })
            if (client.sexo) this.setState({ sexo: client.sexo })
            /*
            if (client.data_nascimento) {
                let mask = MaskService.toMask('datetime', client.data_nascimento, { format: 'DD/MM/YYYY' });
                this.setState({ data_nascimento: mask })
            }
            */
        }
    }

    /** Private functions */
    clearErrors() {
        this.setState({ nome_error: null, email_error: null, celular_error: null, data_nascimento_error: null, sexo_error: null })
    }

    onBack() {
        this.props.navigation.goBack(null);
    }

    showCamera() {
        this.props.navigation.navigate({ key: 'camera1', routeName: 'Camera', params: {} });
    }

    onChangeDataNascimento = (date) => {
        let mask = MaskService.toMask('datetime', date, { format: 'DD/MM/YYYY' });
        this.setState({ data_nascimento: mask })
    }

    onPhoneChange = phone => {
        let phoneMask = MaskService.toMask('cel-phone', phone);
        this.setState({ celular: phoneMask, changeInputs: true })
    }

    getPhoto() {
        if (this.props.photo) {
            return (<Image source={{ uri: this.props.photo }} style={{ width: width, height: width * 0.67 }} />)
        }

        if (this.props.client && this.props.client.photo) {
            return (<Image source={{ uri: this.props.client.photo.replace("https://", "http://") }} style={{ width: width, height: width * 0.67 }} />)
        }

        return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="camera" size={40} color={"rgba(0,0,0,0.40)"} />
                <Text>{"clique aqui para adicionar uma foto"}</Text>
            </View>
        )
    }

    validForm() {
        this.clearErrors()

        if (this.state.nome == null || this.state.nome == "") {
            this.setState({ nome_error: "Este campo é obrigatório" })
            return false;
        }

        if (this.state.celular == null || this.state.celular == "") {
            this.setState({ celular_error: "Este campo é obrigatório" })
            return false;
        }

        if (this.state.celular.length > 1) {
            if (StringUtils.removeMask(this.state.celular).length <= 10) {
                this.setState({ celular_error: "Número incompleto" })
                return false;
            }
        }

        if (this.state.email == null || this.state.email == "") {
            this.setState({ email_error: "Este campo é obrigatório" })
            return false;
        }

        let regexEmail = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2,3}$/;
        if (!regexEmail.test(this.state.email)) {
            this.setState({ email_error: "E-mail inválido." })
            return false;
        }

        if (this.state.data_nascimento && this.state.data_nascimento.length === 10) {
            let parts = this.state.data_nascimento.split('/');
            if (!moment(`${parts[2]}-${parts[1]}-${parts[0]}`).isValid()) {
                this.setState({ data_nascimento_error: "Este campo é inválido" })
                return false;
            }
        } else {
            this.setState({ data_nascimento_error: "Este campo é inválido" })
            return false;
        }

        if (this.state.sexo == null || this.state.sexo == "") {
            this.setState({ sexo_error: "Este campo é obrigatório" })
            return false;
        }

        return true;
    }

    submit() {
        if (this.validForm()) {
            Keyboard.dismiss()

            let fields = {}
            if (this.state.nome) fields["nome"] = this.state.nome;
            if (this.state.celular) fields["celular"] = StringUtils.removeMask(this.state.celular);
            if (this.state.email) fields["email"] = this.state.email;
            if (this.state.data_nascimento) fields["data_nascimento"] = this.state.data_nascimento;
            if (this.state.sexo) fields["sexo"] = this.state.sexo;
            if (this.state.photo64) fields["photo"] = `data:image/jpeg;base64,${this.state.photo64}`;
            let params = { client: this.props.client, fields }
            this.props.dispatch(updateClient(params))
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={[styles.container]} behavior={"padding"}>
                <View style={{ flex: 1, justifyContent: "space-between" }}>

                    <TouchableOpacity style={{ width: width, height: width * 0.67, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.16)' }} onPress={() => { this.showCamera() }}>
                        {this.getPhoto()}
                        <View style={styles.headerBar}>
                            <Header
                                separator={false}
                                style={{ backgroundColor: 'transparent' }}
                                menuLeft={
                                    <MenuItem
                                        icon="md-arrow-back"
                                        iconColor={"#FFF"}
                                        onPress={() => { this.onBack() }}
                                        style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                                    />
                                }
                                menuRight={
                                    <MenuItem
                                        icon="check"
                                        iconColor={"#FFF"}
                                        onPress={() => { }}
                                        style={{ paddingRight: 24, paddingVertical: 12 }}
                                    />
                                }
                            />
                        </View>
                    </TouchableOpacity>

                    <ScrollView>
                        <View style={[styles.formItem, { marginTop: 24 }]}>
                            <Text style={[styles.labelItem, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Nome completo</Text>
                            <TextInput
                                multiline={false}
                                style={styles.input}
                                value={this.state.nome}
                                onChangeText={(nome) => this.setState({ nome, changeInputs: true })}
                                underlineColorAndroid={"transparent"}
                            />
                            <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
                            {Components.renderIf(this.state.nome_error,
                                <Text style={styles.inputError} uppercase={false}>{this.state.nome_error}</Text>
                            )}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={[styles.labelItem, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Telefone</Text>
                            <TextInput
                                maxLength={15}
                                multiline={false}
                                style={styles.input}
                                keyboardType="phone-pad"
                                value={this.state.celular}
                                onChangeText={this.onPhoneChange.bind(this)}
                                underlineColorAndroid={"transparent"}
                            />
                            <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
                            {Components.renderIf(this.state.celular_error, <Text style={styles.inputError} uppercase={false}>{this.state.celular_error}</Text>)}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={[styles.labelItem, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>E-mail</Text>
                            <TextInput
                                multiline={false}
                                style={styles.input}
                                value={this.state.email}
                                keyboardType="email-address"
                                underlineColorAndroid={"transparent"}
                                onChangeText={(email) => this.setState({ email, changeInputs: true })}
                            />
                            <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
                            {Components.renderIf(this.state.email_error,
                                <Text style={styles.inputError} uppercase={false}>{this.state.email_error}</Text>
                            )}
                        </View>

                        <View style={styles.formItem}>
                            <Text style={[styles.labelItem, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>{"Data de nascimento"}</Text>
                            <TextInput
                                maxLength={10}
                                multiline={false}
                                style={styles.input}
                                keyboardType={"numeric"}
                                value={this.state.data_nascimento}
                                underlineColorAndroid={"transparent"}
                                onChangeText={this.onChangeDataNascimento}
                            />
                            <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: 4, marginBottom: 8 }} />
                            {Components.renderIf(this.state.data_nascimento_error,
                                <Text style={styles.inputError} uppercase={false}>{this.state.data_nascimento_error}</Text>
                            )}
                        </View>

                        <View style={[styles.formItem, { marginBottom: 90 }]}>
                            <Text style={[styles.labelItem, Platform.OS === 'ios' ? { marginBottom: 16 } : {}]}>Sexo</Text>
                            <NBPicker
                                mode={Platform.OS === 'ios' ? "dropdown" : 'dialog'}
                                iosHeader="Selecione uma opção"
                                headerBackButtonText="voltar"
                                iosIcon={<Icon name="ios-arrow-down" size={24} color={"#000"} />}
                                itemStyle={styles.nbItem}
                                textStyle={styles.nbTextItem}
                                selectedValue={this.state.sexo}
                                onValueChange={(value, index) => this.setState({ sexo: value })}>
                                <NBPicker.Item label={'Masculino'} key={"g1"} value={'M'} />
                                <NBPicker.Item label={'Feminino'} key={"g2"} value={'F'} />
                            </NBPicker>
                            <View style={{ borderBottomColor: "#000", borderWidth: 0.5, marginTop: -2, marginBottom: 8 }} />
                        </View>

                    </ScrollView>
                </View>

                {Components.renderIf(this.props.loading,
                    <View style={styles.loading}>
                        <Loading />
                    </View>
                )}

            </KeyboardAvoidingView>
        )
    }
}

function mapStateToProps(state) {
    return {
        client: state.clients.client,
        loading: state.clients.loading,
        success: state.clients.success,
        error: state.clients.error,
        photo: state.clients.photo,
        photo64: state.clients.photo64,
    };
}

export default connect(mapStateToProps)(PerfilEditScreen);