import React, { Component } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'native-base';
import { Components } from '../../helpers';

import styles from './styles';

class ButtonCustom extends Component {
  static defaultProps = {
    style: {}
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
    <TouchableOpacity style={[styles.container, { width: '48%' }, this.props.style]} onPress={this.props.onPress}>
        <Image style={styles.icon} resizeMode="contain" source={this.props.image}/>
        <Text style={styles.title}>{this.props.title}</Text>
        <Text style={styles.description}>{this.props.description}</Text>
    </TouchableOpacity>
    );
  }
}

export default ButtonCustom;