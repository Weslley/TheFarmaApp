import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Text, List, ListItem } from "native-base";
import Snackbar from 'react-native-snackbar';

import { connect } from 'react-redux';
import { getLocation, updateLocation, getGeocodeAddress } from "../../actions/locations"

import { selectProduct, getHistory } from '../../actions/products';
import { clearApresentations } from '../../actions/apresentations';

import { Icon } from '../../components/Icon';
import { MenuItem } from '../../components/MenuItem';

import { Container } from '../../layout/Container';
import { SearchHeader } from '../../layout/Header';

import { Components } from '../../helpers';
import styles from "./styles";

class SearchMedicineScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static navigationOptions = ({ navigation }) => {
        let { state: { params } } = navigation;
        return {
            header: () => (
                <SearchHeader
                    menuLeft={
                        <MenuItem
                            icon="md-arrow-back"
                            onPress={() => { navigation.goBack(null) }}
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                        />
                    }
                />
            )
        }
    }

    componentWillReceiveProps = nextProps => {
        try {
            if (nextProps && nextProps.error && nextProps.error.response && nextProps.error.response.status == 400) {
                Snackbar.show({
                    title: nextProps.error.message,
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } catch (e) {
            Snackbar.show({
                title: e.message,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }

    componentWillMount() {
        this.props.dispatch(getLocation());
    }

    componentDidMount() {
        this.props.dispatch(getHistory());
    }

    /** Private functions */
    onSelect = product => {
        this.props.dispatch(selectProduct(product));
        this.props.dispatch(clearApresentations());
        this.props.navigation.navigate({ key: 'MedicineApresentations1', routeName: 'MedicineApresentations', params: { title: product.nome, selected: product } });
    }

    render() {
        return (
            <Container>
                {Components.renderIf(!this.props.isHistory, <Text uppercase style={styles.subheader}> Resultado da busca </Text>)}
                {Components.renderIf(this.props.isLoading, <ActivityIndicator size="small" style={{ marginTop: 16 }} />)}
                {this.props.products.length ?
                    <List dataArray={this.props.products} renderRow={product => (
                        <ListItem style={styles.itemContainer} onPress={() => { this.onSelect(product); }} >
                            {Components.renderIfElse(this.props.isHistory,
                                <Icon name="history" size={16} color={"#000"} style={styles.itemIcon} />,
                                <Icon name="pills" size={16} color={"#000"} style={styles.itemIcon} />)}
                            <Text>{product.nome}</Text>
                        </ListItem>)}
                    /> : null}
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return {
        isHistory: state.products.isHistory,
        isLoading: state.products.isLoading,
        products: state.products.loaded,
        error: state.products.error
    };
}

export default connect(mapStateToProps)(SearchMedicineScreen);

