import React, { Component } from 'react'
import { ScrollView, KeyboardAvoidingView, FlatList } from "react-native";

import RNGooglePlaces from "react-native-google-places";

import { SearchHeader } from '../../layout/Header';

import { MenuItem } from "../MenuItem";
import { LocationListItem } from "../LocationListItem";
import { PlaceSerializable } from "../../services/serializables";

class GooglePlaces extends Component {
    static defaultProps = {
        onBackPress: () => { }
    };

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            places: [],
        };
    }

    onQueryChange = query => {
        this.setState({ query });
        if (query.length > 2) {
            this.getSuggestions(query);
        }
    };

    onClearSearch = () => {
        this.setState({ query: "", places: [] });
    }

    getSuggestions(query) {
        RNGooglePlaces.getAutocompletePredictions(query, {
            type: "establishments",
            country: "BR",
            latitude: -5.083036,
            longitude: -42.796248,
            radius: 10
        })
            .then(results => {
                let places = [];
                results.map(x => { places.push(PlaceSerializable.serialize(x)); });
                this.setState({ places });
            })
            .catch(error => console.log(error.message));
    }

    _renderPlaceItem = ({ item }) => (
        <LocationListItem address={item} />
    );

    render() {
        let places = this.state.places;
        return (
            <ScrollView keyboardShouldPersistTaps={"always"}>
                <SearchHeader
                    separator={false}
                    query={this.state.query}
                    placeholder="Aonde você está?"
                    style={{ backgroundColor: "#FFF" }}
                    onQueryChange={this.onQueryChange}
                    onClearSearch={this.onClearSearch}
                    placeholderTextColor={'rgba(0,0,0,0.24)'}
                    menuLeft={
                        <MenuItem
                            icon="md-arrow-back"
                            onPress={() => { this.props.onBackPress(); }}
                            style={{ paddingLeft: 24, paddingVertical: 12, paddingRight: 12 }}
                        />
                    }
                />
                <FlatList
                    keyboardShouldPersistTaps={"handled"}
                    style={{ paddingHorizontal: 20 }}
                    data={places}
                    keyExtractor={(item, index) => item.place_id.toString()}
                    renderItem={this.props.renderPlaceItem}
                />
            </ScrollView>
        )
    }
}

export default GooglePlaces