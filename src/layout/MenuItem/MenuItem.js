import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";

import styles from "./styles";
import { Components } from "../../helpers";

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View style={styles.container}>
        
          {Components.renderIf(this.props.image,
            <Image style={styles.image} resizeMode="contain" source={this.props.image} />
          )}

          <Text style={styles.text}>{this.props.text}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default MenuItem;
